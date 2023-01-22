const Matches = require('../model/matches');
const {v4: uuidv4} = require('uuid');

exports.getMatches = ((req,res,next) => {
    Matches.find({}, (err,result) => {
        if(err){
            console.log(err);
        } else{
            if(result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(204).json({
                    Matches: result
                });
            }
            
        }
    })
});

exports.getMatch = ((req,res,next) => {
   const target = req.params.Id;

   Matches.findById({_id: target},(err,result)=> {
    if(err){
        res.status(500).json(err);
    } else {
        res.status(200).json(result);
    }
   })

})

exports.postMatch = ((req,res,next) => {

    let rPlayer1 = false;
    let rPlayer2 = false;
    let player1I;
    let player2I;

    const player1 = req.body.player1;
    const player2 = req.body.player2;

    if(player1 !== player2){
        fetch('http://localhost:8080/api/players')
          .then(response => response.json())
          .then(data => {
            data.Users.forEach(player => {
                if(player._id === player1){
                    rPlayer1 = true;
                    player1I = player;
                } else if (player._id === player2){
                    rPlayer2 = true;
                    player2I = player;
                }
            });

            if(rPlayer1 === true && rPlayer2 === true){
                const match = new Matches ({
                    _id: uuidv4(),
                    player1: {
                        _id: player1I._id,
                        name: player1I.name,
                        score: player1I.score,
                    },
                    player2: {
                        _id: player2I._id,
                        name: player2I.name,
                        score: player2I.score
                    },
                    winner: {
                        message: 'Match created'
                    }
                })

                match.save()
                     .then(
                        res.status(201).json({
                            message: "Match saved successfully",
                            Match: {
                                match
                            }
                        })
                     )
                     .catch(err => {
                        res.status(500).json({
                            message: "Contact Administrator",
                                error: err
                        })
                     });
            }
          })
          .catch(err => {
            res.status(500).json({
                message: "Contact Administrator",
                    error: err
            })
          });
    }

});

exports.patchP1Score = ((req, res, next) => {

   const target = req.params.Id;
   const targetP = req.body.player;

    if(targetP === 'player1'){
      
         Matches.findById({_id: target}, (err,result) => {
            if(err){
                console.log(err);
            }else {
                const targetS = result.player1.score += 1;
                Matches.findByIdAndUpdate({_id: target}, {$set: {"player1.score": targetS}},{new:true}, (err, updatedS) => {
                    if(err){
                        console.log(err);
                    } else {
                        console.log("first",updatedS);
                        if(updatedS.player2.score < updatedS.player1.score){
                            const score = updatedS.player1.score - updatedS.player2.score;
                            Matches.findByIdAndUpdate({_id: target}, {$set: {"winner": {
                                player: updatedS.player1._id,
                                name: updatedS.player1.name,
                                score: score
                            }}},{new:true}, (err, updatedM) => {
                                if(err){
                                    console.log(err)
                                }else {
                                    res.status(200).json(updatedM)
                                }
                            })
                        } else if (updatedS.player2.score === updatedS.player1.score){
                            Matches.findByIdAndUpdate({_id: target}, {$set: {"winner": {
                                message: "Tie"
                            } }}, {new: true},(err,updatedM) => {
                                if(err){
                                    console.log(err)
                                }else {
                                    res.status(200).json(updatedM);
                                }
                            });
                        } else {
                            const score = updatedS.player2.score - updatedS.player1.score;
                            Matches.findByIdAndUpdate({_id: target},{$set: {"winner":{
                                player: updatedS.player2._id,
                                name: updatedS.player2.name,
                                score: score
                            }}},{new: true},(err,updatedM) => {
                                if(err){
                                    console.log(err)
                                }else {
                                    res.status(200).json(updatedM);
                                }
                            })
                        }
                    }
                })
            }
        })

    } else if (targetP === 'player2'){
        Matches.findById({_id: target}, (err,result) => {
            if(err){
                console.log(err);
            }else {
                const targetS = result.player2.score + 1;

                Matches.findByIdAndUpdate({_id: target}, {$set: {"player2.score": targetS}},{new:true}, (err, updatedS) => {
                    if(err){
                        console.log(err);
                    } else {
                        console.log("first",updatedS);
                        if(updatedS.player1.score < updatedS.player2.score){
                            const score = updatedS.player2.score - updatedS.player1.score;
                            Matches.findByIdAndUpdate({_id: target}, {$set: {"winner": {
                                player: updatedS.player2._id,
                                name: updatedS.player2.name,
                                score: score
                            }}},{new:true}, (err, updatedM) => {
                                if(err){
                                    console.log(err)
                                }else {
                                    res.status(200).json(updatedM)
                                } 
                            })
                        } else if (updatedS.player2.score === updatedS.player1.score){
                            Matches.findByIdAndUpdate({_id: target}, {$set: {"winner": {
                                message: "Tie"
                            } }}, {new: true},(err,updatedM) => {
                                if(err){
                                    console.log(err)
                                }else {
                                    res.status(200).json(updatedM);
                                }
                            });
                        } else {
                            const score = updatedS.player1.score - updatedS.player2.score;
                            Matches.findByIdAndUpdate({_id: target},{$set: {"winner":{
                                player: updatedS.player1._id,
                                name: updatedS.player1.name,
                                score: score
                            }}},{new: true},(err,updatedM) => {
                                if(err){
                                    console.log(err)
                                }else {
                                    res.status(200).json(updatedM);
                                }
                            })
                        }
                    }
                })
                
            }

        })
    }

    // Matches.findByIdAndUpdate({_id: target},{$set: {"player1.score": + 1}}, (err, result) => {
    //     if(err){
    //         console.log(err);
    //     } else {
    //         console.log(result);
    //     }
    // });
});

exports.deleteAllMatches = ((req,res,next) => {
    Matches.deleteMany({},(err, result) => {
        if(err){
            console.log(err);
        }else {
            console.log(result);
        }
    });
})

exports.deleteMatch = ((req,res,next) => {

    const target = req.params.Id;

    console.log(target);

    Matches.findByIdAndDelete({_id: target}, (err,result) => {
        if(err){
            console.log(err)
        } else {
            console.log(result)
        }
    });

})
const User = require('../model/users');
const {v4: uuidv4} = require('uuid');

exports.getUser = ((req,res,next) => {

    User.find({}, (err, result) => {
        if(err){
            console.log(err)
        } else if (result.length > 0){
            res.status(200).json({
                Users: result
            })
        } else {
            res.status(204).json();
        }
    })


    
});

exports.postPlayers = ((req,res,next) => {

    if (req.body.player === undefined){
        res.status(400).json({
            message: "Bad Request, please refer to documentation"
        });
    } else {
        const player = req.body.player;
    
    if(player.length >= 5 && player.length < 14){
        console.log('player ok, saving')
        
        const pId = uuidv4();

        const user = new User({
            _id: pId,
            name: player,
            score: 0
        })
            
        user.save()
              .then(
                res.status(201).json({
                    message: 'Player Registered Succesfully',
                    player : {
                        id: pId,
                        name: player,
                        score: 0
                    }
                })
              )
              .catch(err => console.log(err));
    }   
    }
    
});
# GameTrackerProject
API's (Players, Matches, Populate, Ranking) this API's used together make a powerful Game Tracker 

The next number points are mandatory for the usage, modification or contribution to this project. 

Install the following programs if you already one you can skip that number or if you already have them all skip to number 5
1.-Hyper Terminal
2.-Git
3.-Node.js
4.-MongoDB
5.-Postman (recommended)
6.-How to use the API's


1.-Hyper Terminal Installation
1.1.-Go to this link "https://hyper.is/"
1.2.-Select windows installation
1.3.-Open install exe and follow through

2.-Git Installation
2.1.-Go to this lin "https://git-scm.com/downloads"
2.3.-It will automatically detect the required version for your system
2.4.-Run install exe and make sure to enable the "Git Bash" option
2.5.-Finish the installation.

2.6.-Hyper Terminal Configuration 
2.7.-Go to this link "https://gist.github.com/coco-napky/404220405435b3d0373e37ec43e54a23"
2.8.-Copy the whole configuration
2.9.-Go to Hyper Terminal window and press CTRL + ","
2.9.1.-Replace the whole configuration whit the one we copied earlier
2.9.3.-Restart Hyper by closing it and open it again
2.9.4.-Verify the correct installation and configuration by using "echo $shell" we must get "/usr/bin/bash" 

3.-Node.js Installation
3.1.-Go to this link "https://nodejs.org/en/"
3.2.-Chose LTS version (recommended)
3.3.-Follow through the installation exe
3.4.-Restart your system (You won't be able to use node until you do this step)
3.5.-Verify the correct installation by using "node --version"
3.6.-You must be able to verify the node version you just installed


4.-MongoDB Installation
4.1.1.-Go to this link https://www.mongodb.com/try/download/community
4.1.2.-Choose MongoDB Community Server
4.1.3.-Download the newer version
4.1.4.-Open installation helper
4.1.5.-Choose the full version
4.1.6.-Choose "Run service as Network Service User"
4.1.7.-Take note of the address inside the "Data Directory" (DON'T CHANGE IT) 
4.1.8.-Uncheck the option "install MongoDB Compass"
4.1.9.-Finish the installation 
4.2.0.-Go to Local Disk C: 
4.2.1.-Create a new folder named "data"
4.2.2.-Inside the new "data" folder create a new folder called "db"
4.2.3.-Go to the local address you put on "Data Directory" or if you didn't change the address go to Program Files > MongoDB > Server (write down version example: "4.0")
4.2.4.-Inside Hyper Terminal window write "cd ~" to go to your initial directory
4.2.5.-Use touch command to create a new file with the name ".bash_profile" ("touch .bash_profile")
4.2.6.-We will edit the file .bash_profile using VIM => "vim .bash_profile"
4.2.7.-Inside VIM we must type the "I" key 
4.2.8.-Paste using the command CTRL + "V" the following lines without the parentheses and changing the mongo version for the one we had in 4.2.3 (alias mongod="/c/Program\ files/MongoDB/Server/4.0/bin/mongod.exe"
4.2.9.-alias mongo="/c/Program\ Files/MongoDB/Server/4.0/bin/mongo.exe")
4.3.4.-Once we have pasted the previous lines
4.3.5.-To exit VIM type ":wq!"
4.3.6.-Restart Hyper by closing it and open it again
4.3.7.-Verify the correct installation 
4.3.8.-Write this command "mongo --version"
4.3.9.-We must see "MongoDB shell version (current version) git version: ......
4.4.1.-If we get this message we can be sure that mongo installed correctly

5.- Postman installation
5.1.0.- Go to this link "https://www.postman.com/"
5.1.1.- Select your OS based on the logo
5.1.2.- Run the installation helper
5.1.3.- Sign Up (I know I'm sorry)
5.1.4.- Log In 
5.1.5.- Click in the workspace tab and create a new workspace
5.1.6.- Name your workspace
5.1.7.- Change the visibility to personal
5.1.8.- Finish setting up workspace

5.2 How to use Postman
	5.2.0 At the top you can open tabs as a browser
	5.2.1 Below you will have an address bar (this is where you will input the endpoints)
	5.2.2 Next to the address bar you will have a dropdown menu (this is how you can select methods)
	5.2.3 Below you have multiple option but for the testing and using of this aplication will only use Body tab
	5.2.4 Here in body you can write any desired text y you choose the raw option
	5.2.5 Then in the dropdown menu which first option is text change it to JSON
	5.2.6 In the response space you will receive any data, http statuses or errors
	5.2.7 Happy Testing!


6.- Using the API's
6.00 - General information (MUST READ)
  6.01.- This projects has 4 API (Players, Matches, Populate, Ranking) each of this API handle functions with relation to its name and in some cases can communicate with the other API's
  6.02.- It is mandatory that all 4 API's are running to ensure the expected ongoing of the full project.
  6.03.- Open Hyper Terminal write "mongo"
  6.04.- Open another Hyper Terminal window write "mongod" this step and the previous one are mandatory to establish connection with the database 
  6.05.- For each one of the API directory address we must install dependencies trough the terminal with "npm i"
  6.06.- Once each of the API folders has downloaded its dependencies we must start the projects with "npm start"
  6.07.- Each API has a series of functions or endpoints we can use. These are error prone but in the development of this project we tried to address the errors as much as we could.
  6.08.- All data posted and delivered must and will be in JSON format.
  6.09.- Some unhandled errors can kill the server connection restart them to continue using the API's

6.1.- Players API
6.1.0.- Endpoint base localhost:8080/api
6.1.1.- Get Players (will deliver a list of all players registered) Method: "GET" endpoint: localhost:8080/api/players
6.1.2.- Get Player (will deliver a player based on its ID) Method: "GET" endpoint: localhost:8080/api/players/ID
	6.1.2.0.- ID must be inputed by the user as a parameter without commas example: bf4c8552-1f19-4520-83ad-03a56b3ab6ce
6.1.3.- Update Player Score (will trigger a function to update the player score for future ranking) Method: "GET" endpoint: localhost:8080/api/players-score
	6.1.3.0.- This API communicate with Matches API (this function will read for finished matches and then write into them that it has already been counted)
6.1.4.- Post Player (will register a new player and return the registration) Method: "POST" endpoint localhost:8080/api/players
	6.1.4.0.- The data must be sent as the body in JSON format exactly as the example "player": "Andres" name must be equal or greater than 4 characters and less than 14
	6.1.4.1.- For the moment this function does not check for duplicated names, this feature will be added as an update later on
	6.1.4.2.- For the moment this function does not check for numbers or special characters, this feature will be added as an update later on
6.1.5.- Post Populate Player (handles a function that populates data if no previous data is stored) Method: "POST" endpoint: localhost:8080/api/players/get/populated
	6.1.5.0.- This function its called by an endpoint of the Populate API
6.1.6.- Patch Player (will update the stored name validating the same values as the post method) Method: "PATCH" endpoint: localhost:8080/api/players/ID
	6.1.6.0.- ID must be inputed by the user as a parameter without commas example: bf4c8552-1f19-4520-83ad-03a56b3ab6ce
	6.1.6.1.- For the moment this function does not check for duplicated names, this feature will be added as an update later on
	6.1.6.2.- For the moment this function does not check for numbers or special characters, this feature will be added as an update later on
6.1.7.- Delete All Playeres (will delete all players) Method: "DELETE" endpoint: localhost:8080/api/players
6.1.8.- Delete Player (will delete player based on its ID) Method: "DELETE" endpoint localhost:8080/api/players/ID
	6.1.8.0.- ID must be inputed by the user as a parameter without commas example: bf4c8552-1f19-4520-83ad-03a56b3ab6ce
6.1.9.- Testing, for testing getPlayer test Populate the database first as the test parameters where made with these data. This will be updated in the future.
	6.1.9.0.- In your terminal navitage to Players API folder and use the command "npm run test" this is a developers script.


6.2.- Matches API
6.2.0.- Endpoint base localhost:8090/api
6.2.1.- Get Matches (will deliver a list of al matches created) Method: "GET" endpoint: localhost:8090/api/matches 
6.2.2.- Get Match (will deliver a match base on its ID) Method: "GET" endpoint: localhost:8090/api/matches/ID
	6.2.2.0.- ID must be inputed by the user as a parameter without commas example: bf4c8552-1f19-4520-83ad-03a56b3ab6ce
6.2.3 Post Populated (handles a function that populates data if no previous data is stored) Method: "POST" endpoint: localhost:8090/api/matches/get/populated
	6.2.3.0 This function is called by and endpoint of Populate API
6.2.4 Post Match (Will create a match) Method: "POST" endpoint: localhost:8090/api/matches
	6.2.4.0 The Data must be sent as a JSON format exactly as this example "player1": "bf4c8552-1f19-4520-83ad-03a56b3ab6ce", "player2": "adf15719-f340-4ce3-9e48-d77db3bc0af4"
	6.2.4.1 The match will be created with some values "finished: false" and "counted: false" this helps with other functions
	6.2.4.2 When the match is created will be no winner and will establish a message "winner: {match created}"
	6.2.4.3 This function communicates with Playes API and retrieve players and check if the players are registered if not the match will not be created
	6.2.4.4 This function prevents that a player post a match with himself
6.2.5 Put Finish (Will finish the match) Method: "PUT" endpoint: localhost:8090/api/matches/ID
	6.2.5.0.- Match ID must be inputed by the user as a parameter without commas example: bf4c8552-1f19-4520-83ad-03a56b3ab6ce
	6.2.5.1.- Will Prevent future scoring in this match
6.2.6 Patch Score (will update the match player score) Method: "PATCH" endpoint: localhost:8090/api/matches/ID
	6.2.6.0.- Match ID must be inputed by the user as a parameter without commas example: bf4c8552-1f19-4520-83ad-03a56b3ab6ce
	6.2.6.1.- The data must be sent as the body in JSON format exactly as the example "player": "player1" you can use "player1" or "player2"
	6.2.6.2.- Scoring will update the winner and the global score
	6.2.6.3.- Once the match key value finished its set to true users will be not allowed to score 
6.2.7 Delete All Matches (will delete all matches) Method: "DELETE" endpoint: localhost:8090/api/matches	
6.2.8 Delete Match (will delete a match based on its id) Method: "DELETE" endpoint: localhost:8090/api/matches/ID

NOTE: USER or MATCH deletion will not effect any change at all the other data stored so be cautious. Also this routes in the future will have authentication and only the admins will be allowed to use them.

6.3.- Populate API 
6.3.0.- Endpoint base localhost:8095
	6.2.0.1 This API does not have a connection to a database or store any dynamic data
	6.2.0.2 The Only data this API has its hard coded data under the models folder
	6.2.0.2 The data stored in matches.js and players.js its a set up data created for quick use of the other API's
	6.2.0.3 You can modify this data to your convinience for setting up a large database
6.3.1.- Get Post Matches (will trigger a function that triggers a function in Matches API) refer to 6.2.3
	6.3.1.0 Method: "GET" endpoint: localhost:8095/api/populate/matches
6.3.2.- Get Post Players (will trigger a function that triggers a function in Players API) refer to 6.1.5
	6.3.2.0 Method: "GET" endpoint: localhost:8095/api/populate/players

6.4.- Ranking API
6.4.1.- Get Rankings (This function will deliver rankings) Method: "GET" endpoint: localhost:8100/api/rankings
6.4.2.- Get Ranking (This function will deliver a ranking bases on its id) Method: "GET" endpoint: localhost:8100/api/rankings/ID
	6.4.2.- Ranking ID must be inputed by the user as a parameter without commas example: bf4c8552-1f19-4520-83ad-03a56b3ab6ce
6.4.3.- Post Ranking (This function will sort the players based on its score) Method: "POST" endpoint: localhost:8100/api/rankings/player
	6.4.3.0 .- This function communicates with Players API retrieves the players and their scores at that moment
	6.4.3.1 .- This function will store the sorted player list in descending form
6.4.4.- Delete Ranking (This function will delete a ranking bases on its id) Method: "DELETE" endpoint: localhost:8100/api/rankings/ID
6.4.5.- Delete All Rankings (This function will delete all rankings) Method: "GET" endpoint: localhost:8100/api/rankings

NOTE: ALL DELETE Methods will require authentication in the future.

If you encounter an error, want to discuss, want to collaborate on this project let me know.
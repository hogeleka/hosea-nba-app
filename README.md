# NBA  Dashboard Application
### by Chukwubueze Hosea Ogeleka
This is a simple proof-of-concept Application which simply displays data for NBA games for up to 2 months before the time the application is running. 

#### Running the Application (node 10.15.1 and npm 6.14)
##### Prerequisites
* Node (minimum 10.15.1, but I recommend Node 14 onwards)
* npm (minimum 6.14)

##### Running locally
* Clone the Repo
* cd into the directory
* run ```npm install```
* run ```npm start```
* You should have the application running on local host (port 3000)

#### Features
* Simple intuitive Web interface built primarily using Material UI library
* For each game day, you can view detailed stats about the teams, the players for that game, and key events (which even include the specific quarter and game clock time)
* Valuable one stop shop for all game data, especially when you missed the games
* No need to scroll too much to find data for game days for previous days
* See screenshots folder for what the UI looks like!!

#### Improvements
* This is a proof of concept application. It is entirely UI. For a lot of the data, we fetch JSON data which the NBA makes available (for example, to view data for scores for April 5, go to to [https://data.nba.net/10s/prod/v1/20210405/scoreboard.json] 
* There is currently no backend/server. All the data is based on external requests
* As it is a proof of concept application, a lot of the UI is not mobile-friendly (or work well with very small screens)
* UI could include photos, like team logos
* Absence of database/backend heavily restricts current functionality
* Tests/Documentation needed 
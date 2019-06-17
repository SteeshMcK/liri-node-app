//This code reads and sets any environment variables with the dotenv package
require("dotenv").config();

//Require AXIOS
const axios = require('axios');

//Require MOMENT
var moment = require('moment');

//Require NODE-SPOTIFY-API
var Spotify = require('node-spotify-api');

//this code is required to import the keys.js file and store it in a variable
var keys = require("./keys.js");

//Initialize API keys
//Spotify
var spotify = new Spotify(keys.spotify);

//Bands in Town
var bandsInTown = (keys.bandsInTown);

//OMDB
var omdb = (keys.omdb);

//Variables for storing user commands and user inputs
var userCommand = process.argv[2];
/*.slice() separates the user input from the rest of the node command line 
and .join() creates a new string out of that input, the elements separated
by a single space*/
var userInput = process.argv.slice(3).join(" "); 

//Switch statement, directing user commands to the proper function 
function userRequest(userCommand, userInput) {
    switch (userCommand) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this-song":
            spotifyThis();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            doThis(userInput);
            break;
        default:
            console.log("Try again, please!");
            break;
    }
}

userRequest(userCommand, userInput);

var capitalize = function(newArtist) {
    var capitalize = newArtist;
    var bigLetters = capitalize.toUpperCase();
    console.log(bigLetters + "\n");
}

//concertThis()
function concertThis() {
    console.log("\n*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+\n");
    console.log("LET'S ROCK AND ROLL!!!\n");

    axios
        .get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=" + bandsInTown + "&date=2019-06-16%2C2019-07-16")
        .then(function(response) {

            capitalize(userInput);

            for (var i = 0; i < response.data.length; i++) {
                var results = response.data[i];
                var concertHall = results.venue.name;
                var concertHallLocation = results.venue.city;
                var concertHallLocationCountry = results.venue.country;
                var showTime = results.datetime;

                console.log("* " + concertHall);
                console.log("* " + concertHallLocation + ", " + concertHallLocationCountry);
                var timeConfigured = moment(showTime).format("MM/DD/YYYY hh:00 A");
                console.log("* " + timeConfigured + "\n");
            }

        console.log("\n*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+\n")
    });
}

//spotifyThis()
function spotifyThis() {
    console.log("\n*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+\n");

    if (!userInput) {
        userInput = "the sign ace of base"
    };

    spotify.search ({
        type: "track",
        query: userInput,
        limit: 1
    }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        //console.log(data.tracks.items[0].album.artists[0].name);

        //Pull desired data from the API call and place it in an array
        var spotifyArray = data.tracks.items; 

        //sort through that array and pull out the requested data
         for (var k = 0; k < spotifyArray.length; k++) {
             console.log("*Here's the Spotify 411!\n");
             console.log("*Artist: " + spotifyArray[k].album.artists[k].name);
             console.log("*Song Title: " + spotifyArray[k].name);
             console.log("*Album: " + spotifyArray[k].album.name);
             console.log("*Spotify Link: " + spotifyArray[k].external_urls.spotify);
         };
    });
}

function movieThis() {
    console.log("\n*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+\n");

    if(!userInput) {
        userInput = "mr nobody";
    };
    console.log(userInput);

}

function doThis() {
    
}




$(document).ready(function() {
    // **** BEGIN OPENWEATHER API *** //
    var cityURL = "https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=";
    var rectangleURL = "https://api.openweathermap.org/data/2.5/box/city?bbox=-126,25,-66,49,10&appid=";
    var APIKEY = "a59b652772e28b82fb2ff69af2f1014c";

        $.ajax({
            method: "GET",
            url: rectangleURL + APIKEY
        }).then(function(response) {
            console.log("response.cnt : " + response.cnt);
            console.log(response.list[5]);
            console.log(+ response.list[5].main.temp);
            
        });



     // *** END OPENWEATHER API *** //   
    //  response (object) > cnt (this is the number of results returned. useful if we want to run a for loop) 
    //  response (object) > list (array) > list[i] > main > temp 
    //  response (object) > list (array) > list[i] > main > humidity
    //  response (object) > list (array) > list[i] > wind > speed
    //  response (object) > list (array) > list[i] > main > temp
    //  response (object) > list (array) > list[i] > rain
    //  response (object) > list (array) > list[i] > snow
    //  response (object) > list (array) > list[i] > clouds > today
    //  response (object) > list (array) > list[i] > main > temp
})
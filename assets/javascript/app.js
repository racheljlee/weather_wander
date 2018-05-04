$(document).ready(function() {
    // **** BEGIN OPENWEATHER API *** //
    var APIKEY = "a59b652772e28b82fb2ff69af2f1014c";

    // * Openweather's Current Weather API
    // * Get Cities by Rectangle Coordinates
    var rectangleURL = "https://api.openweathermap.org/data/2.5/box/city?bbox=-126,25,-66,49,10&appid=";

    // * AJAX call to get Current Weather data
        $.ajax({
            method: "GET",
            url: rectangleURL + APIKEY
        }).then(function(response) {
            console.log("response.cnt : " + response.cnt);
            console.log(response.list[5]);
            console.log("temperature: "+ response.list[5].main.temp);
            console.log("humidity: "+ response.list[5].main.humidity);
            console.log("wind speed: "+ response.list[5].wind.speed);
            console.log("rain: "+ response.list[1100].rain);
            console.log("snow: "+ response.list[1100].snow);
            console.log("clouds today: "+ response.list[5].clouds.today);

            
            
        });
    
        var fiveDayForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml&appid=";

        $.ajax({
            method: "GET",
            url: fiveDayForecastURL + APIKEY
        }).then(function(response) {
            console.log(response)
        });

    // *** END OPENWEATHER API *** //

     // *** USEFUL INFORMATION FROM RECTANGLEURL API *** //   
    //  response (object) > cnt (this is the number of results returned. useful if we want to run a for loop) 
    //  response (object) > list (array) > list[i] > main > temp 
    //  response (object) > list (array) > list[i] > main > humidity
    //  response (object) > list (array) > list[i] > wind > speed
    //  response (object) > list (array) > list[i] > rain
    //  response (object) > list (array) > list[i] > snow
    //  response (object) > list (array) > list[i] > clouds > today
    //  response (object) > list (array) > list[i] > main > temp
})
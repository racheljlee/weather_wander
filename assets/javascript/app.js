$(document).ready(function() {
    // **** CONNECT TO FIREBASE *** //
    var database = firebase.database();

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
    
        // * Openweather's 5-Day Forecast API
        var fiveDayForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml&appid=";
        var city = 

        $.ajax({
            method: "GET",
            url: fiveDayForecastURL + APIKEY
        }).then(function(response) {
            console.log(response)
        });

    // *** END OPENWEATHER API *** //

    // *** GETTING TEMPERATURE VALUE FOR CITIES ***
        // * GET TEMPERATURE VALUE FROM SLIDEBAR. ==> var slideTemp
        // * var slideTempMin = slideTemp - 3; 
        // * var slideTempMax = slideTemp + 3;
        /* for (var i = 0; i < response.cnt; i++) {
                if (response.list[i].main.temp > slideTempMin && response.list[i].main.temp < slideTempMax) {
                    save response.name or response.id into firebase. 
                }
        }
        */ 




    // **** FRONT-END JQUERY **** // 
    var temperatureSliderDiv = $("#temperature-slider");
    temperatureSliderDiv.hide();

    
    // * Temperature Slider slide down animation *
    var thermometerIcon = $("#thermometer-icon");
    thermometerIcon.on("click", function() {
        temperatureSliderDiv.slideDown("slow");
    });

    // * Temperature Slider value in button *
    var slider = $("#myRange");
    var output = $("#temperature");
    output.html(slider.val());

    slider.oninput = function() {
        output.innerHTML = this.value;
      }
})
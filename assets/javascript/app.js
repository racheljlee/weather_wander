$(document).ready(function () {
    // **** CONNECT TO FIREBASE *** //
    var database = firebase.database();
    database.ref("/citiesWithinRange").remove();
    // ** Event Listener for changes to Firebase **
    database.ref("/citiesWithinRange").on("child_added", function (snapshot) {
        var data = snapshot.val() || {};
        console.log("Data: ", data);
        // * reference variables for table cells
        // * creating new cells
        var tbody = $("#citiesWithinRange");
        var tr = $("<tr>");
        var cityTd = $("<td>").text(data.city);
        var stateTd = $("<td>").text(data.city);
        var currentTempTd = $("<td>").text(data.temperature);

        tbody.append(tr);
        tr.append(cityTd);
        tr.append(stateTd);
        tr.append(currentTempTd);
    });

    // **** BEGIN OPENWEATHER API *** //
    var APIKEY = "a59b652772e28b82fb2ff69af2f1014c";

    // * Openweather's Current Weather API
    // * Get Cities by Rectangle Coordinates
    var rectangleURL = "https://api.openweathermap.org/data/2.5/box/city?bbox=-126,25,-66,49,10&units=imperial&appid=";

    // * Temperature Slider value in button *
    var slider = $("#myRange");
    var output = $("#temperature");
    output.html(slider.val());
    slider.on("input", function () {
        output.html(this.value);
    });

    // * AJAX call to get Current Weather data
    $.ajax({
        method: "GET",
        url: rectangleURL + APIKEY
    }).then(function (response) {
        console.log("response.cnt : " + response.cnt);


        //         button click doesn't exist yet. 

        var userTemp = +slider.val();
        var userMin = userTemp - .3;
        var userMax = userTemp + .3;
        var count = 0;

        for (var i = 0; i < response.list.length; i++) {
            var city = response.list[i];
            if (city.main.temp >= userMin && city.main.temp <= userMax) {
                count++;
                // *** SAVE CITY INFORMATION IN FIREBASE ***
                database.ref("/citiesWithinRange").push({
                    "city": city.name,
                    "temperature": city.main.temp
                });

            }
        }
        console.log(count);

        return response;


    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response.list.length; i++) {

        }
        // * Openweather's 5-Day Forecast API
        var fiveDayForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + response.list[5].name + "&appid=";

        $.ajax({
            method: "GET",
            url: fiveDayForecastURL + APIKEY
        }).then(function (response) {
            console.log(response)
        }); // end of AJAX call


    });  // end of AJAX call



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
    temperatureSliderDiv.hide(); // * hides temp chooser div on page load

    // * Temperature Slider slide down animation *
    var thermometerIcon = $("#thermometer-icon");
    var thermometerIconDiv = $(".thermometer-icon");
    var chooseTemperatureDiv = $(".choose-temperature");
    var chooseTemperatureText = $(".choose-tempature-text");
    var temperatureSliderDiv = $("#temperature-slider");

    thermometerIcon.on("click", function () {
        chooseTemperatureDiv.css("opacity", ".8"); // "activates" choose-temperature div's opacity
        temperatureSliderDiv.slideDown("slow");
    });

    // Temperature Button onclick toggle
    var tempButton = $("#temp-btn");
    var jumboDiv = $(".jumbo");
    var slidecontainer = $(".slidercontainer");


    tempButton.on("click", function () {
        jumboDiv.slideUp();
        thermometerIconDiv.slideUp();
        chooseTemperatureText
            .css("margin-top", "-70px");
        temperatureSliderDiv
            .css("padding-top", "10px");
        chooseTemperatureDiv
            .css("padding-bottom", "0px");
    });



    // Cities Cards onclick functions
    $(".card-group").hide();

    $("#forecast-button").on("click", function () {
        $(".card-group").show();
        console.log("I've been clicked");
    }); // end of cities card functions

}); // end of document ready function

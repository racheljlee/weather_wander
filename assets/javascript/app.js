$(document).ready(function () {
    // Initializing FireBase
    var database = firebase.database();
    database.ref("/citiesJustViewed").remove();
    database.ref("/citiesJustViewed").on("child_added", function (snapshot){
        var data = snapshot.val();
        var keys = Object.keys(data);
        console.log("Keys ", keys);
        for(var i=0; i < keys.length; i++){
            var newCityAdded = data[keys[i]] + ", ";
            var newCityAddedSpan = $("<span>");
            newCityAddedSpan.html(newCityAdded);
            $("#newCitiesList").append(newCityAddedSpan);
        }
        
        
        // var keys = data
        // console.log("Keys: ", keys);
    });
    // * Openweather's Current Weather API
    // * Get Cities by Rectangle Coordinates
    var APIKEY = "a59b652772e28b82fb2ff69af2f1014c";
    var rectangleURL = "https://api.openweathermap.org/data/2.5/box/city?bbox=-126,25,-66,49,10&units=imperial&appid=";
    cityCounter = 0;

    // Hiding the temperature slider when starting the app
    var temperatureSliderDiv = $("#temperature-slider");
    temperatureSliderDiv.hide();

    // * Temperature Slider slide down animation *
    var thermometerIcon = $("#thermometer-icon");
    thermometerIcon.on("click", function () {
        temperatureSliderDiv.slideDown("slow");
    });

    // * Temperature Slider value in button *
    var slider = $("#myRange");
    var output = $("#temperature");
    output.html(slider.val());
    slider.on("input", function () {
        output.html(this.value);
    });

    $(".temp-btn").on("click", function () {
        // console.log("I clicked this");
        $("#accordion").empty();
        $.ajax({
            method: "GET",
            url: rectangleURL + APIKEY
        }).then(function (response) {
            // ** CREATING RANGE OF TEMPERATURE FROM SLIDER BAR ***
            var userTemp = +slider.val();
            var userMin = userTemp - .3;
            var userMax = userTemp + .3;
            var count = 0; // KEEPING A COUNT OF ALL CITIES
            var cities = []; // Array of cities within temperature range

            for (var i = 0; i < response.list.length; i++) {
                var city = response.list[i];
                // console.log("city: ",city.name);
                if (city.main.temp >= userMin && city.main.temp <= userMax) {
                    // Calling function to make accordion for each city that is clicked
                    createAccordion(city, count);
                    // Saving city names to an array
                    cities.push(city.name);
                    count++;
                }
            }

            if ($("#cityh3")) {
                $("#cityh3").remove();
            }
            var citiesHeader3 = $(`<h3 id="cityh3">Cities with <span id="slider-value-temp">` + slider.val() + `&deg;F</span> weather:</h3>`);
            $(".city-h2").prepend(citiesHeader3);

            console.log("array of cities matching this temperature: ", cities);
            console.log("city counter: ", count);

            // return cities;
        })
    });

    // ** CREATING ACCORDION TO APPEAR ON DOM **
    function createAccordion(data, cityCounter) {

        // console.log("Data: ", data);
        // *** GENERATING ACCORDION + CARD ***
        var card = $(`<div class="card">`);
        var cardHeader = $(`<div class="card-header">`);
        var cardLink = $(`<a class="card-link" data-toggle="collapse" href="#collapse${cityCounter}" id="cityTab${cityCounter}">`);
        cardLink.attr("data-city", data.name);
        var collapse = $(`<div id="collapse${cityCounter}" data-parent="#accordion" class="collapse">`);

        // *** APPENDING ACCORDION PARTS ***
        $("#accordion").append(card);
        card.append(cardHeader);
        cardHeader.append(cardLink);
        cardLink.append(data.name);
        card.append(collapse);


        var click = true;
        cardLink.on("click", function () {
            if (click === true) {
                $(this).css("color", "#fff");
                click = false; // else
            }
        });


        // console.log("city counter: ", cityCounter);
        // console.log("CardLink ID Value (represents count): ", cardLink.attr("id"));
        // We can use either cityCounter or data.name to get city. In case of data.name, we don't need cities[]. 
    }
    
    // *** CLICKING ON THE CITY NAME TO SHOW 5 DAY FORECAST
    $(document).on("click", ".card-link", function () {
        // console.log("what is this: ", $(this).attr("id"));
        var collapseDivId = $(this).attr("href");
        $(collapseDivId).empty();
        // console.log(collapseDivId);
        var cityName = $(this).attr("data-city");
        console.log("This will be saved to firebase: ", cityName);
        // *** Saving Cities Recently Viewed To Firebase ***



        // database.ref("/citiesWithinRange").on("child_added", function (snapshot) {
        // var data = snapshot.val() || {};
        // var keys = object.keys(data);
        database.ref("/citiesJustViewed").push({
            "recentlyVisited": cityName
        });
        // for(var i = 0; i < keys.length; i++){
        // console.log(data[keys[i]]);
        // console.log("Data: ", data);
        // }
        // });



        // * Openweather's 5-Day Forecast API
        var fiveDayForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +
            cityName + "&units=imperial" + "&appid=";

        $.ajax({
            method: "GET",
            url: fiveDayForecastURL + APIKEY
        }).then(function (response) {
            var cardBody = $(`<div class="card-body">`);
            var row = $(`<div class="row">`);
            var col1 = `<div class="col-md-1">`;
            var col2 = `<div class="col-md-2">`;
            var p = `<p class="card-text"></p>`;
            var button = `<div class="btn btn-info hotelButton" data-cityname=${cityName}>SEE HOTELS IN THE AREA</div>`;
            $(button).attr("data-cityname", cityName);

            $(collapseDivId).append(`<div class="card-body"><h1>FIVE DAY FORECAST</h1></div>`);
            // console.log("FiveDayForecast Response", response.list[5].main.temp);
            // console.log("Length: ", response.list.length);


            $(collapseDivId).append(cardBody);
            cardBody.append(row);

            var leftSpace = $(col1).attr("id", "leftSpace");
            var rightSpace = $(col1).attr("id", "rightSpace");
            row.append(leftSpace);
            var dayCounter = 1;
            // This for loop generates date and temperature for 5 day forecast
            for (var i = 4; i < response.list.length; i = i + 8) {
                var day = $(col2).attr("id", "day" + dayCounter);
                var dayTemp = $(p).attr("id", "dayTemp" + dayCounter);
                var dateTemp = $(p).attr("id", "dateTemp" + dayCounter);
                row.append(day);
                day.append(dayTemp);
                day.append(dateTemp);
                dayTemp.append(response.list[i].main.temp);
                dateTemp.append(response.list[i].dt_txt.substring(0, 10));
                // console.log("Temperature in F: ", response.list[i].main.temp);
                // console.log("Date: ", response.list[i].dt_txt.substring(0, 10));
                dayCounter++;
            }

            row.append(rightSpace);

            cardBody.append(button);
        });
    }); // end of cardlink onclick delegator function

    $(document).on("click", ".hotelButton", function () {
        console.log("Hotel Button Clicked");
        // *** FOURSQUARE API ***
        var queryCity = $(this).attr("data-cityname");
        console.log("city: ", queryCity);
        var clientID = "KKWZ0AZRDFFQZVPRPXDQDFQGKKKVLSSPOIHYG0GXBIKFRRNN";
        var clientSecret = "GQCLHQBZ5OFEWE4430YKBPETWT2535BAJWQW0D0RPYILV5GM";
        var fourSquareURL = "https://api.foursquare.com/v2/venues/explore?&near="
            + queryCity + "&client_id=" + clientID + "&client_secret="
            + clientSecret + "&v=20180508" + "&query=hotels";
        $.ajax({
            method: "GET",
            url: fourSquareURL,
        }).then(function (response) {
            var hotelsList = response.response.groups[0].items;
            for (var i = 0; i < hotelsList.length; i++) {
                // *** This generates a list of all hotels in this city ***
                console.log(hotelsList[i].venue.name);
            }
        });

        // *** MAKE HOTEL ACCORDION HERE ***

    }); // end of AJAX call

    // **** FRONT-END JQUERY **** // 

    var temperatureSliderDiv = $("#temperature-slider");
    temperatureSliderDiv.hide(); // * hides temp chooser div on page load

    var jumboDiv = $(".jumbo");
    var thermometerIcon = $("#thermometer-icon");
    var thermometerIconDiv = $(".thermometer-icon");
    var chooseTemperatureDiv = $(".choose-temperature");
    var chooseTemperatureText = $(".choose-temperature-text");
    var temperatureSliderDiv = $("#temperature-slider");
    var tempButton = $("#temp-btn");
    var slidecontainer = $(".slidercontainer");
    var cityDiv = $("#city-options");

    // * Temperature Slider slide down animation *
    thermometerIcon.on("click", function () {
        chooseTemperatureDiv.css("opacity", ".8"); // "activates" choose-temperature div's opacity
        temperatureSliderDiv.slideDown("slow");
    });


    // Temperature Button onclick toggle
    tempButton.on("click", function () {
        jumboDiv.slideUp();
        thermometerIconDiv.slideUp();
        chooseTemperatureText
            .css("margin-top", "-70px");
        temperatureSliderDiv
            .css("padding-top", "10px");
        chooseTemperatureDiv
            .css("padding-bottom", "0px");
        cityDiv.slideDown("slow");
    });

    // ** SECTION 2: CITIES POPULATE FEATURE **
    // Cities Cards onclick functions
    $(".card-group").hide();

    $("#forecast-button").on("click", function () {
        $(".card-group").show();
        console.log("I've been clicked");
    }); // end of cities card functions
}); // end of document ready function
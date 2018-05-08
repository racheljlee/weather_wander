$(document).ready(function () {
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
        console.log("I clicked this");
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
            if($("#cityh3")){
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
        var cardBody = $(`<div class="card-body">`);
        var row = $(`<div class="row">`);
        var col1 = `<div class="col-md-1">`;
        var col2 = `<div class="col-md-2">`;
        var img = $(`<img class="card-img-top" alt="Card image cap">`);
        img.attr("src", "http://via.placeholder.com/200x150");
        var pTemp = $(`<p class="card-text"></p>`);
        var pDay = $(`<p class="card-text"></p>`);

        // *** APPENDING ACCORDION PARTS ***
        $("#accordion").append(card);
        card.append(cardHeader);
        cardHeader.append(cardLink);
        cardLink.append(data.name);
        card.append(collapse);
        collapse.append(cardBody);
        cardBody.append(row);

        var leftSpace = $(col1).attr("id", "leftSpace");
        var dayOne = $(col2).attr("id", "dayOne");
        var dayTwo = $(col2).attr("id", "dayTwo");
        var dayThree = $(col2).attr("id", "dayThree");
        var dayFour = $(col2).attr("id", "dayFour");
        var dayFive = $(col2).attr("id", "dayFive");
        var rightSpace = $(col1).attr("id", "rightSpace");

        row.append(leftSpace);
        row.append(dayOne);
        row.append(dayTwo);
        row.append(dayThree);
        row.append(dayFour);
        row.append(dayFive);
        row.append(rightSpace);

        var click = "click";
        var click = true;
        cardLink.on("click", function() {
            if (click === true) {
                $(this).css("color", "#fff");
            }
        });

        console.log("city counter: ", cityCounter);
        console.log("CardLink ID Value (represents count): ", cardLink.attr("id"));
        // We can use either cityCounter or data.name to get city. In case of data.name, we don't need cities[]. 
    }

    // *** CLICKING ON THE CITY NAME TO SHOW 5 DAY FORECAST
    $(document).on("click", ".card-link", function () {
        // console.log("what is this: ", $(this).attr("id"));


        // * Openweather's 5-Day Forecast API
        var fiveDayForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + $(this).attr("data-city") + "&appid=";

        $.ajax({
            method: "GET",
            url: fiveDayForecastURL + APIKEY
        }).then(function (response) {
            console.log("Length: ", response.list.length);

            console.log($(this).attr("data-city"));
            var collapseDivId = $(this).attr("href");
            console.log(collapseDivId);
            $(collapseDivId).append(`<div class="card-body">HELLO</div>`)
            // card.collapse.show();


        }); // end of AJAX call
    });

    // *** FOURSQUARE API ***
    var queryCity = "Chicago";
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

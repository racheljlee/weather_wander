$(document).ready(function () {
    var APIKEY = "a59b652772e28b82fb2ff69af2f1014c";
    // * Openweather's Current Weather API
    // * Get Cities by Rectangle Coordinates
    var rectangleURL = "https://api.openweathermap.org/data/2.5/box/city?bbox=-126,25,-66,49,10&units=imperial&appid=";
    // **** CONNECT TO FIREBASE *** //
    var database = firebase.database();
    database.ref("/citiesWithinRange").remove();
    cityCounter = 0;
    // ** Event Listener for changes to Firebase **
    database.ref("/citiesWithinRange").on("child_added", function (snapshot) {
        var data = snapshot.val() || {};
        // console.log("Data: ", data);
        // * reference variables for table cells
        // * creating new cells
        var tbody = $("#citiesWithinRange");
        var tr = $("<tr>");
        var span = $("<span>");
        var cityTd = $("<td>").text(data.city);
        var stateTd = $("<td>").text(data.city);
        var currentTempTd = $("<td>").text(data.temperature);

        tbody.append(tr);
        tr.append(cityTd);
        tr.append(stateTd);
        tr.append(currentTempTd);

        // *** GENERATING ACCORDION + CARD ***
        var card = $(`<div class="card">`);
        var cardHeader = $(`<div class="card-header">`);
        var cardLink = $(`<a class="card-link" data-toggle="collapse" href="#collapse${cityCounter}" id="cityTab${cityCounter}">`);
        var collapse = $(`<div id="collapseOne" class="collapse" data-parent="#accordion">`);
        var cardBody = $(`<div class="card-body">`);
        var row = $(`<div class="row">`);
        var col1 = $(`<div class="col-md-1">`);
        var col2 = $(`<div class="col-md-2">`);
        var img = $(`<img class="card-img-top" alt="Card image cap">`);
        img.attr("src", "http://via.placeholder.com/200x150");
        var pTemp = $(`<p class="card-text"></p>`);
        var pDay = $(`<p class="card-text"></p>`);

        // *** APPENDING ACCORDION PARTS ***
        $("#accordion").append(card);
        card.append(cardHeader);
        cardHeader.append(cardLink);
        cardLink.append(data.city);
        card.append(collapse);
        collapse.append(cardBody);
        cardBody.append(row);
        // row.append(col1);
        // row.append(col2);
        // row.append(col2);
        // row.append(col2);
        // row.append(col2);
        cityCounter++;
    });

    $(document).on("click", ".card-link", function () {
        $(this).attr("id");


    });

    $(".temp-btn").on("click", function () {
        console.log("I clicked this");
        $.ajax({
            method: "GET",
            url: rectangleURL + APIKEY
        }).then(function (response) {
            // .then #1
            // console.log("response.cnt : " + response.cnt);
            // ** CREATING RANGE OF TEMPERATURE FROM SLIDER BAR ***
            var userTemp = +slider.val();
            var userMin = userTemp - .3;
            var userMax = userTemp + .3;
            var count = 0; // KEEPING A COUNT OF ALL CITIES
            var cities = [];
            for (var i = 0; i < response.list.length; i++) {
                var city = response.list[i];
                if (city.main.temp >= userMin && city.main.temp <= userMax) {
                    count++;
                    // *** SAVE CITY INFORMATION INTO AN ARRAY ***
                    cities.push(city);

                }
            }
            // console.log(count);

            return cities;


        }).then(function (cities) {
            // .then #2
            // console.log(cities);
            for (var i = 0; i < cities.length; i++) {
                console.log("Name", cities[i].name)
                // FOR LOOP IS EMPTY  
            }
            // * Openweather's 5-Day Forecast API
            // var fiveDayForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + xxxx + "&appid=";

            // $.ajax({
            //     method: "GET",
            //     url: fiveDayForecastURL + APIKEY
            // }).then(function (response) {
            //     //  console.log(response)
            //     console.log("test", response.list.name);
            // }); // end of AJAX call

        });  // end of AJAX call
    });

    // **** BEGIN OPENWEATHER API *** //

    // * AJAX call to get Current Weather data



    // **** FRONT-END JQUERY **** // 

    var temperatureSliderDiv = $("#temperature-slider");
    temperatureSliderDiv.hide(); // * hides temp chooser div on page load


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

    // Button click that takes us to hotel info doesn't exist yet. HOTELS API GOES HERE.   

    // Cities Cards onclick functions
    $(".card-group").hide();

    $("#forecast-button").on("click", function () {
        $(".card-group").show();
        // console.log("I've been clicked");
    }); // end of cities card functions

}); // end of document ready function

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
            var cities = [];
            for (var i = 0; i < response.list.length; i++) {
                var city = response.list[i];
                if (city.main.temp >= userMin && city.main.temp <= userMax) {
                    count++;
                    // Calling function to make accordion for each city that is clicked
                    var card = createAccordion(city, i);
                }
            }
            console.log(count);
            return cities;
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
        cardLink.append(data.name);
        card.append(collapse);
        collapse.append(cardBody);
        cardBody.append(row);
        row.append(col1);
        row.append(col2);
        row.append(col2);
        row.append(col2);
        row.append(col2);
        row.append(col2);
        row.append(col1);

        return card;
    }

    // *** CLICKING ON THE CITY NAME TO SHOW 5 DAY FORECAST
    $(document).on("click", ".card-link", function () {
        // console.log("what is this: ", $(this).attr("id"));
        console.log($(this).attr("data-city"));
        // card.collapse.show();
        
        // * Openweather's 5-Day Forecast API
        var fiveDayForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + $(this).attr("data-city") + "&appid=";
        
        $.ajax({
            method: "GET",
            url: fiveDayForecastURL + APIKEY
        }).then(function (response) {
            console.log("Length: ", response.list.length);
            // console.log("list 5 dt txt: ", response.list[5].dt_txt);
            for (var i = 4; i < response.list.length; i = i + 8) {
                console.log("i is: ", i);
                console.log("list [i] dt txt: ", response.list[i].dt_txt);
                console.log(response.list[i].dt_txt.substring(0, 10));
            }

            cardLink.append(collapse);
            collapse.append(cardBody);
            cardBody.append(row);


        }); // end of AJAX call
    });

    // *** FOURSQUARE API ***
    var clientID = "KKWZ0AZRDFFQZVPRPXDQDFQGKKKVLSSPOIHYG0GXBIKFRRNN";
    var clientSecret = "GQCLHQBZ5OFEWE4430YKBPETWT2535BAJWQW0D0RPYILV5GM";
    var fourSquareURL = "https://api.foursquare.com/v2/venues/search?";
    var newURL = "https://api.foursquare.com/v2/venues/explore?&near=Chicago&client_id=" 
                + clientID + "&client_secret=" + clientSecret + "&v=20180508" + "&query=hotels";
    $.ajax({
        method: "GET",
        url: newURL,
        dataType: 'json',
        // data: 'limit=5' +
        //         'near=' + "Chicago,IL" +
        //         '&?client_id=' + clientID +
        //         '&client_secret=' + clientSecret +
        //         '&v=20180508' +
        //         '&query=' + "hotels"
        
    }).then(function (response) {
        // console.log("fourSquareURL response: ", response);
        // console.log("names of hotels", response.groups[0].items[7].venue.name);
    });

}); // end of document ready function

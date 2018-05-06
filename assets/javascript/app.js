$(document).ready(function () {
    // **** CONNECT TO FIREBASE *** //
    var database = firebase.database();

    database.ref().on("value", function (snapshot) {
        var data = snapshot.val();
        console.log(data);
        // push ({
        //     task: "Hello",
        //     id: "world"
        // });
        
       
        // database.ref().push({
        //     task: "Rachel", 
        //     id: "UIUC"            
        // });
       
    });

    // **** BEGIN OPENWEATHER API *** //
    var APIKEY = "a59b652772e28b82fb2ff69af2f1014c";

    // * Openweather's Current Weather API
    // * Get Cities by Rectangle Coordinates
    var rectangleURL = "https://api.openweathermap.org/data/2.5/box/city?bbox=-126,25,-66,49,10&appid=";

    // * AJAX call to get Current Weather data
    $.ajax({
        method: "GET",
        url: rectangleURL + APIKEY
    }).then(function (response) {
        console.log("response.cnt : " + response.cnt);
        // console.log(response.list[5]);
        // console.log("temperature: "+ response.list[5].main.temp);
        // console.log("humidity: "+ response.list[5].main.humidity);
        // console.log("wind speed: "+ response.list[5].wind.speed);
        // console.log("rain: "+ response.list[1100].rain);
        // console.log("snow: "+ response.list[1100].snow);
        // console.log("clouds today: "+ response.list[5].clouds.today);

        // *** GETTING TEMPERATURE VALUE FOR CITIES ***
        // * GET TEMPERATURE VALUE FROM SLIDEBAR. ==> var slideTemp

        // * reference variables for table cells
        // * creating new cells
        var tbody = $("tbody");
        var tr = $("<tr>");
        var cityTd = $("<td>");
        var stateTd = $("<td>");
        var currentTempTd = $("<td>");
        // * temperature range +-3
        // var slideTempMin = slideTemp - 3;
        // var slideTempMax = slideTemp + 3;
        var pageResults = 0;
        for (var i = 0; i < 50; i++) {
            // console.log("for loop is running");
            // if (response.list[i].main.temp > slideTempMin && response.list[i].main.temp < slideTempMax) {
            // cityTd.text(response.list[i].name);
            // stateTd.text(response.list[i].name);
            // currentTempTd.text(response.list[i].name);
            if (response.list[i].main.temp > 18 && response.list[i].main.temp < 22) {

                // console.log(response.list[i].name);
                console.log("City Name: " + response.list[i].name);
                console.log("Temp within range: " + response.list[i].main.temp);
            }
            // pageResults++;
            // if (pageResults > 20) {
            //     i = response.cnt;
            //     pageResults = 0;
            //     // break;
            // }
            tbody.append(tr);
            tr.append(cityTd);
            tr.append(stateTd);
            tr.append(currentTempTd);
        }
    });




    // * Openweather's 5-Day Forecast API
    // var fiveDayForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=London,us&appid=";
    // // var city = response.list[i].

    //     $.ajax({
    //         method: "GET",
    //         url: fiveDayForecastURL + APIKEY
    //     }).then(function (response) {
    //         console.log(response)
    //     });

    // *** END OPENWEATHER API *** //





    // **** FRONT-END JQUERY **** // 
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

    slider.oninput = function () {
        output.innerHTML = this.value;
    }
});


// * THINGS WE NEED TO FIX: 
// ** Get the slider to show changing values
// ** Get the list of city names and tempertaure to populate the cities table 
// ** Save city names and temperatures to firebase (Find out what needs to be saved in FireBase)
// ** Check if data retrieved is for current date and time. 
// ** How do we get name of State from API ? 
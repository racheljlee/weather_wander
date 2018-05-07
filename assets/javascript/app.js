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
    var rectangleURL = "https://api.openweathermap.org/data/2.5/box/city?bbox=-126,25,-66,49,10&appid=";

    // * AJAX call to get Current Weather data
    $.ajax({
        method: "GET",
        url: rectangleURL + APIKEY
    }).then(function (response) {
        console.log("response.cnt : " + response.cnt);
        // *** GETTING TEMPERATURE VALUE FOR CITIES ***
        for (var i = 0; i < 500; i++) {
            var currentCity = response.list[i];
            // Testing with temperature range from 18 to 22. This will change with slider temperature value. 
            if (currentCity.main.temp > 18 && currentCity.main.temp < 22) {

                console.log("Pulling data for temperature range between 18 and 22. Test Case.");
                console.log("City Name: " + currentCity.name);
                console.log("Temp within range: " + currentCity.main.temp);

                // *** SAVE CITY INFORMATION IN FIREBASE ***
                database.ref("/citiesWithinRange").push({
                    "city": currentCity.name,
                    "temperature": currentCity.main.temp
                });
            }
        }
    });

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
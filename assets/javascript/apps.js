$(document).ready(function() {
    // // http://api.openweathermap.org/data/2.5/box/city?bbox=-126,25,-66,49,10&appid=4a69e3319a5272bdcee56b147d64



    var cityURL = "https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=";
    var rectangleURL = "https://api.openweathermap.org/data/2.5/box/city?bbox=-126,25,-66,49,10&appid=";
    var APIKEY = "a59b652772e28b82fb2ff69af2f1014c";

        $.ajax({
            method: "GET",
            url: rectangleURL + APIKEY
        }).then(function(response) {
            console.log(response);
            $("#testDiv").text(JSON.stringify(response));
        });
})
$(document).ready(function() {

    var API_KEY = "4a69e3319a5272bdcee56b147d64";
    var requestUrl = "http://api.openweathermap.org/data/2.5/box/city?bbox=-126,25,-66,49,10&appid=" + API_KEY;


    // http://api.openweathermap.org/data/2.5/box/city?bbox=-126,25,-66,49,10&appid=4a69e3319a5272bdcee56b147d64

    $.ajax({
        method: "GET",
        url: requestUrl
    }).then(function (response) {
           console.log(response);
    });
})
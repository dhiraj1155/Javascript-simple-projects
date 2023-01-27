const express = require("express");

const https = require("https");  // https is used to making get request from another server. 

const app = express();

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html")


})

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "ec1d8b306643d1b946a8adb8d2218409";
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);  // converts the format of data to JSON format
            console.log(weatherData);
            const temp = weatherData.main.temp; // we can specifically display the data we want by copying JSON format description
            console.log(temp);

            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription);
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@3x.png";

            res.write("<p>the weather is currently " + weatherDescription + "</p>");    // we cannot send more than one res.send so we can use res.write to send multiple inputs.
            res.write("<h1>the temperature in " + query + " is " + temp + "degree celcius</h1>")
            res.write("<img src=" + imgURL + "/>");
            res.send();
        })
    })

})





app.listen(3000, function () {
    console.log("server is running at port 3000");
})



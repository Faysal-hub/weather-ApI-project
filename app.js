const express = require('express');
const https = require('https');

const app = express();
const port = 3000;

app.get('/', function(req, res){

  const url = "https://api.openweathermap.org/data/2.5/weather?q=berlin&appid=242e55843e7bbdd4727635d23abb337f&units=metric"

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/"+ icon+ "@2x.png"
      res.write("<p>The weather is currently " + weatherDescription + "<p>");
      res.write("<h1>The temperature in Berlin is " + temp + " degrees Celcius.<h1>");
      res.write("<img src=" + imageURL + ">");
      res.send()
    })
  })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

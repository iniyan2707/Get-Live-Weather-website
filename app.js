
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

  const query = req.body.cityName;
  const apiKey = "4704e7402ceac67ca508dec802e79d65";
  const unit = "metric";

  const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+apiKey+"&units="+unit;
  https.get(url,function(response){

    response.on("data",function(data){
      var weatherData = JSON.parse(data);
      var temp = weatherData.main.temp;
      var weatherDescription = weatherData.weather[0].description;
      var icon = weatherData.weather[0].icon;

      var imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p>The weather is "+weatherDescription+"<p>");
      res.write("<h1>The temperature in "+ query+ " is " + temp + " degree Celsius</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });

  });



});

app.listen(3000,function(){
  console.log("Server is running at port 3000");

});

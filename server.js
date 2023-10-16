const express = require('express');
const axios = require('axios');
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index",{ weather: null, error: null });
})
// weather route, city from query parameter

app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const apiKey = "ae6bd998fab50ea008454b9f3975d694";
    const APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    let weather;
    let error = null;
  
    try {
      const response = await axios.get(APIurl);
      weather = response.data;
    } catch (error) {
      weather = null;
      error = "There's been an error. Please try again later.";
    }
  
    res.render("index", { weather, error });
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

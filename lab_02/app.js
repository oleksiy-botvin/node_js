const apiKey = '450a15ed28af61c120161541be442858';
const express = require('express');
const app = express();
const hbs = require("hbs");
const cities = getCities();



app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper("equals", (a, b, opts) => a === b ? opts.fn(this) : opts.inverse(this));

app.get('/', (req, res) => {
    res.render('home.hbs')
})

app.get('/weather(/:city?)', async (req,  res) => {
    let cityName = req.params.city;
    if (!cityName) cityName = req.query.city;

    let item = cities.find((it) => it.name === cityName || it.id === cityName);
    if (!item) {
        res.redirect(`/weather/${cities[0].id}`)
        return
    }
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${item.id}&units=metric&appid=${apiKey}`);
    const result = await response.json()

    res.render('weather.hbs', {
        selectCity: item,
        cities: cities,
        weather: {
            iconId: result.weather[0].icon,
            iconDescription: result.weather[0].description,
            temp: result.main.temp,
            tempMin: result.main.temp_min,
            tempMax: result.main.temp_max,
            humidity: result.main.humidity,
            pressure : result.main.pressure,
            windSpeed : result.wind.speed
        },
    })
})

app.get('*', (req, res) => {
    res.render('not_found.hbs')
})

app.listen(3000, () => {
    console.log("Example app listening on port 3000")
})

function getCities() {
    try {
        const cities = JSON.parse(require('fs').readFileSync("files/cities.json", "utf-8"));
        return cities ? cities : []
    } catch (e) {
        return []
    }
}
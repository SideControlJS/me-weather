const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;
const API_KEY = process.env.API_KEY;

// Endpoint to fetch weather data by city
app.get('/weather', async (req, res) => {
    const { city } = req.query;

    try {
        // Get coordinates from city name
        const coordinatesResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'imperial'
            }
        });

        const { lat, lon } = coordinatesResponse.data.coord;

        // Fetch detailed weather forecast
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: 'imperial'
            }
        });

        res.json(weatherResponse.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

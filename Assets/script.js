/*
When the page is loaded: 
    Load previously searched cities from local storage and display them on the screen
*/
const apiKey = "fac3ce4e16d62b97d0cda9c7fffe6a28";

document.addEventListener("DOMContentLoaded", function(){
    //load previously searched cities when the page loads

    loadSearchedCities();

    //event listener for search button click
    document.getElementById("searchButon").addEventListener("click", function() {
        const city = document.getElementById("cityInput").value;
        fetchCoordinates(city);
    });
});


function fetchCoordinates(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const lat = data.coord.lat;
            const lon = data.coord.lon;
            fetchWeatherInformation(lat, lon, city);
            addCityToSearchHistory(city);
        });
}

function fetchWeatherInformation(lat, lon, city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data.list[0], city);
            display5DayForecast(data.list.slice(1, 6));
        });
}

function displayCurrentWeather(currentWeather, city) {
    const temperature = currentWeather.main.temp;
    const wind = currentWeather.wind.speed;
    const humidity = currentWeather.main.humidity;
    const iconCode = currentWeather.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

    document.getElementById("currentCityAndDate").innerText= `Weather Details for ${city} on ${new Date().toLocaleDateString()}`;
    const tableHTML = `
        <tr>
            <td>Temerature</td>
            <td>${temperature}°F</td>
        </tr>
        <tr>
            <td>Wind</td>
            <td>${wind} MPH</td>
        </tr>
        <tr>
            <td>Humidity<.td>
            <td>${humidity}%</td>
        </tr>
        <tr>
            <td>Icon</td>
            <td><img src="${iconUrl}" alt="Weather Icon"></td>
        </tr> 
    `;
    document.getElementById("currentWeatherTable").innerHTML = tableHTML;
}

function display5DayForecast(forecastData) {
    const weatherCardsContainer = document.getElementById("weatherCards");
    weatherCardsContainer.innerHTML = "";

    forecastData.forEach(day => {
        const temperature = day.main.temp;
        const wind = day.wind.speed;
        const humidity = day.main.humidity;
        const iconCode = day.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

        const card = `
        <div class="card m-2" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${new Date(day.dt_txt).toLocaleDateString()}</h5>
          <img src="${iconUrl}" alt="weather-icon">
          <p class="card-text">Temperature: ${temperature}°F</p>
          <p class="card-text">Wind: ${wind} MPH</p>
          <p class="card-text">Humidity: ${humidity}%</p>
        </div>
      </div>
        `;
        weatherCardsContainer.innerHTML += card;
    });
}



//const apiKey = "fac3ce4e16d62b97d0cda9c7fffe6a28";

/* Open Weather API call: `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}` */

/*
When the search button is clicked:
    Get the city name from the input box.
    Call a function to fetch the coordinates for this city.

Function to fetch coordinates of a city:
    Make an HTTP request to the Geocoding API with the city name.
    IF the response contains data:
        Extract latitude and longitude from the response.
        Call a function to fetch weather information usign these coordinates
        Add the city to the search history.

Function to fetch weather information:
    Make an HTTP request to the Wather Forecast API using the latitude and longitude.
    IF the response contains data:
        Extract the required weather details from the response.
        Update the user interface with current and future weather condtions.

Function to add a city to the search history:
    IF the cit is not already in the history:
        Add the city to local storage.
        Display the city on the user interface under the search history.

When a previously searched city is clicked:
    Call the function to fetch coordinates for this city (which will fetch weather info.)

*/


/*
When the page is loaded: 
    Load previously searched cities from local storage and display them on the screen

When the search button is clicked:
    Get the city name from the input box.
    Call a function to fetch the coordinates for this city.

Function to fetch coordinates of a city:
    Make an HTTP request to the Geocoding API with the city name.
    IF the response contains data:
        Extract latitude and longitude from the response.
        Call a function to fetch weather information usign these coordinates
        Add the city to the search history.




















*/
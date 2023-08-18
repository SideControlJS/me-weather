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


// Add console.log to check to see if our code is working.
console.log("working");


let map = (L
    .map('mapid', {
        center: [34.0522, -118.2437],
        zoom: 5
    }));

// let tile_url = 'https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/{z}/{x}/{y}.png?access_token={accessToken}';
let tile_url = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}';
// let tile_url = 'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}';
// let tile_url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';

let streets = L.tileLayer(tile_url, {
    attribution: 'Map data %copy;  <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // maxZoom: 5,

    // Different styles:
    // id: 'mapbox.streets',
    // id: 'mapbox.wheatpaste',
    // id: 'mapbox.comic',
    // id: 'mapbox.pirates',
    // id: 'satellite-streets-v11',
    accessToken: API_KEY
});

streets.addTo(map);

// Get data from cities.js
let cityData = cities;
cityData.forEach(function (city) {
    console.log(city);

    L
        .circleMarker(city.location, {
            radius: city.population / 100000
        })
        .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3> Population " + city.population.toLocaleString() + "</h3>")
        .addTo(map);

})
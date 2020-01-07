// Add console.log to check to see if our code is working.
console.log("working");


// let tile_url = 'https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/{z}/{x}/{y}.png?access_token={accessToken}';
let tile_url = 'https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}';
// let tile_url = 'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}';
// let tile_url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';

let light = L.tileLayer(tile_url, {
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
// We create the dark view tile layer that will be an option for our map.
let night = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Create a base layer that holds both maps.
let baseMaps = {
    Light: light,
    Night: night
};

// Create the map object with center and zoom level.
let map = L.map('mapid', {
    // center: [30, 30],
    center: [44.0, -80.0],
    zoom: 2,
    layers: [light]
});

L.control.layers(baseMaps).addTo(map);

// streets.addTo(map);

let torontoData = 'https://raw.githubusercontent.com/theredpea/mapping_earthquakes/Mapping_GeoJSON_Linestrings/torontoRoutes.json';
// Grabbing our GeoJSON data.
d3.json(torontoData).then(function (data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
        style: {
            color: "#ffffa1",
            weight: 2
        }

    }).addTo(map);
});
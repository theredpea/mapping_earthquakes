// Add console.log to check to see if our code is working.
console.log("working");


let map = (L
    .map('mapid', {
        // center: [34.0522, -118.2437],
        // center: [36.1733, -120.1794],
        center: [36.6213, -122.3790],
        // zoom: 7
        zoom: 5
    }));

// let tile_url = 'https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/{z}/{x}/{y}.png?access_token={accessToken}';
// let tile_url = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}';
let tile_url = 'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}';
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

// Coordinates for each point to be used in the line.
// let line = [
//     [33.9416, -118.4085],
//     [37.6213, -122.3790]
// ];

// let line = [
//     [33.9416, -118.4085],
//     [37.6213, -122.3790],
//     [40.7899, -111.9791],
//     [47.4502, -122.3088]
// ];
let line = [
    [37.6213, -122.3790],
    [30.1975, -97.6664],
    [43.6777, -79.6248],
    [40.6413, - 73.7781]
];
// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
    color: "cyan",
    // style: 'dotted',
    dashArray: '20 20'
}).addTo(map);
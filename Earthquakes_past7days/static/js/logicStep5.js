// Add console.log to check to see if our code is working.
console.log("working");


// let tile_url = 'https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/{z}/{x}/{y}.png?access_token={accessToken}';
let tile_url = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}';
// let tile_url = 'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}';
// let tile_url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';

var noWrap = true;

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
    accessToken: API_KEY,
    noWrap: noWrap
});
// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    noWrap: noWrap
});

let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    noWrap: noWrap
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    "Satellite Streets": satelliteStreets,
    "Light": light,

};

let earthquakesLayer = L.layerGroup();

let tectonicLayer = L.layerGroup();

let overlays = {
    Earthquakes: earthquakesLayer,
    "Tectonic Plates": tectonicLayer
};
// Create the map object with center and zoom level.
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 5,
    layers: [streets]
});

L.control.layers(baseMaps, overlays).addTo(map);

// streets.addTo(map);

let earthquake7DayUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';


// Grabbing our GeoJSON data.
d3.json(earthquake7DayUrl).then(function (data) {
    console.log(data);
    // This function determines the color of the circle based on the magnitude of the earthquake.
    function getColor(magnitude) {
        if (magnitude > 5) {
            return "#ea2c2c";
        }
        if (magnitude > 4) {
            return "#ea822c";
        }
        if (magnitude > 3) {
            return "#ee9c00";
        }
        if (magnitude > 2) {
            return "#eecc00";
        }
        if (magnitude > 1) {
            return "#d4ee00";
        }
        return "#98ee00";
    }

    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }
    // This function determines the radius of the earthquake marker based on its magnitude.
    // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        // We set the style for each circleMarker using our styleInfo function.
        style: styleInfo,
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`Magnitude: ${feature.properties.mag} <br>Location: ${feature.properties.location}`)
        }
    }).addTo(earthquakesLayer);

    earthquakesLayer.addTo(map);

    let legend = L.control({
        position: 'bottomright'
    });

    // Then add all the details for the legend.
    legend.onAdd = function () {
        let div = L.DomUtil.create("div", "info legend");
        const magnitudes = [0, 1, 2, 3, 4, 5];
        const colors = [
            "#98ee00",
            "#d4ee00",
            "#eecc00",
            "#ee9c00",
            "#ea822c",
            "#ea2c2c"
        ];
        // Looping through our intervals to generate a label with a colored square for each interval.
        for (var i = 0; i < magnitudes.length; i++) {
            console.log(colors[i]);
            div.innerHTML +=
                "<i style='background: " + colors[i] + "'></i> " +
                magnitudes[i] + (magnitudes[i + 1] ? "–" + magnitudes[i + 1] + "<br>" : "+");
        }
        return div;

    };

    legend.addTo(map);
});

let tectonicUrl = 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json';


// Grabbing our GeoJSON data.
d3.json(tectonicUrl).then(function (data) {

    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 0,
            color: "red",
            stroke: true,
            weight: 2,

        };
    }
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
        // We set the style for each circleMarker using our styleInfo function.
        style: styleInfo,
    }).addTo(tectonicLayer);

    tectonicLayer.addTo(map);

});
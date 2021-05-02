// Create API Endpoint
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


d3.json(queryUrl, function(data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    function onEachFeature(feature,layer) {
        layer.bindPopup("<h3>" + feature.properties.place + 
        "</h3><hr><p>" + new Date(feature.properties.time) + 
        "</p>" + "</h3><hr><p>Magnitude: " + feature.properties.mag+ "</p>");
    }

    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
          var color;
          var r = 255;
          var g = Math.floor(255-80*feature.properties.mag);
          var b = Math.floor(255-80*feature.properties.mag);
          color= "rgb("+r+" ,"+g+","+ b+")"
          
          var geojsonMarkerOptions = {
            radius: 4*feature.properties.mag,
            fillColor: color,
            color: "black",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
          };
          return L.circleMarker(latlng, geojsonMarkerOptions);
        }
});
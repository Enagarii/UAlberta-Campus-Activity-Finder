var map = L.map('map').setView([53.5245, -113.525], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 25,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// var map = L.map('map').setView([53.5232, -113.5263], 13); 

// var bounds = [
//     [53.3, -113.8], // Southwest corner
//     [53.7, -113.2]  // Northeast corner
// ];
// map.setMaxBounds(bounds);
// map.on('drag', function () {
//     map.panInsideBounds(bounds, { animate: false });
// });

let marker = L.marker([53.528185474855846, -113.53000320615703]).addTo(map);
let marker_arr = [marker];

// Listen for the mousemove event
map.on('mousemove', function(e) {
    // e.latlng contains the latitude and longitude of the mouse position
    var lat = e.latlng.lat;
    var lon = e.latlng.lng;
    //console.log('Mouse coordinates: ' + lat + ', ' + lon);
});

// Make the marker
map.on('click', function(e) {
    // make a marker
    console.log("CLICK!");
    var lat = e.latlng.lat;
    var lon = e.latlng.lng;
    console.log('Mouse coordinates: ' + lat + ', ' + lon);
    marker.setLatLng([e.latlng.lat, e.latlng.lng]);    
});
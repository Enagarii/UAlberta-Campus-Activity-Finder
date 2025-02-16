var map = L.map('map').setView([53.5245, -113.525], 16);

var lat = null
var lon = null

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

// Make the marker
map.on('click', function(e) {
    // make a marker
    lat = e.latlng.lat;
    lon = e.latlng.lng;
    marker.setLatLng([e.latlng.lat, e.latlng.lng]);    
});

createEventButton.addEventListener("click", createEvent);

function createEvent()
{  
    // Log the lat and lon and event clicked
    console.log("Create event clicked");
    console.log('Mouse coordinates: ' + lat + ', ' + lon);

    // Check if the lat and lon are null (default)
    if (lat != null && lon != null)
    {
        sendData({"lat": lat, "lon": lon});
    }
}

window.addEventListener("load", refreshPage);

function refreshPage()
{
    console.log("Refreshed.");
    getData();
}

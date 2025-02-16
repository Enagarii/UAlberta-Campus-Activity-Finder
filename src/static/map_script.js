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

let marker_arr = [];
marker = L.marker([53.52173731864776, -113.53026918095853]).addTo(map);

// Make the marker
map.on('click', function(e) {
    // make a marker
    lat = e.latlng.lat;
    lon = e.latlng.lng;
    marker.setLatLng([e.latlng.lat, e.latlng.lng]);
});

document.addEventListener("click", function (e) {
    // See if any popups are open
    let json_event = { event: false };
    for (let i = 0; i < marker_arr.length; ++i) {
        // Change the Event on the left of the screen
        if (marker_arr[i].marker.isPopupOpen()) {
            json_event = { event: true, title: marker_arr[i].title };
        }
    }

    fetch('/api/desc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: json_event })  // Send the message as JSON
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.reply);
        updateEvent();
    })
    .catch(error => console.error('Error:', error));
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

    // Fetch the markers from the json file
    fetch('static/JSON/events.json')
    .then(response => response.json())
    .then(data => {
        console.log("REFRESH FETCH !!");
        console.log(data);
        marker_arr = [];
        console.log("LENGTH: " + data.length);
        for (var i = 0; i < data.length; ++i) {
            console.log(lat, lon);

            let i_marker = L.marker([data[i].lat, data[i].lon]).addTo(map).bindPopup('Marker: ' + i);
            marker_arr.push({
                "marker": i_marker,
                "title": "Marker " + i
            });
        }
    })
    .catch(error => console.error('Error loading markers:', error));
}
var map = L.map('map', {
    zoomControl: false
}).setView([53.5245, -113.525], 16);
L.control.zoom({ position: 'topright' }).addTo(map);

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
            json_event = Object.assign({}, marker_arr[i]);
            json_event["marker"] = undefined;
            json_event["event"] = true;
        }
    }

    // Send the current clicked marker to Flask to parse into json
    fetch('/api/desc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: json_event })  // Send the message as JSON
    })
    .then(response => response.json())
    .then(data => {
        // Wait till after updating the json to update the current event container
        updateEvent();
    })
    .catch(error => console.error('Error:', error));
});

// Create Event Button -> first check if all the data is filled out
createEventButton.addEventListener("click", createEvent);
function createEvent()
{  
    // Check the data in create event
    let valid_input = true;

    for (let i = 0; i < registerContent.children.length; ++i) {
        // Make sure it is a required div
        let reqdiv = registerContent.children[i];
        if (reqdiv.tagName.toLowerCase() != "div" || !reqdiv.classList.contains("required")) continue;

        // Check the inputs of that div
        let filled = true;
        for (let j = 0; j < reqdiv.children.length; ++j) {
            if (reqdiv.children[j].value == "") {
                valid_input = false;
                filled = false;
            }
        }

        console.log(filled);

        if (filled) reqdiv.classList.remove("error");
        else {
            reqdiv.classList.add("error");
            valid_input = false;
        }
    }

    updateEventContents();

    if (lat == null || lon == null) valid_input = false;
    if (!valid_input) return;

    // Log the lat and lon and event clicked
    console.log("Create event clicked");
    console.log('Mouse coordinates: ' + lat + ', ' + lon);

    let new_event = {"lat": lat, "lon": lon};
    for (let i = 0; i < registerContent.children.length; ++i) {
        let propdiv = registerContent.children[i];
        if (propdiv.tagName.toLowerCase() != "div" || !propdiv.classList.contains("event_input")) continue;
        new_event[propdiv.id] = "";
        for (let j = 0; j < propdiv.children.length; ++j) {
            if (propdiv.children[j].value != undefined) new_event[propdiv.id] += propdiv.children[j].value;
        }
    }

    // Check if the lat and lon are null (default)
    if (lat != null && lon != null)
    {
        sendData(new_event);
    }
    refreshPage();
    toggleRegisterBar();
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

        // Reset the markers
        for (let i = 0; i < marker_arr.length; ++i) {
            marker_arr[i].marker.remove();
        }

        marker_arr = [];
        console.log("LENGTH: " + data.length);
        for (var i = 0; i < data.length; ++i) {
            console.log(lat, lon);

            let i_marker = {"marker": L.marker([data[i].lat, data[i].lon]).addTo(map).bindPopup(data[i].title == undefined ? "Activity :D" : data[i].title)};

            // Check the contents
            if (data[i].title == undefined) i_marker["title"] = "NA";
            else i_marker["title"] = data[i].title;

            if (data[i].location == undefined) i_marker["location"] = "NA";
            else i_marker["location"] = data[i].location;

            if (data[i].time == undefined) i_marker["time"] = "NA";
            else i_marker["time"] = data[i].time;

            if (data[i].description == undefined) i_marker["description"] = undefined;
            else i_marker["description"] = data[i].description;

            marker_arr.push(i_marker);
        }
    })
    .catch(error => console.error('Error loading markers:', error));
}

// var marker = L.marker([53.52173731864776, -113.53026918095853]
//     {title: 'Dice'}.addTo(map)
//     .bindPopup('This is where the event is'));
// Initialize the Map

const bounds = L.latLngBounds(
    L.latLng(53.50507395114981, -113.55021677883585),   //SW
    L.latLng(53.537181589312924, -113.50538779321799)    //NE
);

let map = L.map('map', {
    zoomControl: false,
    maxBounds: bounds,          // Restrict panning to bounds
    maxBoundsViscosity: 1.0,    // Prevents moving outside of the bounds
    minZoom: 15
}).setView([53.5245, -113.525], 16);
L.control.zoom({ position: 'topright' }).addTo(map);

let lat = null;
let lon = null;

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


let marker_arr = [];
let consolidatedMarkers = [];
marker = L.marker([53.52173731864776, -113.53026918095853]).addTo(map);
//marker.remove();

// Make the marker
map.on('click', function(e) {
    // make a marker
    lat = e.latlng.lat;
    lon = e.latlng.lng;
    marker.setLatLng([e.latlng.lat, e.latlng.lng]);
});

document.addEventListener("click", function (e) {
    // See if any popups are open
    let group_events = [];
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

    sendData(new_event);
    refreshPage();
    toggleRegisterBar();
    cleanEventRegister();
}

window.addEventListener("load", refreshPage);

function refreshPage()
{
    getData();

    // Fetch the markers from the json file
    fetch('static/JSON/events.json')
    .then(response => response.json())
    .then(data => {

        // Get the abs distance of the lat and lon by summing the square of each
        let distance = [];
        for (let i = 0; i < data.length; ++i)
        {
            distance.push([(data[i].lat * data[i].lat) + (data[i].lon * data[i].lon), i]);
        }

        distance.sort();
        //console.log(distance)
        // Add everything that is within 0.20 distance in an array and find the center of them to display one marker
        consolidatedMarkers = [];
        currentDistanceIndex = 0;
        let currentConsolidation = [distance[currentDistanceIndex]];

        for (let i = 1; i < distance.length; ++i)
        {
            if (Math.abs(distance[currentDistanceIndex][0] - distance[i][0]) <= 0.20) 
            {
                //console.log("Pushing new distance" + i);
                currentConsolidation.push(distance[i]);
                
            }
            else 
            {
                //console.log(currentConsolidation);
                consolidatedMarkers.push(currentConsolidation);
                currentDistanceIndex = i;
                currentConsolidation = [distance[currentDistanceIndex]];
            }
        }
        consolidatedMarkers.push(currentConsolidation)
        console.log(consolidatedMarkers);

        // Reset the markers
        for (let i = 0; i < marker_arr.length; ++i) {
            marker_arr[i].marker.remove();
        }

        // Sort the array based on time
        let time_arr = [];
        for (let i = 0; i < data.length; ++i) {
            time_arr.push([new Date(data[i].start_time), new Date(data[i].end_time), i]);
        }
        time_arr.sort();

        // Reset the CurrentContent and Upcoming Content
        while (upcomingContent.children.length > 0) upcomingContent.children[0].remove();
        while (currentContent.children.length > 0) currentContent.children[0].remove();

        new_obj = [];
        let now = new Date();
        for (let i = 0; i < time_arr.length; ++i) {
            if (time_arr[i][1] < now) continue;
            new_obj.push(data[time_arr[i][2]]);

            let new_event = data[time_arr[i][2]];
            // Make the Current and Upcoming Events
            const newEventElement = document.createElement("div");
            newEventElement.setAttribute("style", "cursor: pointer; padding: 5px; border-bottom: 1px solid #ccc;");
            newEventElement.innerHTML = new_event.title + " & " + new_event.location + "\nTime: " + new_event.start_time + "-" + new_event.end_time;

            // Classify event based on its date/time interval
            if (now >= time_arr[i][0] && now <= time_arr[i][1]) {
                console.log("Append to Current Content");
                currentContent.appendChild(newEventElement);
            } else {
                console.log("Append to Upcoming Content");
                upcomingContent.appendChild(newEventElement);
            }
        }

        marker_arr = [];
        console.log("LENGTH: " + new_obj.length);
        for (let i = 0; i < new_obj.length; ++i) {
            let i_marker = Object.assign({}, new_obj[i]);
            i_marker["marker"] = L.marker([new_obj[i].lat, new_obj[i].lon]).addTo(map).bindPopup(new_obj[i].title == undefined ? "Activity :D" : new_obj[i].title);
            marker_arr.push(i_marker);
        }

        changeEventData(new_obj);
    })
    .catch(error => console.error('Error loading markers:', error));
}
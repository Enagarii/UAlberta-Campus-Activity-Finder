/***********************************************
 * 1. Add CSS for the Toggle Switch
 ***********************************************/
const styleEl = document.createElement('style');
styleEl.innerHTML = `
  /* Container utility classes */
  .d-flex { display: flex; }
  .ai-center { align-items: center; }
  .g8 { gap: 8px; }
  .s-label { font-family: sans-serif; font-size: 14px; }

  /* Toggle switch styling */
  .s-toggle-switch {
    appearance: none;
    width: 42px;
    height: 22px;
    background: #ccc;
    border-radius: 22px;
    position: relative;
    outline: none;
    cursor: pointer;
    transition: background 0.3s;
  }
  .s-toggle-switch::before {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    top: 3px;
    left: 3px;
    background: #fff;
    border-radius: 50%;
    transition: transform 0.3s;
  }
  .s-toggle-switch:checked {
    background: #222;
  }
  .s-toggle-switch:checked::before {
    transform: translateX(20px);
  }
    /* Red Toggle switch styling */
  .s-toggle-switch-red {
    appearance: none;
    width: 42px;
    height: 22px;
    background: #ccc;
    border-radius: 22px;
    position: relative;
    outline: none;
    cursor: pointer;
    transition: background 0.3s;
  }
  .s-toggle-switch-red::before {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    top: 3px;
    left: 3px;
    background: #fff;
    border-radius: 50%;
    transition: transform 0.3s;
  }
  .s-toggle-switch-red:checked {
    background: red;
  }
  .s-toggle-switch-red:checked::before {
    transform: translateX(20px);
  }

`;
document.head.appendChild(styleEl);

/***********************************************
 * 2. Create the Toggle Switch UI
 ***********************************************/
// Container for toggle switch
const toggleContainer = document.createElement('div');
toggleContainer.classList.add('d-flex', 'ai-center', 'g8');
toggleContainer.style.position = 'fixed';
toggleContainer.style.top = '10px';
toggleContainer.style.right = '10px';
toggleContainer.style.zIndex = '1000';

// Toggle Label
const toggleLabel = document.createElement('label');
toggleLabel.classList.add('s-label');
toggleLabel.setAttribute('for', 'toggle-switch');
toggleLabel.textContent = "Light/Dark Mode";

// Toggle Switch
const toggleSwitch = document.createElement('input');
toggleSwitch.classList.add('s-toggle-switch');
toggleSwitch.id = 'toggle-switch';
toggleSwitch.type = 'checkbox';

// Append toggle switch to UI
toggleContainer.appendChild(toggleLabel);
toggleContainer.appendChild(toggleSwitch);
document.body.appendChild(toggleContainer);

// Second Toggle Container (Red)
const toggleContainerRed = document.createElement('div');
toggleContainerRed.classList.add('d-flex', 'ai-center', 'g8');
toggleContainerRed.style.position = 'fixed';
toggleContainerRed.style.top = '40px'; // Moves it below the first switch
toggleContainerRed.style.right = '10px';
toggleContainerRed.style.zIndex = '1000';

// Second Toggle Label
const toggleLabelRed = document.createElement('label');
toggleLabelRed.classList.add('s-label');
toggleLabelRed.setAttribute('for', 'toggle-switch-red');
toggleLabelRed.textContent = "Colour Blind Mode";

// Second Toggle Switch
const toggleSwitchRed = document.createElement('input');
toggleSwitchRed.classList.add('s-toggle-switch-red');
toggleSwitchRed.id = 'toggle-switch-red';
toggleSwitchRed.type = 'checkbox';

// Append red toggle switch to UI
toggleContainerRed.appendChild(toggleLabelRed);
toggleContainerRed.appendChild(toggleSwitchRed);
document.body.appendChild(toggleContainerRed);


/***********************************************
 * 3. Setup the Leaflet Map
 ***********************************************/
const bounds = L.latLngBounds(
  L.latLng(53.50507395114981, -113.55021677883585),   // SW
  L.latLng(53.537181589312924, -113.50538779321799)    // NE
);
let map = L.map('map', {
  zoomControl: false,
  maxBounds: bounds,
  maxBoundsViscosity: 1.0,
  minZoom: 15
}).setView([53.5245, -113.525], 16);
L.control.zoom({ position: 'topright' }).addTo(map);

var lightTiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 20,
  attribution: '&copy; OpenStreetMap'
});
var darkTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  maxZoom: 20,
  attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
  opacity: 0.9
});
lightTiles.addTo(map);

let lat = null;
let lon = null;

/***********************************************
 * 4. Dark Mode Toggle (Switch Map Styles)
 ***********************************************/
toggleSwitch.addEventListener('change', function() {
  if (this.checked) {
    // Dark Mode
    map.removeLayer(lightTiles);
    darkTiles.addTo(map);
    document.body.style.backgroundColor = "#323232";
    sidebar.style.backgroundColor = "rgb(50, 50, 50)";
    sidebar.style.color = "rgb(220, 220, 220)";

    currentTab.style.borderBottom = "2px solid rgb(200, 169, 81)";
    currentTab.style.color = "rgb(220, 220, 220)";

    upcomingTab.style.borderBottom = "2px solid rgb(200, 169, 81)";
    upcomingTab.style.color = "rgb(220, 220, 220)";

    registerHeader.style.borderBottom = "2px solid rgb(200, 169, 81)";
    registerHeader.style.borderTop = "2px solid rgb(200, 169, 81)";
    registerHeader.style.color = "rgb(220, 220, 220)";
    startLabel.setAttribute("style", "width: 90%; font-family: 'Roboto Slab', serif; font-size: 16px; color: white; margin-top: 5px;");
    endLabel.setAttribute("style", "width: 90%; font-family: 'Roboto Slab', serif; font-size: 16px; color: white; margin-top: 5px;");
    eventTitleInput.style.backgroundColor = "rgb(85, 85, 85)";
    eventLocationInput.style.backgroundColor = "rgb(85, 85, 85)";
    eventStartDateTimeInput.style.backgroundColor = "rgb(85, 85, 85)";
    eventEndDateTimeInput.style.backgroundColor = "rgb(85, 85, 85)";
    eventDescriptionInput.style.backgroundColor = "rgb(85, 85, 85)";
    eventLinkInput.style.backgroundColor = "rgb(85, 85, 85)";

    lineOne.style.backgroundColor = "rgb(220, 220, 220)";
    lineTwo.style.backgroundColor = "rgb(220, 220, 220)";
    lineThree.style.backgroundColor = "rgb(220, 220, 220)";

    eventTitleInput.style.color = "white";
    eventLocationInput.style.color = "white";
    eventStartDateTimeInput.style.color = "white";
    eventEndDateTimeInput.style.color = "white";
    eventDescriptionInput.style.color = "white";
    eventLinkInput.style.color = "white";

    currentEventDiv.classList.remove("light");
    currentEventDiv.classList.add("dark");
    for (let i = 0; i < currentEventDiv.children.length; ++i) {
        currentEventDiv.children[i].style.backgroundColor = "#242424";
        currentEventDiv.children[i].style.color = "white";
    }

  } else {
    // Light Mode
    map.removeLayer(darkTiles);
    lightTiles.addTo(map);
    document.body.style.backgroundColor = "#FFFFFF";
    sidebar.style.backgroundColor = "rgb(255, 255, 255)";
    sidebar.style.color = "rgb(0, 0, 0)";

    currentTab.style.borderBottom = "2px solid rgb(39,93,56)";
    currentTab.style.color = "rgb(0, 0, 0)";

    upcomingTab.style.borderBottom = "2px solid rgb(39,93,56)";
    upcomingTab.style.color = "rgb(0, 0, 0)";

    registerHeader.style.borderBottom = "2px solid rgb(39,93,56)";
    registerHeader.style.borderTop = "2px solid rgb(39,93,56)";
    registerHeader.style.color = "rgb(0, 0, 0)";
    startLabel.setAttribute("style", "width: 90%; font-family: 'Roboto Slab', serif; font-size: 16px; color: black; margin-top: 5px;");
    endLabel.setAttribute("style", "width: 90%; font-family: 'Roboto Slab', serif; font-size: 16px; color: black; margin-top: 5px;");

    eventTitleInput.style.backgroundColor = "white";
    eventLocationInput.style.backgroundColor = "white";
    eventStartDateTimeInput.style.backgroundColor = "white";
    eventEndDateTimeInput.style.backgroundColor = "white";
    eventDescriptionInput.style.backgroundColor = "white";
    eventLinkInput.style.backgroundColor = "white";

    eventTitleInput.style.color = "black";
    eventLocationInput.style.color = "black";
    eventStartDateTimeInput.style.color = "black";
    eventEndDateTimeInput.style.color = "black";
    eventDescriptionInput.style.color = "black";
    eventLinkInput.style.color = "black";
    
    lineOne.style.backgroundColor = "black";
    lineTwo.style.backgroundColor = "black";
    lineThree.style.backgroundColor = "black";

    currentEventDiv.classList.add("light");
    currentEventDiv.classList.remove("dark");
    for (let i = 0; i < currentEventDiv.children.length; ++i) {
        currentEventDiv.children[i].style.color = "black";
        currentEventDiv.children[i].style.backgroundColor = "white";
    }
  }
});
// What happens when we click the red bitch
toggleSwitchRed.addEventListener('change', function() {
  if (this.checked) {
    // Turn background red
    banner.style.backgroundColor = "#88c4fc";
    banner.style.color = "#f87c3c";
    toggleLabelRed.style.color = "#f87c3c";
    toggleLabel.style.color = "#f87c3c";
  } else {
    // Reset background to default
    banner.style.backgroundColor = "rgb(39,93,56)";
    banner.style.color = "rgb(242,205,0)";
    toggleLabelRed.style.color = "rgb(242,205,0)";
    toggleLabel.style.color = "rgb(242,205,0)";
  }
});


/***********************************************
 * 5. Map Click & Marker Handling
 ***********************************************/
let marker_arr = [];
let consolidatedMarkers = [];

var markerOpacity = 0;

marker = L.marker([0, 0]).addTo(map);
marker._icon.classList.add("markerClass");
marker.setOpacity(markerOpacity);

map.on('click', function(e) {
    // make a marker
    if (markerOpacity == 1)
    {
        lat = e.latlng.lat;
        lon = e.latlng.lng;
        marker.setLatLng([e.latlng.lat, e.latlng.lng]);
    }
});

document.addEventListener("click", function (e) {
    // See if any popups are open
    let group_events = [];
    for (let i = 0; i < marker_arr.length; ++i) {
        if (marker_arr[i].marker.isPopupOpen()) {
            group_events = marker_arr[i].events;
            marker_arr[i].marker._icon.classList.add("markerSelect");
        } else marker_arr[i].marker._icon.classList.remove("markerSelect");
    }
    fetch('/api/desc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: group_events })
    }).then(response => response.json())
    .then(data => { updateEvent(); })
    .catch(error => console.error('Error:', error));
});

/***********************************************
 * 6. Create Event Functionality
 ***********************************************/
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

        if (filled) reqdiv.classList.remove("error");
        else {
            reqdiv.classList.add("error");
            valid_input = false;
        }
    }

    updateEventContents();
    if (lat == null || lon == null) valid_input = false;
    if (!valid_input) return;

    let new_event = { "lat": lat, "lon": lon };

    for (let i = 0; i < registerContent.children.length; ++i) {
      let propdiv = registerContent.children[i];
      if (propdiv.tagName.toLowerCase() != "div" || !propdiv.classList.contains("event_input")) continue;
      
      new_event[propdiv.id] = "";
      for (let j = 0; j < propdiv.children.length; ++j) {
        if (propdiv.children[j].value == undefined) continue;
        new_event[propdiv.id] += propdiv.children[j].value;
      }
    }

    if (new_event["start_time"] == undefined || new_event["end_time"] == undefined || new_event["start_time"] > new_event["end_time"]) {
      alert("Invalid Time Bounds");
      return;
    }

    sendData(new_event);
}

/***********************************************
 * 7. Refresh & Load Events
 ***********************************************/
window.addEventListener("load", refreshPage);

let consolidatedRadius = 0.0015;

function refreshPage()
{
  lat = null;
  lon = null;
  marker.setLatLng([0, 0]);

  // day function
  function getOrdinal(n) {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  // Fetch the markers from the json file
  fetch('static/JSON/events.json')
  .then(response => response.json())
  .then(data => {

      // Reset the markers
      for (let i = 0; i < marker_arr.length; ++i) {
          marker_arr[i].marker.remove();
      }
      marker_arr = [];

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

          // Create a date object for start and end
          let st = new Date(new_event.start_time);
          let en = new Date(new_event.end_time);

          // Format using weekday and month names and add ordinal suffixes for the day
          const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };

          const startWeekday = st.toLocaleDateString("en-US", { weekday: "long" });
          const startMonth = st.toLocaleDateString("en-US", { month: "short" });
          const startDay = st.getDate();
          const startOrdinal = getOrdinal(startDay);
          const startTimeStr = st.toLocaleTimeString("en-US", timeOptions);

          const endWeekday = en.toLocaleDateString("en-US", { weekday: "long" });
          const endMonth = en.toLocaleDateString("en-US", { month: "short" });
          const endDay = en.getDate();
          const endOrdinal = getOrdinal(endDay);
          const endTimeStr = en.toLocaleTimeString("en-US", timeOptions);

          // Make the Current and Upcoming Events element with conditional formatting:
          const newEventElement = document.createElement("div");
          newEventElement.setAttribute("style", "cursor: pointer; padding: 5px; border-bottom: 1px solid #ccc;");

          if (st.toDateString() === en.toDateString()) {
            // Same day: show the day once.
            newEventElement.innerHTML = 
              `${new_event.title} - ${startWeekday}, ${startMonth} ${startOrdinal}, ${startTimeStr} to ${endTimeStr}`;
          } else {
            // Different days: show both start and end days.
            newEventElement.innerHTML = 
              `${new_event.title} - ${startWeekday}, ${startMonth} ${startOrdinal}, ${startTimeStr} to ${endWeekday}, ${endMonth} ${endOrdinal}, ${endTimeStr}`;
          }
          
          // Classify event based on its date/time interval
          if (now >= time_arr[i][0] && now <= time_arr[i][1]) {
              currentContent.appendChild(newEventElement);
          } else {
              upcomingContent.appendChild(newEventElement);
          }
      }
      
      mark_vis = Array(new_obj.length).fill(0);
      // Add everything that is within a certain distance in an array and find the center of them to display one marker
      consolidatedMarkers = [];
      currentDistanceIndex = 0;

      for (let i = 0; i < new_obj.length; ++i) {
          if (mark_vis[i]) continue;
          let currentConsolidation = [new_obj[i]];

          for (let j = i + 1; j < new_obj.length; ++j) {
              if (mark_vis[j]) continue;

              let lon_dist = new_obj[i].lon - new_obj[j].lon;
              let lat_dist = new_obj[i].lat - new_obj[j].lat;
              let vector_dist = lon_dist*lon_dist + lat_dist*lat_dist;
              vector_dist *= 10000;
              if (vector_dist <= consolidatedRadius) 
              {
                  mark_vis[j] = 1;
                  currentConsolidation.push(new_obj[j]);
              }
          }
          consolidatedMarkers.push(currentConsolidation);
      }

      // Make the markers based on the consolidated groups
      for (let i = 0; i < consolidatedMarkers.length; ++i) {
          let consol_i = consolidatedMarkers[i];
          // Average out the lat
          let avg_lat = 0, avg_lon = 0;
          for (let j = 0; j < consol_i.length; ++j) {
              avg_lat += consol_i[j].lat;
              avg_lon += consol_i[j].lon;
          }
          avg_lat /= consol_i.length;
          avg_lon /= consol_i.length;

          marker_arr.push({"marker": L.marker([avg_lat, avg_lon]).addTo(map).bindPopup("Activity Below :D"), "events": consol_i});
      }

      changeEventData(new_obj);
  })
  .catch(error => console.error('Error loading markers:', error));
}
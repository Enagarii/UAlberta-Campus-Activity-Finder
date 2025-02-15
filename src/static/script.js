/*
document.addEventListener("DOMContentLoaded", function () {
    var map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    var marker = L.marker([51.505, -0.09]).addTo(map)
        .bindPopup('Default Location')
        .openPopup();

    window.searchLocation = function() {
        var location = document.getElementById("locationInput").value;
        if (location) {
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        var lat = data[0].lat;
                        var lon = data[0].lon;
                        map.setView([lat, lon], 13);
                        marker.setLatLng([lat, lon]).bindPopup(location).openPopup();
                    } else {
                        alert("Location not found.");
                    }
                })
                .catch(err => console.error(err));
        }
    }
});


document.addEventListener("DOMContentLoaded", function () {
    var map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    var marker = L.marker([51.505, -0.09]).addTo(map)
        .bindPopup('Default Location')
        .openPopup();

    window.searchLocation = function() {
        var location = document.getElementById("locationInput").value;
        if (location) {
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        var lat = data[0].lat;
                        var lon = data[0].lon;
                        map.setView([lat, lon], 13);
                        marker.setLatLng([lat, lon]).bindPopup(location).openPopup();
                    } else {
                        alert("Location not found.");
                    }
                })
                .catch(err => console.error(err));
        }
    }
});
*/

const body = document.querySelector("body");
body.setAttribute("style", "margin: 0px; background: rgb(200, 255, 203)")

// Left bar to show the contents of the activities
const sidebar = document.createElement("div");
sidebar.setAttribute("style", 
    "position: fixed; width: 18%; height: 100%; background-color:rgb(127, 235, 127); color: rgb(255, 255, 255); display: flex; align-items: center; justify-content: left; margin-top: 0px");
body.appendChild(sidebar);

// Title Bar
const banner = document.createElement("div");
banner.setAttribute("style", 
    "width: 100%; height: 100px; margin-bottom: 10px; background-color:rgb(127, 235, 127); box-shadow: 0px 3px 3px rgb(133, 133, 133); color: rgb(255, 255, 255); font-weight: bold; font-size: 48px; font-family: Georgia; display: flex; align-items: center; justify-content: center; margin-top: 0px")
banner.textContent = "Campus Activity Finder"
body.appendChild(banner);

// Make the map
const mapdiv = document.createElement("div");
mapdiv.setAttribute("id", "map");
mapdiv.setAttribute("style", "height: 700px; width: 80%; float: right; margin-right: 1%");
body.appendChild(mapdiv);

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

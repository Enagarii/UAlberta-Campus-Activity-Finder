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

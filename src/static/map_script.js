var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('../../Pictures/uofa_map.png', {
    maxZoom: 19
}).addTo(map);
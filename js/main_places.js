// Initiate
mapboxgl.accessToken = 'pk.eyJ1IjoibWFyeS1iZWNrZXIiLCJhIjoiY2p3bTg0bDlqMDFkeTQzcDkxdjQ2Zm8yMSJ9._7mX0iT7OpPFGddTDO5XzQ';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    center: [0, 42.5], // starting position [lng, lat]
    zoom: 1 // starting zoom
});

// map.addControl(new MapboxInspect({
//     showInspectMap: true,
//     showInspectButton: false
// }));

map.on('load', function() {
    map.addSource('pop-places', {  // pop-places references to the source requested here
        type: 'vector',
        url: 'mapbox://mary-becker.ckws3kcho9rsl20mln2yddzk7-1yvqi'  // mapbox username and the tileset ID
    });

    map.addLayer({
        'id': 'places',  // provide an id for later reference
        'type': 'circle',
        'source': 'pop-places',  // refers to the source name we entered above
        'source-layer': 'places',  // refers to the name of the tileset hosted on Mapbox Studio
        'layout': {},
        'paint': {
            "circle-color": "#448ee4"
        }
    });

    map.addLayer({
        "id": "places-labels",
        "type": "symbol",
        'source': 'pop-places',
        "source-layer": "places",
        "layout": {
            "text-field": "{name}",
            "text-justify": "left",
            "text-anchor": "bottom-left",
            "text-offset": [.5, -.3],
            "text-size": 14
        },
        "paint": {
            "text-color": "hsl(211, 75%, 53%)"
        }
    });

});

// Create a popup, but don't add it to the map yet.
const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

map.on('mouseenter', 'places', function (e) {

    const features = map.queryRenderedFeatures(e.point);

    // Change the cursor style as a UI affordance.
    map.getCanvas().style.cursor = 'pointer';

    // Populate the popup and set its coordinates
    // based on the feature found.

    const coordinates = e.features[0].geometry.coordinates;
    const population = e.features[0].properties.pop_max;

    popup
        .setLngLat(coordinates)
        .setHTML("Population: " + Number(population).toLocaleString())
        .addTo(map);
});

map.on('mouseleave', 'places', function () {
    map.getCanvas().style.cursor = '';
    popup.remove();
});



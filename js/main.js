// Initiate Map
mapboxgl.accessToken = 'pk.eyJ1IjoibWFyeS1iZWNrZXIiLCJhIjoiY2p3bTg0bDlqMDFkeTQzcDkxdjQ2Zm8yMSJ9._7mX0iT7OpPFGddTDO5XzQ';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: [-98.5795, 39.8283], // starting position [lng, lat]
    zoom: 4 // starting zoom
});

map.on('load', function() {
    // Load an image from an external URL.
    map.loadImage(
        'images/mountain.png',
        (error, image) => {
            if (error) throw error;

// Add the image to the map style.
            map.addImage('mountain', image);

            map.addSource('summits', {  // references to the source requested here
                type: 'vector',
                url: 'mapbox://mary-becker.ckws7twfk0qjp2dr2c4yep1qp-0iyh7',  // mapbox username and the tileset ID
                'tolerance': 0
            });

            map.addLayer({
                'id': 'summit',  // provide an id for later reference
                'type': 'symbol',
                'source': 'summits',  // refers to the source name entered above
                'source-layer': 'summit-1000M',  // refers to the name of the tileset hosted on Mapbox Studio
                'layout': {
                    'icon-image': 'mountain', // reference the image
                    'icon-size': 0.2
                }
            });

            map.addLayer({
                'id': 'summit-labels',  // provide an id for later reference
                'type': 'symbol',
                'source': 'summits',  // refers to the source name entered above
                'source-layer': 'summit-1000M',  // refers to the name of the tileset hosted on Mapbox Studio
                'layout': {
                    "text-field": [
                        "step",
                        ["zoom"],
                        "",
                        10,
                        ["to-string", ["get", "FEATURE_NAME"]]
                    ],
                    "text-offset": [.5, -.5],
                    "text-anchor": "bottom-left",
                    "text-size": 14
                },
                "paint": {"text-color": "#000"}
            });
        }
    );
});

// Create a popup, but don't add it to the map yet.
const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

map.on('mouseenter', 'summit', function (e) {

    const features = map.queryRenderedFeatures(e.point);

    // Change the cursor style as a UI affordance.
    map.getCanvas().style.cursor = 'pointer';

    // Populate the popup and set its coordinates
    // based on the feature found.

    const coordinates = e.features[0].geometry.coordinates;
    const elevation = e.features[0].properties.ELEV_IN_M;

    popup
        .setLngLat(coordinates)
        .setHTML("Elevation (M): " + Number(elevation).toLocaleString())
        .addTo(map);
});

map.on('mouseleave', 'summit', function () {
    map.getCanvas().style.cursor = '';
    popup.remove();
});
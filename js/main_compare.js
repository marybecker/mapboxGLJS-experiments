mapboxgl.accessToken = 'pk.eyJ1IjoibWFyeS1iZWNrZXIiLCJhIjoiY2p3bTg0bDlqMDFkeTQzcDkxdjQ2Zm8yMSJ9._7mX0iT7OpPFGddTDO5XzQ';

const before = new mapboxgl.Map({
    container: 'before', // Container ID
    style: 'mapbox://styles/mapbox/outdoors-v10',
    center: [-108.474, 37.254],
    zoom: 12
});

const after = new mapboxgl.Map({
    container: 'after', // Container ID
    style: 'mapbox://styles/mary-becker/ckwta0el80iqt15vsyvpzr09j',
    center: [-108.474, 37.254],
    zoom: 12
});

const container = '#comparison-container'

const map = new mapboxgl.Compare(before, after, container, {
    mousemove: false
});
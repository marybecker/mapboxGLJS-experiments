mapboxgl.accessToken = 'pk.eyJ1IjoibWFyeS1iZWNrZXIiLCJhIjoiY2p3bTg0bDlqMDFkeTQzcDkxdjQ2Zm8yMSJ9._7mX0iT7OpPFGddTDO5XzQ';

const after = new mapboxgl.Map({
    container: 'after', // Container ID
    style: 'mapbox://styles/mapbox/outdoors-v10',
    center: [-72.92993, 41.92987],
    zoom: 12
});

const before = new mapboxgl.Map({
    container: 'before', // Container ID
    style: 'mapbox://styles/mary-becker/ckwux9y8i53cv15qj9vgvppto',
    center: [-72.92993, 41.92987],
    zoom: 12
});

const container = '#comparison-container'

const map = new mapboxgl.Compare(after, before, container, {
    mousemove: false
});
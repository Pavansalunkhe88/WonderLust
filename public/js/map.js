// Access mapToken from the global scope (defined in your template)
mapboxgl.accessToken = mapToken;

// Initialize the map
const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Default center if coordinates aren't available
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: coordinates && coordinates.length ? coordinates : [73.856255, 18.516726],
    zoom: 9 // starting zoom
});



// Only add the marker if coordinates exist
if (coordinates && coordinates.length) {
    const marker = new mapboxgl.Marker({color: 'red'})
        .setLngLat(coordinates)
        .addTo(map);
    
    // Also center the map on the marker
    map.setCenter(coordinates);
}
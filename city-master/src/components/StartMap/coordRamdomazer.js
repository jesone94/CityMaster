export default function cordsRandomazer(coords) {
  const randomLat = Math.random() * (0.09999999 - -0.09999999) + -0.09999999;
  const randomLng = Math.random() * (0.09999999 - -0.09999999) + -0.09999999;
  const searchCoords = {};
  searchCoords.lat = coords.lat + randomLat;
  searchCoords.lng = coords.lng + randomLng;
  return searchCoords;
}

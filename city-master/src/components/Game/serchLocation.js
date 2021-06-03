export default async function searchLocation(coords) {
  const url = `https://maps.googleapis.com/maps/api/streetview/metadata?size=600x300&location=${coords.lat},${coords.lng}&fov=90&heading=235&pitch=10&key=${process.env.REACT_APP_GMAPS_API_KEY}`;

  const response = await fetch(url);
  const result = await response.json();
  console.log(result);
  if (result.status === 'ZERO_RESULTS') {
  }
}

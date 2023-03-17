const forecastFetch = require('./forecast')

const geocodeFetch = async (address) => {
  const url2 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWxlZW1xMSIsImEiOiJjbGZhM256dG4yNTJ2M3RvY2FzbXc1YjRvIn0.B2d5stGdFZ8n_CX9mnVzdg&limit=1`;

  try {
    const response = await fetch(url2);
    const data = await response.json();
    if (data.features.length === 0) {
      console.log("Write correct name, it does not exists");
    } else {
      const latitude = data.features[0].center[1];
      const longitude = data.features[0].center[0];
      const location = data.features[0].place_name;
      const geocodeData = {latitude, longitude, location } 
      console.log(geocodeData.location)
      return forecastFetch(latitude, longitude)
    }
  } catch (error) {
    console.log("Unable to connect to geocode service!");
  }
};

module.exports = geocodeFetch;

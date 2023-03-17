const forecastFetch = async (latitude, longitude) => {
  const url = `http://api.weatherstack.com/current?access_key=f739f24688258521afce844f8cfa89cd&query=${latitude},${longitude}`;

  try {
    const response = await fetch(url);
    const weatherData = await response.json();
    if (weatherData.error) {
      console.log("Unable to find location!");
    } else {
      return {
        forecast: `${weatherData.current.weather_descriptions[0]}, It is currently ${weatherData.current.temperature} degrees out. There is a ${weatherData.current.precip}% chance of rain.`,
        location: weatherData.location.timezone_id,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

// via request package
/* 
request({ url, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect to weather service!");
  } else if (response.body.error) {
    console.log("Unable to find location!");
  } else {
    const data = response.body.current;
    console.log(
      `${data.weather_descriptions[0]}, It is currently ${data.temperature} degrees out. There is a ${data.precip}% chance of rain.`
    );
  }
});
*/

module.exports = forecastFetch;

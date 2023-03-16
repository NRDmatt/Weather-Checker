const API_KEY = '637531b431f5488fbfa7a2779aeeeb58';

const cityInput = document.getElementById('city-input');
const getWeatherButton = document.getElementById('get-weather-button');
const weatherInfoDiv = document.getElementById('weather-info');

getWeatherButton.addEventListener('click', () => {
  const city = cityInput.value;

  // Construct the API request URL
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  // Make the API request
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Extract the relevant weather information
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const description = data.weather[0].description;

      // Update the weather information in the HTML
      weatherInfoDiv.innerHTML = `
        <h2>Weather in ${city}</h2>
        <p>Temperature: ${temperature} F</p>
        <p>Humidity: ${humidity}%</p>
        <p>Description: ${description}</p>
      `;
    })
    .catch(error => console.error(error));
});
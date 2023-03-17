const apiKey = '432dbb81ba4ef584ad1a12462d53bcc1';

document.getElementById('submit-btn').addEventListener('click', function(event) {
  event.preventDefault();
  const city = document.getElementById('city').value;
  getWeather(city);
});

function getWeather(city) {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
  
 
  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
      const currentWeatherContainer = document.getElementById('current-weather-container');
      currentWeatherContainer.innerHTML = '';
      const currentWeatherHtml = `
        <h2>Current Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}&deg;F</p>
        <p>Conditions: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
      `;
      currentWeatherContainer.insertAdjacentHTML('beforeend', currentWeatherHtml);
    })
    .catch(error => console.log(error));
    
  
  fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
      const forecastContainer = document.getElementById('forecast-container');
      forecastContainer.innerHTML = '';
      const forecasts = data.list.filter(forecast => forecast.dt_txt.includes('12:00:00'));
      forecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const forecastHtml = `
          <div class="forecast-card">
            <h3>${date.toLocaleDateString()}</h3>
            <p>Temperature: ${forecast.main.temp}&deg;F</p>
            <p>Conditions: ${forecast.weather[0].description}</p>
            <p>Humidity: ${forecast.main.humidity}%</p>
          </div>
        `;
        forecastContainer.insertAdjacentHTML('beforeend', forecastHtml);
      });
    })
    .catch(error => console.log(error));
}
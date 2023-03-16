const API_KEY = '637531b431f5488fbfa7a2779aeeeb58';
const currentWeatherContainer = document.getElementById('current-weather-container');
const forecastContainer = document.getElementById('forecast-container');

// Construct the API request URLs
const city = 'alaska'; // Replace with user input
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${API_KEY}`;

// Make the API requests
Promise.all([
  fetch(currentWeatherUrl),
  fetch(forecastUrl),
])
  .then(responses => Promise.all(responses.map(response => response.json())))
  .then(data => {
    // Display the current weather
    const currentWeatherData = data[0];
    const currentTemperature = currentWeatherData.main.temp;
    const currentDescription = currentWeatherData.weather[0].description;

    const currentWeatherElement = document.createElement('div');
    currentWeatherElement.classList.add('current-weather');

    const currentTemperatureElement = document.createElement('p');
    currentTemperatureElement.textContent = `Temperature: ${currentTemperature} °F`;
    currentWeatherElement.appendChild(currentTemperatureElement);

    const currentDescriptionElement = document.createElement('p');
    currentDescriptionElement.textContent = `Description: ${currentDescription}`;
    currentWeatherElement.appendChild(currentDescriptionElement);

    currentWeatherContainer.appendChild(currentWeatherElement);

    // Display the 5-day forecast
    const forecastData = data[1];
    const forecastElements = forecastData.list.reduce((acc, forecast, index) => {
      // Split the forecasts into 5-day periods
      if (index % 8 === 0) {
        const date = forecast.dt_txt.split(' ')[0];
        const temperature = forecast.main.temp;
        const description = forecast.weather[0].description;

        // Create HTML elements to display the forecast information
        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast');

        const dateElement = document.createElement('h3');
        dateElement.textContent = date;
        forecastElement.appendChild(dateElement);

        const temperatureElement = document.createElement('p');
        temperatureElement.textContent = `Temperature: ${temperature} °F`;
        forecastElement.appendChild(temperatureElement);

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = `Description: ${description}`;
        forecastElement.appendChild(descriptionElement);

        acc.push(forecastElement);
      }

      return acc;
    }, []);

    // Append the forecast elements to the forecast container in the HTML
    forecastElements.forEach(element => {
      forecastContainer.appendChild(element);
    });
  })
  .catch(error => console.error(error));

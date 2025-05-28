document.addEventListener('DOMContentLoaded', function () {
    const API_KEY = '9572aed135c84c1aa7a172448251101';
    const cityInput = document.getElementById('cityInput');
    const errorMessage = document.getElementById('errorMessage');
    const loaderContainer = document.getElementById('loaderContainer');
    const localtime = document.getElementById('localtime');
    const divs = document.getElementById('divs');
    divs.style.display = 'none';
    // Weather condition to icon mapping
    const weatherIcons = {
        'Clear': 'wi-day-sunny',
        'Sunny': 'wi-day-sunny',
        'Partly cloudy': 'wi-day-cloudy',
        'Cloudy': 'wi-cloudy',
        'Overcast': 'wi-cloudy',
        'Mist': 'wi-fog',
        'Patchy rain possible': 'wi-day-rain',
        'Light rain': 'wi-rain',
        'Moderate rain': 'wi-rain',
        'Heavy rain': 'wi-rain',
        'Thunder': 'wi-thunderstorm',
        'Snow': 'wi-snow',
        'Fog': 'wi-fog',
        'default': 'wi-day-sunny'
    };

    function getWeatherIcon(condition) {
        const iconClass = weatherIcons[condition] || weatherIcons['default'];
        return `<i class="wi ${iconClass}"></i>`;
    }

    function formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function toggleLoader(show) {
        if (loaderContainer) {
            if (show) {
                loaderContainer.classList.add('active');
            } else {
                loaderContainer.classList.remove('active');
            }
        }
    }

    async function getWeatherData(city) {
        try {
            toggleLoader(true);
            divs.style.display = 'none';
            
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no`);
            
            if (!response.ok) {
                throw new Error('Weather data not available');
            }
            
            const data = await response.json();
            console.log(data);
            
            if (data.error) {
                throw new Error(data.error.message);
            }
            
            divs.style.display = 'block';
            return data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            divs.style.display = 'none';
            throw error;
        } finally {
            toggleLoader(false);
        }
    }

    function updateUI(data) {
        try {
            // Update current weather
            const elements = {
                cityName: document.getElementById('cityName'),
                date: document.getElementById('date'),
                temperature: document.getElementById('temperature'),
                condition: document.getElementById('condition'),
                weatherIcon: document.getElementById('weatherIcon'),
                humidity: document.getElementById('humidity'),
                windSpeed: document.getElementById('windSpeed'),
                feelsLike: document.getElementById('feelsLike'),
                uvIndex: document.getElementById('uvIndex'),
                localtime: document.getElementById('localtime')
            };

            // Check if all elements exist before updating
            if (elements.cityName) elements.cityName.textContent = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
            if (elements.date) elements.date.textContent = formatDate(data.location.localtime);
            if (elements.temperature) elements.temperature.textContent = `${data.current.temp_c}°C`;
            if (elements.condition) elements.condition.textContent = data.current.condition.text;
            if (elements.weatherIcon) elements.weatherIcon.innerHTML = getWeatherIcon(data.current.condition.text);
            if (elements.humidity) elements.humidity.textContent = `${data.current.humidity}%`;
            if (elements.windSpeed) elements.windSpeed.textContent = `${data.current.wind_kph} km/h`;
            if (elements.feelsLike) elements.feelsLike.textContent = `${data.current.feelslike_c}°C`;
            if (elements.uvIndex) elements.uvIndex.textContent = data.current.uv;
            if (elements.localtime) elements.localtime.textContent = data.current.last_updated;

            // Update forecast
            const forecastContainer = document.querySelector('#forecast .grid');
            if (forecastContainer) {
                forecastContainer.innerHTML = '';
                data.forecast.forecastday.forEach(day => {
                    const forecastItem = document.createElement('div');
                    forecastItem.className = 'currentWeather-container rounded-2xl bg-white hover:rounded-xl p-4';
                    forecastItem.innerHTML = `
                        <div class="text-center">
                            <div class="text-gray-500">${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                            <div class="weather-icon-small my-2">${getWeatherIcon(day.day.condition.text)}</div>
                            <div class="text-lg font-medium text-gray-800">${day.day.maxtemp_c}°C</div>
                            <div class="text-sm text-gray-500">${day.day.mintemp_c}°C</div>
                        </div>
                    `;
                    forecastContainer.appendChild(forecastItem);
                });
            }

            if (errorMessage) {
                errorMessage.classList.add('hidden');
            }
        } catch (error) {
            console.error('Error updating UI:', error);
            showError('Error updating weather information');
        }
    }

    async function searchWeather() {
        const city = cityInput.value.trim();
        if (!city) {
            showError('Please enter a city name');
            return;
        }

        try {
            const weatherData = await getWeatherData(city);
            updateUI(weatherData);
        } catch (error) {
            showError(error.message);
        }
    }

    function showError(message) {
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.classList.remove('hidden');
        }
    }

    // Add event listener for Enter key
    if (cityInput) {
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchWeather();
            }
        });
    }

    // Add click event listener for search button
    const searchButton = document.querySelector('button[onclick="searchWeather()"]');
    if (searchButton) {
        searchButton.addEventListener('click', searchWeather);
    }

  
   
});
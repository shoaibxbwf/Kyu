const API_KEY = 'eb558c73c9666f508c26f264649c303d';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

function fetchWeatherData(city) {
    try {
        return fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

function fetchForecast(city) {
    try {
        return fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Forecast data not available');
                }
                return response.json();
            });
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        throw error;
    }
}

function fetchWeatherByLocation(lat, lon) {
    try {
        return fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Location not found');
                }
                return response.json();
            });
    } catch (error) {
        console.error('Error fetching weather by location:', error);
        throw error;
    }
}

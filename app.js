function App() {
    try {
        // Load all settings from localStorage
        const [darkMode, setDarkMode] = React.useState(() => {
            return JSON.parse(localStorage.getItem('darkMode')) || false;
        });
        const [weatherData, setWeatherData] = React.useState(null);
        const [forecastData, setForecastData] = React.useState(null);
        const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
        const [defaultLocation, setDefaultLocation] = React.useState(() => {
            return localStorage.getItem('defaultLocation') || 'London';
        });
        const [temperatureUnit, setTemperatureUnit] = React.useState(() => {
            return localStorage.getItem('temperatureUnit') || 'celsius';
        });
        const [language, setLanguage] = React.useState(() => {
            return localStorage.getItem('language') || 'en';
        });
        const [batteryMode, setBatteryMode] = React.useState(() => {
            return JSON.parse(localStorage.getItem('batteryMode')) || false;
        });

        // Save settings to localStorage whenever they change
        React.useEffect(() => {
            document.body.className = darkMode ? 'dark' : 'light';
            localStorage.setItem('darkMode', JSON.stringify(darkMode));
        }, [darkMode]);

        React.useEffect(() => {
            localStorage.setItem('defaultLocation', defaultLocation);
            loadWeatherData(defaultLocation);
        }, [defaultLocation]);

        React.useEffect(() => {
            localStorage.setItem('temperatureUnit', temperatureUnit);
        }, [temperatureUnit]);

        React.useEffect(() => {
            localStorage.setItem('language', language);
        }, [language]);

        React.useEffect(() => {
            localStorage.setItem('batteryMode', JSON.stringify(batteryMode));
            if (batteryMode) {
                document.body.classList.add('battery-saving');
            } else {
                document.body.classList.remove('battery-saving');
            }
        }, [batteryMode]);

        const loadWeatherData = async (city) => {
            try {
                const weather = await fetchWeatherData(city);
                const forecast = await fetchForecast(city);
                setWeatherData(weather);
                setForecastData(forecast);
            } catch (error) {
                console.error('Error loading weather data:', error);
                alert('Failed to load weather data. Please try again.');
            }
        };

        const handleLocationSearch = async (lat, lon) => {
            try {
                const weather = await fetchWeatherByLocation(lat, lon);
                const forecast = await fetchForecast(weather.name);
                setWeatherData(weather);
                setForecastData(forecast);
            } catch (error) {
                console.error('Error loading weather data:', error);
                alert('Failed to load weather data. Please try again.');
            }
        };

        return (
            <div data-name="app" className={`container mx-auto px-4 pb-8 ${batteryMode ? 'battery-saving' : ''}`}>
                <AppBar
                    darkMode={darkMode}
                    toggleDarkMode={() => setDarkMode(!darkMode)}
                    openSettings={() => setIsSettingsOpen(true)}
                />

                <SearchSection
                    onSearch={loadWeatherData}
                    onLocationSearch={handleLocationSearch}
                    language={language}
                />

                <WeatherOverview 
                    data={weatherData}
                    temperatureUnit={temperatureUnit}
                    language={language}
                />
                <HourlyForecast 
                    data={forecastData}
                    temperatureUnit={temperatureUnit}
                    language={language}
                />
                <DailyForecast 
                    data={forecastData}
                    temperatureUnit={temperatureUnit}
                    language={language}
                />

                <Settings
                    isOpen={isSettingsOpen}
                    onClose={() => setIsSettingsOpen(false)}
                    defaultLocation={defaultLocation}
                    onLocationChange={setDefaultLocation}
                    temperatureUnit={temperatureUnit}
                    onUnitChange={setTemperatureUnit}
                    language={language}
                    onLanguageChange={setLanguage}
                    batteryMode={batteryMode}
                    onBatteryModeChange={setBatteryMode}
                />
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

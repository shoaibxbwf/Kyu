function WeatherOverview({ data, temperatureUnit, language }) {
    try {
        if (!data) return null;

        const temp = temperatureUnit === 'fahrenheit' 
            ? (data.main.temp * 9/5) + 32 
            : data.main.temp;

        const feelsLike = temperatureUnit === 'fahrenheit'
            ? (data.main.feels_like * 9/5) + 32
            : data.main.feels_like;

        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        return (
            <div data-name="weather-overview" className="weather-card">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 data-name="city-name" className="text-2xl font-bold mb-2">{data.name}</h2>
                        <p data-name="temperature" className="text-4xl font-bold mb-4">
                            {Math.round(temp)}°{temperatureUnit === 'fahrenheit' ? 'F' : 'C'}
                        </p>
                        <p data-name="description" className="text-lg capitalize">
                            {data.weather[0].description}
                        </p>
                    </div>
                    <img
                        data-name="weather-icon"
                        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                        alt={data.weather[0].description}
                        className="w-20 h-20"
                    />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                    <div data-name="feels-like" className="text-center">
                        <i className="fas fa-temperature-half mb-2"></i>
                        <p className="text-sm">{getTranslation(language, 'feelsLike')}</p>
                        <p className="font-bold">
                            {Math.round(feelsLike)}°{temperatureUnit === 'fahrenheit' ? 'F' : 'C'}
                        </p>
                    </div>
                    <div data-name="humidity" className="text-center">
                        <i className="fas fa-droplet mb-2"></i>
                        <p className="text-sm">{getTranslation(language, 'humidity')}</p>
                        <p className="font-bold">{data.main.humidity}%</p>
                    </div>
                    <div data-name="sunrise" className="text-center">
                        <i className="fas fa-sun mb-2"></i>
                        <p className="text-sm">{getTranslation(language, 'sunrise')}</p>
                        <p className="font-bold">{sunrise}</p>
                    </div>
                    <div data-name="sunset" className="text-center">
                        <i className="fas fa-moon mb-2"></i>
                        <p className="text-sm">{getTranslation(language, 'sunset')}</p>
                        <p className="font-bold">{sunset}</p>
                    </div>
                </div>

                {data.rain && (
                    <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <i className="fas fa-umbrella mr-2"></i>
                        {getTranslation(language, 'precipitation')}: {data.rain['1h']}mm/h
                    </div>
                )}
                
                {data.main.temp > 30 && (
                    <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                        <i className="fas fa-sun mr-2"></i>
                        High UV Index - Please wear sunscreen
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('WeatherOverview component error:', error);
        reportError(error);
        return null;
    }
}

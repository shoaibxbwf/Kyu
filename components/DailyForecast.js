function DailyForecast({ data }) {
    try {
        if (!data) return null;

        const dailyData = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);

        return (
            <div data-name="daily-forecast" className="weather-card">
                <h3 className="text-xl font-bold mb-4">5-Day Forecast</h3>
                <div data-name="daily-forecast-container" className="daily-forecast-container">
                    {dailyData.map((item, index) => (
                        <div
                            data-name="forecast-day"
                            key={index}
                            className="daily-forecast-item"
                        >
                            <p className="font-medium mb-2">{formatDate(item.dt * 1000)}</p>
                            <img
                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                alt={item.weather[0].description}
                                className="w-16 h-16 mx-auto"
                            />
                            <p className="text-lg font-bold mt-2">
                                {Math.round(item.main.temp)}°C
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                {item.weather[0].description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('DailyForecast component error:', error);
        reportError(error);
        return null;
    }
}

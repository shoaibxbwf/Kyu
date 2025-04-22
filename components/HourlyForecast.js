function HourlyForecast({ data }) {
    try {
        if (!data) return null;

        const hourlyData = data.list.slice(0, 8);

        return (
            <div data-name="hourly-forecast" className="weather-card">
                <h3 className="text-xl font-bold mb-4">Hourly Forecast</h3>
                <div className="flex gap-4 overflow-x-auto">
                    {hourlyData.map((item, index) => (
                        <div
                            data-name="forecast-item"
                            key={index}
                            className="forecast-item"
                        >
                            <p className="text-sm">{formatTime(item.dt * 1000)}</p>
                            <img
                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                alt={item.weather[0].description}
                                className="mx-auto"
                            />
                            <p className="font-bold">{Math.round(item.main.temp)}°C</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('HourlyForecast component error:', error);
        reportError(error);
        return null;
    }
}

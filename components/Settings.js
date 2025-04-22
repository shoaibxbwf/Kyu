function Settings({ isOpen, onClose, defaultLocation, onLocationChange, temperatureUnit, onUnitChange, language, onLanguageChange, batteryMode, onBatteryModeChange }) {
    try {
        if (!isOpen) return null;

        const [tempLocation, setTempLocation] = React.useState(defaultLocation);
        const [tempUnit, setTempUnit] = React.useState(temperatureUnit);
        const [tempLang, setTempLang] = React.useState(language);
        const [tempBatteryMode, setTempBatteryMode] = React.useState(batteryMode);

        const handleSave = (e) => {
            e.preventDefault();
            onLocationChange(tempLocation);
            onUnitChange(tempUnit);
            onLanguageChange(tempLang);
            onBatteryModeChange(tempBatteryMode);
            onClose();
        };

        const handleModalClick = (e) => {
            if (e.target.classList.contains('settings-modal')) {
                onClose();
            }
        };

        const languages = [
            { code: 'en', name: 'English' },
            { code: 'es', name: 'Español' },
            { code: 'hi', name: 'हिंदी' },
            { code: 'ar', name: 'العربية' }
        ];

        return (
            <div data-name="settings-modal" className="settings-modal" onClick={handleModalClick}>
                <div data-name="settings-content" className="settings-content">
                    <form onSubmit={handleSave}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">SkyPerk {getTranslation(language, 'settings')}</h2>
                            <button type="button" onClick={onClose} className="hover:text-gray-400">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block mb-2 font-medium">{getTranslation(language, 'defaultLocation')}</label>
                                <input
                                    type="text"
                                    value={tempLocation}
                                    onChange={(e) => setTempLocation(e.target.value)}
                                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-400"
                                    placeholder="Enter city name"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">{getTranslation(language, 'temperature')}</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="temperature"
                                            value="celsius"
                                            checked={tempUnit === 'celsius'}
                                            onChange={() => setTempUnit('celsius')}
                                            className="mr-2"
                                        />
                                        <span>{getTranslation(language, 'celsius')} (°C)</span>
                                    </label>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="temperature"
                                            value="fahrenheit"
                                            checked={tempUnit === 'fahrenheit'}
                                            onChange={() => setTempUnit('fahrenheit')}
                                            className="mr-2"
                                        />
                                        <span>{getTranslation(language, 'fahrenheit')} (°F)</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">{getTranslation(language, 'language')}</label>
                                <select
                                    value={tempLang}
                                    onChange={(e) => setTempLang(e.target.value)}
                                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-400"
                                >
                                    {languages.map(lang => (
                                        <option key={lang.code} value={lang.code}>
                                            {lang.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={tempBatteryMode}
                                        onChange={(e) => setTempBatteryMode(e.target.checked)}
                                        className="mr-2"
                                    />
                                    <span>{getTranslation(language, 'batteryMode')}</span>
                                </label>
                            </div>

                            <div className="border-t pt-6">
                                <h3 className="font-bold mb-2">{getTranslation(language, 'about')}</h3>
                                <p>{getTranslation(language, 'version')}: 1.00</p>
                                <p>{getTranslation(language, 'developer')} Shoaib</p>
                            </div>

                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    {getTranslation(language, 'cancel')}
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    {getTranslation(language, 'save')}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Settings component error:', error);
        reportError(error);
        return null;
    }
}

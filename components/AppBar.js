function AppBar({ darkMode, toggleDarkMode, openSettings }) {
    try {
        const [time, setTime] = React.useState(getCurrentTime());
        const [date, setDate] = React.useState('');

        React.useEffect(() => {
            const updateDateTime = () => {
                setTime(getCurrentTime());
                const now = new Date();
                const formattedDate = now.toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
                setDate(formattedDate);
            };

            updateDateTime(); // Initial update
            const timer = setInterval(updateDateTime, 60000); // Update every minute

            return () => clearInterval(timer);
        }, []);

        return (
            <div data-name="app-bar" className="flex items-center justify-between p-4 border-b bg-white bg-opacity-10 backdrop-blur-sm">
                <div data-name="datetime" className="datetime-display">
                    <span data-name="date" className="date-text">{date}</span>
                    <span data-name="time" className="time-text">{time}</span>
                </div>
                <h1 data-name="title" className="text-2xl font-bold">SkyPerk</h1>
                <div data-name="actions" className="flex items-center gap-4">
                    <button
                        data-name="theme-toggle"
                        onClick={toggleDarkMode}
                        className="text-xl"
                    >
                        {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
                    </button>
                    <button
                        data-name="settings-button"
                        onClick={openSettings}
                        className="text-xl"
                    >
                        <i className="fas fa-cog"></i>
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('AppBar component error:', error);
        reportError(error);
        return null;
    }
}

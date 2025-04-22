function SearchSection({ onSearch, onLocationSearch }) {
    try {
        const [query, setQuery] = React.useState('');

        const handleSearch = (e) => {
            e.preventDefault();
            if (query.trim()) {
                onSearch(query);
            }
        };

        const handleLocationClick = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        onLocationSearch(position.coords.latitude, position.coords.longitude);
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                        alert('Unable to get your location. Please try searching for a city instead.');
                    }
                );
            } else {
                alert('Geolocation is not supported by your browser');
            }
        };

        return (
            <div data-name="search-section" className="my-6">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                        data-name="search-input"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for a city..."
                        className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        data-name="search-button"
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        <i className="fas fa-search"></i>
                    </button>
                    <button
                        data-name="location-button"
                        type="button"
                        onClick={handleLocationClick}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        <i className="fas fa-location-dot"></i>
                    </button>
                </form>
            </div>
        );
    } catch (error) {
        console.error('SearchSection component error:', error);
        reportError(error);
        return null;
    }
}

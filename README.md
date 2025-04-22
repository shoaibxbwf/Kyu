# SkyPerk Weather App

A beautiful weather application built with React that provides accurate weather forecasts.

## Features

- Real-time weather data
- Hourly and daily forecasts
- Multiple language support
- Dark/Light mode
- Temperature unit conversion
- Battery saving mode
- Responsive design

## Deployment Instructions

1. Fork this repository
2. Go to repository Settings
3. Navigate to Pages section
4. Under "Source", select "Deploy from a branch"
5. Select "main" branch and "/ (root)" folder
6. Click Save
7. Wait a few minutes for the deployment to complete
8. Your site will be available at `https://[your-username].github.io/[repo-name]/`

## Local Development

1. Clone the repository
2. Open index.html in your browser
3. No build process required!

## File Structure


/
├── index.html          # Main entry point
├── .nojekyll          # Prevents GitHub Pages from ignoring underscore files
├── styles/            # CSS files
│   ├── main.css
│   ├── weather-cards.css
│   └── settings.css
├── utils/             # Utility functions
│   ├── translations.js
│   ├── weatherApi.js
│   └── dateUtils.js
└── components/        # React components
    ├── AppBar.js
    ├── SearchSection.js
    ├── WeatherOverview.js
    ├── HourlyForecast.js
    ├── DailyForecast.js
    └── Settings.js


## Technologies Used

- React 18
- TailwindCSS
- OpenWeather API
- Font Awesome Icons

## Note

Make sure to keep all file paths relative to the root directory when deploying to GitHub Pages.

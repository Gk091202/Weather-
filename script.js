// script.js

const API_KEY = '8bdfb69b42ceb60d56b9625a651be474'; // Replace with your OpenWeatherMap API Key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const saveFavoriteBtn = document.getElementById('save-favorite');
const favoritesList = document.getElementById('favorites-list');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Fetch weather data
async function fetchWeather(city) {
    try {
        const response = await fetch(`${API_URL}?q=${city}&units=metric&appid=${API_KEY}`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        updateWeatherDisplay(data);
    } catch (error) {
        alert(error.message);
    }
}

// Update weather display
function updateWeatherDisplay(data) {
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    condition.textContent = `Condition: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} km/h`;
}

// Save to favorites
function saveToFavorites() {
    const city = cityName.textContent;
    if (!favorites.includes(city)) {
        favorites.push(city);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorites();
    }
}

// Render favorites list
function renderFavorites() {
    favoritesList.innerHTML = '';
    favorites.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            favorites = favorites.filter(fav => fav !== city);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            renderFavorites();
        });
        li.appendChild(removeBtn);
        favoritesList.appendChild(li);
    });
}

// Event listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
});

saveFavoriteBtn.addEventListener('click', saveToFavorites);

// Initial render of favorites
renderFavorites();

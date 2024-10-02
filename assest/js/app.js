"use strict";

const apiKey = "ea722aa3ba506b97dcbb424a1c9a8722";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const forecastSection = document.querySelector("[data-forecast-section]");

searchBtn.addEventListener("click", () => {
    const city = searchBox.value;
    if (city) {
        getWeather(city);
        getForecast(city);
    }
});

function getWeather(city) {
    fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
    const cityName = document.querySelector(".weather .city");
    const temperature = document.querySelector(".weather .temp");
    const weatherIcon = document.querySelector(".weather-icon");
    const weatherDescription = document.querySelector(".weather .description");
    const humidity = document.querySelector(".weather .humidity");
    const wind = document.querySelector(".weather .wind");

    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherIcon.src = `./assets/images/weather_icons/${data.weather[0].icon}.png`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind Speed: ${data.wind.speed} km/h`;
}

function getForecast(city) {
    fetch(`${forecastUrl}?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayForecast(data))
        .catch(error => console.error('Error fetching forecast data:', error));
}

function displayForecast(data) {
    const forecastList = data.list;

    // Clear previous forecast
    forecastSection.querySelector("[data-forecast-list]").innerHTML = "";

    // Loop through the forecast data (filtering for every 3-hour forecast)
    for (let i = 7, len = forecastList.length; i < len; i += 8) {
        const { main: { temp_max }, weather, dt_txt } = forecastList[i];
        const [{ icon, description }] = weather;

        // Convert dt_txt (UTC) to a local Date object
        const date = new Date(dt_txt);
        
        // Format the date for display (weekdays and numeric date)
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        const formattedDate = date.toLocaleDateString(undefined, options); // Locale-aware formatting

        const dayOfMonth = date.getDate();  // Day number (1-31)
        const monthName = date.toLocaleString(undefined, { month: 'short' });  // Month abbreviation (Jan, Feb)
        const dayName = date.toLocaleString(undefined, { weekday: 'long' });  // Full weekday name (Monday, etc.)

        const li = document.createElement("li");
        li.classList.add("card-item");
        li.innerHTML = `
            <div class="icon-wrapper">
                <img src="./assets/images/weather_icons/${icon}.png" width="36" height="36" alt="${description}" class="weather-icon">
                <span class="span">
                    <p class="title-2">${parseInt(temp_max)}&deg;</p>
                </span>
            </div>
            <p class="label-1">${dayOfMonth} ${monthName}</p>
            <p class="label-1">${dayName}</p>
        `;
        forecastSection.querySelector("[data-forecast-list]").appendChild(li);
    }
}

//Show current date and time
function formatDate(timeDate) {
  let data = new Date(timeDate);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let weekDay = days[data.getDay()];

  let hour = data.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = data.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = data.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let month = data.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let year = data.getFullYear();

  let currentTime = document.querySelector("#time");
  currentTime.innerHTML = `${weekDay}, ${hour}:${minutes}`;
  let currentData = document.querySelector("#data");
  currentData.innerHTML = `${day}/${month}/${year}`;
}

//show current weather
function displayWeather(response) {
  let temperature = document.querySelector("#temperature");
  currentTemp = response.data.main.temp;
  temperature.innerHTML = Math.round(currentTemp);

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", `${response.data.weather[0].description}`);

  formatDate(response.data.dt * 1000);
  getForecast(response.data.coord);
}

//Login-page city
function loginCity(city) {
  let apiKey = "fff7fbe34f6b248c3ba3dfbbe41d297f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

//Find City
function requestCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-city").value;
  loginCity(inputCity);
}

let searchCity = document.querySelector("#current-location");
searchCity.addEventListener("submit", requestCity);

//Button current position
function findLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;

  let apiKey = "a10a0170b2b74ca0a0d676fee6b55a41";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

let currentLocationBtn = document.querySelector("#current-position");
currentLocationBtn.addEventListener("click", currentPosition);

//forecast days
function formatDay(timestamp) {
  let date = new Date(timestamp);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//forecast
function displayForecast(response) {
  let forecastDaily = response.data.daily;
  let forecastElement = document.querySelector(".forecast-wrapper");

  let forecast = `<div class="row">`;
  forecastDaily.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecast =
        forecast +
        ` <div class="col-2">
              <div class="forecast-day">${formatDay(
                forecastDay.dt * 1000
              )}</div>
              <img
               src="http://openweathermap.org/img/wn/${
                 forecastDay.weather[0].icon
               }@2x.png"
                alt="forecast image"
                class="forecast-image"
              />
              <div class="forecast-temp">
                <span class="forecast-temp-day">${Math.round(
                  forecastDay.temp.max
                )}°</span> /
                <span class="forecast-temp-night">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
            </div>`;
    }
  });

  forecast = forecast + ` </div>`;
  forecastElement.innerHTML = forecast;
}

//get call for forecast
function getForecast(coordinates) {
  let apiKey = "a10a0170b2b74ca0a0d676fee6b55a41";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let currentTemp = null;

loginCity("Porto");

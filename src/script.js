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

  formatDate(response.data.dt * 1000);

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  weatherIcon.setAttribute("alt", `${response.data.weather[0].description}`);
}

//Login-page city
function loginCity(city) {
  let apiKey = "ea2c48b1c8a418ed0296eb92935bdf5a";
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

  let apiKey = "ea2c48b1c8a418ed0296eb92935bdf5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

let currentLocationBtn = document.querySelector("#current-position");
currentLocationBtn.addEventListener("click", currentPosition);

//units conversion
function farenhToCelsius(event) {
  event.preventDefault();
  let fahrenheitTemp = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  fahrenheitTemp.innerHTML = Math.round(currentTemp);
}

function celsiusToFarenh(event) {
  event.preventDefault();
  let celsiusTemp = document.querySelector("#temperature");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  celsiusTemp.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
}

function displayForecast() {
  let forecastElement = document.querySelector(".forecast-wrapper");

  let days = ["Thu", "Fri", "Sat"];

  let forecast = `<div class="row">`;
  days.forEach(function (day) {
    forecast =
      forecast +
      ` <div class="col-2">
              <div class="forecast-day">${day}</div>
              <img
                src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
                alt="forecast image"
                class="forecast-image"
              />
              <div class="forecast-temp">
                <span class="forecast-temp-day">18°</span> /
                <span class="forecast-temp-night">12°</span>
              </div>
            </div>`;
  });

  forecast = forecast + ` </div>`;
  forecastElement.innerHTML = forecast;
}

let currentTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", celsiusToFarenh);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", farenhToCelsius);

loginCity("Porto");
displayForecast();

function formatDate(timeDate) {
  let data = new Date(timeDate);

  let hour = data.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = data.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let weekDay = days[data.getDay()];

  let year = data.getFullYear();
  let month = data.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = data.getDate();

  let currentTime = document.querySelector("#time");
  currentTime.innerHTML = `${weekDay}, ${hour}:${minutes}`;
  let currentData = document.querySelector("#data");
  currentData.innerHTML = `${day}/${month}/${year}`;
}

function displayWeather(response) {
  console.log(response.data);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let dateElement = document.querySelector("#time");
  dateElement = formatDate(response.data.dt * 1000);
}

let apiKey = "ea2c48b1c8a418ed0296eb92935bdf5a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Porto&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeather);

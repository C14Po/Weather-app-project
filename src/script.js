function formatDate(date) {
  let hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
  let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`;
}

function showSun(timestamp) {
  let date = new Date(timestamp);
  let hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
  let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  return `${hours}:${minutes}`
}

function showTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  
  celsiusTemp = response.data.main.temp;
  
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp); 
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#icon").setAttribute("alt", `http://openweathermap.org/img/wn/${response.data.weather[0].main}@2x.png`);
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed);
  document.querySelector("#hum").innerHTML = response.data.main.humidity;
  document.querySelector("#sun").innerHTML = showSun(response.data.sys.sunrise * 1000);
  document.querySelector("#moon").innerHTML = showSun(response.data.sys.sunset * 1000);
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[0];
  console.log(forecast);

  forecastElement.innerHTML = `
    <div class="col-2">
      <div class="card">
        <h5 class="card-title">12:00</h5>
          <img src= "http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" style="height: 70px; width: 70px;"></i>
          <div class="card-body">
          <div class="weather-forecast"><strong>${Math.round(forecast.main.temp_max)}°</strong> | ${Math.round(forecast.main.temp_min)}°
          </div>  
        </div>
      </div>
    </div>  
  `;

}

function searchCity(city) {
let apiKey = "e79392cca3f3cb28e460855640711538";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemp);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showForecast);
}

function handleSubmit(event) {
event.preventDefault();
let city = document.querySelector("#search-input").value;
searchCity(city);
}

function showPosition(position) {
  let apiKey = "e79392cca3f3cb28e460855640711538";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentPosition(event) {
  event.preventDefault();
navigator.geolocation.getCurrentPosition(showPosition); }

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  document.querySelector("#temperature").innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let currentTime = new Date();
document.querySelector("#date").innerHTML = formatDate(currentTime);

let currentInput = document.querySelector("#current-button");
currentInput.addEventListener("click", getCurrentPosition);

let searchInput = document.querySelector("#form-groups");
searchInput.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

searchCity("London");












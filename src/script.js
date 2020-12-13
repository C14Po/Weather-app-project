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
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp); 
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#icon").setAttribute("alt", `http://openweathermap.org/img/wn/${response.data.weather[0].main}@2x.png`);
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#hum").innerHTML = response.data.main.humidity;
  document.querySelector("#sun").innerHTML = showSun(response.data.sys.sunrise * 1000);
  document.querySelector("#moon").innerHTML = showSun(response.data.sys.sunset * 1000);

}

function searchCity(city) {
let apiKey = "e79392cca3f3cb28e460855640711538";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemp);
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

let currentTime = new Date();
document.querySelector("#date").innerHTML = formatDate(currentTime);

let currentInput = document.querySelector("button");
currentInput.addEventListener("click", getCurrentPosition);

let searchInput = document.querySelector("#form-groups");
searchInput.addEventListener("submit", handleSubmit);

searchCity("London");










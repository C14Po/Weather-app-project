function showTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp);
  
  document.querySelector("#hum").innerHTML = response.data.main.humidity;

  document.querySelector("#weather").innerHTML =
    response.data.weather[0].main;
  
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
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

//I don't know how to get the city displayed. It says Undefined

let currentInput = document.querySelector("button");
currentInput.addEventListener("click", getCurrentPosition);

let searchInput = document.querySelector("#form-groups");
searchInput.addEventListener("submit", handleSubmit);


let now = new Date();

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

document.querySelector("#date");
let day = days[now.getDay()];
let hour = (now.getHours() < 10 ? "0" : "") + now.getHours();
let minute = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();

date.innerHTML = `${day} ${hour}:${minute}`;

searchCity("London");










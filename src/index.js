const dateElement = document.querySelector('#date');
const currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', handleSubmit);

const currentLocationButton = document.querySelector(
  '#current-location-button'
);
currentLocationButton.addEventListener('click', getCurrentLocation);

function formatDate(date) {
  const hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  const minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  const dayIndex = date.getDay();
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(data) {
  document.querySelector('#city').innerHTML = data.name;
  document.querySelector('#temperature').innerHTML = Math.round(data.main.temp);

  document.querySelector('#humidity').innerHTML = data.main.humidity;
  document.querySelector('#wind').innerHTML = Math.round(data.wind.speed);
  document.querySelector('#description').innerHTML = data.weather[0].main;
}

async function searchCity(city) {
  const apiKey = '9495c714f520bcb779871edd95df57cd';
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  const data = await res.json();
  console.log(data.main.temp);
  return displayWeatherCondition(data);
}

function handleSubmit(event) {
  event.preventDefault();
  const cityInput = document.querySelector('#city-input');
  const city = cityInput.value;
  console.log(city);
  searchCity(city);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

async function searchLocation(position) {
  let apiKey = '9495c714f520bcb779871edd95df57cd';
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`
  );
  const data = await res.json();
  displayWeatherCondition(data);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector('#temperature');
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector('#temperature');
  temperatureElement.innerHTML = 19;
}

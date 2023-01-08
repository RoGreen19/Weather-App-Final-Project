//city search bar
function changeCityName(event) {
  event.preventDefault();
  let newCityName = document.querySelector("#search-new-city");
  let heading = document.querySelector("#city-name");
  heading.innerHTML = `${newCityName.value}`;

  findNewCityTemperature(newCityName.value);
  changeDateTime();
}

let formForCity = document.querySelector("#city-input");
formForCity.addEventListener("submit", changeCityName);

//time and date
function changeDateTime() {
  let today = new Date();

  let showDate = document.querySelector("#current-date");

  let date = today.getDate();
  if (date < 10) {
    date = `${date}`;
  }
  let month = today.getMonth();
  if (month < 10) {
    month = `${month}`;
  }

  showDate.innerHTML = `${date}/${month + 1}`;

  let showTime = document.querySelector("#current-time");

  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  showTime.innerHTML = `${hours}:${minutes}`;
}

//find weather for searching city
function findNewCityTemperature(cityName) {
  let apiKey = "670e88793852b42366cd8790c3445dbc";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";

  function showNewCityTemperature(responce) {
    //change weather
    let weather = responce.data.weather[0].description;
    let weatherDescription = weather[0].toUpperCase() + weather.slice(1);
    let weathertureInCurrentCity = document.querySelector("#current-forecast");
    weathertureInCurrentCity.innerHTML = `${weatherDescription}`;
    //change temperature
    let temperature = Math.round(responce.data.main.temp);
    let temperatureInCurrentCity = document.querySelector("#day-temperasture");
    temperatureInCurrentCity.innerHTML = `${temperature}°`;
    //change Humidity
    let humidity = responce.data.main.humidity;
    let humidityInCurrentCity = document.querySelector("#humidity");
    humidityInCurrentCity.innerHTML = `Humidity: ${humidity} %`;
    //change wind
    let wind = responce.data.wind.speed;
    let windInCurrentCity = document.querySelector("#wind");
    windInCurrentCity.innerHTML = `Wind: ${wind} km/h`;
  }

  axios
    .get(`${apiUrl}&q=${cityName}&appid=${apiKey}`)
    .then(showNewCityTemperature);
}

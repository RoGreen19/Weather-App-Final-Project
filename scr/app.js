//city search bar
function changeCityName(event) {
  event.preventDefault();
  let newCityName = document.querySelector("#search-new-city");
  let heading = document.querySelector("#city-name");
  heading.innerHTML = `${newCityName.value}`;
  changeDateTime();
  findNewCityTemperature(newCityName.value);
}

findNewCityTemperature("Kyiv");

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
  let apiKey = "cd173a006b0e51dac58c6d8064c94178";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showNewCityTemperature);
}

// 5 day forecast API
function getForecast(coordinates) {
  let apiKey = "cd173a006b0e51dac58c6d8064c94178";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showNewCityTemperature(responce) {
  console.log(responce.data);
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
  changeWeatherIcon(responce);

  getForecast(responce.data.coord);
}

function changeWeatherIcon(responce) {
  let weatherIcon = responce.data.weather[0].id;
  let newCityWeatherIcon = document.querySelector(".weather-img-current");
  console.log(weatherIcon);
  if (232 >= weatherIcon && weatherIcon >= 200) {
    newCityWeatherIcon.setAttribute("src", "scr/200-232.png");
  } else if (321 >= weatherIcon && weatherIcon >= 300) {
    newCityWeatherIcon.setAttribute("src", "scr/300-321_511-531.png");
  } else if (531 >= weatherIcon && weatherIcon >= 511) {
    newCityWeatherIcon.setAttribute("src", "scr/300-321_511-531.png");
  } else if (504 >= weatherIcon && weatherIcon >= 500) {
    newCityWeatherIcon.setAttribute("src", "scr/500-504.png");
  } else if (622 >= weatherIcon && weatherIcon >= 600) {
    newCityWeatherIcon.setAttribute("src", "scr/600-622.png");
  } else if (781 >= weatherIcon && weatherIcon >= 701) {
    newCityWeatherIcon.setAttribute("src", "scr/701-781_802-804.png");
  } else if (804 >= weatherIcon && weatherIcon >= 802) {
    newCityWeatherIcon.setAttribute("src", "scr/701-781_802-804.png");
  } else if (weatherIcon === 801) {
    newCityWeatherIcon.setAttribute("src", "scr/801.png");
  } else {
    newCityWeatherIcon.setAttribute("src", "scr/800.png");
  }

  console.log(responce.data.weather[0].id);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

// 5 day forecast
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecast = response.data.daily;

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">

              <p class="weekdate-one-name">${formatDay(forecastDay.dt)}</p>
              <br />
              <img class="week-weather-icon" src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"/>
              <br/>
              <p class="weekdate-one-temperature"><span class="max-temperature">${Math.round(
                forecastDay.temp.max
              )}°</span><span class="min-temperature">/${Math.round(
          forecastDay.temp.min
        )}°</span></p>
            </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

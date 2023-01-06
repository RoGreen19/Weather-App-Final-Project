let apiUrl =
  "https://api.shecodes.io/weather/v1/current?query={query}&key=60fc5efd230t13235e79o41fdacbb6e0&units=metric";

axios.get(apiUrl).then(displayTemperature);

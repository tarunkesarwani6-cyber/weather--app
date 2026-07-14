let weather = {
  apiKey: "2b3356f8169aa77f26e91c4103f8ad07",
  fetchWeather: function (city) {
    city = city.trim();
    if (!city) return;

    document.querySelector(".weather").classList.add("loading");

    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        encodeURIComponent(city) +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) =>
        response.json().then((data) => ({ response, data }))
      )
      .then(({ response, data }) => {
        if (!response.ok) {
          if (response.status === 401) {
            alert(
              "Invalid API key. If you just created it, wait up to 2 hours for activation."
            );
          } else {
            alert("No weather found.");
          }
          throw new Error(data.message || "Request failed");
        }
        this.displayWeather(data);
      })
      .catch(() => {
        document.querySelector(".weather").classList.remove("loading");
      });
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Denver");

const themeToggle = document.querySelector(".theme-toggle");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

themeToggle.addEventListener("click", function () {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  applyTheme(currentTheme === "dark" ? "light" : "dark");
});

let weather = {
    "apikey": "0edcdc851803170aba688ec3739da253",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city
        + "&units=metric&appid="
        +this.apikey
        )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data)=>this.dispalyWeather(data))
    },
    dispalyWeather: function(data){
        const {name}=data;
        const {icon,description}=data.weather[0];        
        const {temp,humidity,feels_like}=data.main;        
        const {speed}=data.wind; 
        const {country}=data.sys; 
        console.log(name,icon,description,temp,humidity,speed)       
        document.querySelector(".city").innerText = "Weather in " + name
        document.querySelector(".descrip").innerText = description;
        document.querySelector(".country").innerText = country;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".feel").innerText = "feels like: "+Math.floor(feels_like) + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
        // document.querySelector(".weather").classList.remove("loading");
        //  document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector("#search_bar").value);
      },
};
document.querySelector("#btn").addEventListener("click", function () {
    weather.search();
  });

  document.querySelector("#search_bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
      weather.search();
    }
  });
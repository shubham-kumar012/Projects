const apiKey = "d3dbf8930568543e3a47a4d9beced621";
let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&limit=1&appid=`;
let urlPlace = "http://api.openweathermap.org/geo/1.0/direct?limit=1&appid=";
let cityName;

const searchBtn = document.querySelector("#search-btn");
const inputBox = document.querySelector("input");
const weatherIcon = document.querySelector("#weather-icon");


async function checkWeather(cityName) {

    try {
        
        let res = await axios.get(url+apiKey+"&q="+cityName);
        let resPlace = await axios.get(urlPlace+apiKey+"&q="+cityName);
        console.log(res);
        
        cityName = resPlace.data[0].name;
        let state = resPlace.data[0].state;
        let temp = Math.floor(res.data.main.temp);
        let weatherCondition = res.data.weather[0].main;
        let humidity = res.data.main.humidity;
        let windSpeed = Math.floor(res.data.wind.speed);
        
        if(!state) {
            state = cityName;
        }
        
        document.querySelector("#weather-temp").innerText = `${temp}°C`;
        document.querySelector("#weather-condition").innerText = weatherCondition;
        document.querySelector("#city").innerText = cityName;
        document.querySelector("#state").innerText = state;
        document.querySelector("#humidity-value").innerText = humidity;
        document.querySelector("#wind-value").innerText = `${windSpeed} Km/h`;
        
        document.querySelector(".weather-container").style.display = "flex";
        document.querySelector(".error").style.display = "none";

        if(weatherCondition == "Clouds") {
            weatherIcon.src = "images/clouds.png";
            document.querySelectorAll("body").style.backgroundColor = "#5B5F62";
            document.querySelectorAll("html").style.backgroundColor = "#5B5F62";

        }
        else if(weatherCondition == "Clear") {
            weatherIcon.src = "images/clear.png";
        }
        else if(weatherCondition == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
            document.querySelector("body").style.backgroundColor = "#454749";
            document.querySelectorAll("html").style.backgroundColor = "#454749";

        }
        else if(weatherCondition == "Mist") {
            weatherIcon.src = "images/mist.png";
        }
        else if(weatherCondition == "Rain") {
            weatherIcon.src = "images/rain.png";
            document.querySelector("body").style.backgroundColor = "#454749";
            document.querySelector("html").style.backgroundColor = "#454749";

        }
        else if(weatherCondition == "Snow") {
            weatherIcon.src = "images/snow.png";
            document.querySelector("body").style.backgroundColor = "#5B5F62";
            document.querySelector("html").style.backgroundColor = "#5B5F62";
        }

        document.querySelector(".weather-container").style.display = "flex";
        document.querySelector(".error").style.display = "none";
        

    }
    catch(e) {
        console.log(e);
        if(e.status == 404) {
                document.querySelector(".error").style.display = "flex";
            document.querySelector(".error").classList.add("shake");

            setTimeout(() => {
                document.querySelector(".error").classList.remove("shake");
            }, 400); 
        } 
           
    }


    console.log("hello")
}



searchBtn.addEventListener("click", () =>  {
    checkWeather(inputBox.value);
})





import { fetchWeather } from "./weatherData";

const temperature = document.querySelector(".temp")
const locationCity = document.querySelector(".city");
const locationCountry = document.querySelector(".country");
const precipitation = document.querySelector(".precipitation");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const day = document.querySelector(".day");
const date = document.querySelector(".date");
const weatherIcon = document.querySelector(".icon");
const background = document.querySelector("video");
const searchForm = document.querySelector(".search");
const searchBox = document.querySelector("input");

let unit = true;
let city;


async function updateWeather(city, unit){
    const data = (await fetchWeather(city, unit));
    if(data == "Error"){
        alert("Enter Valid City");
        return
    }
    day.textContent = `${data.day},`;
    date.textContent = data.date;
    temperature.textContent = data.temp;  
    locationCity.textContent = data.city;
    locationCountry.textContent = data.country;
    precipitation.textContent = `Precipitation: ${data.precipitation}`;
    humidity.textContent = `Humidity: ${data.humidity}`;
    wind.textContent = `Wind: ${data.wind}`;
    if (data.code < 1003){
        weatherIcon.setAttribute("src", "assets/sunny.png");
        background.setAttribute("src", "assets/sunny.mp4");
    }
    if(data.code >= 1003 && data.code < 1030){
        weatherIcon.setAttribute("src", "assets/cloudy.png");
        background.setAttribute("src", "assets/cloudy.mp4");
    }
    if((data.code >= 1063 && data.code < 1066) || (data.code == 1072) ||(data.code >= 1150 && data.code <= 1201) || (data.code >= 1240 && data.code <= 1246)){
        weatherIcon.setAttribute("src", "assets/rainy.png")
        background.setAttribute("src", "assets/rainy.mp4");
    }
    if((data.code >=1066 && data.code <= 1069) || data.code == 1114 || data.code == 1117 || (data.code >= 1204 && data.code <= 1237) || (data.code >= 1249 && data.code <= 1264)){
        weatherIcon.setAttribute("src", "assets/snow.png");
        background.setAttribute("src", "assets/snowy.mp4");
    }
    if((data.code == 1087) || (data.code >= 1273 && data.code <= 1282)){
        weatherIcon.setAttribute("src", "assets/thunder.png");
        background.setAttribute("src", "assets/thunder.mp4");
    }
    if(data.code == 1030 || data.code == 1135 || data.code == 1147){
        weatherIcon.setAttribute("src", "assets/foggy.png");
        background.setAttribute("src", "assets/foggy.mp4");
    }

}

navigator.geolocation.getCurrentPosition(async (result) =>{
    const location = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${result.coords.latitude}&lon=${result.coords.longitude}&limit=2&appid=eb7481b569caea24412ac6a99018b5bc`);
    const locationData = await location.json();
    city = locationData[0].name;
    updateWeather(city, unit);
}, (error)=>{
    city = "bhopal";
    updateWeather(city, unit);
});


searchForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    city = searchBox.value;
    updateWeather(city, unit);
    searchBox.value = "";
})

temperature.addEventListener("click", () =>{
    unit = !unit;
    updateWeather(city, unit);
} )

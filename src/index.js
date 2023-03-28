import { fetchWeather } from "./weatherData";

async function meow(){
    console.log(await fetchWeather("bhopal"));
}
meow();


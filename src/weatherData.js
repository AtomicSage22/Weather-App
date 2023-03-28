export const  fetchWeather = async (city) =>{
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=3cbf4f7a5dac4b9cacb43804232403&q=${city}`)
    const data = await response.json()
    console.log(data);
    return data;
}

class WeatherData{
    constructor(conditions, feelsLike_c, feelsLike_f, windspeed){
        this.conditions = conditions;
        this.feelsLike_c = feelsLike_c;
        this.feelsLike_f = feelsLike_f;
        this.windspeed = windspeed;
    }
}

export const currentWeather = async (city) =>{
    const data = await fetchWeather(city);
    const weather = new WeatherData(data.current.condition.text, data.current.feelslike_c, data.current.feelslike_f, data.current.wind_kph)
    console.log(weather);
}
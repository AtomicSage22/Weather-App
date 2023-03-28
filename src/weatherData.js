export const fetchWeather = async (city, unit) =>{
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=3cbf4f7a5dac4b9cacb43804232403&q=${city}`)
    const data = await response.json()
    console.log(data);
    if (unit == 1){
        return {
            condition: data.current.condition.text,
            temp_c: data.current.temp_c
        };
    }
    else{
        return {
            condition: data.current.condition.text,
            temp_f: data.current.temp_f
        }
    }
}

// class WeatherData{
//     constructor(conditions, temp_c, temp_f, windspeed){
//         this.conditions = conditions;
//         this.temp_c = temp_c;
//         this.temp_f = temp_f;
//         this.windspeed = windspeed;
//     }
// }

// export const currentWeather = async (city) =>{
//     const data = await fetchWeather(city);
//     const weather = new WeatherData(data.current.condition.text, data.current.temp_c, data.current.feelslike_f, data.current.wind_kph)
//     return weather;
// }
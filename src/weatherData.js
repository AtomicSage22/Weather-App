export const fetchWeather = async (city, unit) =>{
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=3cbf4f7a5dac4b9cacb43804232403&q=${city}`)
    const data = await response.json()
    console.log(data);
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const date = new Date(data.location.localtime);
    if (unit == true){
        return {
            code: data.current.condition.code,
            day: weekDays[date.getDay()],
            date: `${date.getDate()}  ${months[date.getMonth()]}`,
            precipitation: `${data.current.precip_mm}mm`,
            humidity: data.current.humidity,
            wind: `${data.current.wind_kph}kph`,
            city: data.location.name,
            country: data.location.country,
            condition: data.current.condition.text,
            temp_c: `${data.current.temp_c}°C`
        };
    }
    else{
        return {
            code: data.current.condition.code,
            day: weekDays[date.getDay()],
            date: date.getDate(),
            precipitation: `${data.current.precip_in}in`,
            humidity: data.current.humidity,
            wind: `${data.current.wind_mph}mph`,
            city: data.location.name,
            country: data.location.country,
            condition: data.current.condition.text,
            temp_f: `${data.current.temp_f}°F`
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
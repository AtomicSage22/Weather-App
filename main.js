/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/weatherData.js":
/*!****************************!*\
  !*** ./src/weatherData.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchWeather": () => (/* binding */ fetchWeather)
/* harmony export */ });
const fetchWeather = async (city, unit) =>{
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _weatherData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weatherData */ "./src/weatherData.js");


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
let city = "bhopal"

async function updateWeather(city, unit){
    const data = (await (0,_weatherData__WEBPACK_IMPORTED_MODULE_0__.fetchWeather)(city, unit));
    console.log(data.date);
    day.textContent = `${data.day},`;
    date.textContent = data.date;
    temperature.textContent = data.temp_c;  
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
updateWeather(city, unit);

searchForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    console.log("meow")
    updateWeather(searchBox.value, unit);
    searchBox.value = "";
})

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1Asb0hBQW9ILEtBQUs7QUFDekg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlCQUFpQixFQUFFLHdCQUF3QjtBQUNoRSw4QkFBOEIsdUJBQXVCO0FBQ3JEO0FBQ0EscUJBQXFCLHNCQUFzQjtBQUMzQztBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHVCQUF1QjtBQUNyRDtBQUNBLHFCQUFxQixzQkFBc0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ2xEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QiwwREFBWTtBQUNwQztBQUNBLHlCQUF5QixTQUFTO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELG1CQUFtQjtBQUNyRSx3Q0FBd0MsY0FBYztBQUN0RCxnQ0FBZ0MsVUFBVTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvd2VhdGhlckRhdGEuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZmV0Y2hXZWF0aGVyID0gYXN5bmMgKGNpdHksIHVuaXQpID0+e1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvY3VycmVudC5qc29uP2tleT0zY2JmNGY3YTVkYWM0YjljYWNiNDM4MDQyMzI0MDMmcT0ke2NpdHl9YClcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgY29uc3Qgd2Vla0RheXMgPSBbXCJTdW5cIiwgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIl07XHJcbiAgICBjb25zdCBtb250aHMgPSBbXCJKYW51YXJ5XCIsXCJGZWJydWFyeVwiLFwiTWFyY2hcIixcIkFwcmlsXCIsXCJNYXlcIixcIkp1bmVcIixcIkp1bHlcIixcIkF1Z3VzdFwiLFwiU2VwdGVtYmVyXCIsXCJPY3RvYmVyXCIsXCJOb3ZlbWJlclwiLFwiRGVjZW1iZXJcIl07XHJcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWUpO1xyXG4gICAgaWYgKHVuaXQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29kZTogZGF0YS5jdXJyZW50LmNvbmRpdGlvbi5jb2RlLFxyXG4gICAgICAgICAgICBkYXk6IHdlZWtEYXlzW2RhdGUuZ2V0RGF5KCldLFxyXG4gICAgICAgICAgICBkYXRlOiBgJHtkYXRlLmdldERhdGUoKX0gICR7bW9udGhzW2RhdGUuZ2V0TW9udGgoKV19YCxcclxuICAgICAgICAgICAgcHJlY2lwaXRhdGlvbjogYCR7ZGF0YS5jdXJyZW50LnByZWNpcF9tbX1tbWAsXHJcbiAgICAgICAgICAgIGh1bWlkaXR5OiBkYXRhLmN1cnJlbnQuaHVtaWRpdHksXHJcbiAgICAgICAgICAgIHdpbmQ6IGAke2RhdGEuY3VycmVudC53aW5kX2twaH1rcGhgLFxyXG4gICAgICAgICAgICBjaXR5OiBkYXRhLmxvY2F0aW9uLm5hbWUsXHJcbiAgICAgICAgICAgIGNvdW50cnk6IGRhdGEubG9jYXRpb24uY291bnRyeSxcclxuICAgICAgICAgICAgY29uZGl0aW9uOiBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHQsXHJcbiAgICAgICAgICAgIHRlbXBfYzogYCR7ZGF0YS5jdXJyZW50LnRlbXBfY33CsENgXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29kZTogZGF0YS5jdXJyZW50LmNvbmRpdGlvbi5jb2RlLFxyXG4gICAgICAgICAgICBkYXk6IHdlZWtEYXlzW2RhdGUuZ2V0RGF5KCldLFxyXG4gICAgICAgICAgICBkYXRlOiBkYXRlLmdldERhdGUoKSxcclxuICAgICAgICAgICAgcHJlY2lwaXRhdGlvbjogYCR7ZGF0YS5jdXJyZW50LnByZWNpcF9pbn1pbmAsXHJcbiAgICAgICAgICAgIGh1bWlkaXR5OiBkYXRhLmN1cnJlbnQuaHVtaWRpdHksXHJcbiAgICAgICAgICAgIHdpbmQ6IGAke2RhdGEuY3VycmVudC53aW5kX21waH1tcGhgLFxyXG4gICAgICAgICAgICBjaXR5OiBkYXRhLmxvY2F0aW9uLm5hbWUsXHJcbiAgICAgICAgICAgIGNvdW50cnk6IGRhdGEubG9jYXRpb24uY291bnRyeSxcclxuICAgICAgICAgICAgY29uZGl0aW9uOiBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHQsXHJcbiAgICAgICAgICAgIHRlbXBfZjogYCR7ZGF0YS5jdXJyZW50LnRlbXBfZn3CsEZgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBjbGFzcyBXZWF0aGVyRGF0YXtcclxuLy8gICAgIGNvbnN0cnVjdG9yKGNvbmRpdGlvbnMsIHRlbXBfYywgdGVtcF9mLCB3aW5kc3BlZWQpe1xyXG4vLyAgICAgICAgIHRoaXMuY29uZGl0aW9ucyA9IGNvbmRpdGlvbnM7XHJcbi8vICAgICAgICAgdGhpcy50ZW1wX2MgPSB0ZW1wX2M7XHJcbi8vICAgICAgICAgdGhpcy50ZW1wX2YgPSB0ZW1wX2Y7XHJcbi8vICAgICAgICAgdGhpcy53aW5kc3BlZWQgPSB3aW5kc3BlZWQ7XHJcbi8vICAgICB9XHJcbi8vIH1cclxuXHJcbi8vIGV4cG9ydCBjb25zdCBjdXJyZW50V2VhdGhlciA9IGFzeW5jIChjaXR5KSA9PntcclxuLy8gICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaFdlYXRoZXIoY2l0eSk7XHJcbi8vICAgICBjb25zdCB3ZWF0aGVyID0gbmV3IFdlYXRoZXJEYXRhKGRhdGEuY3VycmVudC5jb25kaXRpb24udGV4dCwgZGF0YS5jdXJyZW50LnRlbXBfYywgZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9mLCBkYXRhLmN1cnJlbnQud2luZF9rcGgpXHJcbi8vICAgICByZXR1cm4gd2VhdGhlcjtcclxuLy8gfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZmV0Y2hXZWF0aGVyIH0gZnJvbSBcIi4vd2VhdGhlckRhdGFcIjtcclxuXHJcbmNvbnN0IHRlbXBlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wXCIpXHJcbmNvbnN0IGxvY2F0aW9uQ2l0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2l0eVwiKTtcclxuY29uc3QgbG9jYXRpb25Db3VudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb3VudHJ5XCIpO1xyXG5jb25zdCBwcmVjaXBpdGF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVjaXBpdGF0aW9uXCIpO1xyXG5jb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaHVtaWRpdHlcIik7XHJcbmNvbnN0IHdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbmRcIik7XHJcbmNvbnN0IGRheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF5XCIpO1xyXG5jb25zdCBkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRlXCIpO1xyXG5jb25zdCB3ZWF0aGVySWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaWNvblwiKTtcclxuY29uc3QgYmFja2dyb3VuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKTtcclxuY29uc3Qgc2VhcmNoRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoXCIpO1xyXG5jb25zdCBzZWFyY2hCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XHJcblxyXG5sZXQgdW5pdCA9IHRydWU7XHJcbmxldCBjaXR5ID0gXCJiaG9wYWxcIlxyXG5cclxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlV2VhdGhlcihjaXR5LCB1bml0KXtcclxuICAgIGNvbnN0IGRhdGEgPSAoYXdhaXQgZmV0Y2hXZWF0aGVyKGNpdHksIHVuaXQpKTtcclxuICAgIGNvbnNvbGUubG9nKGRhdGEuZGF0ZSk7XHJcbiAgICBkYXkudGV4dENvbnRlbnQgPSBgJHtkYXRhLmRheX0sYDtcclxuICAgIGRhdGUudGV4dENvbnRlbnQgPSBkYXRhLmRhdGU7XHJcbiAgICB0ZW1wZXJhdHVyZS50ZXh0Q29udGVudCA9IGRhdGEudGVtcF9jOyAgXHJcbiAgICBsb2NhdGlvbkNpdHkudGV4dENvbnRlbnQgPSBkYXRhLmNpdHk7XHJcbiAgICBsb2NhdGlvbkNvdW50cnkudGV4dENvbnRlbnQgPSBkYXRhLmNvdW50cnk7XHJcbiAgICBwcmVjaXBpdGF0aW9uLnRleHRDb250ZW50ID0gYFByZWNpcGl0YXRpb246ICR7ZGF0YS5wcmVjaXBpdGF0aW9ufWA7XHJcbiAgICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGBIdW1pZGl0eTogJHtkYXRhLmh1bWlkaXR5fWA7XHJcbiAgICB3aW5kLnRleHRDb250ZW50ID0gYFdpbmQ6ICR7ZGF0YS53aW5kfWA7XHJcbiAgICBpZiAoZGF0YS5jb2RlIDwgMTAwMyl7XHJcbiAgICAgICAgd2VhdGhlckljb24uc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiYXNzZXRzL3N1bm55LnBuZ1wiKTtcclxuICAgICAgICBiYWNrZ3JvdW5kLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImFzc2V0cy9zdW5ueS5tcDRcIik7XHJcbiAgICB9XHJcbiAgICBpZihkYXRhLmNvZGUgPj0gMTAwMyAmJiBkYXRhLmNvZGUgPCAxMDMwKXtcclxuICAgICAgICB3ZWF0aGVySWNvbi5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJhc3NldHMvY2xvdWR5LnBuZ1wiKTtcclxuICAgICAgICBiYWNrZ3JvdW5kLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImFzc2V0cy9jbG91ZHkubXA0XCIpO1xyXG4gICAgfVxyXG4gICAgaWYoKGRhdGEuY29kZSA+PSAxMDYzICYmIGRhdGEuY29kZSA8IDEwNjYpIHx8IChkYXRhLmNvZGUgPT0gMTA3MikgfHwoZGF0YS5jb2RlID49IDExNTAgJiYgZGF0YS5jb2RlIDw9IDEyMDEpIHx8IChkYXRhLmNvZGUgPj0gMTI0MCAmJiBkYXRhLmNvZGUgPD0gMTI0Nikpe1xyXG4gICAgICAgIHdlYXRoZXJJY29uLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImFzc2V0cy9yYWlueS5wbmdcIilcclxuICAgICAgICBiYWNrZ3JvdW5kLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImFzc2V0cy9yYWlueS5tcDRcIik7XHJcbiAgICB9XHJcbiAgICBpZigoZGF0YS5jb2RlID49MTA2NiAmJiBkYXRhLmNvZGUgPD0gMTA2OSkgfHwgZGF0YS5jb2RlID09IDExMTQgfHwgZGF0YS5jb2RlID09IDExMTcgfHwgKGRhdGEuY29kZSA+PSAxMjA0ICYmIGRhdGEuY29kZSA8PSAxMjM3KSB8fCAoZGF0YS5jb2RlID49IDEyNDkgJiYgZGF0YS5jb2RlIDw9IDEyNjQpKXtcclxuICAgICAgICB3ZWF0aGVySWNvbi5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJhc3NldHMvc25vdy5wbmdcIik7XHJcbiAgICAgICAgYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJhc3NldHMvc25vd3kubXA0XCIpO1xyXG4gICAgfVxyXG4gICAgaWYoKGRhdGEuY29kZSA9PSAxMDg3KSB8fCAoZGF0YS5jb2RlID49IDEyNzMgJiYgZGF0YS5jb2RlIDw9IDEyODIpKXtcclxuICAgICAgICB3ZWF0aGVySWNvbi5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJhc3NldHMvdGh1bmRlci5wbmdcIik7XHJcbiAgICAgICAgYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJhc3NldHMvdGh1bmRlci5tcDRcIik7XHJcbiAgICB9XHJcbiAgICBpZihkYXRhLmNvZGUgPT0gMTAzMCB8fCBkYXRhLmNvZGUgPT0gMTEzNSB8fCBkYXRhLmNvZGUgPT0gMTE0Nyl7XHJcbiAgICAgICAgd2VhdGhlckljb24uc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiYXNzZXRzL2ZvZ2d5LnBuZ1wiKTtcclxuICAgICAgICBiYWNrZ3JvdW5kLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImFzc2V0cy9mb2dneS5tcDRcIik7XHJcbiAgICB9XHJcblxyXG59XHJcbnVwZGF0ZVdlYXRoZXIoY2l0eSwgdW5pdCk7XHJcblxyXG5zZWFyY2hGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+e1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc29sZS5sb2coXCJtZW93XCIpXHJcbiAgICB1cGRhdGVXZWF0aGVyKHNlYXJjaEJveC52YWx1ZSwgdW5pdCk7XHJcbiAgICBzZWFyY2hCb3gudmFsdWUgPSBcIlwiO1xyXG59KVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
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
    if(data.hasOwnProperty("error")){
        return "Error";
    }
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
            temp: `${data.current.temp_c}°C`
        };
    }
    else{
        return {
            code: data.current.condition.code,
            day: weekDays[date.getDay()],
            date: `${date.getDate()}  ${months[date.getMonth()]}`,
            precipitation: `${data.current.precip_in}in`,
            humidity: data.current.humidity,
            wind: `${data.current.wind_mph}mph`,
            city: data.location.name,
            country: data.location.country,
            condition: data.current.condition.text,
            temp: `${data.current.temp_f}°F`
        }
    }
}




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
updateWeather(city, unit);

searchForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    console.log("meow")
    city = searchBox.value;
    updateWeather(city, unit);
    searchBox.value = "";
})

temperature.addEventListener("click", () =>{
    unit = !unit;
    updateWeather(city, unit);
    
} )

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1Asb0hBQW9ILEtBQUs7QUFDekg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQkFBaUIsRUFBRSx3QkFBd0I7QUFDaEUsOEJBQThCLHVCQUF1QjtBQUNyRDtBQUNBLHFCQUFxQixzQkFBc0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG9CQUFvQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsaUJBQWlCLEVBQUUsd0JBQXdCO0FBQ2hFLDhCQUE4Qix1QkFBdUI7QUFDckQ7QUFDQSxxQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixvQkFBb0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3ZDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDBEQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLFNBQVM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsbUJBQW1CO0FBQ3JFLHdDQUF3QyxjQUFjO0FBQ3RELGdDQUFnQyxVQUFVO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvd2VhdGhlckRhdGEuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZmV0Y2hXZWF0aGVyID0gYXN5bmMgKGNpdHksIHVuaXQpID0+e1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvY3VycmVudC5qc29uP2tleT0zY2JmNGY3YTVkYWM0YjljYWNiNDM4MDQyMzI0MDMmcT0ke2NpdHl9YClcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuICAgIGlmKGRhdGEuaGFzT3duUHJvcGVydHkoXCJlcnJvclwiKSl7XHJcbiAgICAgICAgcmV0dXJuIFwiRXJyb3JcIjtcclxuICAgIH1cclxuICAgIGNvbnN0IHdlZWtEYXlzID0gW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdO1xyXG4gICAgY29uc3QgbW9udGhzID0gW1wiSmFudWFyeVwiLFwiRmVicnVhcnlcIixcIk1hcmNoXCIsXCJBcHJpbFwiLFwiTWF5XCIsXCJKdW5lXCIsXCJKdWx5XCIsXCJBdWd1c3RcIixcIlNlcHRlbWJlclwiLFwiT2N0b2JlclwiLFwiTm92ZW1iZXJcIixcIkRlY2VtYmVyXCJdO1xyXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGEubG9jYXRpb24ubG9jYWx0aW1lKTtcclxuICAgIGlmICh1bml0ID09IHRydWUpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvZGU6IGRhdGEuY3VycmVudC5jb25kaXRpb24uY29kZSxcclxuICAgICAgICAgICAgZGF5OiB3ZWVrRGF5c1tkYXRlLmdldERheSgpXSxcclxuICAgICAgICAgICAgZGF0ZTogYCR7ZGF0ZS5nZXREYXRlKCl9ICAke21vbnRoc1tkYXRlLmdldE1vbnRoKCldfWAsXHJcbiAgICAgICAgICAgIHByZWNpcGl0YXRpb246IGAke2RhdGEuY3VycmVudC5wcmVjaXBfbW19bW1gLFxyXG4gICAgICAgICAgICBodW1pZGl0eTogZGF0YS5jdXJyZW50Lmh1bWlkaXR5LFxyXG4gICAgICAgICAgICB3aW5kOiBgJHtkYXRhLmN1cnJlbnQud2luZF9rcGh9a3BoYCxcclxuICAgICAgICAgICAgY2l0eTogZGF0YS5sb2NhdGlvbi5uYW1lLFxyXG4gICAgICAgICAgICBjb3VudHJ5OiBkYXRhLmxvY2F0aW9uLmNvdW50cnksXHJcbiAgICAgICAgICAgIGNvbmRpdGlvbjogZGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0LFxyXG4gICAgICAgICAgICB0ZW1wOiBgJHtkYXRhLmN1cnJlbnQudGVtcF9jfcKwQ2BcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2RlOiBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLmNvZGUsXHJcbiAgICAgICAgICAgIGRheTogd2Vla0RheXNbZGF0ZS5nZXREYXkoKV0sXHJcbiAgICAgICAgICAgIGRhdGU6IGAke2RhdGUuZ2V0RGF0ZSgpfSAgJHttb250aHNbZGF0ZS5nZXRNb250aCgpXX1gLFxyXG4gICAgICAgICAgICBwcmVjaXBpdGF0aW9uOiBgJHtkYXRhLmN1cnJlbnQucHJlY2lwX2lufWluYCxcclxuICAgICAgICAgICAgaHVtaWRpdHk6IGRhdGEuY3VycmVudC5odW1pZGl0eSxcclxuICAgICAgICAgICAgd2luZDogYCR7ZGF0YS5jdXJyZW50LndpbmRfbXBofW1waGAsXHJcbiAgICAgICAgICAgIGNpdHk6IGRhdGEubG9jYXRpb24ubmFtZSxcclxuICAgICAgICAgICAgY291bnRyeTogZGF0YS5sb2NhdGlvbi5jb3VudHJ5LFxyXG4gICAgICAgICAgICBjb25kaXRpb246IGRhdGEuY3VycmVudC5jb25kaXRpb24udGV4dCxcclxuICAgICAgICAgICAgdGVtcDogYCR7ZGF0YS5jdXJyZW50LnRlbXBfZn3CsEZgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBmZXRjaFdlYXRoZXIgfSBmcm9tIFwiLi93ZWF0aGVyRGF0YVwiO1xyXG5cclxuY29uc3QgdGVtcGVyYXR1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBcIilcclxuY29uc3QgbG9jYXRpb25DaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaXR5XCIpO1xyXG5jb25zdCBsb2NhdGlvbkNvdW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvdW50cnlcIik7XHJcbmNvbnN0IHByZWNpcGl0YXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWNpcGl0YXRpb25cIik7XHJcbmNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5odW1pZGl0eVwiKTtcclxuY29uc3Qgd2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2luZFwiKTtcclxuY29uc3QgZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXlcIik7XHJcbmNvbnN0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGVcIik7XHJcbmNvbnN0IHdlYXRoZXJJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pY29uXCIpO1xyXG5jb25zdCBiYWNrZ3JvdW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpO1xyXG5jb25zdCBzZWFyY2hGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2hcIik7XHJcbmNvbnN0IHNlYXJjaEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcclxuXHJcbmxldCB1bml0ID0gdHJ1ZTtcclxubGV0IGNpdHkgPSBcImJob3BhbFwiXHJcblxyXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVXZWF0aGVyKGNpdHksIHVuaXQpe1xyXG4gICAgXHJcbiAgICBjb25zdCBkYXRhID0gKGF3YWl0IGZldGNoV2VhdGhlcihjaXR5LCB1bml0KSk7XHJcbiAgICBpZihkYXRhID09IFwiRXJyb3JcIil7XHJcbiAgICAgICAgYWxlcnQoXCJFbnRlciBWYWxpZCBDaXR5XCIpO1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgZGF5LnRleHRDb250ZW50ID0gYCR7ZGF0YS5kYXl9LGA7XHJcbiAgICBkYXRlLnRleHRDb250ZW50ID0gZGF0YS5kYXRlO1xyXG4gICAgdGVtcGVyYXR1cmUudGV4dENvbnRlbnQgPSBkYXRhLnRlbXA7ICBcclxuICAgIGxvY2F0aW9uQ2l0eS50ZXh0Q29udGVudCA9IGRhdGEuY2l0eTtcclxuICAgIGxvY2F0aW9uQ291bnRyeS50ZXh0Q29udGVudCA9IGRhdGEuY291bnRyeTtcclxuICAgIHByZWNpcGl0YXRpb24udGV4dENvbnRlbnQgPSBgUHJlY2lwaXRhdGlvbjogJHtkYXRhLnByZWNpcGl0YXRpb259YDtcclxuICAgIGh1bWlkaXR5LnRleHRDb250ZW50ID0gYEh1bWlkaXR5OiAke2RhdGEuaHVtaWRpdHl9YDtcclxuICAgIHdpbmQudGV4dENvbnRlbnQgPSBgV2luZDogJHtkYXRhLndpbmR9YDtcclxuICAgIGlmIChkYXRhLmNvZGUgPCAxMDAzKXtcclxuICAgICAgICB3ZWF0aGVySWNvbi5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJhc3NldHMvc3VubnkucG5nXCIpO1xyXG4gICAgICAgIGJhY2tncm91bmQuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiYXNzZXRzL3N1bm55Lm1wNFwiKTtcclxuICAgIH1cclxuICAgIGlmKGRhdGEuY29kZSA+PSAxMDAzICYmIGRhdGEuY29kZSA8IDEwMzApe1xyXG4gICAgICAgIHdlYXRoZXJJY29uLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImFzc2V0cy9jbG91ZHkucG5nXCIpO1xyXG4gICAgICAgIGJhY2tncm91bmQuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiYXNzZXRzL2Nsb3VkeS5tcDRcIik7XHJcbiAgICB9XHJcbiAgICBpZigoZGF0YS5jb2RlID49IDEwNjMgJiYgZGF0YS5jb2RlIDwgMTA2NikgfHwgKGRhdGEuY29kZSA9PSAxMDcyKSB8fChkYXRhLmNvZGUgPj0gMTE1MCAmJiBkYXRhLmNvZGUgPD0gMTIwMSkgfHwgKGRhdGEuY29kZSA+PSAxMjQwICYmIGRhdGEuY29kZSA8PSAxMjQ2KSl7XHJcbiAgICAgICAgd2VhdGhlckljb24uc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiYXNzZXRzL3JhaW55LnBuZ1wiKVxyXG4gICAgICAgIGJhY2tncm91bmQuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiYXNzZXRzL3JhaW55Lm1wNFwiKTtcclxuICAgIH1cclxuICAgIGlmKChkYXRhLmNvZGUgPj0xMDY2ICYmIGRhdGEuY29kZSA8PSAxMDY5KSB8fCBkYXRhLmNvZGUgPT0gMTExNCB8fCBkYXRhLmNvZGUgPT0gMTExNyB8fCAoZGF0YS5jb2RlID49IDEyMDQgJiYgZGF0YS5jb2RlIDw9IDEyMzcpIHx8IChkYXRhLmNvZGUgPj0gMTI0OSAmJiBkYXRhLmNvZGUgPD0gMTI2NCkpe1xyXG4gICAgICAgIHdlYXRoZXJJY29uLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImFzc2V0cy9zbm93LnBuZ1wiKTtcclxuICAgICAgICBiYWNrZ3JvdW5kLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImFzc2V0cy9zbm93eS5tcDRcIik7XHJcbiAgICB9XHJcbiAgICBpZigoZGF0YS5jb2RlID09IDEwODcpIHx8IChkYXRhLmNvZGUgPj0gMTI3MyAmJiBkYXRhLmNvZGUgPD0gMTI4Mikpe1xyXG4gICAgICAgIHdlYXRoZXJJY29uLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImFzc2V0cy90aHVuZGVyLnBuZ1wiKTtcclxuICAgICAgICBiYWNrZ3JvdW5kLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImFzc2V0cy90aHVuZGVyLm1wNFwiKTtcclxuICAgIH1cclxuICAgIGlmKGRhdGEuY29kZSA9PSAxMDMwIHx8IGRhdGEuY29kZSA9PSAxMTM1IHx8IGRhdGEuY29kZSA9PSAxMTQ3KXtcclxuICAgICAgICB3ZWF0aGVySWNvbi5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJhc3NldHMvZm9nZ3kucG5nXCIpO1xyXG4gICAgICAgIGJhY2tncm91bmQuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiYXNzZXRzL2ZvZ2d5Lm1wNFwiKTtcclxuICAgIH1cclxuXHJcbn1cclxudXBkYXRlV2VhdGhlcihjaXR5LCB1bml0KTtcclxuXHJcbnNlYXJjaEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT57XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIm1lb3dcIilcclxuICAgIGNpdHkgPSBzZWFyY2hCb3gudmFsdWU7XHJcbiAgICB1cGRhdGVXZWF0aGVyKGNpdHksIHVuaXQpO1xyXG4gICAgc2VhcmNoQm94LnZhbHVlID0gXCJcIjtcclxufSlcclxuXHJcbnRlbXBlcmF0dXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcclxuICAgIHVuaXQgPSAhdW5pdDtcclxuICAgIHVwZGF0ZVdlYXRoZXIoY2l0eSwgdW5pdCk7XHJcbiAgICBcclxufSApXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
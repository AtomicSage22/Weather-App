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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1Asb0hBQW9ILEtBQUs7QUFDekg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQkFBaUIsRUFBRSx3QkFBd0I7QUFDaEUsOEJBQThCLHVCQUF1QjtBQUNyRDtBQUNBLHFCQUFxQixzQkFBc0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG9CQUFvQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsaUJBQWlCLEVBQUUsd0JBQXdCO0FBQ2hFLDhCQUE4Qix1QkFBdUI7QUFDckQ7QUFDQSxxQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixvQkFBb0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3ZDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDBEQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLFNBQVM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsbUJBQW1CO0FBQ3JFLHdDQUF3QyxjQUFjO0FBQ3RELGdDQUFnQyxVQUFVO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy93ZWF0aGVyRGF0YS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBmZXRjaFdlYXRoZXIgPSBhc3luYyAoY2l0eSwgdW5pdCkgPT57XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9jdXJyZW50Lmpzb24/a2V5PTNjYmY0ZjdhNWRhYzRiOWNhY2I0MzgwNDIzMjQwMyZxPSR7Y2l0eX1gKVxyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG4gICAgaWYoZGF0YS5oYXNPd25Qcm9wZXJ0eShcImVycm9yXCIpKXtcclxuICAgICAgICByZXR1cm4gXCJFcnJvclwiO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgd2Vla0RheXMgPSBbXCJTdW5cIiwgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIl07XHJcbiAgICBjb25zdCBtb250aHMgPSBbXCJKYW51YXJ5XCIsXCJGZWJydWFyeVwiLFwiTWFyY2hcIixcIkFwcmlsXCIsXCJNYXlcIixcIkp1bmVcIixcIkp1bHlcIixcIkF1Z3VzdFwiLFwiU2VwdGVtYmVyXCIsXCJPY3RvYmVyXCIsXCJOb3ZlbWJlclwiLFwiRGVjZW1iZXJcIl07XHJcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWUpO1xyXG4gICAgaWYgKHVuaXQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29kZTogZGF0YS5jdXJyZW50LmNvbmRpdGlvbi5jb2RlLFxyXG4gICAgICAgICAgICBkYXk6IHdlZWtEYXlzW2RhdGUuZ2V0RGF5KCldLFxyXG4gICAgICAgICAgICBkYXRlOiBgJHtkYXRlLmdldERhdGUoKX0gICR7bW9udGhzW2RhdGUuZ2V0TW9udGgoKV19YCxcclxuICAgICAgICAgICAgcHJlY2lwaXRhdGlvbjogYCR7ZGF0YS5jdXJyZW50LnByZWNpcF9tbX1tbWAsXHJcbiAgICAgICAgICAgIGh1bWlkaXR5OiBkYXRhLmN1cnJlbnQuaHVtaWRpdHksXHJcbiAgICAgICAgICAgIHdpbmQ6IGAke2RhdGEuY3VycmVudC53aW5kX2twaH1rcGhgLFxyXG4gICAgICAgICAgICBjaXR5OiBkYXRhLmxvY2F0aW9uLm5hbWUsXHJcbiAgICAgICAgICAgIGNvdW50cnk6IGRhdGEubG9jYXRpb24uY291bnRyeSxcclxuICAgICAgICAgICAgY29uZGl0aW9uOiBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHQsXHJcbiAgICAgICAgICAgIHRlbXA6IGAke2RhdGEuY3VycmVudC50ZW1wX2N9wrBDYFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvZGU6IGRhdGEuY3VycmVudC5jb25kaXRpb24uY29kZSxcclxuICAgICAgICAgICAgZGF5OiB3ZWVrRGF5c1tkYXRlLmdldERheSgpXSxcclxuICAgICAgICAgICAgZGF0ZTogYCR7ZGF0ZS5nZXREYXRlKCl9ICAke21vbnRoc1tkYXRlLmdldE1vbnRoKCldfWAsXHJcbiAgICAgICAgICAgIHByZWNpcGl0YXRpb246IGAke2RhdGEuY3VycmVudC5wcmVjaXBfaW59aW5gLFxyXG4gICAgICAgICAgICBodW1pZGl0eTogZGF0YS5jdXJyZW50Lmh1bWlkaXR5LFxyXG4gICAgICAgICAgICB3aW5kOiBgJHtkYXRhLmN1cnJlbnQud2luZF9tcGh9bXBoYCxcclxuICAgICAgICAgICAgY2l0eTogZGF0YS5sb2NhdGlvbi5uYW1lLFxyXG4gICAgICAgICAgICBjb3VudHJ5OiBkYXRhLmxvY2F0aW9uLmNvdW50cnksXHJcbiAgICAgICAgICAgIGNvbmRpdGlvbjogZGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0LFxyXG4gICAgICAgICAgICB0ZW1wOiBgJHtkYXRhLmN1cnJlbnQudGVtcF9mfcKwRmBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGZldGNoV2VhdGhlciB9IGZyb20gXCIuL3dlYXRoZXJEYXRhXCI7XHJcblxyXG5jb25zdCB0ZW1wZXJhdHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcFwiKVxyXG5jb25zdCBsb2NhdGlvbkNpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNpdHlcIik7XHJcbmNvbnN0IGxvY2F0aW9uQ291bnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY291bnRyeVwiKTtcclxuY29uc3QgcHJlY2lwaXRhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlY2lwaXRhdGlvblwiKTtcclxuY29uc3QgaHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmh1bWlkaXR5XCIpO1xyXG5jb25zdCB3aW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5kXCIpO1xyXG5jb25zdCBkYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRheVwiKTtcclxuY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0ZVwiKTtcclxuY29uc3Qgd2VhdGhlckljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmljb25cIik7XHJcbmNvbnN0IGJhY2tncm91bmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidmlkZW9cIik7XHJcbmNvbnN0IHNlYXJjaEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaFwiKTtcclxuY29uc3Qgc2VhcmNoQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xyXG5cclxubGV0IHVuaXQgPSB0cnVlO1xyXG5sZXQgY2l0eSA9IFwiYmhvcGFsXCJcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVdlYXRoZXIoY2l0eSwgdW5pdCl7XHJcbiAgICBcclxuICAgIGNvbnN0IGRhdGEgPSAoYXdhaXQgZmV0Y2hXZWF0aGVyKGNpdHksIHVuaXQpKTtcclxuICAgIGlmKGRhdGEgPT0gXCJFcnJvclwiKXtcclxuICAgICAgICBhbGVydChcIkVudGVyIFZhbGlkIENpdHlcIik7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBkYXkudGV4dENvbnRlbnQgPSBgJHtkYXRhLmRheX0sYDtcclxuICAgIGRhdGUudGV4dENvbnRlbnQgPSBkYXRhLmRhdGU7XHJcbiAgICB0ZW1wZXJhdHVyZS50ZXh0Q29udGVudCA9IGRhdGEudGVtcDsgIFxyXG4gICAgbG9jYXRpb25DaXR5LnRleHRDb250ZW50ID0gZGF0YS5jaXR5O1xyXG4gICAgbG9jYXRpb25Db3VudHJ5LnRleHRDb250ZW50ID0gZGF0YS5jb3VudHJ5O1xyXG4gICAgcHJlY2lwaXRhdGlvbi50ZXh0Q29udGVudCA9IGBQcmVjaXBpdGF0aW9uOiAke2RhdGEucHJlY2lwaXRhdGlvbn1gO1xyXG4gICAgaHVtaWRpdHkudGV4dENvbnRlbnQgPSBgSHVtaWRpdHk6ICR7ZGF0YS5odW1pZGl0eX1gO1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2RhdGEud2luZH1gO1xyXG4gICAgaWYgKGRhdGEuY29kZSA8IDEwMDMpe1xyXG4gICAgICAgIHdlYXRoZXJJY29uLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImFzc2V0cy9zdW5ueS5wbmdcIik7XHJcbiAgICAgICAgYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJhc3NldHMvc3VubnkubXA0XCIpO1xyXG4gICAgfVxyXG4gICAgaWYoZGF0YS5jb2RlID49IDEwMDMgJiYgZGF0YS5jb2RlIDwgMTAzMCl7XHJcbiAgICAgICAgd2VhdGhlckljb24uc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiYXNzZXRzL2Nsb3VkeS5wbmdcIik7XHJcbiAgICAgICAgYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJhc3NldHMvY2xvdWR5Lm1wNFwiKTtcclxuICAgIH1cclxuICAgIGlmKChkYXRhLmNvZGUgPj0gMTA2MyAmJiBkYXRhLmNvZGUgPCAxMDY2KSB8fCAoZGF0YS5jb2RlID09IDEwNzIpIHx8KGRhdGEuY29kZSA+PSAxMTUwICYmIGRhdGEuY29kZSA8PSAxMjAxKSB8fCAoZGF0YS5jb2RlID49IDEyNDAgJiYgZGF0YS5jb2RlIDw9IDEyNDYpKXtcclxuICAgICAgICB3ZWF0aGVySWNvbi5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJhc3NldHMvcmFpbnkucG5nXCIpXHJcbiAgICAgICAgYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJhc3NldHMvcmFpbnkubXA0XCIpO1xyXG4gICAgfVxyXG4gICAgaWYoKGRhdGEuY29kZSA+PTEwNjYgJiYgZGF0YS5jb2RlIDw9IDEwNjkpIHx8IGRhdGEuY29kZSA9PSAxMTE0IHx8IGRhdGEuY29kZSA9PSAxMTE3IHx8IChkYXRhLmNvZGUgPj0gMTIwNCAmJiBkYXRhLmNvZGUgPD0gMTIzNykgfHwgKGRhdGEuY29kZSA+PSAxMjQ5ICYmIGRhdGEuY29kZSA8PSAxMjY0KSl7XHJcbiAgICAgICAgd2VhdGhlckljb24uc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiYXNzZXRzL3Nub3cucG5nXCIpO1xyXG4gICAgICAgIGJhY2tncm91bmQuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiYXNzZXRzL3Nub3d5Lm1wNFwiKTtcclxuICAgIH1cclxuICAgIGlmKChkYXRhLmNvZGUgPT0gMTA4NykgfHwgKGRhdGEuY29kZSA+PSAxMjczICYmIGRhdGEuY29kZSA8PSAxMjgyKSl7XHJcbiAgICAgICAgd2VhdGhlckljb24uc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiYXNzZXRzL3RodW5kZXIucG5nXCIpO1xyXG4gICAgICAgIGJhY2tncm91bmQuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiYXNzZXRzL3RodW5kZXIubXA0XCIpO1xyXG4gICAgfVxyXG4gICAgaWYoZGF0YS5jb2RlID09IDEwMzAgfHwgZGF0YS5jb2RlID09IDExMzUgfHwgZGF0YS5jb2RlID09IDExNDcpe1xyXG4gICAgICAgIHdlYXRoZXJJY29uLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImFzc2V0cy9mb2dneS5wbmdcIik7XHJcbiAgICAgICAgYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJhc3NldHMvZm9nZ3kubXA0XCIpO1xyXG4gICAgfVxyXG5cclxufVxyXG51cGRhdGVXZWF0aGVyKGNpdHksIHVuaXQpO1xyXG5cclxuc2VhcmNoRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PntcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNpdHkgPSBzZWFyY2hCb3gudmFsdWU7XHJcbiAgICB1cGRhdGVXZWF0aGVyKGNpdHksIHVuaXQpO1xyXG4gICAgc2VhcmNoQm94LnZhbHVlID0gXCJcIjtcclxufSlcclxuXHJcbnRlbXBlcmF0dXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcclxuICAgIHVuaXQgPSAhdW5pdDtcclxuICAgIHVwZGF0ZVdlYXRoZXIoY2l0eSwgdW5pdCk7XHJcbn0gKVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
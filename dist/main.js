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
    console.log(data.date);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1Asb0hBQW9ILEtBQUs7QUFDekg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlCQUFpQixFQUFFLHdCQUF3QjtBQUNoRSw4QkFBOEIsdUJBQXVCO0FBQ3JEO0FBQ0EscUJBQXFCLHNCQUFzQjtBQUMzQztBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsb0JBQW9CO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQkFBaUIsRUFBRSx3QkFBd0I7QUFDaEUsOEJBQThCLHVCQUF1QjtBQUNyRDtBQUNBLHFCQUFxQixzQkFBc0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG9CQUFvQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3BDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QiwwREFBWTtBQUNwQztBQUNBLHlCQUF5QixTQUFTO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELG1CQUFtQjtBQUNyRSx3Q0FBd0MsY0FBYztBQUN0RCxnQ0FBZ0MsVUFBVTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3dlYXRoZXJEYXRhLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGZldGNoV2VhdGhlciA9IGFzeW5jIChjaXR5LCB1bml0KSA9PntcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2N1cnJlbnQuanNvbj9rZXk9M2NiZjRmN2E1ZGFjNGI5Y2FjYjQzODA0MjMyNDAzJnE9JHtjaXR5fWApXHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIGNvbnN0IHdlZWtEYXlzID0gW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdO1xyXG4gICAgY29uc3QgbW9udGhzID0gW1wiSmFudWFyeVwiLFwiRmVicnVhcnlcIixcIk1hcmNoXCIsXCJBcHJpbFwiLFwiTWF5XCIsXCJKdW5lXCIsXCJKdWx5XCIsXCJBdWd1c3RcIixcIlNlcHRlbWJlclwiLFwiT2N0b2JlclwiLFwiTm92ZW1iZXJcIixcIkRlY2VtYmVyXCJdO1xyXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGEubG9jYXRpb24ubG9jYWx0aW1lKTtcclxuICAgIGlmICh1bml0ID09IHRydWUpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvZGU6IGRhdGEuY3VycmVudC5jb25kaXRpb24uY29kZSxcclxuICAgICAgICAgICAgZGF5OiB3ZWVrRGF5c1tkYXRlLmdldERheSgpXSxcclxuICAgICAgICAgICAgZGF0ZTogYCR7ZGF0ZS5nZXREYXRlKCl9ICAke21vbnRoc1tkYXRlLmdldE1vbnRoKCldfWAsXHJcbiAgICAgICAgICAgIHByZWNpcGl0YXRpb246IGAke2RhdGEuY3VycmVudC5wcmVjaXBfbW19bW1gLFxyXG4gICAgICAgICAgICBodW1pZGl0eTogZGF0YS5jdXJyZW50Lmh1bWlkaXR5LFxyXG4gICAgICAgICAgICB3aW5kOiBgJHtkYXRhLmN1cnJlbnQud2luZF9rcGh9a3BoYCxcclxuICAgICAgICAgICAgY2l0eTogZGF0YS5sb2NhdGlvbi5uYW1lLFxyXG4gICAgICAgICAgICBjb3VudHJ5OiBkYXRhLmxvY2F0aW9uLmNvdW50cnksXHJcbiAgICAgICAgICAgIGNvbmRpdGlvbjogZGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0LFxyXG4gICAgICAgICAgICB0ZW1wOiBgJHtkYXRhLmN1cnJlbnQudGVtcF9jfcKwQ2BcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2RlOiBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLmNvZGUsXHJcbiAgICAgICAgICAgIGRheTogd2Vla0RheXNbZGF0ZS5nZXREYXkoKV0sXHJcbiAgICAgICAgICAgIGRhdGU6IGAke2RhdGUuZ2V0RGF0ZSgpfSAgJHttb250aHNbZGF0ZS5nZXRNb250aCgpXX1gLFxyXG4gICAgICAgICAgICBwcmVjaXBpdGF0aW9uOiBgJHtkYXRhLmN1cnJlbnQucHJlY2lwX2lufWluYCxcclxuICAgICAgICAgICAgaHVtaWRpdHk6IGRhdGEuY3VycmVudC5odW1pZGl0eSxcclxuICAgICAgICAgICAgd2luZDogYCR7ZGF0YS5jdXJyZW50LndpbmRfbXBofW1waGAsXHJcbiAgICAgICAgICAgIGNpdHk6IGRhdGEubG9jYXRpb24ubmFtZSxcclxuICAgICAgICAgICAgY291bnRyeTogZGF0YS5sb2NhdGlvbi5jb3VudHJ5LFxyXG4gICAgICAgICAgICBjb25kaXRpb246IGRhdGEuY3VycmVudC5jb25kaXRpb24udGV4dCxcclxuICAgICAgICAgICAgdGVtcDogYCR7ZGF0YS5jdXJyZW50LnRlbXBfZn3CsEZgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGZldGNoV2VhdGhlciB9IGZyb20gXCIuL3dlYXRoZXJEYXRhXCI7XHJcblxyXG5jb25zdCB0ZW1wZXJhdHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcFwiKVxyXG5jb25zdCBsb2NhdGlvbkNpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNpdHlcIik7XHJcbmNvbnN0IGxvY2F0aW9uQ291bnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY291bnRyeVwiKTtcclxuY29uc3QgcHJlY2lwaXRhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlY2lwaXRhdGlvblwiKTtcclxuY29uc3QgaHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmh1bWlkaXR5XCIpO1xyXG5jb25zdCB3aW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5kXCIpO1xyXG5jb25zdCBkYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRheVwiKTtcclxuY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0ZVwiKTtcclxuY29uc3Qgd2VhdGhlckljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmljb25cIik7XHJcbmNvbnN0IGJhY2tncm91bmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidmlkZW9cIik7XHJcbmNvbnN0IHNlYXJjaEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaFwiKTtcclxuY29uc3Qgc2VhcmNoQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xyXG5cclxubGV0IHVuaXQgPSB0cnVlO1xyXG5sZXQgY2l0eSA9IFwiYmhvcGFsXCJcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVdlYXRoZXIoY2l0eSwgdW5pdCl7XHJcbiAgICBjb25zdCBkYXRhID0gKGF3YWl0IGZldGNoV2VhdGhlcihjaXR5LCB1bml0KSk7XHJcbiAgICBjb25zb2xlLmxvZyhkYXRhLmRhdGUpO1xyXG4gICAgZGF5LnRleHRDb250ZW50ID0gYCR7ZGF0YS5kYXl9LGA7XHJcbiAgICBkYXRlLnRleHRDb250ZW50ID0gZGF0YS5kYXRlO1xyXG4gICAgdGVtcGVyYXR1cmUudGV4dENvbnRlbnQgPSBkYXRhLnRlbXA7ICBcclxuICAgIGxvY2F0aW9uQ2l0eS50ZXh0Q29udGVudCA9IGRhdGEuY2l0eTtcclxuICAgIGxvY2F0aW9uQ291bnRyeS50ZXh0Q29udGVudCA9IGRhdGEuY291bnRyeTtcclxuICAgIHByZWNpcGl0YXRpb24udGV4dENvbnRlbnQgPSBgUHJlY2lwaXRhdGlvbjogJHtkYXRhLnByZWNpcGl0YXRpb259YDtcclxuICAgIGh1bWlkaXR5LnRleHRDb250ZW50ID0gYEh1bWlkaXR5OiAke2RhdGEuaHVtaWRpdHl9YDtcclxuICAgIHdpbmQudGV4dENvbnRlbnQgPSBgV2luZDogJHtkYXRhLndpbmR9YDtcclxuICAgIGlmIChkYXRhLmNvZGUgPCAxMDAzKXtcclxuICAgICAgICB3ZWF0aGVySWNvbi5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJhc3NldHMvc3VubnkucG5nXCIpO1xyXG4gICAgICAgIGJhY2tncm91bmQuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiYXNzZXRzL3N1bm55Lm1wNFwiKTtcclxuICAgIH1cclxuICAgIGlmKGRhdGEuY29kZSA+PSAxMDAzICYmIGRhdGEuY29kZSA8IDEwMzApe1xyXG4gICAgICAgIHdlYXRoZXJJY29uLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImFzc2V0cy9jbG91ZHkucG5nXCIpO1xyXG4gICAgICAgIGJhY2tncm91bmQuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiYXNzZXRzL2Nsb3VkeS5tcDRcIik7XHJcbiAgICB9XHJcbiAgICBpZigoZGF0YS5jb2RlID49IDEwNjMgJiYgZGF0YS5jb2RlIDwgMTA2NikgfHwgKGRhdGEuY29kZSA9PSAxMDcyKSB8fChkYXRhLmNvZGUgPj0gMTE1MCAmJiBkYXRhLmNvZGUgPD0gMTIwMSkgfHwgKGRhdGEuY29kZSA+PSAxMjQwICYmIGRhdGEuY29kZSA8PSAxMjQ2KSl7XHJcbiAgICAgICAgd2VhdGhlckljb24uc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiYXNzZXRzL3JhaW55LnBuZ1wiKVxyXG4gICAgICAgIGJhY2tncm91bmQuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiYXNzZXRzL3JhaW55Lm1wNFwiKTtcclxuICAgIH1cclxuICAgIGlmKChkYXRhLmNvZGUgPj0xMDY2ICYmIGRhdGEuY29kZSA8PSAxMDY5KSB8fCBkYXRhLmNvZGUgPT0gMTExNCB8fCBkYXRhLmNvZGUgPT0gMTExNyB8fCAoZGF0YS5jb2RlID49IDEyMDQgJiYgZGF0YS5jb2RlIDw9IDEyMzcpIHx8IChkYXRhLmNvZGUgPj0gMTI0OSAmJiBkYXRhLmNvZGUgPD0gMTI2NCkpe1xyXG4gICAgICAgIHdlYXRoZXJJY29uLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImFzc2V0cy9zbm93LnBuZ1wiKTtcclxuICAgICAgICBiYWNrZ3JvdW5kLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImFzc2V0cy9zbm93eS5tcDRcIik7XHJcbiAgICB9XHJcbiAgICBpZigoZGF0YS5jb2RlID09IDEwODcpIHx8IChkYXRhLmNvZGUgPj0gMTI3MyAmJiBkYXRhLmNvZGUgPD0gMTI4Mikpe1xyXG4gICAgICAgIHdlYXRoZXJJY29uLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImFzc2V0cy90aHVuZGVyLnBuZ1wiKTtcclxuICAgICAgICBiYWNrZ3JvdW5kLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImFzc2V0cy90aHVuZGVyLm1wNFwiKTtcclxuICAgIH1cclxuICAgIGlmKGRhdGEuY29kZSA9PSAxMDMwIHx8IGRhdGEuY29kZSA9PSAxMTM1IHx8IGRhdGEuY29kZSA9PSAxMTQ3KXtcclxuICAgICAgICB3ZWF0aGVySWNvbi5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJhc3NldHMvZm9nZ3kucG5nXCIpO1xyXG4gICAgICAgIGJhY2tncm91bmQuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiYXNzZXRzL2ZvZ2d5Lm1wNFwiKTtcclxuICAgIH1cclxuXHJcbn1cclxudXBkYXRlV2VhdGhlcihjaXR5LCB1bml0KTtcclxuXHJcbnNlYXJjaEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT57XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIm1lb3dcIilcclxuICAgIGNpdHkgPSBzZWFyY2hCb3gudmFsdWU7XHJcbiAgICB1cGRhdGVXZWF0aGVyKGNpdHksIHVuaXQpO1xyXG4gICAgc2VhcmNoQm94LnZhbHVlID0gXCJcIjtcclxufSlcclxuXHJcbnRlbXBlcmF0dXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcclxuICAgIHVuaXQgPSAhdW5pdDtcclxuICAgIHVwZGF0ZVdlYXRoZXIoY2l0eSwgdW5pdCk7XHJcbiAgICBcclxufSApXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
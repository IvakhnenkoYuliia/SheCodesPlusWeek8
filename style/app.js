function showPosition(position) {
    let apiKey = "fb46fd31e8b7edc26336b76cae7c4e38";
    let units = "metric";
    let searchInput = document.querySelector("#search-text-input");
    let city = searchInput.value; 
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(url).then(changeInformation);
}

function changeInformation(response) {
    let heading = document.querySelector("h1");
    heading.innerHTML = response.data.name;
    document.querySelector("#description").innerHTML = response.data.weather[0].main;
    document.querySelector(".degree").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#pressure").innerHTML = response.data.main.pressure;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);

    celsiusDegree = response.data.main.temp
}

function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-text-input");
    if (searchInput.value){
        showPosition();
    }
    else {
        let heading = document.querySelector("h1"); 
        heading.innerHTML = null;
        alert("Please type a city");
    }

}

function current(event) {
    event.preventDefault();
    getCurrentPosition();
}

function getCurrentPosition() {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(currentPosition);
}

function currentPosition(position) {
    let apiKey = "fb46fd31e8b7edc26336b76cae7c4e38";
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
    axios.get(url).then(changeInformation);
}

function changeDegreeCelsius(event){
    event.preventDefault();
    degreeLinkFahrenheit.classList.remove("active");
    degreeLinkCelsius.classList.add("active");
    let degree = document.querySelector(".degree");
    degree.innerHTML = Math.round(celsiusDegree);
}
function changeDegreeFahrenheit(event){
    event.preventDefault();
    degreeLinkCelsius.classList.remove("active");
    degreeLinkFahrenheit.classList.add("active");
    let degree = document.querySelector(".degree");
    let degreeFahrenheit = (celsiusDegree * 9) / 5 + 32;
    degree.innerHTML = Math.round(degreeFahrenheit);
}

function date(){
    let now = new Date();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[now.getDay()];
    let hours = now.getHours();
    if (hours < 10) hours = `0${hours}`;
    let minutes = now.getMinutes();
    if (minutes < 10) minutes = `0${minutes}`;
    let realTime = document.querySelector("#real-time");
    realTime.innerHTML = `${day} ${hours}:${minutes}`;
}

date();

let celsiusDegree = null;

let degreeLinkCelsius = document.querySelector("#degree-link-Celsius");
degreeLinkCelsius.addEventListener("click", changeDegreeCelsius);

let degreeLinkFahrenheit = document.querySelector("#degree-link-Fahrenheit");
degreeLinkFahrenheit.addEventListener("click", changeDegreeFahrenheit);

let buttonSearch = document.querySelector("#form-search");
buttonSearch.addEventListener("submit", search);

let buttonCurrent = document.querySelector("#current-location-button");
buttonCurrent.addEventListener("click", current);
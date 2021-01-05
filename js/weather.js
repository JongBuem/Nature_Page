'use strict';  
const weather = document.querySelector('.js-weather');
const API_KEY = "6f3da956515fbffb0a7ee1c4aa0eeb8d";
const COORDS = 'coords';

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(res){
        return res.json();
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerHTML = ` ${place} ${ temperature}°c`;
        
    });
}

function saveCoords(coordsOBJ){
    localStorage.setItem(COORDS, JSON.stringify(coordsOBJ));
}

function handleSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsOBJ = {
        latitude : latitude,
        longitude : longitude
    };
    saveCoords(coordsOBJ);
    getWeather(latitude, longitude);
}

function handleError(){
}


function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleSucces , handleError);   //위치 정보 
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}



function init(){
loadCoords();
}
init();
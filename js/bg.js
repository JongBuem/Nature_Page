'use strict';  
const body = document.querySelector('body');
const IMG_NUMBER = 8;

function paintImage(imgNumber){
    const imgs = new Image();
    imgs.src =`imgs/${imgNumber +1}.jpg`;
    imgs.classList.add('bg');
    body.appendChild(imgs)
}

function genRandom(){
    const number = Math.floor(Math.random()*IMG_NUMBER);
    return number;
}

function init(){
    const randNumber = genRandom();
    paintImage(randNumber);
}

init();
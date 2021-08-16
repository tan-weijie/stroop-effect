"use strict";

//game timer
let timer;
let timeLeft = 10;    

function randomColour(){
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let colour = `rgb(${red},${green},${blue})`;
    return colour;
}

document.querySelector("span").style.color = randomColour();

function randomText(){
    const text = ["RED", "GREEN", "BLUE", "YELLOW"];
    let i = Math.floor(Math.random() * 4);
    return text[i];
}

document.querySelector("span").innerText = randomText();

function updateTimer(){

    if(timeLeft > 0){
        timeLeft -= 1;
        console.log(timeLeft);
    }
    else{
        console.log("game over!");
        clearInterval(timer);
    }
}

function start(){
    timer = setInterval(updateTimer,1000);
    updateTimer();
}

start();


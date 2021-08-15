"use strict";

//game timer
let timer;
let timeLeft = 10;    


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


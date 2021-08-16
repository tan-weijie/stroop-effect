"use strict";


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



//Main game mechanics
const colourButtons = document.querySelector(".answers");
colourButtons.addEventListener("click",(e) =>{  
    if (e.target.className === "colour-btn"){
        if (e.target.id === document.querySelector("span").innerText){
            console.log("Correct!");
            document.querySelector("span").innerText = randomText();
            document.querySelector("span").style.color = randomColour();
        }
        else {
            console.log("Wrong!");
        }    
    }
});


//Game timer
function updateTimer(){

    if(timeLeft > 0){
        timeLeft -= 1;
        console.log(timeLeft);
        document.querySelector("#time-left").innerText = `Time Left : ${timeLeft}`;
    }
    else
        quit();    
}

//Start function
function start(){
    timer = setInterval(updateTimer,1000);
    updateTimer();
}

document.querySelector("#play").addEventListener("click",start);

//Quit function
function quit(){
    console.log("game over!");
    document.querySelector("h1").innerHTML = "GAME OVER!";
    clearInterval(timer);
}
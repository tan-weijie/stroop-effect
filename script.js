"use strict";


let timer;
let timeLeft = 10;    
let score = 0;
let level = 1;

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
            score++;  
            if (score % 10 === 0){
                level++;
                document.querySelector("#level").innerText = `Level: ${level}`    
            }
            document.querySelector("#score").innerText = `Score: ${score}`
            document.querySelector("span").innerText = randomText();
            document.querySelector("span").style.color = randomColour();
        }
        else {
            console.log("Wrong!");
            document.querySelector("body").className = "flash";
            setTimeout(function(){
            document.querySelector("body").className = "";            
            });
        }    
    }
});

function addTime(time){
    start()
}

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
    document.querySelector("h1").innerText = "Stroop Effect";
    document.querySelector("#play").style.visibility = "hidden";
    timer = setInterval(updateTimer,1000);
    updateTimer();
}

document.querySelector("#play").addEventListener("click",start);

//Quit function
function quit(){
    console.log("game over!");
    document.querySelector("h1").innerHTML = "GAME OVER!";
    clearInterval(timer);
    document.querySelector("#play").style.visibility = "visible";
}
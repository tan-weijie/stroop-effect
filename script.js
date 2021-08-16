"use strict";

let timer;
let timeLeft = 10;
let score = 0;
let level = 1;

// class Game{
//     constructor(level = 1, score = 0, timeLeft = 10){
//         this.level = level,
//         this.score = score,
//         this.timeLeft = timeLeft
//     }
// }

document.querySelector("h2").style.visibility = "hidden";
document.querySelector(".answers").style.visibility = "hidden";

function randomColour(){
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let colour = `rgb(${red},${green},${blue})`;
    return colour;
}

function randomText(){
    const text = ["RED", "GREEN", "BLUE", "YELLOW"];
    let i = Math.floor(Math.random() * 4);
    return text[i];
}

function addTime(num){
    timeLeft += num;
    timer;
}

//Main game mechanics
function game(){
    score = 0; //resets score
    level = 1; //resets level
    document.querySelector("h2").innerText = randomText();
    document.querySelector("h2").style.color = randomColour();
    document.querySelector("#level").innerText = `Level: 1`
    document.querySelector("#score").innerText = `Score: 0`
}

const colourButtons = document.querySelector(".answers"); //this creates another eventlistener. how to prevent?
colourButtons.addEventListener("click",(e) =>{  
    if (e.target.className === "colour-btn"){
        if (e.target.id === document.querySelector("h2").innerText){
            console.log(document.querySelector("h2").innerText);
            console.log("Correct!");
            score++;  
            if (score % 10 === 0){
                level++;
                document.querySelector("#level").innerText = `Level: ${level}`    
            }
            document.querySelector("#score").innerText = `Score: ${score}`
            document.querySelector("h2").innerText = randomText();
            document.querySelector("h2").style.color = randomColour();
            addTime(2);
        }
        else {
            console.log("Wrong!");
            addTime(-1);
            document.querySelector("body").className = "flash";
            setTimeout(function(){document.querySelector("body").className = ""});
        }    
    }
});

//Game timer
function updateTimer(){
    if(timeLeft > 0){
        document.querySelector("#time-left").innerText = `Time Left : ${timeLeft.toFixed(1)}`; //rounds off to 1 decimal place
        timeLeft -= (0.05 + (level * 0.05));
        if (timeLeft <= 5){
            document.querySelector("#time-left").style.color = "red";
        }
        else
            document.querySelector("#time-left").style.color = "black";
        // console.log(timeLeft);        
    }
    else
        quit();    
}

document.querySelector("#play").addEventListener("click",start);

//Start function
function start(){
    timeLeft = 10;
    document.querySelector("h2").style.visibility = "visible";
    document.querySelector("h1").innerText = "Stroop Effect";
    document.querySelector(".answers").style.visibility = "visible";
    document.querySelector("#play").style.visibility = "hidden";
    timer = setInterval(updateTimer,100);
    updateTimer();
    game();
}

//Quit function
function quit(){
    console.log("game over!");
    document.querySelector("h1").innerHTML = "GAME OVER!";
    document.querySelector("h2").innerHTML = `You score ${score} points!`;
    document.querySelector(".answers").style.visibility = "hidden";
    document.querySelector("#time-left").innerText = `Time Left : 0`;
    document.querySelector("#play").style.visibility = "visible";
    clearInterval(timer);  
}
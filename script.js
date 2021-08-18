"use strict";

let timer;
let timeLeft = 10;
let level = 1;
let score = 0; 
let highScore = 0;
let prevHighScore = 0;
let coin = 0;

const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");

// class Game{
//     constructor(level = 1, score = 0, timeLeft = 10){
//         this.level = level,
//         this.score = score,
//         this.timeLeft = timeLeft
//     }
// }

h2.style.visibility = "hidden";
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
    let i = Math.floor(Math.random() * text.length);
    return text[i];
}

function addTime(num){
    timeLeft += num;
    timer;
}

//resets game
function reset(){
    score = 0; //resets score
    level = 1; //resets level
    h2.innerText = randomText();
    h2.style.color = randomColour();
    document.getElementById("level").innerText = `Level: 1`
    document.getElementById("score").innerText = `Score: 0`
}

//random button placement
let colourBtn = document.querySelectorAll(".colour-btn");
function randomButtonPlacement(){
    for(let i = 0; i < colourBtn.length; i++){
        let x = Math.floor(Math.random() * colourBtn.length);
        colourBtn[x].before(colourBtn[i]);
    }
}

//coin flip
function flipCoin(){
    coin = Math.floor(Math.random() * 3);
}

//correct answer
function correct(){
    console.log(h2.innerText);
    console.log("Correct!");
    score++;
    document.getElementById("score").innerText = `Score: ${score}`  
    if (score % 10 === 0){
        level++;
        document.getElementById("level").innerText = `Level: ${level}`    
    }
    if (level > 2){ 
        randomButtonPlacement();
    }
    if (level > 4){
        flipCoin();
        console.log(`coin is ${coin}`);
    }
    if(coin === 1){
        h2.innerText = "Not " + randomText();
    }
    else{   
        h2.innerText = randomText();
    }
    h2.style.color = randomColour();
    addTime(2); //bonus

}

//wrong answer
function wrong(){
    document.getElementById("error").play();
    console.log("Wrong!");
    addTime(-2); //penalty
    document.querySelector("body").className = "flash"; //simulates a flash when wrong
    setTimeout(function(){document.querySelector("body").className = "";},50); //reset "flash" after 50 ms
}

//colour buttons 
const colourButtonsEvent = document.querySelector(".answers"); 
colourButtonsEvent.addEventListener("click",(e) =>{  
    if (e.target.className === "colour-btn"){
        if(coin === 1){
            if (!(h2.innerText.includes(e.target.id))){
                correct();
            }
            else {
                wrong();
            }
        }
        else{
            if (h2.innerText.includes(e.target.id)){
                correct();
            }
            else {
                wrong();
            }
        }
        if (score > highScore){ //stores highscore
            highScore = score;
        } 
    }
});

//game timer
function updateTimer(){
    if(timeLeft > 0){
        document.getElementById("time-left").innerText = `Time Left : ${timeLeft.toFixed(1)}`; //rounds off to 1 decimal place
        timeLeft -= (0.08 + (level * 0.02)); //change this to tweak difficulty // default ==> timeLeft -= (0.06 + (level * 0.04));
        if (timeLeft <= 5){
            document.getElementById("time-left").style.color = "red"; //red font when time running out
        }
        else
            document.getElementById("time-left").style.color = "black";    
    }
    else
        quit();    
}

document.getElementById("play").addEventListener("click",start);

//start function
function start(){
    timeLeft = 10;
    coin = 0;
    document.getElementById("background-music").play();
    h1.innerHTML = "Stroop <span>Effect</span>";
    h2.style.visibility = "visible";
    h3.innerHTML = "";
    document.querySelector(".answers").style.visibility = "visible";
    document.getElementById("play").style.visibility = "hidden";
    timer = setInterval(updateTimer,100); //starts timer
    updateTimer();
    reset();
}

//quit function
function quit(){
    document.getElementById("background-music").pause();
    document.getElementById("background-music").currentTime = 0;
    if(score > prevHighScore){
        h3.innerHTML = `New Highscore: ${score}`;
        document.getElementById("yeet").play();
    }
    else
    {
        h3.innerHTML = `Highscore: ${prevHighScore}`;
        document.getElementById("congrats").play();
    }
    console.log("game over!");
    h1.innerHTML = "GAME <span>OVER!</span";
    h2.innerHTML = `You score ${score} points!`; 
    document.querySelector(".answers").style.visibility = "hidden";
    document.getElementById("time-left").innerText = `Time Left : 0.0`;
    document.getElementById("play").style.visibility = "visible";
    prevHighScore = highScore;
    clearInterval(timer);  //stops timer function
}






let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highScore = level;

let colors = ["red", "yellow", "green", "blue"];

let h3 = document.querySelector("h3");

document.addEventListener("keypress", () => {
    if(started == false){
        console.log("game started");
        started = true;

        levelup();
    }

});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelup(){
    userSeq = [];
    level++;
    h3.innerText= `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = colors[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx){

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelup , 1000);
        }
    } else {
        h3.innerHTML = `Game Over!! Your score was <b>${level}</b> <br> Press any key to restart`;
        document.querySelector("body").style.backgroundColor = "orange";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        let score = document.querySelector(".score");
        if(highScore>level){
            score.innerText = `High Score: ${highScore}`;
        } else {
            score.innerText = `High Score: ${level}`;
        }
        reset();
    }
}

function btnpress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allbtns = document.querySelectorAll(".boxes");
for(btn of allbtns){
    btn.addEventListener("click", btnpress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}


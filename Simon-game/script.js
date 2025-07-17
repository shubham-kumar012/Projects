let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let allBtns = document.querySelectorAll(".btn");
let lv = document.querySelector("#lv");

// Start screen remove after press any key
window.addEventListener("keypress", () => {
    level++;
    if(started == false) {
        let startWin = document.querySelector("#start-screen");
        startWin.remove();
        started = true;
    }
    

    let randomIdx = Math.floor(Math.random() * 4);
    let randomBtn = allBtns[randomIdx];
    setTimeout(flash, 800, randomBtn);

    let btnColor = randomBtn.getAttribute("id");
    gameSeq.push(btnColor);

}, {once: true});

// restart window after lose
function restart(gameOverScreen) {
    lv.innerText = "Level 1";
    window.addEventListener("keypress", () => {
        gameSeq = [];
        userSeq = [];

        gameOverScreen.style.display = "none";
        level = 1;
        let randomIdx = Math.floor(Math.random() * 4);
        let randomBtn = allBtns[randomIdx];
        setTimeout(flash, 800, randomBtn);

        let btnColor = randomBtn.getAttribute("id");
        gameSeq.push(btnColor);
    }, {once: true})
}



// level up
function levelUp() {
    userSeq = [];
    level++;
    lv.innerText = `Level ${level}`;

    // New random button
    let randomIdx = Math.floor(Math.random() * 4);
    let randomBtn = allBtns[randomIdx];
    let btnColor = randomBtn.getAttribute("id");
    console.log(gameSeq);
    gameSeq.push(btnColor);
    console.log(gameSeq);

    setTimeout(flashGameSeq, 1000);

}


// flash all game sequence buttons
function flashGameSeq() {
    let currIdx = 0;
    const intervalId = setInterval(() => {
        if(currIdx < gameSeq.length) {
            let btn = document.getElementById(gameSeq[currIdx]);
            console.log(btn);
            flash(btn);
            currIdx++;
        } else {
            clearInterval(intervalId);
        }
    }, 250);
} 


// Button flash 
function flash(btn) {
    btn.children[0].style.display = "block";
    setTimeout(function() {
        btn.children[0].style.display = "none";
    }, 150);
}


// Matching game seq and user seq
function checkAns(idx) {

    if(userSeq[idx] == gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            levelUp();
        }
    } else {
        let gameOverScreen = document.querySelector("#game-over");
        gameOverScreen.style.display = "flex";
        restart(gameOverScreen);     
    }

}


// When user click to the button
function btnPress() {
    flash(this);

    let btnColor = this.getAttribute("id");
    userSeq.push(btnColor); 
    checkAns(userSeq.length-1);
}

for(let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}







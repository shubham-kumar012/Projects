let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let btns = document.querySelectorAll(".btn");


window.addEventListener("keypress", () => {

    if(started == false) {
        let startWin = document.querySelector("#start-screen");
        startWin.remove();
        started = true;
    }
    

    let randomIdx = Math.floor(Math.random() * 4);
    let randomBtn = btns[randomIdx];
    setTimeout(flashGame, 800, randomBtn);


}, {once: true});


// Button flash
function flashGame(btn) {
    btn.children[0].style.display = "block";
    setTimeout(function() {
        btn.children[0].style.display = "none";
    }, 250);
}






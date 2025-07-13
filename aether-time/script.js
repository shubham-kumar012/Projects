
let minDisplay = document.getElementById("min");
let secDisplay = document.getElementById("sec"); // selecting the second counter div
let miliDisplay = document.getElementById("mili-sec"); // selecting the mili second
// button
let startBtn = document.getElementById("start-stop-btn"); // start button
let resetBtn = document.getElementById("reset-btn"); // reset button


let intervalId = null;
let startTime = null;
let elapsed = 0;


startBtn.addEventListener("click", function(){
    if(intervalId == null) {
        startTime = Date.now() - elapsed; // adjust for resume
        intervalId = setInterval(() => {
            let timePassed = Date.now() - startTime;

            let min = Math.floor(timePassed / 60000);
            let sec = Math.floor((timePassed % 60000) / 1000);
            let mili = timePassed % 1000;

            minDisplay.innerText = min.toString().padStart(2, '0');
            secDisplay.innerText = sec.toString().padStart(2, '0');
            miliDisplay.innerText = mili.toString().padStart(3, '0');

        }, 10);
        startBtn.innerText = "Pause";

    } else {
        clearInterval(intervalId);
        startBtn.innerText = "Resume";
        elapsed = Date.now() - startTime; // save elapsed for resume
        intervalId = null;
    }
})


resetBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    minDisplay.innerText = "00";
    secDisplay.innerText = "00";
    miliDisplay.innerText = "000";
    startBtn.innerText = "Start";
    elapsed = 0;
    intervalId = null;
    startTime = null;
})




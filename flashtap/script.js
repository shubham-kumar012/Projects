var timeDisplay = document.getElementById('time');
var scoreDisplay = document.getElementById('score'); // used
  // used

// Play and Reset buttons
const resetButton = document.getElementById('reset-btn'); // used 
const playButton = document.getElementById('play-btn'); // used

// Countdown overlay element
const countdownOverlay = document.getElementById('countdown-overlay'); // used 
const countdownText = document.getElementById('countdown-text'); // used

// Pause overlay element
const pauseOverlay = document.getElementById('pause-overlay');
const pauseButton = document.getElementById('pause-btn');
const resumeButton = document.getElementById('resume-btn');

// Game over overlay element
const gameOverOverlay = document.getElementById('gameover-overlay');
const finalScoreText = document.getElementById('final-score');
const gameOverRestartButton = document.getElementById('gameover-restart-btn');
const highScoreText = document.getElementById('high-score');
const gameOverExitButton = document.getElementById('game-over-exit-btn');

// Game sound effects
const countdownSound = new Audio('./sounds/countdown.wav');
const highScoreSound = new Audio('./sounds/highscore.wav');
const lifeLostSound = new Audio('./sounds/lifelose.wav');
const stageChangeSound = new Audio('./sounds/stageChange.wav');
const gameOverSound = new Audio('./sounds/gameover.wav');
const clickSound = new Audio('./sounds/click.wav');

const gotitBtn = document.getElementById('gotit-btn');
const instructionOverlay = document.getElementById('instruction-overlay');
const instructionBtn = document.getElementById('instruction-btn');

// stage overlay element
let stage = 1;
let stageTimer = null;
const stageDuration = 10000;


var gameInterval = null;
var isGameRunning = false;
var isPaused = false;
var lives = 3;
var gameSpeed = 1000;
var score = 0;



function moveTarget() {
    if(lives <= 0) return;

    const gameBoard = document.getElementById('game-board');
    const target = document.getElementById('target');

    const boardWidth = gameBoard.offsetWidth - 20;
    const boardHeight = gameBoard.offsetHeight - 20;
    const targetWidth = target.offsetWidth;
    const targetHeight = target.offsetHeight;
    const margin = 5;

    let randomX = Math.random() * (boardWidth - targetWidth - margin * 2);
    let randomY = Math.random() * (boardHeight - targetHeight - margin * 2);

    randomX = Math.floor(Math.max(margin, Math.min(randomX, boardWidth - targetWidth - margin)));
    randomY = Math.floor(Math.max(margin, Math.min(randomY, boardHeight - targetHeight - margin)));


    gsap.killTweensOf(target);

    console.log({randomX, randomY, boardWidth, boardHeight, targetWidth, targetHeight});
    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
    target.style.display = 'block';
    target.isActive = true;

    gsap.fromTo(target, 
        { scale: 0, opacity: 0 },
        {   scale: 1, 
            opacity: 1, 
            duration: 0.4, 
            ease: "back.out(1.7)",
        }
    );

    target.currentTimeout = setTimeout(() => {
        if (target.isActive) {   // only lose life if not clicked
            loseLife();
            hideTarget();
        }
    }, gameSpeed);
}

// this will hide the target after click or timeout
function hideTarget() {
    if (target.currentTimeout) {
        clearTimeout(target.currentTimeout);
        target.currentTimeout = null;
    }

    gsap.to(target, {
        scale: 0,
        opacity: 0,
        duration: 0.1,
        onComplete: () => {
            target.style.display = 'none';
            target.isActive = false;
        }
    });
}


// Click handler on target button
target.addEventListener('click', function() {
    if (!target.isActive) return; // ignore if already hidden

    clickSound.currentTime = 0;
    clickSound.play();

    clearTimeout(target.currentTimeout); // prevent life loss

    score = score + 10;
    scoreDisplay.textContent = score;

    hideTarget();
});


function startGame() {
    if(isGameRunning) return;
    isGameRunning = true;

    score = 0;
    lives = 3;
    scoreDisplay.textContent = score;


    let countdown = 3;
    countdownText.textContent = countdown;
    countdownOverlay.classList.remove('hidden');

    gsap.fromTo(countdownOverlay,
        {opacity: 0},
        {opacity: 1, duration: 0.3, ease: 'power2.out'},
    );

    // number animation function
    function animateNumber(num) {
        countdownText.textContent = num;
        gsap.fromTo(countdownText, 
            { scale: 0, opacity: 0 },
            { scale: 1.2, opacity: 1, duration: 0.3, ease: 'back.out(1.7)',
            onComplete: () => {
                gsap.to(countdownText, { scale: 1, duration: 0.1, ease: 'power1.out' });
            }}
        )
    }

    animateNumber(countdown);


    let countdownInterval = setInterval(() => {
        countdown--; 

        // countdownSound.currentTime = 0; // rewind
        countdownSound.play();
        if(countdown > 0) {
            animateNumber(countdown);
        } else {
            clearInterval(countdownInterval);
            countdownOverlay.classList.add('hidden');

            // target.style.display = 'block';
            // gameInterval = setInterval(moveTarget, gameSpeed);
            startStage(1);
        }
    }, 1000);
}

// play button click handler
playButton.addEventListener('click', function() {
    if(isGameRunning) return;

    for(let i=1; i<=3; i++) {
        const heart = document.getElementById(`heart${i}`);
        heart.style.opacity = 1;
    }
    gsap.killTweensOf(target);
    startGame();
});

resetButton.addEventListener('click', function() {
    isGameRunning = false;
    clearInterval(gameInterval);
    clearTimeout(target.currentTimeout);
    clearTimeout(stageTimer);
    gsap.killTweensOf(target);
    target.currentTimeout = null;
    gameInterval = null;
    stageTimer = null;

    score = 0;
    lives = 3;

    for(let i=1; i<=3; i++) {
        const heart = document.getElementById(`heart${i}`);
        heart.style.opacity = 1;
        heart.style.transform = 'scale(1)';
    }

    scoreDisplay.textContent = score;
    target.style.display = 'none';
})

// pause button click handler
pauseButton.addEventListener('click', function() {
    if(!isGameRunning || isPaused) return;
    if(gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
    }

    if(target.currentTimeout) {
        clearTimeout(target.currentTimeout);
        target.currentTimeout = null;
    }

    clearTimeout(stageTimer);
    stageTimer = null;

    gsap.killTweensOf(target);

    isPaused = true;

    pauseOverlay.classList.remove('hidden');
    gsap.fromTo(pauseOverlay, 
        { opacity: 0},
        { opacity: 1, duration: 0.3, ease: 'power2.out'}
    );
})

// pause resume button click handler
resumeButton.addEventListener('click', function() {
    gsap.fromTo(pauseOverlay, 
        { opacity: 1}, 
        { opacity: 0, duration: 0.4, ease: 'power2.out'}
    );

    setTimeout(() => {
        pauseOverlay.classList.add('hidden');

        if(isPaused) {
            gameInterval = setInterval(moveTarget, gameSpeed);
            isPaused = false;
        }
    }, 400);
})

// end game function
function endGame() {
    gameOverSound.currentTime = 0;
    gameOverSound.play();

    isGameRunning = false;
    clearInterval(gameInterval);
    clearTimeout(stageTimer);
    clearTimeout(target.currentTimeout);
    gameInterval = null;
    stageTimer = null;
    target.currentTimeout = null;
    gsap.killTweensOf(target);

    target.style.display = 'none';

    // update high score in localstorage
    let highScore = Number(localStorage.getItem('highScore')) || 0;
    if(score > highScore) {
        highScoreSound.play();
        highScore = score;
        localStorage.setItem('highScore', highScore);

        // Sprinkle animation on new high score
        confetti({
            particleCount: 100,
            spread: 80,
            origin: { x: 0, y: 1 } // bottom left
        });
        confetti({
            particleCount: 100,
            spread: 80,
            origin: { x: 1, y: 1 } // bottom right
        });

        highScoreSound.currentTime = 0;
        highScoreSound.play();

        // New high score animation
        let highScoreElement = document.getElementById('high-score-element');

        gsap.fromTo(highScoreElement, 
            { scale: 0, opacity: 0},
            { scale: 1.2, opacity: 1, duration: 0.5, ease: 'back.out(1.7)', delay: 0.3,
                onComplete: () => {
                    gsap.to(highScoreElement, { scale: 1, duration: 0.1, ease: 'power1.out' });
                }
            }
        )
    }

    highScoreText.textContent = highScore;

    // game over overlay and show final score
    finalScoreText.textContent = score;

    gameOverOverlay.classList.remove('hidden');
    gsap.fromTo(gameOverOverlay, 
        { opacity: 0}, 
        { opacity: 1, duration: 0.3, ease: 'power2.out'}
    )

}


function loseLife() {
    // lose life animation
    if(lives > 0) {
        const heart = document.getElementById(`heart${lives}`);
        
        gsap.to(heart, {
            scale: 1.2,
            opacity: 0, 
            duration: 0.1, 
            ease: 'back.in(1.7)',
            onComplete: () => {
                heart.style.opacity = 0;
            }
        })
        
        lives--;
        lifeLostSound.currentTime = 0;
        lifeLostSound.play();
    }
    

    if(lives <= 0) {
        endGame();
    }
}


// game over restart button
gameOverRestartButton.addEventListener('click', function() {
    for(let i=1; i<=3; i++) {
        const heart = document.getElementById(`heart${i}`);
        heart.style.opacity = 1;
        heart.style.transform = 'scale(1)';
    }

    gsap.fromTo(gameOverOverlay,
        { opacity: 1}, 
        { opacity: 0, duration: 0.4, ease: 'power2.out',
        onComplete: () => {
            gameOverOverlay.classList.add('hidden');
            startGame();
        }

    })
})

// game over exit button
gameOverExitButton.addEventListener('click', function() {
    gsap.fromTo(gameOverOverlay,
        { opacity: 1}, 
        { opacity: 0, duration: 0.4, ease: 'power2.out',
        onComplete: () => {
            gameOverOverlay.classList.add('hidden');
        }
    })
})


// stage showing function
function showStage(stageNum, callback) {
    const stageText = document.getElementById('stage-text');
    const stageOverlay = document.getElementById('stage-overlay');

    stageText.textContent = `STAGE ${stageNum}`;
    stageOverlay.classList.remove('hidden');

    gsap.fromTo(stageText, 
        { x: "100%", scale: 0.8, opacity: 0 },
        { x: "0%", scale: 1.2, opacity: 1, duration: 0.6, ease: 'back.out(1.7)',
            onComplete: () => {
                gsap.to(stageText, 
                    { x: "-100%", scale: 0.8, opacity: 0, duration: 0.6, ease: 'back.in(1.7)',
                        onComplete: () => {
                            stageOverlay.classList.add('hidden');
                            if(callback) callback();
                        }
                })
            }
        }
    );

}


// stage start function
function startStage(stageNum) {
    stageChangeSound.play();
    isGameRunning = true;

    stage = stageNum;
    gameSpeed = 1000 - (stageNum - 1) * 200;
    if(gameSpeed < 400) gameSpeed = 400;

    // stop any interval and timers
    if(gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
    }

    if(target.currentTimeout) {
        clearTimeout(target.currentTimeout);
        target.currentTimeout = null;
    }
    gsap.killTweensOf(target);
    clearTimeout(stageTimer);

    showStage(stageNum, () => {
        gameInterval = setInterval(moveTarget, gameSpeed);

        // move to next stage after 10 seconds
        stageTimer = setTimeout(() => {
            clearInterval(gameInterval);
            startStage(stageNum + 1);

        }, stageDuration);
    })
}


// instruction overlay logic
// user only see instruction first time
window.addEventListener('load', function() {
    let seenInstruction = localStorage.getItem('seenInstruction');

    if(!seenInstruction) {
        instructionOverlay.classList.remove('hidden');
    }
})
    
gotitBtn.addEventListener('click', function() {
    gsap.to(instructionOverlay, 
        { opacity: 0, duration: 0.4, ease: 'power2.out',
            onComplete: () => {
                instructionOverlay.classList.add('hidden');
                localStorage.setItem('seenInstruction', 'true');
                instructionBtn.classList.remove('hidden');
                startGame();
            }
        },
    );
})

instructionBtn.addEventListener('click', function() {
    if(!instructionOverlay.classList.contains('hidden') || isGameRunning) return;

    gsap.fromTo(instructionOverlay, 
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out',
            onComplete: () => {
                instructionBtn.classList.add('hidden');
                instructionOverlay.classList.remove('hidden');
            }
        }
    )
})






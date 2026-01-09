const pointsDisplay = document.querySelector(".points");
const moleContainer = document.querySelector(".mole-container");
const moles = document.querySelectorAll(".mole");
const highscoreDisplay = document.querySelector(".highscore");
const playingDisplay = document.querySelector(".playingDisplay");

let points = 0;
let isPlaying = false;
let randomMole;
let randomBomb;
let moleActive = false;
let bombActive = false;
let highscore = localStorage.getItem('highscore') || 0;
let gameInterval;
let moleActivationTime = 1500;

highscoreDisplay.textContent = `Highscore: ${highscore}`;

function setHighScore(highscore){
    localStorage.setItem('highscore', highscore);
}

function play(){
    isPlaying = true;
    points = 0;
    moleActivationTime = 1500;

    playingDisplay.textContent = "";
    pointsDisplay.textContent = `Points: ${points}`;
    createActiveTarget();
}

moles.forEach(mole => {
    mole.addEventListener('click', clickedMole);
});

function clickedMole(event){
    if(!isPlaying) return;

    if(event.target == randomMole && moleActive){
        points += 10;
        moleActive = false;
        pointsDisplay.textContent = `Points: ${points}`;
        event.target.style.backgroundColor = "hsl(0, 0%, 30%)";
        randomMole.classList.remove("mole-vis")

        if(points >= 50){
            moleActivationTime = 750;
        }
    }
    else if(event.target == randomBomb && bombActive){
        event.target.classList.add('wrong-click');
        randomMole.classList.remove("mole-vis");
        randomBomb.classList.remove("bomb-vis");
        
        setTimeout(() => {
            event.target.classList.remove('wrong-click');
        }, 500);

        endGame();
    }
    else if((event.target == randomMole && !moleActive) || 
            (event.target == randomBomb && !bombActive)){
        return;
    }
    else{
        event.target.classList.add('wrong-click');
        
        setTimeout(() => {
            event.target.classList.remove('wrong-click');
        }, 500);

        endGame();
    }
}

function endGame(){
    isPlaying = false;
    clearInterval(gameInterval); 
    
    if(randomMole){
        randomMole.style.backgroundColor = "hsl(0, 0%, 30%)";
    }
    if(randomBomb){
        randomBomb.style.backgroundColor = "hsl(0, 0%, 30%)";
        randomBomb.classList.remove("bomb-vis");
    }
    
    if(points > highscore){
        highscore = points;
        setHighScore(highscore);
        highscoreDisplay.textContent = `Highscore: ${highscore}`;
    }

    pointsDisplay.textContent = `Points: 0`;
    playingDisplay.textContent = "You Died, Play Again to Beat Your Highscore";
    points = 0;
    moleActive = false;
    bombActive = false;
}

function createActiveTarget(){
    if(isPlaying){
        gameInterval = setInterval(() => {
            const spawnBomb = Math.random() < 0.3;
            
            let randomNum = Math.floor(Math.random() * 20);
            if(randomNum === 0){
                randomNum = 1;
            }

            if(spawnBomb){
    
                randomBomb = document.getElementById(randomNum);
                randomBomb.style.backgroundColor = "tomato";
                randomBomb.classList.add("bomb-vis");
                bombActive = true; 
                moleActive = false;

                setTimeout(() => {
                    if(!isPlaying) return;
                    
                    randomBomb.style.backgroundColor = "hsl(0, 0%, 30%)";
                    randomBomb.classList.remove("bomb-vis");
                    bombActive = false;

                }, moleActivationTime - 50);
            } else {
                randomMole = document.getElementById(randomNum);
                randomMole.style.backgroundColor = "hsl(0, 80%, 12%)";
                randomMole.classList.add("mole-vis");
                moleActive = true;
                bombActive = false;

                setTimeout(() => {
                    if(!isPlaying) return;
                    
                    randomMole.style.backgroundColor = "hsl(0, 0%, 30%)";
                    randomMole.classList.remove("mole-vis")

                    if(moleActive){
                        endGame();
                    }

                    moleActive = false;

                }, moleActivationTime - 50);
            }
            
        }, moleActivationTime);
    }
}

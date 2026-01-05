const pointsDisplay = document.querySelector(".points");
const moleContainer = document.querySelector(".mole-container");
const moles = document.querySelectorAll(".mole");
const highscoreDisplay = document.querySelector(".highscore");
const playingDisplay = document.querySelector(".playingDisplay");

let points = 0;
let maxMoleAtATime = 5;
let isPlaying = false;
let randomMole;
let moleActive = false;
let highscore = localStorage.getItem('highscore');
let moleClicked;
let gameInterval;
let moleActivtionTime = 1500 

highscoreDisplay.textContent = `Highscore: ${highscore}`;

function setHighScore(highscore){
    localStorage.setItem('highscore', highscore);
}

function play(){
    isPlaying = true;
    points = 0;

    playingDisplay.textContent = ""
    pointsDisplay.textContent = `Points: ${points}`;
    createActiveMole();
}

moles.forEach(mole => {
    mole.addEventListener('click', clickedMole);
});

function clickedMole(event){
    console.log(event.target.id);

    if(isPlaying){
        if(event.target == randomMole && moleActive){
            points += 10;
            moleActive = false;
            pointsDisplay.textContent = `Points: ${points}`;
            event.target.style.backgroundColor = "hsl(0, 0%, 30%)";

            if(points >= 50){

                moleActivtionTime = 750;
            }
        }
        else if(event.target == randomMole && !moleActive){
            return;
        }
        else{

            event.target.classList.add('wrong-click');
            
            setTimeout(() => {
                event.target.classList.remove('wrong-click');
            }, 2500);

            endGame();
        }

    }
}

function endGame(){
    isPlaying = false;
    clearInterval(gameInterval); 
    
    if(randomMole){
        randomMole.style.backgroundColor = "hsl(0, 0%, 30%)";
    }
    
    if(points > highscore){
        highscore = points;
        setHighScore(highscore)
        highscoreDisplay.textContent = `Highscore: ${highscore}`;

    }
    

    pointsDisplay.textContent = `Points: 0`;
    playingDisplay.textContent = "You Died, Play Again to Beat Your Highscore"
    points = 0;
}

function createActiveMole(){
    if(isPlaying){
        gameInterval = setInterval(() => {
            
            let randomNum = Math.floor(Math.random() * 20);
            if(randomNum === 0){
                randomNum = 1;
            }

            randomMole = document.getElementById(randomNum);
            randomMole.style.backgroundColor = "red";
            moleActive = true;

            setTimeout(() => {
                if(!isPlaying) return;
                
                randomMole.style.backgroundColor = "hsl(0, 0%, 30%)";

                if(moleActive){
                    endGame();
                }

                moleActive = false;

            }, moleActivtionTime - 50);
            
        }, moleActivtionTime);
    }
}

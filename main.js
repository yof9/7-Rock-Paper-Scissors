/* Get cptr choice */
function getComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3);
    if (randomNumber === 0) {
        return 'rock';
    }
    else if (randomNumber === 1) {
        return 'paper';
    }
    else {
        return 'scissors';
    } 
}

/* Create fun to play one round */
function playRound(humanChoice, computerChoice=getComputerChoice()) {

    roundsPlayed++;
    let text;
    if (humanChoice === computerChoice) {
        text =`you are tied for the round with "${computerChoice[0].toUpperCase()+computerChoice.slice(1)}" as selection.`;
        tieFlag++;
    }
    else if (humanChoice === "rock" && computerChoice !== "scissors"){
        text = `you lose the round! "${computerChoice[0].toUpperCase()+computerChoice.slice(1)}" beats "${humanChoice[0].toUpperCase()+humanChoice.slice(1)}".`;
        computerScore++;
    }
    else if (humanChoice === "paper" && computerChoice !== "rock") {
        text = `you lose the round! "${computerChoice[0].toUpperCase()+computerChoice.slice(1)}" beats "${humanChoice[0].toUpperCase()+humanChoice.slice(1)}".`;
        computerScore++;
    }
    else if (humanChoice === "scissors" && computerChoice !== "paper") {
        text = `you lose the round! "${computerChoice[0].toUpperCase()+computerChoice.slice(1)}" beats "${humanChoice[0].toUpperCase()+humanChoice.slice(1)}".`;
        computerScore++;
    }
    else {
        text = `you win the round!! "${humanChoice[0].toUpperCase()+humanChoice.slice(1)}" beats "${computerChoice[0].toUpperCase()+computerChoice.slice(1)}".`;
        humanScore++;
    }

    // Create "li" with text display of winner
    let roundResult = document.createElement("li")
    roundResult.textContent= text
    roundResult.style = "margin-top: 30px;"
    
    // Append "li" in output
    document.querySelector(".output").appendChild(roundResult);

    // Update score
    document.querySelector(".score").textContent = `Wins: ${humanScore}  Losses: ${computerScore}  Ties: ${tieFlag}`;
    
}

/* Declare winner of the overall Game */
function declareWinner() {
    // Create text to display  
    let text = humanScore > computerScore ? 
    `You win!! \nYou have won the game with your score "${humanScore}", against "${computerScore}" with "${tieFlag}" ties.`: 
    humanScore === computerScore ? ` Game over! \nYou tied with score of "${humanScore}".`:
    `You Lose!! \nYou have lost the game with your score "${humanScore}", against "${computerScore}" with "${tieFlag}" ties.`;
    
    //Reset output display of round winner-text to winner-declaration text
    let output = document.querySelector(".output");
    output.textContent = text;
    output.style.fontSize = "40px";

    //Reset variables
    computerScore = 0;
    humanScore = 0;
    tieFlag = 0;
    roundsPlayed = 0;

    // Set timerFlag to false so "click" event can be handled 
    setTimeout(() => {
        timerFlag = false;
    },1000);

}

/* Play 5 rounds */
function playGame(e) {

    // If timer is set don't handle "click" event
    if (timerFlag) return;

    // If first game set output-text to empty, and readjust style
    if (roundsPlayed === 0) {
        let output = document.querySelector(".output");
        output.textContent = "";
        output.style.fontSize = "20px";
    }

    // Play one round
    playRound(e.target.textContent);

    // If a clear winner declare
    if (roundsPlayed===5 || humanScore === 3 || computerScore === 3 || (tieFlag === 2 && (humanScore === 2 || computerScore === 2))) {
        // To account for display timeout for last(5th) round and winner-display, set timerFlag 
        timerFlag= setTimeout(declareWinner, 1000);        
    }
}

const btns = [];
const options = ['rock', 'paper', 'scissors'];
let div;
for (let i = 0; i < 3; i++) {
    // Create container
    if (i === 0) {
        document.body.innerHtml = `<h1>Rock-Paper-scissors</h1>`
        document.body.appendChild(document.createElement("br"));
        div = document.createElement(div);
        div.style = "display: flex; background: grey";   
    }
    
    // Create btn and append to container
    btns[i] = document.createElement("button");
    btns[i].textContent = options[i];
    btns[i].style = `flex: 1 1 50%; color: #eeeeee; background-color: rgb(${50*(1+i)}, ${75*i}, ${100*i}); height: 50px; border-radius: 30px; margin: 30px;`;
    div.appendChild(btns[i]);
}

// Append button container
document.body.appendChild(div);

// Create output container
let output = document.createElement("ul");
output.style = "font-weight: 800; margin-top: 50px; font-size: 20px;"
output.style.listStyle = "none";
output.setAttribute("class", "output");
document.body.appendChild(output);

/* Create variables to store scores */
let humanScore = 0;
let computerScore = 0;

/* Declare variables to be used as test to end game if necessary */ 
let tieFlag = 0;
let roundsPlayed = 0;

//create score display
let score = document.createElement("div");
score.setAttribute("class", "score");
score.textContent = `Wins: ${humanScore}  Losses: ${computerScore}  Ties: ${tieFlag}`;
score.style = "background-color: red; font-size: 22px; font-family: areial, flex: 0 0 0; width: 330px;";
document.body.insertBefore(score, output);

// At start there is no timer
let timerFlag = false;

// Listen to 'click' and handle by capturing at parent(div) 
div.addEventListener("click", playGame, {capture:true});



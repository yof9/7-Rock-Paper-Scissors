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
    console.log(roundsPlayed, "a", computerChoice[0])        
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

    // Display round winner in output
    let roundResult = document.createElement("li")
    roundResult.textContent= text
    roundResult.style = "margin-top: 30px;"
    document.querySelector(".output").appendChild(roundResult);

    document.querySelector(".score").textContent = `Wins: ${humanScore}  Losses: ${computerScore}  Ties: ${tieFlag}`;
    
}

function declareWinner() {
    /* Declare winner of the overall Game */
    let text = humanScore > computerScore ? 
    `You win!! \nYou have won the game with your score "${humanScore}", against "${computerScore}" with "${tieFlag}" ties.`: 
    humanScore === computerScore ? ` Game over! \nYou tied with score of "${humanScore}".`:
    `You Lose!! \nYou have lost the game with your score "${humanScore}", against "${computerScore}" with "${tieFlag}" ties.`;
    
    let output = document.querySelector(".output");
    output.textContent = text;
    output.style.fontSize = "40px";

    //Reset variables
    computerScore = 0;
    humanScore = 0;
    tieFlag = 0;
    roundsPlayed = 0;

}

/* Play 5 rounds */
function playGame(e) {
    if (roundsPlayed === 0) {
        let output = document.querySelector(".output");
        output.textContent = "";
        output.style.fontSize = "20px";
    }
    playRound(e.target.textContent);

    // If a clear winner declare
    if (roundsPlayed===5 || humanScore === 3 || computerScore === 3 || (tieFlag === 2 && (humanScore === 2 || computerScore === 2))) {
        
        declareWinner();
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
    
    // Create each btn and append to container
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

/* Declare variables to be used as test to prematurely end game if necessary */ 
let tieFlag = 0;
let roundsPlayed = 0;

//create score display
let score = document.createElement("div");
score.setAttribute("class", "score");
score.textContent = `Wins: ${humanScore}  Losses: ${computerScore}  Ties: ${tieFlag}`;
score.style = "background-color: red; font-size: 22px; font-family: areial, flex: 0 0 0; width: 330px;";
document.body.insertBefore(score, output);

// Listen 
div.addEventListener("click", playGame, {capture:true});



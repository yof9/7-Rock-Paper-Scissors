/* Get cptr choice */
function getComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3);
    console.log(randomNumber);
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

/* Get human choice */
function getHumanChoice() {
    let choice = prompt(`what hand will you play "rock", "paper" or "scissors"?`).toLowerCase();
    while (choice !== "paper" && choice !== "scissors" && choice !== "rock") {
        console.warn("Inappropriate choice");
        choice = prompt(`what hand will you play "rock", "paper" or "scissors"?`).toLowerCase();
    }
    return choice;
}

/* Play 5 rounds */
function playGame() {
    
    /* Create variables to store scores */
    let humanScore = 0;
    let computerScore = 0;

    /* Create fun to play one round */
    function playRound(computerChoice=getComputerChoice(), humanChoice=getHumanChoice()) {
        if (humanChoice === computerChoice) {
            console.log(`you are tied for the round with "${computerChoice[0].toUpperCase()+computerChoice.slice(1)}" as selection.`)
        }
        else if (humanChoice === "rock" && computerChoice !== "scissors"){
            console.log(`you lose the round! "${computerChoice[0].toUpperCase()+computerChoice.slice(1)}" beats "${humanChoice[0].toUpperCase()+humanChoice.slice(1)}".`);
            computerScore++;
        }
        else if (humanChoice === "paper" && computerChoice !== "rock") {
            console.log(`you lose the round! "${computerChoice[0].toUpperCase()+computerChoice.slice(1)}" beats "${humanChoice[0].toUpperCase()+humanChoice.slice(1)}".`);
            computerScore++;
        }
        else if (humanChoice === "scissors" && computerChoice !== "paper") {
            console.log(`you lose the round! "${computerChoice[0].toUpperCase()+computerChoice.slice(1)}" beats "${humanChoice[0].toUpperCase()+humanChoice.slice(1)}".`);
            computerScore++;
        }
        else {
            console.log(`you win the round!! "${humanChoice[0].toUpperCase()+humanChoice.slice(1)}" beats "${computerChoice[0].toUpperCase()+computerChoice.slice(1)}".`);
            humanScore++;
        }
    }

    /* Play 5 rounds */
    for (let i = 0; i < 5; i++) {
        playRound();
    }

    function declareWinner() {
        /* Declare winner of the overall Game */
    humanScore > computerScore ? console.log(`You win!! \nYou have won the game with your score "${humanScore}", against "${computerScore}".`)
    : humanScore === computerScore ? console.log(` Game over! \nYou are tied with score of "${humanScore}".`)
    :console.log(`You Lose!! \nYou have lost the game with your score "${humanScore}", against "${computerScore}".`);
    }
    declareWinner();
}

playGame();
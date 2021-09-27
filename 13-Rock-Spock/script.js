import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";

const playerScoreEl = document.getElementById("playerScore");
const playerChoiceEl = document.getElementById("playerChoice");
const computerScoreEl = document.getElementById("computerScore");
const computerChoiceEl = document.getElementById("computerChoice");
const resultText = document.getElementById("resultText");

const playerRock = document.getElementById("playerRock");
const playerPaper = document.getElementById("playerPaper");
const playerScissors = document.getElementById("playerScissors");
const playerLizard = document.getElementById("playerLizard");
const playerSpock = document.getElementById("playerSpock");

const computerRock = document.getElementById("computerRock");
const computerPaper = document.getElementById("computerPaper");
const computerScissors = document.getElementById("computerScissors");
const computerLizard = document.getElementById("computerLizard");
const computerSpock = document.getElementById("computerSpock");

const allGameIcons = document.querySelectorAll(".far");

const choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] },
};

let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = "";

// Reset all "selected" icons
const resetSelected = () => {
  allGameIcons.forEach((icon) => icon.classList.remove("selected"));
  stopConfetti();
  removeConfetti();
};

// Reset Score & Choices
const resetAll = () => {
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScoreEl.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScoreNumber;
  playerChoiceEl.textContent = "";
  computerChoiceEl.textContent = "";
  resultText.textContent = "One More Time";
  resultText.style.color = "black";
  resetSelected();
};
window.resetAll = resetAll;

const computerRandomChoice = () => {
  const computerChoiceNumber = Math.random();
  if (computerChoiceNumber < 0.2) {
    computerChoice = "rock";
  } else if (computerChoiceNumber < 0.4) {
    computerChoice = "paper";
  } else if (computerChoiceNumber < 0.6) {
    computerChoice = "scissors";
  } else if (computerChoiceNumber < 0.8) {
    computerChoice = "lizard";
  } else {
    computerChoice = "spock";
  }
};

const displayComputerChoice = () => {
  switch (computerChoice) {
    case "rock": {
      computerRock.classList.add("selected");
      computerChoiceEl.textContent = " --- Rock";
      break;
    }
    case "paper": {
      computerPaper.classList.add("selected");
      computerChoiceEl.textContent = " --- Paper";
      break;
    }
    case "scissors": {
      computerScissors.classList.add("selected");
      computerChoiceEl.textContent = " --- Scissors";
      break;
    }
    case "lizard": {
      computerLizard.classList.add("selected");
      computerChoiceEl.textContent = " --- Lizard";
      break;
    }
    case "spock": {
      computerSpock.classList.add("selected");
      computerChoiceEl.textContent = " --- Spock";
      break;
    }
    default:
      break;
  }
};

// Check result, increase scores, update text
const updateScore = (playerChoice) => {
  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a tie";
    resultText.style.color = "dodgerblue";
  } else {
    const choice = choices[playerChoice];
    if (choice.defeats.indexOf(computerChoice) > -1) {
      resultText.textContent = "You Won!";
      resultText.style.color = "green";
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
      startConfetti();
    } else {
      resultText.textContent = "You Lost!";
      resultText.style.color = "crimson";
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
    }
  }
};

// Process turn
const checkResult = (playerChoice) => {
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
};

// Passing player selection value and styling icons
const select = (playerChoice) => {
  resetSelected();
  switch (playerChoice) {
    case "rock": {
      playerRock.classList.add("selected");
      playerChoiceEl.textContent = " --- Rock";
      break;
    }
    case "paper": {
      playerPaper.classList.add("selected");
      playerChoiceEl.textContent = " --- Paper";
      break;
    }
    case "scissors": {
      playerScissors.classList.add("selected");
      playerChoiceEl.textContent = " --- Scissors";
      break;
    }
    case "lizard": {
      playerLizard.classList.add("selected");
      playerChoiceEl.textContent = " --- Lizard";
      break;
    }
    case "spock": {
      playerSpock.classList.add("selected");
      playerChoiceEl.textContent = " --- Spock";
      break;
    }
    default:
      break;
  }
  checkResult(playerChoice);
};
window.select = select;

// Set initial Values
resetAll();

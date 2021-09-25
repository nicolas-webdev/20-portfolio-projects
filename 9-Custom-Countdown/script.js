// Inputs
const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdown-form");
const dateEl = document.getElementById("date-picker");

// Countdown
const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

// Completed
const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

// Time unit constants
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Global Variables
let savedCountdown;
let countdownActive;
let countdownValue = Date;
let countdownTitle = "";
let countdownDate = "";

// Set Date Input Min with Todays Date
const [today] = new Date().toISOString().split("T");
dateEl.setAttribute("min", today);

// Populate Countdown
const updateDOM = () => {
  countdownActive = setInterval(() => {
    // Find time distance from today to the countdown date
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Switch context
    if (countdownEl.hidden || !inputContainer.hidden) {
      countdownEl.hidden = false;
      inputContainer.hidden = true;
    }

    // Timer completes
    if (distance < 0) {
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      countdownEl.hidden = true;
      completeEl.hidden = false;
      return;
    }

    // Update DOM
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;
  }, second);
};

// Take values from form input
const updateCountdown = (e) => {
  e.preventDefault();

  // Make date necessary
  if (!e.srcElement[1].value) {
    alert("Please select a date for the countdown.");
    return;
  }

  // Populate the Countdown Values
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  countdownValue = new Date(countdownDate).getTime();

  // Save the values for Local Storage
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem("countdown", JSON.stringify(savedCountdown));

  updateDOM();
};

// Reset all values
const reset = () => {
  localStorage.removeItem("countdown");
  clearInterval(countdownActive);

  countdownTitle = "";
  countdownDate = "";

  completeEl.hidden = true;
  countdownEl.hidden = true;
  inputContainer.hidden = false;
};

// Restore previous values
const restorePreviousCountdown = () => {
  const previousCountdown = localStorage.getItem("countdown");
  if (previousCountdown) {
    inputContainer.hidden = true;

    savedCountdown = JSON.parse(previousCountdown);
    const { title: countdownTitle, date: countdownDate } = savedCountdown;
    countdownValue = new Date(countdownDate).getTime();

    updateDOM();
  }
};

// Event Listeners
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

// Load checking LocalStorage
restorePreviousCountdown();

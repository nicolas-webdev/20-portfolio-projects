const player = document.querySelector(".player");
const video = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const speed = document.querySelector(".player-speed");
const fullScreenBtn = document.querySelector(".fullscreen");

// Play & Pause ----------------------------------- //

const showPlayIcon = () => {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
};

const togglePlay = () => {
  if (video.paused) {
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Paused");
  } else {
    video.pause();
    showPlayIcon();
  }
};

// Progress Bar ---------------------------------- //

const displayTime = (time) => {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
};

const updateProgress = () => {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} / `;
  duration.textContent = `${displayTime(video.duration)}`;
};

const setProgress = (e) => {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
};

// Volume Controls --------------------------- //

let lastVolume = 1;

const setVolumeIcon = (volume) => {
  volumeIcon.className = "";
  if (volume >= 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else if (volume === 0) {
    volumeIcon.classList.add("fas", "fa-volume-off");
  }
};

const changeVolume = (e) => {
  let volume = e.offsetX / volumeRange.offsetWidth;
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }

  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;

  setVolumeIcon(volume);

  lastVolume = volume;
};

const toggleMute = () => {
  if (video.volume) {
    volumeIcon.className = "";
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = "0";
    volumeIcon.classList.add("fas", "fa-volume-mute");
    volumeIcon.setAttribute("title", "Unmute");
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    setVolumeIcon(lastVolume);
    volumeIcon.setAttribute("title", "Mute");
  }
};

// Change Playback Speed -------------------- //

const changeSpeed = () => {
  video.playbackRate = speed.value;
};

// Fullscreen ------------------------------- //

/* When the openFullscreen() function is executed, open the video in fullscreen. Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
/* View in fullscreen */
const openFullscreen = (elem) => {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add("video-fullscreen");
};

/* Close fullscreen */
const closeFullscreen = (elem) => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove("video-fullscreen");
};

let fullscreen = false;

const toggleFullscreen = () => {
  if (!fullscreen) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
};

const checkFullscreen = (e) => {
  if (document.fullscreenElement) {
    video.classList.add("video-fullscreen");
  } else {
    video.classList.remove("video-fullscreen");
  }
};

// Keypress

const keydown = (e) => {
  console.log(e);
  if (e.key === " ") {
    togglePlay();
    return;
  }
  if (e.key === "Escape") {
    closeFullscreen(player);
  }
};

// Event Listeners

playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("ended", showPlayIcon);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
video.addEventListener("dblclick", toggleFullscreen);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", changeSpeed);
fullScreenBtn.addEventListener("click", toggleFullscreen);
document.addEventListener("keydown", keydown);
document.addEventListener("fullscreenchange", checkFullscreen);

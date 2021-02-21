const videoElement = document.getElementById("video");
const buttonElement = document.getElementById("button-start");
const selectElement = document.getElementById("button-select");

// Prompt the user to select a media stream, pass to video element, then play it
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    console.log("Whoops, error here: ", error);
  }
}

buttonElement.addEventListener("click", async () => {
  buttonElement.disabled = true;
  await videoElement.requestPictureInPicture();
  buttonElement.disabled = false;
});

selectElement.addEventListener("click", async () => {
  selectMediaStream();
});

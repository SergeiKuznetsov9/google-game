import { EVENTS } from "../../../constants/constants.js";
import { subscribe } from "../../../core/state-manager.js";

export const AudioComponent = () => {
  const catchAudio = new Audio("ui/assets/sounds/catch.wav");
  const missAudio = new Audio("ui/assets/sounds/miss.mp3");

  subscribe((event) => {
    if (event.name === EVENTS.GOOGLE_RAN_AWAY && event.payload) {
      missAudio.currentTime = 0;
      missAudio.play();
    }
    if (event.name === EVENTS.GOOGLE_CAUGHT && event.payload) {
      catchAudio.currentTime = 0;
      catchAudio.play();
    }
  });
};

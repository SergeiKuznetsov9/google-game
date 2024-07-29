import { EVENTS } from "../../../constants/constants.js";
import { subscribe } from "../../../core/state-manager.js";

export const AudioComponent = () => {
  const catchAudio = new Audio("assets/sounds/catch.wav");
  const missAudio = new Audio("assets/sounds/miss.mp3");

  subscribe((event) => {
    if (event.name === EVENTS.GOOGLE_RAN_AWAY) {
      missAudio.play();
    }
    if (event.name === EVENTS.GOOGLE_CAUGHT) {
      catchAudio.currentTime = 0;
      catchAudio.play();
    }
  });
};

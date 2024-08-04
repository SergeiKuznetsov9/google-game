import { EVENTS } from "../../../../constants/constants.js";
import {
  getTimer,
  subscribe,
  unsubscribe,
} from "../../../../core/state-manager.js";

const getTime = (timer) => {
  let secondsString;
  let minutesString;

  if (timer.seconds <= 9) {
    secondsString = `0${timer.seconds}`;
  } else {
    secondsString = String(timer.seconds);
  }

  if (timer.minutes <= 9) {
    minutesString = `0${timer.minutes}`;
  } else {
    minutesString = String(timer.minutes);
  }

  return `${minutesString}:${secondsString}`;
};

export const TimerComponent = () => {
  const element = document.createElement("div");
  element.classList.add("resultPanelComponent-timeBlock");

  const observer = (event) => {
    if (event.name === EVENTS.TIMER_CHANGE) {
      render(element);
    }
  };
  subscribe(observer);

  render(element);

  return { element, cleanUp: () => unsubscribe(observer) };
};

const render = async (element) => {
  const timer = await getTimer();

  element.innerHTML = "";

  const timeBlockTitle = document.createElement("span");
  timeBlockTitle.append("Time:");
  const timeBlockValue = document.createElement("span");
  timeBlockValue.append(getTime(timer));

  element.append(timeBlockTitle, timeBlockValue);
};

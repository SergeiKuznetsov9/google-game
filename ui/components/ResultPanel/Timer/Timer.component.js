import { EVENTS } from "../../../../constants/constants.js";
import {
  getTimer,
  subscribe,
  unsubscribe,
} from "../../../../core/state-manager.js";

const getTime = (timer) => {
  let minutesString;
  let hoursString;

  if (timer.minutes <= 9) {
    minutesString = `0${timer.minutes}`;
  } else {
    minutesString = String(timer.minutes);
  }

  if (timer.hours <= 9) {
    hoursString = `0${timer.hours}`;
  } else {
    hoursString = String(timer.hours);
  }

  return `${hoursString}:${minutesString}`;
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

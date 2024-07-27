import { EVENTS } from "../../../../constants/constants.js";
import {
  getGooglePosition,
  getPlayerPosition,
  subscribe,
  unsubscribe,
} from "../../../../core/state-manager.js";
import { GoogleComponent } from "../../common/Google/Google.component.js";
import { PlayerComponent } from "../../common/Player/Player.component.js";

export const CellComponent = (x, y) => {
  const element = document.createElement("td");

  const observer = (event) => {
    if (event.name === EVENTS.GOOGLE_JUMPED) {
      const { payload } = event;
      const { oldPosition, newPosition } = payload;
      const isNeedRerender =
        (oldPosition.x === x && oldPosition.y === y) ||
        (newPosition.x === x && newPosition.y === y);
      if (isNeedRerender) {
        render(element, x, y);
      }
    }
  };
  subscribe(observer);

  render(element, x, y);
  return { element, cleanUp: () => unsubscribe(observer) };
};

const render = async (element, x, y) => {
  element.innerHTML = "";
  const googlePosition = await getGooglePosition();
  const player1Position = await getPlayerPosition(1);
  const player2Position = await getPlayerPosition(2);

  if (googlePosition.x === x && googlePosition.y === y) {
    element.append(GoogleComponent().element);
  }
  if (player1Position.x === x && player1Position.y === y) {
    element.append(PlayerComponent(1).element);
  }
  if (player2Position.x === x && player2Position.y === y) {
    element.append(PlayerComponent(2).element);
  }
};

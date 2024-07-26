import { GAME_STATUSES } from "../../constants/constants.js";
import { getGameStatus, subscribe } from "../../core/state-manager.js";
import { GridComponent } from "./Grid/Grid.component.js";
import { LoseComponent } from "./Lose/Lose.component.js";
import { ResultPanelComponent } from "./ResultPanel/ResultPanel.component.js";
import { SettingsComponent } from "./Settings/Settings.component.js";
import { StartComponent } from "./Start/Start.component.js";

// Сейчас у приложения существует одна проблема - постоянный перерендер всего изображения
// Оптимизиция будет заключаться именно в том, чтобы выполнять перерендер только тогда,
// когда это действительно нужно.

// Вот этот компонент должен перерендериться только в случае изменения gameStatus
// В другом случае достаточно будет перерендерить другие компоненты

// Для того, чтобы это реализовать сделаем нечто похожее на локальное состояние
export const AppComponent = () => {
  const localState = { prevGameStatus: null };

  const element = document.createElement("div");

  subscribe(() => {
    render(element, localState);
  });

  render(element, localState);

  return { element };
};

const render = async (element, localState) => {
  const gameStatus = await getGameStatus();

  if (localState.prevGameStatus === gameStatus) {
    return;
  }

  localState.prevGameStatus = gameStatus;
  element.innerHTML = "";

  switch (gameStatus) {
    // SETTINGS: 'settings',
    // WIN: 'win',
    case GAME_STATUSES.IN_PROGRESS:
      const settingsComponent = SettingsComponent();
      const resultPanelComponent = ResultPanelComponent();
      const gridComponent = GridComponent();

      element.append(
        settingsComponent.element,
        resultPanelComponent.element,
        gridComponent.element
      );
      break;

    case GAME_STATUSES.LOSE:
      const loseComponent = LoseComponent();

      element.append(loseComponent.element);
      break;

    case GAME_STATUSES.SETTINGS: {
      const settingsComponent = SettingsComponent();
      const startComponent = StartComponent();

      element.append(settingsComponent.element, startComponent.element);
      break;
    }

    default:
      throw new Error("not implemented");
  }
};

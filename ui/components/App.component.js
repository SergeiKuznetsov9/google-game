import { GAME_STATUSES } from "../../constants/constants.js";
import { getGameStatus, subscribe } from "../../core/state-manager.js";
import { GridComponent } from "./Grid/Grid.component.js";
import { LoseComponent } from "./Lose/Lose.component.js";
import { ResultPanelComponent } from "./ResultPanel/ResultPanel.component.js";
import { SettingsComponent } from "./Settings/Settings.component.js";
import { StartComponent } from "./Start/Start.component.js";

export const AppComponent = () => {
  const localState = { prevGameStatus: null, cleanupFunctions: [] };

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

  localState.cleanupFunctions.forEach((fc) => fc());
  localState.cleanupFunctions = [];

  element.innerHTML = "";

  switch (gameStatus) {
    // SETTINGS: 'settings',
    // WIN: 'win',
    case GAME_STATUSES.IN_PROGRESS:
      const settingsComponent = SettingsComponent();

      const resultPanelComponent = ResultPanelComponent();
      localState.cleanupFunctions.push(resultPanelComponent.cleanUp);

      const gridComponent = GridComponent(resultPanelComponent.cleanUp);
      localState.cleanupFunctions.push(gridComponent.cleanUp);

      element.append(
        settingsComponent.element,
        resultPanelComponent.element,
        gridComponent.element
      );
      break;

    // Подытожим первый способ оптимизации рендеринга:
    // 1. Ререндеринг спускаем на уровень тех компонентов, которые требуют перерисовки.
    //    В нашем случае - это App.component и Grid.component.

    // 2. Перерисовка достигается путем передачи в subscribe функции рендера. При
    //    необходимости вызываются все ререндеры одномоменто. Если не добавить, перерисовки
    //    не будет. Причем подписка осуществляется при создании компонента

    // 3. В связи с тем, что вызываться будут все подписки без разбору, необходимость ререндера
    //    может также регулироваться на уровне компонента. Для этого вводится понятие стэйта
    //    компонента и в зависимости от его значения, в функции рендера осуществляется return,
    //    либо происходит рендер

    // 4. При уничтожении компонента все подписки должны быть удалены, иначе при последующем
    //    его создании, когда вновь будет создана подписка, будет выполняться не только эта новая,
    //    но и неудаленная старая. Функцию удаления своих подписок возвращает сам компонент. В
    //    родительском компоненте все такие подписки аккумулируются и одномоменто при ререндере
    //    вызываются

    // Описан первый способ оптимизмции ререндера. Однако если таким способом оптимизировать
    // рендеринг каждой клетки игрового поля, возникнет излишняя сложность. Поэтому для оптимизции
    // сетки воспользуемся другим способом

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

import { renderApp } from "../ui/index.js";

const _state = {
  settings: {
    gridSize: {
      rowsCount: 4,
      columnsCount: 4,
    },
  },
  positions: {
    google: {
      x: 1,
      y: 1,
    },
    players: [
      { x: 2, y: 2 },
      { x: 3, y: 3 },
    ],
  },
  points: {
    google: 12,
    players: [10, 11],
  },
};

const _getPlayerIndexByNumber = (playerNumber) => {
  const playerIndex = playerNumber - 1;

  if (playerIndex < 0 || playerIndex > _state.points.players.length - 1) {
    throw new Error("Incorrect player number");
  }

  return playerIndex;
};

// Теперь заставим гугл двигаться. Эта задача вот этого слоя
// С этой целью будем менять координаты, а также делать перерендер приложения,
// импортировав сюда функцию рендера из index.js

// Теперь это все работает, но имеется один очень существенный недостаток:
// index.js опосредованно использует state-manager, а state-manager напрямую
// использует index.js. Это циклическая зависимость и так быть не должно.
// Потенциально это может принести проблемы и от этого нужно избавиться.
// ВСЕ ЗАВИСИМОСТИ ДОЛЖНЫ БЫТЬ ОДНОНАПРАВЛЕНЫ

// Для решения этой проблемы еобходимо реализовать патерн observer

setInterval(() => {
  _state.positions.google = { x: 2, y: 2 };
  renderApp();
}, 1000);

// INTERFACE ADAPTER
export const getGooglePoints = async () => _state.points.google;

/**
 *
 * @param {number} playerNumber - one-based index of player
 * @returns {Promise} number of points
 */
export const getPlayerPoints = async (playerNumber) => {
  const playerIndex = _getPlayerIndexByNumber(playerNumber);

  return _state.points.players[playerIndex];
};

export const getGridSize = async () => ({ ..._state.settings.gridSize });

export const getGooglePosition = async () => ({ ..._state.positions.google });
export const getPlayerPosition = async (playerNumber) => {
  const playerIndex = _getPlayerIndexByNumber(playerNumber);

  return { ..._state.positions.players[playerIndex] };
};

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

// OBSERVERS
let _observers = [];

export const subscribe = (observer) => {
  _observers.push(observer);
};

export const unsubscribe = (observer) => {
  _observers = _observers.filter((o) => o !== observer);
};

const _notifyObservers = () =>
  _observers.forEach((o) => {
    try {
      o();
    } catch (error) {
      console.error(error);
    }
  });

// PRIVATE METHODS
const _getPlayerIndexByNumber = (playerNumber) => {
  const playerIndex = playerNumber - 1;

  if (playerIndex < 0 || playerIndex > _state.points.players.length - 1) {
    throw new Error("Incorrect player number");
  }

  return playerIndex;
};

setInterval(() => {
  _state.positions.google = { x: 3, y: 1 };
  _notifyObservers();
  _state.points.google++;
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

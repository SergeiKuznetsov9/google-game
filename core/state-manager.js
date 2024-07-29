import {
  EVENTS,
  GAME_STATUSES,
  MOVING_DIRECTIONS,
} from "../constants/constants.js";

const _state = {
  gameStatus: GAME_STATUSES.SETTINGS,
  settings: {
    gridSize: {
      rowsCount: 4,
      columnsCount: 4,
    },
    googleJumpInterval: 5000,
    pointsToLose: 5,
    pointsToWin: 3,
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
    google: 0,
    players: [0, 0],
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
const _notifyObservers = (name, payload = {}) => {
  const event = { name, payload };
  _observers.forEach((o) => {
    try {
      o(event);
    } catch (error) {
      console.error(error);
    }
  });
};

// PRIVATE METHODS
const _generateIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
const _jumpGoogleToNewPosition = () => {
  const newPosition = { x: null, y: null };

  let isNewPositionMatchWithCurrentGooglePosition;
  let isNewPositionMatchWithCurrentPlayer1Position;
  let isNewPositionMatchWithCurrentPlayer2Position;

  do {
    newPosition.x = _generateIntegerNumber(
      0,
      _state.settings.gridSize.columnsCount
    );
    newPosition.y = _generateIntegerNumber(
      0,
      _state.settings.gridSize.columnsCount
    );

    isNewPositionMatchWithCurrentGooglePosition =
      newPosition.x === _state.positions.google.x &&
      newPosition.y === _state.positions.google.y;
    isNewPositionMatchWithCurrentPlayer1Position =
      newPosition.x === _state.positions.players[0].x &&
      newPosition.y === _state.positions.players[0].y;
    isNewPositionMatchWithCurrentPlayer2Position =
      newPosition.x === _state.positions.players[1].x &&
      newPosition.y === _state.positions.players[1].y;
  } while (
    isNewPositionMatchWithCurrentGooglePosition ||
    isNewPositionMatchWithCurrentPlayer1Position ||
    isNewPositionMatchWithCurrentPlayer2Position
  );

  _state.positions.google = newPosition;
};
const _catchGoogle = (playerNumber) => {
  const playerIndex = _getPlayerIndexByNumber(playerNumber);
  _state.points.players[playerIndex]++;
  _notifyObservers(EVENTS.SCORES_CHANGED);

  if (_state.points.players[playerIndex] === _state.settings.pointsToWin) {
    _state.gameStatus = GAME_STATUSES.WIN;
    _notifyObservers(EVENTS.STATUS_CHANGED);
    clearInterval(googleJumpInterval);
  } else {
    const oldPosition = _state.positions.google;
    _jumpGoogleToNewPosition();
    const newPosition = _state.positions.google;
    _notifyObservers(EVENTS.GOOGLE_JUMPED, {
      oldPosition,
      newPosition,
    });
  }
};

// INTERFACE ADAPTER
let googleJumpInterval;
export const start = async () => {
  _state.positions.players[0] = { x: 0, y: 0 };
  _state.positions.players[1] = {
    x: _state.settings.gridSize.columnsCount - 1,
    y: _state.settings.gridSize.rowsCount - 1,
  };

  _jumpGoogleToNewPosition();

  _state.points.google = 0;
  _state.points.players = [0, 0];

  googleJumpInterval = setInterval(() => {
    const oldPosition = _state.positions.google;

    _jumpGoogleToNewPosition();

    _notifyObservers(EVENTS.GOOGLE_JUMPED, {
      oldPosition,
      newPosition: _state.positions.google,
    });

    _state.points.google++;
    _notifyObservers(EVENTS.SCORES_CHANGED);

    if (_state.points.google === _state.settings.pointsToLose) {
      clearInterval(googleJumpInterval);
      _state.gameStatus = GAME_STATUSES.LOSE;
      _notifyObservers(EVENTS.STATUS_CHANGED);
    }
  }, _state.settings.googleJumpInterval);

  _state.gameStatus = GAME_STATUSES.IN_PROGRESS;
  _notifyObservers(EVENTS.STATUS_CHANGED);
};
export const playAgain = async () => {
  _state.gameStatus = GAME_STATUSES.SETTINGS;
  _notifyObservers(EVENTS.STATUS_CHANGED);
};
export const movePlayer = async (playerNumber, direction) => {
  if (_state.gameStatus !== GAME_STATUSES.IN_PROGRESS) {
    return;
  }
  const playerIndex = _getPlayerIndexByNumber(playerNumber);

  const playerPosition = { ..._state.positions.players[playerIndex] };

  switch (direction) {
    case MOVING_DIRECTIONS.UP:
      playerPosition.y--;
      break;

    case MOVING_DIRECTIONS.DOWN:
      playerPosition.y++;
      break;

    case MOVING_DIRECTIONS.LEFT:
      playerPosition.x--;
      break;

    case MOVING_DIRECTIONS.RIGHT:
      playerPosition.x++;
      break;

    default:
      break;
  }

  const isValidPosition = _checkValidPosition(playerPosition);
  if (!isValidPosition) {
    return;
  }

  const isEmptyCell = _checkCellEmpty(playerPosition);
  if (!isEmptyCell) {
    return;
  }

  const isCellWithGoogle = _checkIsCellWithGoogle(playerPosition);
  if (isCellWithGoogle) {
    _catchGoogle(playerNumber);
  }

  _state.positions.players[playerIndex] = playerPosition;
  _notifyObservers(EVENTS[`PLAYER${playerNumber}_MOVED`], {
    oldPosition: { ..._state.positions.players[playerIndex] },
    newPosition: playerPosition,
  });
};

// GETTERS
const _checkIsCellWithGoogle = (playerPosition) => {
  const googlePosition = _state.positions.google;
  return (
    (playerPosition.x === googlePosition.x) &
    (playerPosition.y === googlePosition.y)
  );
};

const _checkCellEmpty = (playerPosition) => {
  const playersPositions = _state.positions.players;
  return !playersPositions.some(
    (position) =>
      playerPosition.x === position.x && playerPosition.y === position.y
  );
};

const _checkValidPosition = (playerPosition) =>
  playerPosition.x >= 0 &&
  playerPosition.x < _state.settings.gridSize.columnsCount &&
  playerPosition.y >= 0 &&
  playerPosition.y < _state.settings.gridSize.rowsCount;

const _getPlayerIndexByNumber = (playerNumber) => {
  const playerIndex = playerNumber - 1;

  if (playerIndex < 0 || playerIndex > _state.points.players.length - 1) {
    throw new Error("Incorrect player number");
  }

  return playerIndex;
};
/**
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
export const getGooglePoints = async () => _state.points.google;
export const getGameStatus = async () => _state.gameStatus;

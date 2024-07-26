const _state = {
  settings: {
    gridSize: {
      rowsCount: 4,
      columnsCount: 4,
    },
  },
  points: {
    google: 12,
    players: [10, 11],
  },
};

export const getGooglePoints = async () => _state.points.google;

/**
 *
 * @param {number} playerNumber - one-based index of player
 * @returns {Promise} number of points
 */
export const getPlayerPoints = async (playerNumber) => {
  const playerIndex = playerNumber - 1;

  if (playerIndex < 0 || playerIndex > _state.points.players.length - 1) {
    throw new Error("Incorrect player number");
  }
  return _state.points.players[playerIndex];
};

export const getGridSize = async () => ({ ..._state.settings.gridSize });

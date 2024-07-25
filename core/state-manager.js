const _state = {
  points: {
    google: 12,
    players: [10, 11],
  },
};

// Таким образом, мы по сути экспортируем данные для их отображения.
// Данные будут изменяться на этом уровне и будут предоставляться на
// другой уровень для их отображения

export const getGooglePoints = () => _state.points.google;

/**
 *
 * @param {number} playerNumber - one-based index of player
 * @returns {number} number of points
 */
export const getPlayerPoints = (playerNumber) => {
  const playerIndex = playerNumber - 1;

  if (playerIndex < 0 || playerIndex > _state.points.players.length - 1) {
    throw new Error("Incorrect player number");
  }
  return _state.points.players[playerIndex];
};

export const GAME_STATUSES = {
  SETTINGS: "settings",
  IN_PROGRESS: "in_progress",
  WIN: "win",
  LOSE: "lose",
};

export const EVENTS = {
  GOOGLE_JUMPED: "GOOGLE_JUMPED",
  PLAYER1_MOVED: "PLAYER1_MOVED",
  PLAYER2_MOVED: "PLAYER2_MOVED",
  STATUS_CHANGED: "STATUS_CHANGED",
  SCORES_CHANGED: "SCORES_CHANGED",
  GOOGLE_CAUGHT: "GOOGLE_CAUGHT",
  GOOGLE_RAN_AWAY: "GOOGLE_RAN_AWAY",
};

export const MOVING_DIRECTIONS = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

export const MOVING_ATTRIBUTES = {
  ArrowLeft: [1, MOVING_DIRECTIONS.LEFT],
  ArrowRight: [1, MOVING_DIRECTIONS.RIGHT],
  ArrowUp: [1, MOVING_DIRECTIONS.UP],
  ArrowDown: [1, MOVING_DIRECTIONS.DOWN],
  KeyA: [2, MOVING_DIRECTIONS.LEFT],
  KeyD: [2, MOVING_DIRECTIONS.RIGHT],
  KeyW: [2, MOVING_DIRECTIONS.UP],
  KeyS: [2, MOVING_DIRECTIONS.DOWN],
};

export const GRID_SIZES = ["4,4", "9,9", "16,16"];
export const GAME_POINTS = ["5", "10", "15", "20", "25", "30", "35"];

export const localStorageKeys = {
  GRID_ROWS: "GRID_ROWS",
  GRID_COLUMNS: "GRID_COLUMNS",
  WIN_POINTS: "WIN_POINTS",
  LOSE_POINTS: "LOSE_POINTS",
};

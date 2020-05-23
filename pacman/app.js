const {width, layout} = app.config.gameConfig;

ghosts = [
  new app.models.Ghost('blinky', 348, 250),
  new app.models.Ghost('pinky', 376, 400),
  new app.models.Ghost('inky', 351, 300),
  new app.models.Ghost('clyde', 379, 500)
]

window.app.game.setLayout(layout, width)
  .setScoreToWin(274)
  .setGridElement('.grid')
  .setScoreElement('#score')
  .setPacmanStartingPosition(490)
  .setGhosts(ghosts)
  .startGame();

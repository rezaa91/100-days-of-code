(function() {
  const app = window.app = window.app || {};
  const models = app.models = app.models || {};

  function Ghost(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.timerId = NaN;
    this.isScared = false;
  }

  app.models.Ghost = Ghost;
})();

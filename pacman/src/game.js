(function() {
  const app = window.app = window.app || {};

  let movePacmanListener = null;

  const game = app.game = {
    layout: null,
    width: null,
    score: 0,
    pacmanCurrentIndex: null,
    squares: [],
    gridElement: null,
    ghosts: [],
    scoreElement: null,
    scoreToWin: 0,

    _pacmanHasClass: function(className) {
      return this.squares[this.pacmanCurrentIndex].classList.contains(className);
    },

    _pacDotEaten: function() {
      if (this._pacmanHasClass('pac-dot')) {
        this.score++;
        this.scoreElement.textContent = this.score;
        this.squares[this.pacmanCurrentIndex].classList.remove('pac-dot');
      }
    },

    _unScareGhosts: function() {
      this.ghosts.forEach(ghost => ghost.isScared = false);
    },
    
    _powerPelletEaten: function() {
      if (this._pacmanHasClass('power-pellet')) {
        this.score += 10;
        this.ghosts.forEach(ghost => ghost.isScared = true);
        setTimeout(this._unScareGhosts, 10000);
        this.squares[this.pacmanCurrentIndex].classList.remove('power-pellet');
      }
    },

    _movePacman: function(e) {
      this.squares[this.pacmanCurrentIndex].classList.remove('pac-man');

      switch (e.keyCode) {
        case app.enums.KeysEnum.KEY_LEFT:
          if (this.pacmanCurrentIndex % width !== 0 && !this.squares[this.pacmanCurrentIndex - 1].classList.contains('wall')
            && !this.squares[this.pacmanCurrentIndex - 1].classList.contains('ghost-lair')
          ) {
            this.pacmanCurrentIndex -= 1;
          }
    
          // check if pacman is in the left exit
          if (this.pacmanCurrentIndex - 1 === 363) {
            this.pacmanCurrentIndex = 391;
          }
          
          break;
      
        case app.enums.KeysEnum.KEY_UP:
          if (this.pacmanCurrentIndex - this.width >= 0 && !this.squares[this.pacmanCurrentIndex - this.width].classList.contains('wall')
            && !this.squares[this.pacmanCurrentIndex - this.width].classList.contains('ghost-lair')
          ) {
            this.pacmanCurrentIndex -= this.width;
          }
    
          break;
        
        case app.enums.KeysEnum.KEY_RIGHT:
          if (this.pacmanCurrentIndex % this.width < this.width - 1 && !this.squares[this.pacmanCurrentIndex + 1].classList.contains('wall')
            && !this.squares[this.pacmanCurrentIndex + 1].classList.contains('ghost-lair')
          ) {
            this.pacmanCurrentIndex += 1;
          }
    
          // check if pacman is in the right exit
          if (this.pacmanCurrentIndex + 1 === 392) {
            this.pacmanCurrentIndex = 364;
          }
    
          break;
        
        case app.enums.KeysEnum.KEY_DOWN:
          if (this.pacmanCurrentIndex + this.width < this.width * this.width && !this.squares[this.pacmanCurrentIndex + this.width].classList.contains('wall')
            && !this.squares[this.pacmanCurrentIndex + this.width].classList.contains('ghost-lair')  
          ) {
            this.pacmanCurrentIndex += this.width;
          }
      }

      this.squares[this.pacmanCurrentIndex].classList.add('pac-man');

      this._pacDotEaten();
      this._powerPelletEaten();
      this._checkForGameOver();
      this._checkForWin();
    },

    _checkForGameOver: function() {
      if (this._pacmanHasClass('ghost') && !this._pacmanHasClass('scared-ghost')) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener('keyup', movePacmanListener);
        this.scoreElement.textContent = 'GAME OVER!';
      }
    },

    _checkForWin: function() {
      if (this.score >= 274) {
        this.ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener('keyup', movePacmanListener);
        this.scoreElement.textContent = 'YOU WIN!';
      }
    },

    _moveGhost: function(ghost) {
      const directions = [-1, +1, width, -width];
      let direction = directions[Math.floor(Math.random() * directions.length)];
      ghost.timerId = setInterval(() => {
        // if the next square your ghost is going in does not contain a wall and a ghost, you can go there
        if (!this.squares[ghost.currentIndex + direction].classList.contains('wall') &&
          !this.squares[ghost.currentIndex + direction].classList.contains('ghost')
        ) {
          // you can go here
    
          // remove all ghost related classes
          this.squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
    
          // change dir to the new safe square
          ghost.currentIndex += direction;
    
          // redraw the ghost
          this.squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
    
        } else { // else find a new direction
          direction = directions[Math.floor(Math.random() * directions.length)];
        }
    
        if (ghost.isScared) {
          this.squares[ghost.currentIndex].classList.add('scared-ghost');
        }
    
        if (ghost.isScared && this.squares[ghost.currentIndex].classList.contains('pac-man')) {
          this.squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
          ghost.currentIndex = ghost.startIndex;
          this.score += 100;
          this.squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
        }

        this._checkForGameOver();
      }, ghost.speed);
    },

    _createBoard: function() {
      for (let i = 0; i < this.layout.length; i++) {
        const square = document.createElement('div');
        this.gridElement.append(square);
        this.squares.push(square);

        switch(this.layout[i]) {
          case 0:
            this.squares[i].classList.add('pac-dot');
            break;
          case 1:
            this.squares[i].classList.add('wall');
            break;
          case 2:
            this.squares[i].classList.add('ghost-lair');
            break;
          case 3:
            this.squares[i].classList.add('power-pellet');
            break;
        }
      }

      this.squares[this.pacmanCurrentIndex].classList.add('pac-man');
    },

    setLayout: function(layout, width) {
      this.layout = layout;
      this.width = width;

      return this;
    },

    setGridElement(gridElement) {
      if (document.querySelector(gridElement)) {
        this.gridElement = document.querySelector(gridElement);
      } else {
        console.warn(`DOM element: "${gridElement}" does not exist`);
      }

      return this;
    },

    setScoreElement(scoreElement) {
      if (document.querySelector(scoreElement)) {
        this.scoreElement = document.querySelector(scoreElement);
      } else {
        console.warn(`DOM element: "${scoreElement}" does not exist`);
      }

      return this;
    },

    setPacmanStartingPosition(startingPosition) {
      this.pacmanCurrentIndex = startingPosition;

      return this;
    },

    setGhosts: function(ghosts) {
      this.ghosts = ghosts;

      return this;
    },

    startGame: function() {
      movePacmanListener = this._movePacman.bind(this);
      document.addEventListener('keyup', movePacmanListener);

      this._createBoard();
      this.ghosts.forEach(ghost => {
        this.squares[ghost.currentIndex].classList.add(ghost.className);
        this.squares[ghost.currentIndex].classList.add('ghost');
      });

      this.ghosts.forEach(ghost => this._moveGhost(ghost));
    },

    setScoreToWin: function(score) {
      this.scoreToWin = score;

      return this;
    },

    getScore: function() {
      return this.score;
    }
  }
})();

let movePacmanListener = null;

(function() {
  const app = window.app = window.app || {};

  const game = app.game = function() {
    function pacDotEaten() {
      if (this.squares[this.pacmanCurrentIndex].classList.contains('pac-dot')) {
        this.score++;
        this.scoreElement.textContent = this.score;
        this.squares[this.pacmanCurrentIndex].classList.remove('pac-dot');
      }
    }

    function unScareGhosts() {
      this.ghosts.forEach(ghost => ghost.isScared = false);
    }
    
    function powerPelletEaten() {
      if (this.squares[this.pacmanCurrentIndex].classList.contains('power-pellet')) {
        this.score += 10;
        this.ghosts.forEach(ghost => ghost.isScared = true);
        setTimeout(unScareGhosts, 10000);
        this.squares[this.pacmanCurrentIndex].classList.remove('power-pellet');
      }
    }

    function movePacman(e) {
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

      pacDotEaten.call(this);
      powerPelletEaten.call(this);
      checkForGameOver.call(this);
      checkForWin.call(this);
    }

    function checkForGameOver() {
      if (this.squares[this.pacmanCurrentIndex].classList.contains('ghost') &&
        !this.squares[this.pacmanCurrentIndex].classList.contains('scared-ghost')
      ) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener('keyup', movePacmanListener);
        this.scoreElement.textContent = 'GAME OVER!';
      }
    }

    function checkForWin() {
      if (this.score >= 274) {
        this.ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener('keyup', movePacmanListener);
        this.scoreElement.textContent = 'YOU WIN!';
      }
    }

    function moveGhost(ghost) {
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

        checkForGameOver.call(this);
      }, ghost.speed);
    }

    function createBoard() {
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
    }

    return {
      layout: null,
      width: null,
      score: 0,
      pacmanCurrentIndex: null,
      squares: [],
      gridElement: null,
      ghosts: [],
      scoreElement: null,

      setLayout: function(layout, width) {
        this.layout = layout;
        this.width = width;
      },

      setGridElement(gridElement) {
        if (document.querySelector(gridElement)) {
          this.gridElement = document.querySelector(gridElement);

          return;
        }

        console.warn(`DOM element: "${gridElement}" does not exist`);
      },

      setScoreElement(scoreElement) {
        if (document.querySelector(scoreElement)) {
          this.scoreElement = document.querySelector(scoreElement);

          return;
        }

        console.warn(`DOM element: "${scoreElement}" does not exist`);
      },

      setPacmanStartingPosition(startingPosition) {
        this.pacmanCurrentIndex = startingPosition;
      },

      setGhosts: function(ghosts) {
        this.ghosts = ghosts;
      },

      startGame: function() {
        movePacmanListener = movePacman.bind(this);
        document.addEventListener('keyup', movePacmanListener);

        createBoard.call(this);
        this.ghosts.forEach(ghost => {
          this.squares[ghost.currentIndex].classList.add(ghost.className);
          this.squares[ghost.currentIndex].classList.add('ghost');
        });

        this.ghosts.forEach(ghost => moveGhost.call(this, ghost));
      },

      getScore: function() {
        return this.score;
      }
    }
  }
})();

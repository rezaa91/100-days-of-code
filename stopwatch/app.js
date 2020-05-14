const time = document.querySelector('#time');
const clock = document.querySelector('#clock');
const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const reset = document.querySelector('#reset');

function formatTime(time) {
  return time.toString().length === 1 ? '0' + time : time;
}

function Timer(elem) {
  this.minutes = 0;
  this.seconds = 0;
  this.milliseconds = 0;
  this.elem = elem;
  this.interval = null;
}

Timer.prototype = {
  start() {
    this.interval = setInterval(() => {
      if (this.seconds >= 59 && this.milliseconds === 99) {
        this.seconds = 0;
        this.milliseconds = 0;
        this.minutes++;
      } else if (this.milliseconds === 99) {
        this.milliseconds = 0;
        this.seconds++;
      } else {
        this.milliseconds++;
      }

      this.display();
    }, 10);
  },

  stop() {
    clearInterval(this.interval);
  },

  reset() {
    this.milliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;

    this.display();
  },

  display() {
    this.elem.textContent = `${formatTime(this.minutes)}:${formatTime(this.seconds)}.${formatTime(this.milliseconds)}`;
  }
}

function setTime() {
  const date = new Date();
  const hours = date.getHours();
  const mins = date.getMinutes();
  
  clock.textContent = `${formatTime(hours)}:${formatTime(mins)}`;
}

function toggleClasses() {
  if (start.getAttribute('class') === 'hidden') {
    start.classList.remove('hidden');
  } else {
    start.classList.add('hidden');
  }

  if (stop.getAttribute('class') === 'hidden') {
    stop.classList.remove('hidden');
  } else {
    stop.classList.add('hidden');
  }

  if (reset.getAttribute('class') === 'hidden') {
    reset.classList.remove('hidden');
  } else {
    reset.classList.add('hidden');
  }
}

function init() {
  setTime();
}

init();
setInterval(setTime, 1000 * 60);

let interval;
const stopwatch = new Timer(time);
start.addEventListener('click', function() {
  toggleClasses();
  stopwatch.start();
});

stop.addEventListener('click', function() {
  stopwatch.stop()
});

reset.addEventListener('click', function() {
  toggleClasses();
  stopwatch.reset()
});

// Test
// 1. on first click of stop button, change to text to resume, and when clicked, resume stopwatch from this point.

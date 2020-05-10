const KeyCodeEnum = {
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  LEFT: 37
}

const boundingBoxes = [
  {
    el: document.getElementById('boxA'),
    x: 10,
    y: 100,
    height: 100,
    width: 100
  },
  {
    el: document.getElementById('boxB'),
    x: 130,
    y: 120,
    height: 100,
    width: 100
  }
]

function positionBoundingBox(props) {
  const {el, x, y, height, width} = props;

  el.style.width = `${width}px`;
  el.style.height = `${height}px`;
  el.style.top = `${y}px`;
  el.style.left = `${x}px`;
}

function displayStatus(text) {
  const warningDiv = document.getElementById('status');
  warningDiv.textContent = text
}

// based on Axis-Aligned Bounding Box (AABB) collision algorithm
function isCollided(boxA, boxB) {
  if (
    boxA.x + boxA.width >= boxB.x &&
    boxB.x + boxB.width >= boxA.x &&
    boxA.y + boxA.height >= boxB.y &&
    boxB.y + boxB.height >= boxA.y
  ) {
    return true;
  }

  return false;
}

function controlPlayerBox(e, box) {
  const increment = 5;

  switch (e.keyCode) {
    case KeyCodeEnum.UP:
      box.y = box.y - increment;
      break;
    case KeyCodeEnum.DOWN:
      box.y = box.y + increment;
      break;
    case KeyCodeEnum.RIGHT:
      box.x = box.x + increment;
      break;
    case KeyCodeEnum.LEFT:
      box.x = box.x - increment;
      break;
  }

  // update position of player box
  positionBoundingBox(box);

  // update display status text based on whether the boxes have collided or not
  const displayStatusText = isCollided(...boundingBoxes) ? 'Collided!' : 'Not collided.';
  displayStatus(displayStatusText);
}

// initial bounding box height, width and positions
boundingBoxes.forEach(box => positionBoundingBox(box));

// player controls one box which updates position every keydown
const [playerBox] = boundingBoxes;
document.addEventListener('keydown', (e) => controlPlayerBox(e, playerBox));


// TEST //
// 1. do not allow the boxes to move outside of the body
// 2. once collision happens, do not allow player box to move through the collided object

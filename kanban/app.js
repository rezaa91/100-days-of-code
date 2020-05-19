const backlog = document.querySelector('#backlog');
const inProgress = document.querySelector('#inProgress');
const done = document.querySelector('#done');
const add = document.querySelector('#add');
const cardContainer = document.querySelector('#cardContainer');

const boardEnums = {
  BACKLOG: 0,
  IN_PROGRESS: 1,
  DONE: 2
};

const items = [];

let id = 0;

function createInputCard() {
  const card = document.createElement('div');
  card.setAttribute('class', 'card');

  card.innerHTML = `
    <div class="card-header">
      <div class="close">&times;</div> 
    </div>
    <div class="card-content">
      <input class="card-input" type="text" placeholder="enter item..." />
    </div>
  `;

  cardContainer.appendChild(card);
  document.querySelector('.card-input').focus();
}

function createCard(item) {
  const cardContainer = document.createElement('div');
  cardContainer.setAttribute('class', 'item');
  cardContainer.setAttribute('id', `card-${item.id}`);

  cardContainer.innerHTML = `
    <div class="card-header"></div>
    <div class="card-content">
      <div>${item.value}</div>
    </div>
  `;

  cardContainer.style.width = `${backlog.clientWidth}px`
  backlog.appendChild(cardContainer);
}

add.addEventListener('click', createInputCard);
document.body.addEventListener('click', function(e) {
  const card = e.target.parentElement.parentElement;

  if (e.target.classList.contains('close') && card.classList.contains('card')) {
    document.querySelector(`.card`).remove();
  }
});

document.body.addEventListener('keydown', function(e) {
  const enterKey = 13;
  if (e.target.classList.contains('card-input') && e.keyCode === enterKey) {
    const item = {
      id: id++,
      board: boardEnums.BACKLOG,
      value: e.target.value
    }
    
    items.push(item);

    document.querySelector('.card').remove();
    createCard(item);
  }
});


function positionCard(e, card) {
  card.style.position = 'absolute';
  card.style.top = e.clientY + 'px';
  card.style.left = e.clientX + 'px'; 
}

function snapToList(e, card) {
  const documentWidth = document.body.clientWidth;
  const xPosition = e.clientX;

  if (xPosition >= 0 && xPosition <= (documentWidth / 100 * 33)) {
    backlog.appendChild(card);
  } else if (xPosition > (documentWidth / 100 * 33) && xPosition <= (documentWidth / 100 * 66)) {
    inProgress.appendChild(card);
  } else {
    done.appendChild(card);
  }

  card.style.left = 'auto';
  card.style.top = 'auto';
  card.style.position = 'relative';
}

function destroy(e) {
  document.onmousemove = null;
  document.onmouseup = null;
}

document.addEventListener('mousedown', function(e) {
  const card = e.target.closest('.item');

  if (!card) {
    return;
  }

  document.onmouseup = (e) => {
    snapToList(e, card);
    destroy(e)
  };
  document.onmousemove = (e) => positionCard(e, card);
});

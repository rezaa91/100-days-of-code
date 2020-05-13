// dom elements
const boldBtn = document.querySelector('#bold');
const italicBtn = document.querySelector('#italic');
const underlineBtn = document.querySelector('#underline');
const saveBtn = document.querySelector('#save');
const undoBtn = document.querySelector('#undo');
const redoBtn = document.querySelector('#redo');
const textBox = document.querySelector('#textBox');
const output = document.querySelector('#output');

let firstState = '';
let lastState = '';

const bold = {
  open: '<b>',
  close: '</b>'
};

const underline = {
  open: '<u>',
  close: '</u>'
};

const italic = {
  open: '<i>',
  close: '</i>'
}

function applyStyle(type) {
  const textBoxValue = textBox.value;
  firstState = textBoxValue;

  const first = textBox.selectionStart;
  const last = textBox.selectionEnd;

  const before = textBoxValue.substr(0, first) + type.open;
  const selectedText = textBoxValue.substr(first, last - first);
  const after = type.close + textBoxValue.substr(last);

  textBox.value = [before, selectedText, after].join('');
  lastState = textBox.value;
  updateOutput();
}

let isSaved = false;

function save() {
  isSaved = true;

  sessionStorage.setItem('text', textBox.value);
}

function updateOutput() {
  isSaved = false;

  output.innerHTML = textBox.value;
}

if (sessionStorage.getItem('text')) {
  textBox.value = sessionStorage.getItem('text');
  output.innerHTML = textBox.value;
}

saveBtn.addEventListener('click', save);
textBox.addEventListener('keyup', updateOutput);
boldBtn.addEventListener('click', () => applyStyle(bold));
underlineBtn.addEventListener('click', () => applyStyle(underline));
italicBtn.addEventListener('click', () => applyStyle(italic));
undoBtn.addEventListener('click', () => {
  textBox.value = firstState;
  updateOutput();
});
redoBtn.addEventListener('click', () => {
  textBox.value = lastState;
  updateOutput();
});

// TEST
// 1. add header buttons <h1> <h2> ...
// 2. add auto save functionality which saves text after 2 seconds of inactivity - only if the isSaved status is false
// (and then obviously set it to true once auto saved)

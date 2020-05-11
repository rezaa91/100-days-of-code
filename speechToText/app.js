const sentences = [
  "let's put a smile on that face",
  "I am your father",
  "life is like a box of chocolates",
  "you're gonna need a bigger boat",
  "i'm having an old friend for dinner"
];

const domElements = {
  play: document.querySelector('#play'),
  outcome: document.querySelector('#outcome'),
  textContainer: document.querySelector('#textContainer')
};

// start with the first sentence
let sentenceIndex = 0;
let isEnabled = false;

function init() {
  const {outcome} = domElements;

  isEnabled = Boolean(window.webkitSpeechRecognition);

  if (!isEnabled) {
    outcome.textContent = "speech recognition not recognised in this browser";
  }
}

function checkResult(transcript, text) {
  const {outcome} = domElements;
  const matched = transcript.toLowerCase() === text.toLowerCase();

  outcome.textContent = matched ? 'Correct!' : 'Incorrect!';
}

function begin() {
  if (!isEnabled) {
    return;
  }

  if (sentenceIndex === sentences.length) {
    return;
  }

  const {textContainer, play} = domElements;
  textContainer.textContent = sentences[sentenceIndex++];
  play.textContent = 'Next';

  const recognition = new window.webkitSpeechRecognition;

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    console.log(transcript);
    checkResult(transcript, textContainer.textContent);
  };

  recognition.start();
}

domElements.play.addEventListener('click', begin);

init();

// Test
// 1. randomise the sentence order so they can appear in any order
// 2. display a ui element which blinks during recording and remains static when finished
// 3. tally results and display score to user at the end of the program
// 4. add a disabled class with some disabled-like styling to the play button if speech recognition not supported

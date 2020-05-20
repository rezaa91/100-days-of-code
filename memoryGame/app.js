const timerContainer = document.querySelector('#timer');
const questionContainer = document.querySelector('#questionContainer');
const answerContainer = document.querySelector('#answersContainer');
const startButton = document.querySelector('#start');
const card = document.querySelector('.card');
const gameOver = document.querySelector('#gameOver');

const questions = [
    {
        question: 'What is your favourite colour?',
        options: ['blue', 'pink', 'red', 'green'],
        answer: null
    },
    {
        question: 'Why are you being interrogated?',
        options: ['for using PHP', 'not following the SOLID principles', 'I said deno was better than node', 'I thought Java and JavaScript were the same'],
        answer: null
    },
    {
        question: 'Is HTML a programming language?',
        options: ['yes', 'no'],
        answer: null
    },
    {
        question: 'Is a hotdog a sandwich',
        options: ['yes', 'no'],
        answer: null
    },
    {
        question: 'How do you start a conversation with a stranger?',
        options: ['talk about the weather', 'trip over your words like a blubbering mess', 'stare awkwardly in to the strangers eyes'],
        answer: null
    },
    {
        question: 'How do you start off your first Youtube video?',
        options: ['WhadDUp YouTuuube, its Ya Boiiii'],
        answer: null
    },
    {
        question: 'You think PHP is a bad language because you...',
        options: ['are a sheep who follows the crowd', 'you think its the hip thing to say', 'because it really is a terrible language'],
        answer: null
    }
];

let timer = 5;
let isPlaying = false;
let needsUpdate = false;

function getQuestion() {
    const numberOfQuestions = questions.length;
    const randomIndex = Math.floor(Math.random() * numberOfQuestions);

    return {index: randomIndex, question: questions[randomIndex]};
}

function endGame() {
    isPlaying = false;

    gameOver.textContent = 'GAME OVER';

    // reset answers
    questions.forEach(question => question.answer = null);

    startButton.style.display = 'block';
    startButton.textContent = 'Again?';
    card.style.display = 'none';
}

function countdown() {
    timerContainer.textContent = timer;

    if (timer === 0) {
        endGame();
    }
    
    timer--;
}

function selectAnswer(e, questionIndex) {
    const value = e.target.value;

    if (questions[questionIndex].answer) {
        if (value == questions[questionIndex].answer) {
            timer = 5;
            needsUpdate = true;

            return;
        }

        endGame();
    }

    // first answer
    questions[questionIndex].answer = value;
    timer = 5;
    needsUpdate = true;
}

function render() {
    answersContainer.innerHTML = null;
    needsUpdate = false;

    const {index, question} = getQuestion();
    questionContainer.textContent = question.question;

    question.options.forEach((option, index) => {
        answerContainer.insertAdjacentHTML('beforeend', `<div>${option}<input type="radio" name="q" value="${index}" /></div>`)
    });

    const inputs = document.querySelectorAll('input[type="radio"]');
    inputs.forEach((input) => input.addEventListener('click', (e) => selectAnswer(e, index)))
}

function runFrame() {
    if (needsUpdate) {
        render();
    }

    countdown();
    
    if (isPlaying) {
        setTimeout(runFrame, 1000);
    }

    clearTimeout(runFrame);
}

function startGame() {
    timer = 5;
    startButton.style.display = 'none';
    gameOver.textContent = null;

    isPlaying = true;
    needsUpdate = true;
    card.style.display = 'block';

    if (isPlaying) {
        runFrame();
    }
}

/** initialisation */
function init() {
    card.style.display = 'none';
}

init();

startButton.addEventListener('click', startGame);

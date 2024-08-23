const questions = [
    {
        question : "which is the most widely spoken language in the world?",
        choices : ["Hindi","English","Spanish","Mandarin Chinese"],
        answer : "Mandarin Chinese"
    },
    {
        question : "which is the tallest land animal in the world?",
        choices : [" Giraffe","Elephant","Lion","Rhynos"],
        answer : " Giraffe"
    },
    {
        question : "How many colours are there in a rainbow?",
        choices : ["8","6","7","9"],
        answer : "7"
    },
    {
        question : " What is the opposite of “build”?",
        choices : ["Make","Destroy","Break","Fall"],
        answer : "Destroy"
    },
    {
        question : "What is the tallest mountain in the world?",
        choices: ["Mount Everest", "Mount Fuzi", "Mount Kailash", "Himalayas"],
        answer: "Mount Everest"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let playerName = '';
let timer;
let timeLeft = 30;
let selectedAnswers = [];

document.getElementById('startBtn').addEventListener('click', startQuiz);
document.getElementById('prevBtn').addEventListener('click', showPreviousQuestion);
document.getElementById('nextBtn').addEventListener('click', showNextQuestion);
document.getElementById('skipBtn').addEventListener('click', skipQuestion);
document.getElementById('restartBtn').addEventListener('click', restartQuiz);

function startQuiz() {
    playerName = document.getElementById('playerName').value.trim();
    if (playerName === '') {
        alert('Please enter your name.');
        return;
    }

    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'flex';
    showQuestion();
}

function showQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById('question').textContent = questionData.question;

    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';
    questionData.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice-btn');
        if (selectedAnswers[currentQuestionIndex] === choice) {
            button.classList.add('selected');
        }
        button.addEventListener('click', () => selectAnswer(index, choice));
        choicesContainer.appendChild(button);
    });

    document.getElementById('prevBtn').style.display = currentQuestionIndex > 0 ? 'block' : 'none';
    document.getElementById('nextBtn').style.display = 'none'; 
    timeLeft = 30;
    document.getElementById('timer').textContent = timeLeft;
    startTimer();
}

function selectAnswer(index, choice) {
    clearInterval(timer);
    selectedAnswers[currentQuestionIndex] = choice;
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (choice === correctAnswer) {
        score++;
    }

    const buttons = document.querySelectorAll('#choices button');
    buttons.forEach((button, btnIndex) => {
        button.classList.toggle('selected', btnIndex === index);
    });

    if (currentQuestionIndex < questions.length - 1) {
        document.getElementById('nextBtn').style.display = 'block'; 
    } else {
        showResult();
    }
}

function showNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
}

function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}


function skipQuestion() {
    clearInterval(timer);
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResult();
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            skipQuestion();
        }
    }, 1000);
}

function showResult() {
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'flex';
    document.getElementById('finalMessage').textContent = `${playerName}, you scored ${score} out of ${questions.length}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    playerName = '';
    selectedAnswers = [];
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'flex';
    document.getElementById('playerName').value = '';
}

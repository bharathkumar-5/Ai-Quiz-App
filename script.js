document.addEventListener('DOMContentLoaded', function () {
    startQuiz();
});

const questions = [
    { question: "1. What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: "Paris" },
    { question: "2. What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "3. Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "J.K. Rowling", "Mark Twain", "Ernest Hemingway"], answer: "Harper Lee" },
    { question: "4. What is the largest planet in our solar system?", options: ["Earth", "Jupiter", "Saturn", "Mars"], answer: "Jupiter" },
    { question: "5. What is the boiling point of water?", options: ["90°C", "100°C", "110°C", "120°C"], answer: "100°C" },
    { question: "6. Which element has the chemical symbol 'O'?", options: ["Oxygen", "Gold", "Osmium", "Oganesson"], answer: "Oxygen" },
    { question: "7. What is the currency of Japan?", options: ["Yuan", "Won", "Yen", "Ringgit"], answer: "Yen" },
    { question: "8. Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Leonardo da Vinci", "Claude Monet", "Pablo Picasso"], answer: "Leonardo da Vinci" },
    { question: "9. What is the capital of Canada?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], answer: "Ottawa" },
    { question: "10. What is the chemical formula for water?", options: ["H2O", "CO2", "NaCl", "O2"], answer: "H2O" }
];

let currentQuestionIndex = 0;
let userAnswers = [];
let timer;
let timeLeft = 600; // 10 minutes in seconds

function startQuiz() {
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        submitQuiz();
        return;
    }

    const question = questions[currentQuestionIndex];
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
        <h2>${question.question}</h2>
        ${question.options.map(option => `
            <button class="answer-option" onclick="selectAnswer('${option}')">${option}</button>
        `).join('')}
    `;
}

function selectAnswer(answer) {
    const question = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.answer-option');

    options.forEach(option => {
        if (option.textContent === answer) {
            if (answer === question.answer) {
                option.classList.add('correct');
            } else {
                option.classList.add('incorrect');
                document.querySelectorAll('.answer-option').forEach(opt => {
                    if (opt.textContent === question.answer) {
                        opt.classList.add('blink');
                    }
                });
            }
        } else if (option.textContent === question.answer) {
            option.classList.add('blink');
        }
    });

    userAnswers[currentQuestionIndex] = answer;
    setTimeout(() => {
        document.querySelectorAll('.answer-option').forEach(option => {
            option.classList.remove('blink', 'correct', 'incorrect');
        });
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            submitQuiz();
        }
    }, 1500); // Wait for 1.5 seconds to show feedback
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById('time-completed').classList.remove('hidden');
            document.getElementById('quiz-content').classList.add('hidden');
            submitQuiz();
        } else {
            timeLeft--;
            updateTimerDisplay();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function submitQuiz() {
    clearInterval(timer);
    document.getElementById('review-screen').classList.remove('hidden');
    document.getElementById('quiz-content').classList.add('hidden');
    document.getElementById('time-completed').classList.add('hidden');

    const correctAnswers = questions.filter((q, i) => userAnswers[i] === q.answer).length;
    document.getElementById('score').textContent = `You scored ${correctAnswers} out of ${questions.length}`;

    const reviewContent = questions.map((q, i) => `
        <div>
            <h3>${q.question}</h3>
            <p>Your answer: ${userAnswers[i] || 'Not Answered'}</p>
            <p>Correct answer: ${q.answer}</p>
        </div>
    `).join('');

    document.getElementById('review-content').innerHTML = reviewContent;
}

document.getElementById('retry-button').addEventListener('click', () => {
    location.reload(); // Reload the page to restart the quiz
});


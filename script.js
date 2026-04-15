/* 
   This file controls the quiz logic
*/

/* Array of training scenarios */
const questions = [
    {
        sender: "support@universty-check.com",
        subject: "Urgent! Verify your student account now",
        message: "We detected suspicious activity in your university account. Your account will be blocked within 24 hours unless you verify it immediately.",
        link: "http://student-security-check-login.net",
        correct: "report",
        feedback: "Correct. This email is suspicious because the domain is misspelled, the message creates urgency, and the link looks unsafe."
    },
    {
        sender: "hr-department@company-bonus.net",
        subject: "Claim your employee bonus today",
        message: "Congratulations! You have been selected for a special employee bonus. Click the link below and enter your company password to receive payment.",
        link: "http://bonus-verification-free.net",
        correct: "report",
        feedback: "Correct. A real HR department should not ask for your password to give you a bonus."
    },
    {
        sender: "library@university.edu",
        subject: "Reminder: Book return deadline",
        message: "This is a reminder that your borrowed library book is due tomorrow. Please return it on time to avoid penalties.",
        link: "http://university-library.edu",
        correct: "ignore",
        feedback: "Correct. This message does not ask for sensitive information and looks like a normal reminder. In this demo, ignoring it is the safest option among the choices."
    }
];

/* Current question index */
let currentQuestion = 0;

/* User score */
let score = 0;

/* Prevent answering same question many times */
let answered = false;

/* Load current question into page */
function loadQuestion() {
    const q = questions[currentQuestion];

    document.getElementById("sender").textContent = q.sender;
    document.getElementById("subject").textContent = q.subject;
    document.getElementById("message").textContent = q.message;
    document.getElementById("link-text").textContent = q.link;

    document.getElementById("question-number").textContent = currentQuestion + 1;
    document.getElementById("total-questions").textContent = questions.length;

    document.getElementById("feedback-text").textContent = "Choose an answer to see feedback.";
    document.getElementById("next-btn").style.display = "none";

    answered = false;
}

/* Check user answer */
function checkAnswer(userChoice) {
    if (answered) {
        return;
    }

    answered = true;

    const q = questions[currentQuestion];
    const feedbackText = document.getElementById("feedback-text");

    if (userChoice === q.correct) {
        score++;
        document.getElementById("score").textContent = score;
        feedbackText.textContent = "✅ " + q.feedback;
    } else {
        feedbackText.textContent = "❌ Incorrect. " + q.feedback;
    }

    document.getElementById("next-btn").style.display = "inline-block";
}

/* Go to next question */
function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showFinalResult();
    }
}

/* Show final screen after training is completed */
function showFinalResult() {
    /* Hide the whole actions section */
    const actionsSection = document.getElementById("actions-section");
    if (actionsSection) {
        actionsSection.style.display = "none";
    }

    /* Update score section */
    const scoreSection = document.querySelector(".score-box");
    if (scoreSection) {
        scoreSection.innerHTML = `
            <h2>Training Completed</h2>
            <p>You have finished all phishing scenarios.</p>
        `;
    }

    /* Replace scenario area with final result */
    document.querySelector(".email-box").innerHTML = `
        <div class="result-box">
            <h2>Training Complete</h2>
            <p>Your final score is <strong>${score}</strong> out of <strong>${questions.length}</strong>.</p>
            <p>
                Great job practicing phishing awareness. This demo helps users
                recognize suspicious emails and make safer decisions online.
            </p>
            <button class="btn" onclick="restartQuiz()">Restart Demo</button>
        </div>
    `;

    /* Replace feedback box with final feedback */
    document.querySelector(".feedback-box").innerHTML = `
        <h2>Final Feedback</h2>
        <p>
            You completed the training successfully. Interactive awareness exercises
            like this can help users detect phishing before it causes harm.
        </p>
    `;
}

/* Restart quiz */
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;

    /* Show actions section again */
    const actionsSection = document.getElementById("actions-section");
    if (actionsSection) {
        actionsSection.style.display = "block";
    }

    /* Restore score box */
    const scoreSection = document.querySelector(".score-box");
    scoreSection.innerHTML = `
        <h2>Your Score: <span id="score">0</span></h2>
        <p>
            Scenario <span id="question-number">1</span> of
            <span id="total-questions">3</span>
        </p>
    `;

    /* Restore email box */
    document.querySelector(".email-box").innerHTML = `
        <div class="email-header">
            <p><strong>From:</strong> <span id="sender"></span></p>
            <p><strong>Subject:</strong> <span id="subject"></span></p>
        </div>

        <div class="email-body">
            <p id="message"></p>
            <p>
                <a href="#" class="fake-link" id="link-text"></a>
            </p>
        </div>
    `;

    /* Restore feedback box */
    document.querySelector(".feedback-box").innerHTML = `
        <h2>Feedback</h2>
        <p id="feedback-text">Choose an answer to see feedback.</p>
        <button class="btn" id="next-btn" onclick="nextQuestion()" style="display: none;">
            Next Scenario
        </button>
    `;

    loadQuestion();
}
/* Load first question when page opens */
loadQuestion();

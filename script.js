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
    /* Hide the answer buttons section completely */
    const actionSection = document.querySelector(".button-group");
    if (actionSection) {
        actionSection.parentElement.style.display = "none";
    }

    /* Hide the scenario progress box if you want cleaner finish */
    const scoreSection = document.querySelector(".score-box");
    if (scoreSection) {
        scoreSection.innerHTML = `
            <h2>Training Completed</h2>
            <p>You have finished all phishing scenarios.</p>
        `;
    }

    /* Replace email scenario with final result */
    document.querySelector(".email-box").innerHTML = `
        <div class="result-box">
            <h2>Training Complete</h2>
            <p>Your final score is <strong>${score}</strong> out of <strong>${questions.length}</strong>.</p>
            <p>
                Great job practicing phishing awareness. The goal of this demo
                is to help users identify suspicious emails and make safer decisions online.
            </p>
            <button class="btn" onclick="restartQuiz()">Restart Demo</button>
        </div>
    `;

    /* Replace feedback area with final feedback only */
    document.querySelector(".feedback-box").innerHTML = `
        <h2>Final Feedback</h2>
        <p>
            You completed the training successfully. This prototype demonstrates how
            interactive awareness exercises can help users recognize phishing attacks
            before they cause harm.
        </p>
    `;
}

/* Restart quiz */
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;

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

    /* Restore action buttons section */
    const actionSection = document.querySelector(".section .button-group");
    if (actionSection) {
        actionSection.parentElement.style.display = "block";
    } else {
        const sections = document.querySelectorAll(".section");
        if (sections[2]) {
            sections[2].innerHTML = `
                <h2>What would you do?</h2>
                <div class="button-group">
                    <button class="btn red-btn" onclick="checkAnswer('click')">Click the Link</button>
                    <button class="btn green-btn" onclick="checkAnswer('report')">Report Phishing</button>
                    <button class="btn gray-btn" onclick="checkAnswer('ignore')">Ignore Message</button>
                </div>
            `;
        }
    }

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

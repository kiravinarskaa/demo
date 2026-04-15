/* 
   This file controls the quiz logic
  */

/* Array of training scenarios
   Each scenario contains:
   - sender: who sent the message
   - subject: email subject
   - message: email content
   - link: shown link
   - correct: correct answer
   - feedback: explanation
*/
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

/* This function loads current question into the page */
function loadQuestion() {
    // Get current question object
    const q = questions[currentQuestion];

    // Put data into HTML elements
    document.getElementById("sender").textContent = q.sender;
    document.getElementById("subject").textContent = q.subject;
    document.getElementById("message").textContent = q.message;
    document.getElementById("link-text").textContent = q.link;

    // Update progress information
    document.getElementById("question-number").textContent = currentQuestion + 1;
    document.getElementById("total-questions").textContent = questions.length;

    // Reset feedback text
    document.getElementById("feedback-text").textContent = "Choose an answer to see feedback.";

    // Hide next button until user answers
    document.getElementById("next-btn").style.display = "none";

    // Allow answering current question
    answered = false;
}

/* This function checks the user's answer */
function checkAnswer(userChoice) {
    // If question already answered, stop
    if (answered) {
        return;
    }

    // Mark as answered
    answered = true;

    // Get current question
    const q = questions[currentQuestion];

    // Feedback element
    const feedbackText = document.getElementById("feedback-text");

    // Check answer
    if (userChoice === q.correct) {
        score++;
        document.getElementById("score").textContent = score;
        feedbackText.textContent = "✅ " + q.feedback;
    } else {
        feedbackText.textContent = "❌ Incorrect. " + q.feedback;
    }

    // Show next button
    document.getElementById("next-btn").style.display = "inline-block";
}

/* This function goes to next scenario */
function nextQuestion() {
    currentQuestion++;

    // If questions remain, load next one
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showFinalResult();
    }
}

/* This function shows final result after last question */
function showFinalResult() {
    // Replace scenario box with result box
    document.querySelector(".email-box").innerHTML = `
        <div class="result-box">
            <h2>Training Complete</h2>
            <p>Your final score is <strong>${score}</strong> out of <strong>${questions.length}</strong>.</p>
            <p>
                This demo helps users practice identifying suspicious emails
                and choosing safer actions.
            </p>
            <button class="btn" onclick="restartQuiz()">Restart Demo</button>
        </div>
    `;

    // Update feedback message
    document.getElementById("feedback-text").textContent =
        "You finished the training. Review the scenarios and keep practicing.";

    // Hide next button
    document.getElementById("next-btn").style.display = "none";
}

/* This function restarts the quiz */
function restartQuiz() {
    // Reset variables
    currentQuestion = 0;
    score = 0;
    answered = false;

    // Restore the scenario box HTML
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

    // Reset score display
    document.getElementById("score").textContent = score;

    // Load first question again
    loadQuestion();
}

/* Load first question when page opens */
loadQuestion();

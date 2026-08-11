"use strict";

/* ============================================================
   SecureStart · Application state and questionnaire logic
   Questions/module data lives in js/questions.js (trainingModules)
   ============================================================ */

/* ---------- Runtime state ---------- */

const QUESTIONS_PER_SESSION = 10;

let currentModule = null;
let currentQuestionIndex = 0;
let selectedAnswer = null;
let answeredCorrectly = false;
let activeQuestions = [];
let sessionSelections = {};

/* ---------- Friendly feedback copy ---------- */

const POSITIVE_FEEDBACK = [
    "Nice work! That's the safer choice.",
    "Great job! You spotted the security risk.",
    "Excellent! You're thinking like a security-aware employee.",
    "Well done! That's the action we want to see.",
    "You're doing great! Keep going."
];

const CORRECTIVE_FEEDBACK = [
    "Good try! Take another look at the situation.",
    "Almost there! That choice could introduce a security risk.",
    "Not quite! Think about the safest action you could take.",
    "That's not the safest choice. Give it another shot.",
    "Nice attempt! Let's look at this one again."
];

const SECURITY_REMINDERS = [
    "Think before you click.",
    "Check unexpected requests.",
    "Report suspicious emails.",
    "When in doubt, contact IT."
];

/* ---------- Helpers ---------- */

const app = document.getElementById("app");

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function getModuleData(moduleId) {
    const modules = window.trainingModules || {};
    return modules[moduleId] || null;
}

function isValidModule(module) {
    return Boolean(
        module &&
        typeof module === "object" &&
        typeof module.title === "string" &&
        typeof module.description === "string" &&
        Array.isArray(module.questions)
    );
}

function isValidQuestion(question) {
    return Boolean(
        question &&
        typeof question.question === "string" &&
        question.question.trim() !== "" &&
        Array.isArray(question.options) &&
        question.options.length >= 4 &&
        question.options.length <= 5 &&
        typeof question.correctAnswer === "number" &&
        question.correctAnswer >= 0 &&
        question.correctAnswer < question.options.length
    );
}

function validQuestionsFor(module) {
    if (!isValidModule(module)) return [];
    return module.questions.filter(isValidQuestion);
}

/* Randomly pick a subset of the question bank for one training session. */
function shuffle(items) {
    const copy = items.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
    }
    return copy;
}

function sessionQuestionCount(bankSize) {
    return Math.min(QUESTIONS_PER_SESSION, bankSize);
}

function selectQuestionsForTraining(module) {
    const valid = validQuestionsFor(module);
    if (valid.length === 0) return [];
    return shuffle(valid).slice(0, sessionQuestionCount(valid.length));
}

function pickFeedback(pool) {
    return pool[Math.floor(Math.random() * pool.length)];
}

function moveFocus(selector) {
    const element = app.querySelector(selector);
    if (element) {
        element.setAttribute("tabindex", "-1");
        element.focus({ preventScroll: true });
    }
}

/* ---------- Landing page ---------- */

function showHome() {
    app.innerHTML = renderHome();
}

function renderHome() {
    const cards = renderModuleCards();
    return `
        <section class="home-hero">
            <div class="home-hero-icon" aria-hidden="true">🛡️</div>
            <h1 class="home-title">Welcome to SecureStart</h1>
            <p class="home-subtitle">
                A quick, friendly cybersecurity refresher. Take a short interactive
                training module and practice making safer decisions.
            </p>
        </section>
        <section>
            <h2 class="home-heading">Choose a training module</h2>
            <div class="modules-grid">
                ${cards}
            </div>
        </section>`;
}

function renderModuleCards() {
    const modules = window.trainingModules || {};
    const ids = Object.keys(modules);

    if (ids.length === 0) {
        return '<p class="error-message">No training modules are available right now. Please check back later.</p>';
    }

    return ids
        .map(function (id) {
            const module = modules[id];
            if (!isValidModule(module)) return "";
            return `
                <article class="module-card">
                    <div class="module-icon" aria-hidden="true">${escapeHTML(module.icon || "🛡️")}</div>
                    <h3 class="module-title">${escapeHTML(module.title)}</h3>
                    <p class="module-desc">${escapeHTML(module.description)}</p>
                    <button type="button" class="btn btn-primary" data-action="select-module" data-module="${escapeHTML(id)}">
                        Start Training
                    </button>
                </article>`;
        })
        .join("");
}

/* ---------- Module introduction ---------- */

function showModuleIntro(moduleId) {
    const module = getModuleData(moduleId);

    if (!isValidModule(module)) {
        showError("That training module could not be found. It may have been removed or renamed.");
        return;
    }

    const questions = validQuestionsFor(module);

    if (questions.length === 0) {
        showError("This module does not contain any valid questions yet. Please check back later.");
        return;
    }

    currentModule = module;
    activeQuestions = questions;
    app.innerHTML = renderModuleIntro(module, sessionQuestionCount(questions.length));
    moveFocus(".intro-title");
}

function renderModuleIntro(module, questionCount) {
    const learning = module.intro || module.description;
    return `
        <section class="intro-card">
            <div class="intro-icon" aria-hidden="true">${escapeHTML(module.icon || "🛡️")}</div>
            <h1 class="intro-title">${escapeHTML(module.title)}</h1>
            <p class="intro-desc">${escapeHTML(module.description)}</p>
            <div class="intro-stats">
                <span class="stat"><strong>${questionCount}</strong> questions</span>
                <span class="stat">Interactive scenarios</span>
            </div>
            <h2 class="intro-learning-title">What you will learn</h2>
            <p class="intro-desc">${escapeHTML(learning)}</p>
            <div class="intro-actions">
                <button type="button" class="btn btn-primary" data-action="start-training" data-module="${escapeHTML(module.id)}">
                    Start Training
                </button>
                <button type="button" class="btn btn-secondary" data-action="home">Back to Home</button>
            </div>
        </section>`;
}

/* ---------- Questionnaire ---------- */

function startTraining(moduleId) {
    const module = moduleId ? getModuleData(moduleId) : currentModule;

    if (!isValidModule(module)) {
        showError("The training module could not be started because it is not available.");
        return;
    }

    const questions = selectQuestionsForTraining(module);

    if (questions.length === 0) {
        showError("This module does not contain any valid questions yet. Please check back later.");
        return;
    }

    currentModule = module;
    activeQuestions = questions;
    sessionSelections = {};
    currentQuestionIndex = 0;
    selectedAnswer = null;
    answeredCorrectly = false;
    renderQuestion();
}

function renderQuestion() {
    const question = activeQuestions[currentQuestionIndex];

    if (!question) {
        showError("This question is not available. Please return home and try again.");
        return;
    }

    app.innerHTML = renderQuestionView(question, currentQuestionIndex, activeQuestions.length);
    updateProgress();
    moveFocus(".quiz-question");

    const previousSelection = sessionSelections[currentQuestionIndex];
    if (previousSelection !== undefined) {
        renderAnsweredState(question, previousSelection);
    }
}

function renderQuestionView(question, index, total) {
    const options = question.options
        .map(function (option, optionIndex) {
            return `
                <li>
                    <button type="button" class="option-btn" data-action="answer" data-index="${optionIndex}">
                        ${escapeHTML(option)}
                    </button>
                </li>`;
        })
        .join("");

    return `
        <section class="quiz-wrap">
            <p class="quiz-meta">Question <strong>${index + 1}</strong> of <strong>${total}</strong></p>

            <div class="progress-block">
                <div class="progress-label">
                    <span>Progress</span>
                    <span class="progress-percent">0%</span>
                </div>
                <div class="progress-track" role="progressbar" aria-label="Training progress"
                     aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                    <div class="progress-fill"></div>
                </div>
            </div>

            <h2 class="quiz-question">${escapeHTML(question.question)}</h2>

            <ul class="options-list">${options}</ul>

            <div id="feedback" class="feedback" role="status" aria-live="polite"></div>
            <div class="explanation" aria-hidden="true"></div>

            <div class="quiz-actions">
                <button type="button" class="btn btn-secondary" data-action="back">Back</button>
            </div>
        </section>`;
}

function updateProgress() {
    const total = activeQuestions.length;
    const percent = total > 0 ? Math.round(((currentQuestionIndex + 1) / total) * 100) : 0;

    const track = app.querySelector(".progress-track");
    const fill = app.querySelector(".progress-fill");
    const label = app.querySelector(".progress-percent");

    if (track) track.setAttribute("aria-valuenow", String(percent));
    if (fill) fill.style.width = percent + "%";
    if (label) label.textContent = percent + "%";
}

/* ---------- Answer handling ---------- */

function handleAnswer(optionIndex) {
    if (answeredCorrectly) return;
    if (sessionSelections[currentQuestionIndex] !== undefined) return;

    const question = activeQuestions[currentQuestionIndex];
    if (!question) return;
    if (optionIndex < 0 || optionIndex >= question.options.length) return;

    const optionButtons = app.querySelectorAll(".option-btn");
    const isCorrect = optionIndex === question.correctAnswer;

    if (isCorrect) {
        answeredCorrectly = true;
        selectedAnswer = optionIndex;
        sessionSelections[currentQuestionIndex] = optionIndex;

        optionButtons.forEach(function (button, index) {
            button.disabled = true;
            if (index === question.correctAnswer) {
                button.classList.add("is-correct");
                button.setAttribute("aria-label", "Correct answer");
            }
        });

        showFeedback(true, question);
        addContinueButton();
    } else {
        const wrongButton = optionButtons[optionIndex];
        if (wrongButton) {
            wrongButton.classList.add("is-selected", "is-incorrect");
            wrongButton.setAttribute("aria-label", "Incorrect choice");
        }
        showFeedback(false, question);
    }
}

function showFeedback(isCorrect, question) {
    const feedback = app.querySelector("#feedback");
    if (feedback) {
        feedback.textContent = isCorrect
            ? pickFeedback(POSITIVE_FEEDBACK)
            : pickFeedback(CORRECTIVE_FEEDBACK);
        feedback.classList.remove("is-correct", "is-incorrect");
        feedback.classList.add(isCorrect ? "is-correct" : "is-incorrect");
    }

    const explanation = app.querySelector(".explanation");
    if (explanation) {
        if (isCorrect && question && question.explanation) {
            explanation.innerHTML =
                "<strong>Why this is right:</strong> " + escapeHTML(question.explanation);
            explanation.removeAttribute("aria-hidden");
        } else {
            explanation.setAttribute("aria-hidden", "true");
            explanation.textContent = "";
        }
    }
}

function addContinueButton() {
    if (app.querySelector('[data-action="continue"]')) return;

    const actions = app.querySelector(".quiz-actions");
    if (!actions) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-primary";
    button.setAttribute("data-action", "continue");
    button.textContent = "Continue";
    actions.appendChild(button);
}

/* Render the read-only "already answered" state for a question revisited via Back. */
function renderAnsweredState(question, selectedIndex) {
    const optionButtons = app.querySelectorAll(".option-btn");

    optionButtons.forEach(function (button, index) {
        button.disabled = true;
        if (index === question.correctAnswer) {
            button.classList.add("is-correct");
            button.setAttribute("aria-label", "Correct answer");
        } else if (index === selectedIndex) {
            button.classList.add("is-incorrect");
            button.setAttribute("aria-label", "Your previous choice");
        }
    });

    showFeedback(true, question);
    addNextButton();
}

function addNextButton() {
    if (app.querySelector('[data-action="continue"]')) return;

    const actions = app.querySelector(".quiz-actions");
    if (!actions) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-primary";
    button.setAttribute("data-action", "continue");
    button.textContent = "Next";
    actions.appendChild(button);
}

function nextQuestion() {
    if (currentQuestionIndex + 1 >= activeQuestions.length) {
        completeTraining();
        return;
    }

    currentQuestionIndex += 1;
    selectedAnswer = null;
    answeredCorrectly = false;
    renderQuestion();
}

/* ---------- Back navigation ---------- */

function goBack() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex -= 1;
        selectedAnswer = null;
        answeredCorrectly = false;
        renderQuestion();
        return;
    }

    if (currentModule && isValidModule(currentModule)) {
        showModuleIntro(currentModule.id);
        return;
    }

    showHome();
}

/* ---------- Completion ---------- */

function completeTraining() {
    const total = activeQuestions.length;
    const reminders = SECURITY_REMINDERS
        .map(function (reminder) {
            return "<li>" + escapeHTML(reminder) + "</li>";
        })
        .join("");

    app.innerHTML = `
        <section class="completion-card">
            <div class="completion-icon" aria-hidden="true">🎉</div>
            <h1 class="completion-title">Congratulations!</h1>
            <p class="completion-message">
                Great work! You've completed this cybersecurity awareness training.
            </p>
            <p class="completion-stat">
                You completed <strong>${total}</strong> questions in this module.
            </p>
            <h2 class="reminders-title">Key security reminders</h2>
            <ul class="reminders">${reminders}</ul>
            <div class="completion-actions">
                <button type="button" class="btn btn-primary" data-action="home">Back to Home</button>
            </div>
        </section>`;

    moveFocus(".completion-title");
}

/* ---------- Error handling ---------- */

function showError(message) {
    app.innerHTML = `
        <section class="error-card">
            <div class="error-icon" aria-hidden="true">⚠️</div>
            <h1 class="error-title">Something went wrong</h1>
            <p class="error-message">${escapeHTML(message)}</p>
            <div class="completion-actions">
                <button type="button" class="btn btn-primary" data-action="home">Back to Home</button>
            </div>
        </section>`;

    moveFocus(".error-title");
}

/* ---------- Reset ---------- */

function resetTraining() {
    currentModule = null;
    currentQuestionIndex = 0;
    selectedAnswer = null;
    answeredCorrectly = false;
    activeQuestions = [];
    sessionSelections = {};
}

/* ---------- Event handling ---------- */

function handleAppClick(event) {
    const trigger = event.target.closest("[data-action]");
    if (!trigger) return;

    const action = trigger.getAttribute("data-action");

    switch (action) {
        case "select-module":
            showModuleIntro(trigger.getAttribute("data-module"));
            break;
        case "start-training":
            startTraining(trigger.getAttribute("data-module"));
            break;
        case "answer":
            handleAnswer(Number(trigger.getAttribute("data-index")));
            break;
        case "continue":
            nextQuestion();
            break;
        case "back":
            goBack();
            break;
        case "home":
            resetTraining();
            showHome();
            break;
    }
}

function init() {
    if (!app) return;

    app.addEventListener("click", handleAppClick);

    const brandLink = document.getElementById("brand-link");
    if (brandLink) {
        brandLink.addEventListener("click", function (event) {
            event.preventDefault();
            resetTraining();
            showHome();
        });
    }

    showHome();
}

init();

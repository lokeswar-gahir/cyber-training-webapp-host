# Cybersecurity Awareness Training Website — Implementation Specification

## Objective

Build a responsive static cybersecurity awareness training website using only:

- HTML5
- CSS3
- Vanilla JavaScript

Do not use:

- React
- Angular
- Vue
- Bootstrap
- Tailwind
- Node.js backend
- Express
- Database
- API
- Authentication
- External data storage

The application must run by opening `index.html` and must be deployable directly to Azure Static Web Apps from GitHub.

---

## Application modules

Initially create two training modules:

1. Phishing Awareness
2. General Cybersecurity

Design the questionnaire engine so additional modules can be added later by modifying the question data without modifying the core questionnaire logic.

---

## Folder structure

Create:

```text
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   └── questions.js
├── assets/
│   └── images/
├── tests/
│   └── test-plan.md
├── .github/
│   └── workflows/
│       └── azure-static-web-apps.yml
├── staticwebapp.config.json
├── README.md
└── .gitignore
```

---

## Landing page

Create a friendly corporate cybersecurity landing page.

Display:

- Security/cybersecurity icon
- Application title
- Short explanation of the training
- Training module cards

Training module cards:

### Phishing Awareness

Description:

"Learn how to recognize suspicious emails, avoid phishing attacks, and report them correctly."

### General Cybersecurity

Description:

"Learn everyday security practices that help protect company systems and information."

Each card must contain a button such as:

"Start Training"

---

## Training introduction

When a module is selected, show:

- Module title
- Module description
- Number of questions
- Short explanation of what the employee will learn
- Start Training button
- Back to Home button

---

## Questionnaire

Display one question at a time.

Each question must contain:

- Question number
- Total number of questions
- Progress percentage
- Green/teal progress bar
- Question text
- 4–5 answer options
- Back button

Example:

Question 2 of 8

Progress:

40%

The progress bar should use a friendly green/teal color.

---

## Answer behavior

Each answer must be clickable.

When the employee selects an answer:

### Correct answer

Display friendly positive feedback.

Examples:

- "Nice work! That's the safer choice."
- "Great job! You spotted the security risk."
- "Excellent! You're thinking like a security-aware employee."
- "Well done! That's the action we want to see."
- "You're doing great! Keep going."

Do not always display the same feedback.

After a correct answer:

- Disable the answer options.
- Show a Continue/Keep Going button.
- Allow the employee to proceed to the next question.

### Incorrect answer

Display friendly corrective feedback.

Examples:

- "Good try! Take another look at the situation."
- "Almost there! That choice could introduce a security risk."
- "Not quite! Think about the safest action you could take."
- "That's not the safest choice. Give it another shot."
- "Nice attempt! Let's look at this one again."

After an incorrect answer:

- Do not advance to the next question.
- Keep the current question visible.
- Allow the employee to select another answer.
- Do not make the experience feel punitive.

The user must eventually select the correct answer before proceeding.

---

## Question data

Store all question content in:

```text
js/questions.js
```

Do not hard-code questions inside `app.js`.

Each question should follow this structure:

```javascript
{
    question: "Question text",

    options: [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
    ],

    correctAnswer: 2,

    explanation: "Explanation of why this is the correct answer."
}
```

`correctAnswer` is the zero-based array index.

Provide at least:

- 8 phishing questions
- 8 general cybersecurity questions

Use realistic employee-training scenarios.

---

## Phishing topics

Cover topics including:

- Suspicious sender addresses
- Lookalike domains
- Suspicious links
- Unexpected attachments
- Urgent requests
- Requests for passwords
- Requests for financial information
- Reporting phishing emails
- What to do after clicking a suspicious link
- Contacting IT/security

Questions should be scenario-based rather than purely theoretical.

---

## General cybersecurity topics

Cover:

- Password security
- MFA
- Unexpected MFA requests
- Software updates
- Public Wi-Fi
- USB devices
- Malware
- Suspicious activity
- Device locking
- Physical security
- Data protection
- Reporting incidents

Questions should be scenario-based.

---

## Progress

The progress bar must dynamically calculate:

```text
current question / total questions
```

Examples:

5 questions:

```text
20%
40%
60%
80%
100%
```

10 questions:

```text
10%
20%
30%
40%
50%
60%
70%
80%
90%
100%
```

Display the percentage numerically next to or above the progress bar.

---

## Back navigation

Provide a Back button.

Behavior:

- On Question 1, Back should return to the module introduction.
- On later questions, Back should return to the previous question.
- Going backward must not break the progress bar.
- The questionnaire should preserve navigation state while the current training session is active.

Do not allow the Back button to create invalid question indexes.

---

## Completion page

After answering the final question correctly, show a dedicated completion screen.

Display:

- Congratulations message
- Friendly celebration icon
- Training completed message
- Number of questions completed
- Reminder of key security behaviors
- Back to Home button

Example content:

"Great work! You've completed this cybersecurity awareness training."

Include reminders such as:

- Think before you click.
- Check unexpected requests.
- Report suspicious emails.
- When in doubt, contact IT.

Do not store completion information in a backend.

---

## State management

Use simple JavaScript variables for runtime state.

For example:

```javascript
let currentModule = null;
let currentQuestionIndex = 0;
let selectedAnswer = null;
let answeredCorrectly = false;
```

Do not use a backend.

Do not use localStorage unless specifically required later.

Refreshing the page may reset the current training session.

---

## UI design

Use a friendly corporate cybersecurity design.

Avoid a dark "hacker/Matrix" aesthetic.

Use:

- White cards
- Light background
- Green/teal primary colors
- Dark navy text
- Rounded corners
- Soft shadows
- Large clickable answer cards
- Clear buttons
- Friendly icons
- Responsive layout

Recommended colors:

```css
--primary: #0f766e;
--primary-light: #14b8a6;
--success: #16a34a;
--background: #f4f8f7;
--card: #ffffff;
--text: #172033;
--muted: #64748b;
--border: #dbe5e3;
```

Do not rely only on color to communicate correct/incorrect state.

---

## Responsive requirements

The website must work on:

Desktop:

- 1920×1080
- 1440×900
- 1366×768

Tablet:

- 1024×768
- 768×1024

Mobile:

- 390×844
- 375×812

No horizontal scrolling should occur.

Answer buttons must remain large enough for touch interaction.

---

## Accessibility

Implement:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Proper button elements
- Accessible labels
- Appropriate ARIA only where needed
- `aria-live="polite"` for feedback messages
- Sufficient color contrast

Feedback should use something similar to:

```html
<div
    id="feedback"
    role="status"
    aria-live="polite">
</div>
```

---

## Security

Do not include:

- API keys
- Passwords
- Secrets
- Azure credentials
- Deployment tokens
- Employee information

Do not dynamically inject untrusted content as HTML.

Prefer:

```javascript
element.textContent = value;
```

where possible.

---

## Testing

Create:

```text
tests/test-plan.md
```

Include test cases for:

### Navigation

- Landing page
- Module selection
- Training introduction
- Start training
- Back navigation
- Home navigation

### Questions

- Question rendering
- Four/five options
- Correct answer
- Incorrect answer
- Retry after incorrect answer
- Continue after correct answer
- Last question
- Completion screen

### Progress

Verify progress percentages for different question counts.

### Responsive

Test desktop, tablet, and mobile dimensions.

### Browser

Test:

- Microsoft Edge
- Google Chrome
- Firefox
- Safari

### Accessibility

Test:

- Keyboard navigation
- Focus states
- Screen reader feedback
- Color contrast

### Error handling

Verify:

- Invalid module ID
- Empty question list
- Invalid question index
- Missing answer options
- Missing correct answer

The application should fail gracefully rather than displaying a blank screen.

---

## Code quality

Keep responsibilities separated:

### `questions.js`

Question and module data only.

### `app.js`

Application state and questionnaire logic.

### `styles.css`

All visual styling.

### `index.html`

Page structure only.

Do not create a large monolithic JavaScript function.

Use small reusable functions such as:

```javascript
showHome();
showModuleIntro();
startTraining();
renderQuestion();
handleAnswer();
showFeedback();
nextQuestion();
updateProgress();
completeTraining();
resetTraining();
```

Add comments for important logic but do not over-comment obvious code.

---

## Final acceptance criteria

The application is complete when:

1. The landing page displays both training modules.
2. Users can select either module.
3. Each module has at least 8 questions.
4. Every question has 4–5 options.
5. Incorrect answers produce friendly corrective feedback.
6. Incorrect answers do not advance the questionnaire.
7. Correct answers produce positive feedback.
8. Correct answers enable the Continue button.
9. The progress bar updates correctly.
10. The Back button works correctly.
11. The final question leads to the completion page.
12. The completion page links back to Home.
13. No backend is required.
14. No data is persisted.
15. No JavaScript console errors occur during normal use.
16. The site works on desktop and mobile.
17. The site is keyboard accessible.
18. The site can be deployed to Azure Static Web Apps from GitHub.
19. No secrets are committed to GitHub.
20. The code remains easy to extend with additional training modules.
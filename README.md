# SecureStart — Cybersecurity Awareness Training

A friendly, interactive, static cybersecurity awareness training website built with
**HTML5**, **CSS3**, and **vanilla JavaScript** only.

- No frameworks (no React, Vue, Angular, Bootstrap, Tailwind)
- No backend, no database, no API, no authentication
- No persisted data — the app runs entirely in the browser
- Deployable as a static site to **Azure Static Web Apps** from GitHub

## Features

- **Landing page** with training module cards
- **Two training modules** — *Phishing Awareness* and *General Cybersecurity* (20-question bank each; **10 random questions** are selected for every training session)
- **One-question-at-a-time questionnaire** with a green/teal progress bar and numeric percentage
- **Random question selection** — each session draws 10 random questions from the module's question bank
- **Revisit answered questions** — going Back to an already-answered question shows it in a read-only state with a **Next** button to move forward again
- **Friendly answer feedback** — positive on correct answers, corrective (non-punitive) on wrong answers
- **Retry on incorrect answers** — the employee must pick the correct answer before continuing
- **Back navigation** that preserves a valid question index and never breaks the progress bar
- **Completion screen** with security reminders and a Back to Home button
- **Responsive layout** for desktop, tablet, and mobile
- **Accessible** — semantic HTML, keyboard navigation, visible focus, `aria-live` feedback, progressbar roles

## Project structure

```text
/
├── index.html                 # Page structure
├── css/
│   └── styles.css             # All visual styling
├── js/
│   ├── questions.js           # Module + question data only (trainingModules)
│   └── app.js                 # Application state and questionnaire logic
├── assets/
│   └── images/                # favicon.svg
├── tests/
│   └── test-plan.md           # Manual + automated test cases
├── .github/
│   └── workflows/
│       └── azure-static-web-apps.yml   # CI/CD workflow
├── staticwebapp.config.json   # Azure SWA configuration
├── README.md
└── .gitignore
```

## Run locally

Just open `index.html` in any modern browser (no build step, no server required):

```text
Double-click index.html
```

You can also serve the folder locally, e.g. with `npx serve .`.

## How to add a new training module

The questionnaire engine is data-driven, so adding a module requires **no changes to the core logic**:

1. Open `js/questions.js`.
2. Add a new key inside `trainingModules` with the same shape:

```javascript
newmodule: {
    id: "newmodule",
    title: "New Module Title",
    description: "Short module description.",
    icon: "🔒",
    intro: "What the employee will learn.",
    questions: [
        {
            question: "Question text",
            options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            correctAnswer: 0,          // zero-based index of the correct option
            explanation: "Why this is the correct answer."
        }
        // ... more questions
    ]
}
```

3. Save and reload — the new module card appears automatically on the landing page.

Notes:
- Each question must have **4–5 options** and a valid `correctAnswer` index.
- Invalid questions (missing options, out-of-range correct answer) are filtered out gracefully by the app.

## Deploy to Azure Static Web Apps

1. Create a Static Web App in the Azure portal (Free tier is fine; select "GitHub" as the source).
2. Pick your repository and the `main` branch. Azure adds a deployment token to your repo as the
   secret `AZURE_STATIC_WEB_APPS_API_TOKEN`.
3. The included workflow (`.github/workflows/azure-static-web-apps.yml`) runs automatically on push to `main`.

> No secrets are committed to the repository. The workflow only references the secret by name.

### File URLs on the deployed site

Every file is served from the site root, so assets are reachable by direct URL
(`<your-site>.azurestaticapps.net/...`). Examples:

- `/` and `/index.html` — the app
- `/css/styles.css` — stylesheet
- `/js/app.js`, `/js/questions.js` — scripts
- `/assets/images/favicon.svg` — icon (any PNG/JPG/SVG you place in `assets/` is served from `/assets/...`)

`staticwebapp.config.json` guarantees this behavior:

- Existing files (`.js`, `.css`, `.png`, `.svg`, etc.) are always served directly with the correct
  MIME type — they are never rewritten to `index.html`.
- The SPA fallback to `index.html` only applies to non-asset URLs (e.g. `/profile` or an unknown route).
- If you add new static file types, add their extension to the `exclude` list (and the `mimeTypes`
  map if needed) in `staticwebapp.config.json`.

## Testing

See [tests/test-plan.md](tests/test-plan.md) for the full test plan covering navigation, questions,
progress, back navigation, responsive layouts, browsers, accessibility, error handling, and runtime errors.

The app was verified during development with automated headless-browser checks at all target viewports
(1920×1080 down to 375×812), with zero uncaught JavaScript errors during normal use.

## Security notes

- No API keys, passwords, credentials, or employee information are included.
- All question/module content is trusted static data and is HTML-escaped before rendering.
- Dynamic feedback text is inserted via `textContent` (never as raw HTML).

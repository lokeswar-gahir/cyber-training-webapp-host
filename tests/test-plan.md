# SecureStart — Test Plan

This test plan documents the manual and automated checks used to validate the
Cybersecurity Awareness Training website.

**Test status legend:** ✅ Verified in this build · ☐ To be verified by the QA/user
**Browsers targeted:** Microsoft Edge, Google Chrome, Firefox, Safari

---

## 1. Navigation

| # | Test case | Expected result | Status |
|---|-----------|-----------------|--------|
| N1 | Open `index.html` | Landing page shows the app title, a short explanation, and both training module cards | ✅ |
| N2 | Both module cards display | "Phishing Awareness" and "General Cybersecurity" cards with a "Start Training" button each | ✅ |
| N3 | Click "Start Training" on a module card | The training introduction screen opens for that module | ✅ |
| N4 | Module introduction screen | Shows module title, description, question count, "What you will learn", "Start Training" and "Back to Home" buttons | ✅ |
| N5 | Click "Start Training" on the introduction | Questionnaire starts at Question 1 | ✅ |
| N6 | Click "Back to Home" on the introduction | Returns to the landing page | ✅ |
| N7 | Click the header brand/shield | Returns to the landing page from any view | ✅ |
| N8 | Refresh mid-training | Session resets to the landing page (no persisted state) | ☐ |

## 2. Questions

| # | Test case | Expected result | Status |
|---|-----------|-----------------|--------|
| Q1 | Question rendering | One question at a time; question number, total, and question text are shown | ✅ |
| Q2 | Answer options | Each question shows 4–5 clickable options | ✅ |
| Q3 | Correct answer | Friendly positive feedback appears, options are disabled, "Continue" button appears | ✅ |
| Q4 | Incorrect answer | Friendly corrective feedback appears; the questionnaire does **not** advance | ✅ |
| Q5 | Retry after incorrect | Employee can select another answer; options remain enabled | ✅ |
| Q6 | Continue after correct | "Continue" moves to the next question | ✅ |
| Q7 | Last question | Answering the final question correctly leads to the completion screen | ✅ |
| Q8 | Completion screen | Congratulations message, celebration icon, questions-completed count, security reminders, "Back to Home" button | ✅ |
| Q9 | Positive feedback variety | Different positive messages appear across correct answers (random pool of 5) | ✅ |
| Q10 | Corrective feedback variety | Different corrective messages appear across wrong answers (random pool of 5) | ✅ |
| Q11 | Session size | Each training session contains exactly 10 questions | ✅ |
| Q12 | Random selection | The 10 questions are randomly chosen from the module's question bank (e.g. 10 unique questions out of 20) | ✅ |
| Q13 | Restart draws again | Starting a module again draws a fresh random set (state resets) | ✅ |
| Q14 | Question bank preserved | The full question bank (20 per module) stays in `js/questions.js` unchanged | ✅ |

### Revisiting an answered question (Next button)

| # | Test case | Expected result | Status |
|---|-----------|-----------------|--------|
| Q15 | Back to an answered question | Question renders in read-only state: options disabled, correct option highlighted, feedback + explanation shown | ✅ |
| Q16 | Next button on answered question | A "Next" button is shown so the employee can move forward again without re-answering | ✅ |
| Q17 | Next advances correctly | "Next" moves to the following question (and keeps the progress bar valid) | ✅ |

## 3. Progress

| # | Test case | Expected result | Status |
|---|-----------|-----------------|--------|
| P1 | 5-question module | Percentages shown: 20, 40, 60, 80, 100 | ✅ |
| P2 | 10-question session | Percentages shown: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 | ✅ |
| P3 | 20-question module (bank) | Session still uses 10 questions; percentages follow the 10-question scale | ✅ |
| P4 | Progress bar fill | Bar width matches the numeric percentage and uses a green/teal gradient | ✅ |
| P5 | Progress after Back | Percentage recalculates for the visible question; no broken/negative values | ✅ |

## 4. Back navigation

| # | Test case | Expected result | Status |
|---|-----------|-----------------|--------|
| B1 | Back on Question 1 | Returns to the module introduction | ✅ |
| B2 | Back on Question 2+ | Returns to the previous question | ✅ |
| B3 | Back repeatedly at Question 1 | Cannot create invalid question indexes; stays on introduction | ✅ |
| B4 | Back with no active session | Falls back to the landing page without error | ✅ |
| B5 | Forward again after going back | Going forward shows the previous question correctly with a valid progress value | ✅ |
| B6 | Forward over an answered question | Back to an answered question then "Next" moves forward again (no re-answer needed) | ✅ |
| B7 | Back at Question 1 after session start | Returns to the module introduction, which still shows 10 questions | ✅ |

## 5. Responsive

No horizontal scrolling, answer buttons remain ≥ 44 px tall, layout remains usable.

| # | Viewport | Result | Status |
|---|----------|--------|--------|
| R1 | 1920×1080 (desktop) | No horizontal scroll, grid layout | ✅ |
| R2 | 1440×900 (desktop) | No horizontal scroll | ✅ |
| R3 | 1366×768 (desktop) | No horizontal scroll | ✅ |
| R4 | 1024×768 (tablet) | No horizontal scroll | ✅ |
| R5 | 768×1024 (tablet portrait) | No horizontal scroll | ✅ |
| R6 | 390×844 (mobile) | No horizontal scroll, buttons full width | ✅ |
| R7 | 375×812 (mobile) | No horizontal scroll, buttons full width | ✅ |
| R8 | Touch targets | Option and action buttons measured ≥ 44 px tall | ✅ |

## 6. Browsers

Run the full navigation + questions walkthrough in each browser:

| # | Browser | Status |
|---|---------|--------|
| BR1 | Microsoft Edge (headless automated run) | ✅ |
| BR2 | Google Chrome | ☐ |
| BR3 | Firefox | ☐ |
| BR4 | Safari | ☐ |

## 7. Accessibility

| # | Test case | Expected result | Status |
|---|-----------|-----------------|--------|
| A1 | Keyboard navigation | All actions reachable with Tab/Enter/Space; no keyboard traps | ✅ |
| A2 | Focus states | Visible focus ring on all interactive elements (`:focus-visible`) | ✅ |
| A3 | Screen reader feedback | Feedback region uses `role="status"` + `aria-live="polite"`; focus moves to new content on view change | ✅ |
| A4 | Progress announced | Progress bar uses `role="progressbar"` with `aria-valuenow/min/max` | ✅ |
| A5 | Color contrast | Feedback text is not conveyed by color alone (text + icon border state also used) | ✅ |
| A6 | Skip link | "Skip to content" link is present and becomes visible on focus | ☐ |
| A7 | Semantic HTML | Uses header, main, footer, article, section, h1–h2, list, and real buttons | ✅ |
| A8 | Contrast check | Text colors chosen for sufficient contrast on white/light backgrounds | ☐ |

## 8. Error handling

The app must fail gracefully and never show a blank screen.

| # | Test case | Expected result | Status |
|---|-----------|-----------------|--------|
| E1 | Invalid module ID | Friendly error card with a "Back to Home" button | ✅ |
| E2 | Empty question list | Friendly message ("no valid questions yet") instead of a blank screen | ✅ |
| E3 | Invalid question index | Friendly error message, no crash | ✅ |
| E4 | Missing answer options | Question is filtered out / error shown, no crash | ✅ |
| E5 | Missing/out-of-range correct answer | Question is filtered out / error shown, no crash | ✅ |
| E6 | No training modules registered | Landing page shows a friendly "no modules available" message | ✅ |

## 9. Console / runtime

| # | Test case | Expected result | Status |
|---|-----------|-----------------|--------|
| C1 | Normal use (home → intro → quiz → completion) | Zero uncaught JS exceptions | ✅ |
| C2 | Incorrect-answer flow | Zero uncaught JS exceptions | ✅ |
| C3 | Back navigation flows | Zero uncaught JS exceptions | ✅ |

## 10. How to run the checks

1. Open `index.html` directly in a browser (double-click) or serve the folder.
2. Walk the manual cases above using the Browser DevTools console to watch for errors.
3. Automated verification used during development:
   - Headless Edge DOM assertions for all navigation/question/error flows.
   - Viewport emulation (DevTools Protocol) at the seven required sizes for overflow and touch-target checks.
   - Screenshots captured at `desktop` and `mobile` sizes for visual review.

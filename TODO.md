# QuizLab AI — Implementation ToDo

## Static scaffold and architecture
- [x] Use React functional components, TypeScript strict mode, Tailwind CSS, and Vite.
- [x] Keep the app purely static with no backend, database, authentication, API routes, server-side code, browser storage, cookies, or persistence.
- [x] Keep top-level quiz state in the app component and define shared types centrally.
- [x] Provide the Appendix A component, data, type, utility, and entry-point structure.

## Question data and quiz logic
- [x] Store question content in four static JSON files under `src/data/`.
- [x] Provide exactly 3 sample questions per difficulty (9 per category file), with exactly 4 options and valid explanations.
- [x] Validate malformed question records out of eligible pools without crashing.
- [x] Filter by category and difficulty, randomly sample up to 10 without replacement, and use all available questions when fewer than 10 exist.
- [x] Score answers using the number of questions actually presented and return the three PRD message tiers.

## Five-screen user flow
- [x] Home screen has the app wordmark, one-sentence framing, and one primary Start action.
- [x] Selection screen exposes exactly 4 categories and exactly 3 difficulties, with disabled Start Quiz until both are selected.
- [x] Selection screen shows the exact no-questions message for an empty valid pool.
- [x] Quiz screen presents one question at a time with exactly 4 options, forward-only navigation, no timer, no mid-quiz correctness feedback, and accessible progress.
- [x] Results screen shows score fraction, percentage, exactly one tiered message, Review, Retry, and Choose Different actions.
- [x] Review screen shows every presented question, all options, selected/correct states, and explanations in one scrollable view.

## Accessibility and responsive styling
- [x] Use keyboard-operable buttons and radio semantics with visible focus states.
- [x] Move focus to each new screen heading and announce progress changes.
- [x] Keep correct/incorrect review states distinguishable by both color and text/symbol labels.
- [x] Keep the UI light-only, responsive, touch-friendly, and free of horizontal scrolling.

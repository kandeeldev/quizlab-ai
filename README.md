# QuizLab AI

QuizLab AI is a focused, no-sign-up quiz app for beginner-to-intermediate self-learners studying Python, data analysis, machine learning, and deep learning. It presents one question at a time, scores the completed quiz, and explains every answer during review.

## Key features

- Four categories: Python, Data Analysis, Machine Learning, and Deep Learning.
- Three difficulty levels: Easy, Medium, and Hard.
- Up to 10 random questions per quiz, sampled without replacement from the selected category and difficulty.
- Instant score after completion, including the correct fraction, percentage, and tiered feedback message.
- Full answer review with every option, the user's selection, the correct answer, and an explanation.
- End quiz button that discards the current quiz and returns to category and difficulty selection without retaining progress.
- Fully responsive layout for mobile, tablet, and desktop screens.
- Keyboard-operable controls, accessible radio semantics, visible focus states, progress announcements, and non-color-only review indicators.
- No sign-up, authentication, backend, database, cookies, or browser storage. Quiz state is kept only in memory for the current session.

## Setup and installation

### Clone the project

Replace `<repository-url>` with the URL of the project repository when one is available:

```bash
git clone <repository-url>
cd quizlab-ai
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

The Vite development server runs on port `3000`.

### Create a production build

```bash
npm run build
```

### Run lint checks

```bash
npm run lint
```

## Tech stack

- **React** with functional components and hooks.
- **TypeScript** in strict mode.
- **Tailwind CSS** for styling.
- **Vite** for development and production builds.
- **Static JSON data** bundled at build time from `src/data/`.

There is no server-side code, API route, backend, database, authentication system, or persistence layer.

## Project structure

```text
quizlab-ai/
├── public/
│   └── manus-routes.json
├── src/
│   ├── components/
│   │   ├── Home.tsx
│   │   ├── SelectionScreen.tsx
│   │   ├── QuizScreen.tsx
│   │   ├── ResultsScreen.tsx
│   │   └── ReviewScreen.tsx
│   ├── data/
│   │   ├── python.json
│   │   ├── data-analysis.json
│   │   ├── machine-learning.json
│   │   └── deep-learning.json
│   ├── types/
│   │   └── quiz.ts
│   ├── utils/
│   │   └── quizLogic.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

### Responsibilities of the main source files

- `src/App.tsx` owns the in-memory screen flow and quiz state.
- `src/utils/quizLogic.ts` validates question records, filters by difficulty, samples random questions, and calculates scores.
- `src/types/quiz.ts` defines the category, difficulty, question, screen, answer, and score types.
- `src/components/` contains the five screens: Home, Selection, Quiz, Results, and Review.
- `src/data/` contains the static question banks.

## Adding a new category

1. Add a JSON file under `src/data/`, following the question schema below.
2. Import the new JSON file and register it in the `questionBank` map in `src/App.tsx`.
3. Add the category name to the `categories` array and `Category` type source in `src/types/quiz.ts`.
4. Add the category's short label and description to `categoryDetails` in `src/components/SelectionScreen.tsx`.
5. Confirm that the category is available at all supported difficulty levels and run:

```bash
npm run lint
npm run build
```

## Usage

1. Select **Start a quiz** on the Home screen.
2. Choose one category: Python, Data Analysis, Machine Learning, or Deep Learning.
3. Choose Easy, Medium, or Hard.
4. Select one answer for each question. The quiz moves forward only; the Next button remains disabled until an answer is selected.
5. Continue until the final question and view the score.
6. Select **Review answers** to see every presented question, all options, your answer, the correct answer, and the explanation.
7. Select **Retry quiz** to start another randomized quiz with the same category and difficulty, or choose a different selection.
8. Select **End quiz** during a quiz to discard it and return to Selection without a score or review.

## Question data format

Each question is a JSON object with this schema:

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Unique question identifier within the question bank. |
| `question` | string | The question text. |
| `options` | tuple of 4 strings | Exactly four answer options. |
| `correctAnswerIndex` | `0 \| 1 \| 2 \| 3` | Zero-based index of the correct option. |
| `explanation` | string | Explanation shown during answer review. |
| `difficulty` | `"Easy" \| "Medium" \| "Hard"` | Difficulty bucket used by the Selection screen. |

Example:

```json
{
  "id": "py-easy-example",
  "question": "Which keyword defines a function in Python?",
  "options": ["func", "def", "function", "lambda"],
  "correctAnswerIndex": 1,
  "explanation": "The def keyword starts a named function definition in Python.",
  "difficulty": "Easy"
}
```

## Screenshots

> **Placeholder — screenshots will be added after the final screenshot capture pass.**

- Home screen: `[Screenshot placeholder]`
- Selection screen: `[Screenshot placeholder]`
- Quiz screen: `[Screenshot placeholder]`
- Results screen: `[Screenshot placeholder]`
- Review screen: `[Screenshot placeholder]`

## Live demo

> **Placeholder — live demo URL will be added after deployment.**
>
> Live demo: `[Vercel deployment URL placeholder]`

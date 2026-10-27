import type { Category, Difficulty } from '../types/quiz';
import { categories, difficulties } from '../types/quiz';

interface SelectionScreenProps {
  selectedCategory: Category | null;
  selectedDifficulty: Difficulty | null;
  availableCount: number | null;
  onCategoryChange: (category: Category) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onStart: () => void;
}

const categoryDetails: Record<
  Category,
  { short: string; description: string }
> = {
  Python: { short: 'PY', description: 'Syntax, data types, and core language ideas' },
  'Data Analysis': {
    short: 'DA',
    description: 'Data wrangling, statistics, and visual thinking',
  },
  'Machine Learning': {
    short: 'ML',
    description: 'Models, evaluation, and practical foundations',
  },
  'Deep Learning': {
    short: 'DL',
    description: 'Neural networks, training, and representations',
  },
};

const SelectionScreen = ({
  selectedCategory,
  selectedDifficulty,
  availableCount,
  onCategoryChange,
  onDifficultyChange,
  onStart,
}: SelectionScreenProps) => {
  const showNoQuestions = availableCount === 0;

  return (
    <section className="mx-auto w-full max-w-5xl py-10 sm:py-14" aria-labelledby="selection-title">
      <div className="max-w-2xl">
        <p className="eyebrow mb-4">Build your checkpoint</p>
        <h1
          id="selection-title"
          tabIndex={-1}
          className="font-display text-4xl font-extrabold tracking-[-0.045em] text-ink sm:text-5xl"
        >
          What do you want to practice?
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
          Answer up to 10 questions — you&apos;ll see your score and explanations at the end.
        </p>
      </div>

      <fieldset className="mt-10">
        <legend className="mb-4 text-sm font-bold text-slate-800">Choose a category</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            const details = categoryDetails[category];
            return (
              <button
                key={category}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`group flex min-h-[112px] items-start gap-4 rounded-2xl border p-5 text-left transition ${
                  isSelected
                    ? 'border-accent-500 bg-accent-50 shadow-[0_8px_24px_rgba(85,70,215,0.10)]'
                    : 'border-slate-200 bg-white hover:border-accent-200 hover:bg-accent-50/40'
                }`}
                onClick={() => onCategoryChange(category)}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-medium transition ${
                    isSelected
                      ? 'bg-accent-600 text-white'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-accent-100 group-hover:text-accent-700'
                  }`}
                >
                  {details.short}
                </span>
                <span>
                  <span className="block font-display text-base font-bold text-ink">{category}</span>
                  <span className="mt-1 block text-sm leading-5 text-slate-500">
                    {details.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-9">
        <legend className="mb-4 text-sm font-bold text-slate-800">Choose a difficulty</legend>
        <div className="grid max-w-3xl gap-3 sm:grid-cols-3">
          {difficulties.map((difficulty) => {
            const isSelected = selectedDifficulty === difficulty;
            return (
              <button
                key={difficulty}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`min-h-12 rounded-2xl border px-5 text-left text-sm font-bold transition ${
                  isSelected
                    ? 'border-accent-500 bg-accent-50 text-accent-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-accent-200 hover:bg-accent-50/40'
                }`}
                onClick={() => onDifficultyChange(difficulty)}
              >
                {difficulty}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-10 flex flex-col items-start gap-4 border-t border-slate-200 pt-7 sm:flex-row sm:items-center sm:justify-between">
        <div aria-live="polite" className="min-h-6 text-sm">
          {showNoQuestions ? (
            <p className="font-semibold text-slate-700">No questions available for this selection</p>
          ) : selectedCategory && selectedDifficulty ? (
            <p className="text-slate-500">
              {availableCount} question{availableCount === 1 ? '' : 's'} available in this pool.
            </p>
          ) : (
            <p className="text-slate-500">Select a category and difficulty to begin.</p>
          )}
        </div>
        <button
          className="primary-button w-full sm:w-auto"
          type="button"
          disabled={!selectedCategory || !selectedDifficulty || showNoQuestions}
          onClick={onStart}
        >
          Start quiz
        </button>
      </div>
    </section>
  );
};

export default SelectionScreen;

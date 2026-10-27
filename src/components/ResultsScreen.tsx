import { useEffect, useRef } from 'react';
import type { Category, Difficulty, QuizSummary } from '../types/quiz';

interface ResultsScreenProps {
  category: Category;
  difficulty: Difficulty;
  summary: QuizSummary;
  onReview: () => void;
  onRetry: () => void;
  onChangeSelection: () => void;
}

const ResultsScreen = ({
  category,
  difficulty,
  summary,
  onReview,
  onRetry,
  onChangeSelection,
}: ResultsScreenProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const percentage = Number.isInteger(summary.percentage)
    ? String(summary.percentage)
    : summary.percentage.toFixed(1);

  return (
    <section className="mx-auto w-full max-w-4xl py-10 sm:py-16" aria-labelledby="results-title">
      <div className="surface overflow-hidden">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-ink p-7 text-white sm:p-10 lg:p-12">
            <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.2em] text-accent-200">
              Quiz complete
            </p>
            <h1
              id="results-title"
              ref={headingRef}
              tabIndex={-1}
              className="mt-5 font-display text-4xl font-extrabold tracking-[-0.05em] sm:text-5xl"
            >
              {summary.message}
            </h1>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">
              Your checkpoint is complete. Review every answer to see what landed and what to revisit.
            </p>
            <div className="mt-10 border-t border-white/10 pt-5 text-sm text-slate-300">
              <span className="font-semibold text-white">{category}</span>
              <span className="mx-2 text-slate-500">·</span>
              {difficulty}
            </div>
          </div>

          <div className="p-7 sm:p-10 lg:p-12">
            <p className="eyebrow">Your score</p>
            <p className="mt-4 font-display text-6xl font-extrabold tracking-[-0.06em] text-ink sm:text-7xl">
              {summary.correct}
              <span className="text-slate-300">/{summary.total}</span>
            </p>
            <p className="mt-2 text-lg font-semibold text-accent-700">{percentage}% correct</p>
            <div className="mt-8 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-accent-600"
                style={{ width: `${summary.percentage}%` }}
              />
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              <button className="primary-button sm:col-span-2" type="button" onClick={onReview}>
                Review answers
                <span aria-hidden="true" className="ml-3 text-lg leading-none">
                  →
                </span>
              </button>
              <button className="secondary-button" type="button" onClick={onRetry}>
                Retry quiz
              </button>
              <button className="secondary-button" type="button" onClick={onChangeSelection}>
                Choose different
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsScreen;

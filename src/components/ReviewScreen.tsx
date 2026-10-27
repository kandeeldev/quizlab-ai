import { useEffect, useRef } from 'react';
import type { Category, Difficulty, Question, UserAnswer } from '../types/quiz';

interface ReviewScreenProps {
  category: Category;
  difficulty: Difficulty;
  questions: readonly Question[];
  answers: readonly UserAnswer[];
  onRetry: () => void;
  onChangeSelection: () => void;
}

const optionLetters = ['A', 'B', 'C', 'D'];

const ReviewScreen = ({
  category,
  difficulty,
  questions,
  answers,
  onRetry,
  onChangeSelection,
}: ReviewScreenProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section className="mx-auto w-full max-w-4xl py-10 sm:py-14" aria-labelledby="review-title">
      <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow mb-4">Answer review · {category} · {difficulty}</p>
          <h1
            id="review-title"
            ref={headingRef}
            tabIndex={-1}
            className="font-display text-4xl font-extrabold tracking-[-0.045em] text-ink sm:text-5xl"
          >
            Make the learning stick.
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Every question, every option, and the reasoning behind the correct answer.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button className="secondary-button" type="button" onClick={onRetry}>
            Retry
          </button>
          <button className="secondary-button" type="button" onClick={onChangeSelection}>
            New quiz
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {questions.map((question, questionIndex) => {
          const selectedAnswer = answers[questionIndex];
          const isCorrect = selectedAnswer === question.correctAnswerIndex;

          return (
            <article className="surface p-6 sm:p-8" key={question.id}>
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                  Question {String(questionIndex + 1).padStart(2, '0')}
                </span>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                    isCorrect
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {isCorrect ? '✓ Correct' : '× Incorrect'}
                </span>
              </div>

              <h2 className="mt-5 font-display text-xl font-extrabold leading-tight tracking-[-0.025em] text-ink sm:text-2xl">
                {question.question}
              </h2>

              <div className="mt-6 grid gap-2.5" aria-label={`Answer options for question ${questionIndex + 1}`}>
                {question.options.map((option, optionIndex) => {
                  const optionIsCorrect = optionIndex === question.correctAnswerIndex;
                  const optionIsSelected = optionIndex === selectedAnswer;
                  const indicatorText = optionIsCorrect
                    ? optionIsSelected
                      ? 'Correct answer · Your answer'
                      : 'Correct answer'
                    : optionIsSelected
                      ? 'Your answer'
                      : '';

                  return (
                    <div
                      className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 text-sm ${
                        optionIsCorrect
                          ? 'border-emerald-200 bg-emerald-50/70 text-emerald-900'
                          : optionIsSelected
                            ? 'border-rose-200 bg-rose-50/70 text-rose-900'
                            : 'border-slate-100 bg-slate-50/60 text-slate-600'
                      }`}
                      key={`${question.id}-${option}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-[0.68rem] font-medium ${
                          optionIsCorrect
                            ? 'bg-emerald-600 text-white'
                            : optionIsSelected
                              ? 'bg-rose-600 text-white'
                              : 'bg-white text-slate-500'
                        }`}
                      >
                        {optionIsCorrect ? '✓' : optionIsSelected ? '×' : optionLetters[optionIndex]}
                      </span>
                      <span className="min-w-0 flex-1 leading-6">{option}</span>
                      {indicatorText ? (
                        <span className="shrink-0 text-right text-xs font-bold leading-5">
                          {indicatorText}
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-accent-100 bg-accent-50/60 p-5">
                <p className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.18em] text-accent-700">
                  Why this is the answer
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{question.explanation}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ReviewScreen;

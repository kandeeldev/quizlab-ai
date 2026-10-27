import { useEffect, useRef } from 'react';
import type { Question, UserAnswer } from '../types/quiz';

interface QuizScreenProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer: UserAnswer;
  onSelectAnswer: (answerIndex: number) => void;
  onNext: () => void;
  onEndQuiz: () => void;
}

const optionLetters = ['A', 'B', 'C', 'D'];

const QuizScreen = ({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  onEndQuiz,
}: QuizScreenProps) => {
  const questionHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    questionHeadingRef.current?.focus();
  }, [question.id]);

  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <section className="mx-auto w-full max-w-3xl py-8 sm:py-12" aria-labelledby="quiz-title">
      <div className="mb-8 flex items-center justify-between gap-5">
        <div>
          <p className="eyebrow">Current checkpoint</p>
          <p
            className="mt-2 text-sm font-semibold text-slate-600"
            role="status"
            aria-live="polite"
          >
            Question {questionIndex + 1} of {totalQuestions}
          </p>
        </div>
        <span className="font-mono text-xs font-medium text-slate-500">
          {String(questionIndex + 1).padStart(2, '0')} / {String(totalQuestions).padStart(2, '0')}
        </span>
      </div>

      <div
        className="h-2 overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-label={`Quiz progress: question ${questionIndex + 1} of ${totalQuestions}`}
        aria-valuemin={1}
        aria-valuemax={totalQuestions}
        aria-valuenow={questionIndex + 1}
      >
        <div
          className="h-full rounded-full bg-accent-600 transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="surface mt-8 p-6 sm:p-10">
        <h1
          id="quiz-title"
          ref={questionHeadingRef}
          tabIndex={-1}
          className="font-display text-2xl font-extrabold leading-tight tracking-[-0.03em] text-ink sm:text-3xl"
        >
          {question.question}
        </h1>

        <div className="mt-8" role="radiogroup" aria-label="Answer options">
          <div className="grid gap-3">
            {question.options.map((option, optionIndex) => {
              const isSelected = selectedAnswer === optionIndex;
              return (
                <button
                  key={`${question.id}-${option}`}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`flex min-h-[60px] items-center gap-4 rounded-2xl border px-4 text-left transition sm:px-5 ${
                    isSelected
                      ? 'border-accent-500 bg-accent-50 text-accent-700 shadow-[0_5px_18px_rgba(85,70,215,0.09)]'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-accent-200 hover:bg-accent-50/40'
                  }`}
                  onClick={() => onSelectAnswer(optionIndex)}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-medium ${
                      isSelected ? 'bg-accent-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {optionLetters[optionIndex]}
                  </span>
                  <span className="text-sm font-semibold leading-6 sm:text-base">{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-9 flex items-center gap-3 border-t border-slate-100 pt-6">
          <button
            className="primary-button min-w-0 flex-1"
            type="button"
            disabled={selectedAnswer === null}
            onClick={onNext}
          >
            {questionIndex === totalQuestions - 1 ? 'See results' : 'Next question'}
            <span aria-hidden="true" className="ml-2 text-lg leading-none sm:ml-3">
              →
            </span>
          </button>
          <p className="hidden text-sm text-slate-500 sm:block">Choose one answer to continue.</p>
          <button
            className="secondary-button h-11 shrink-0 gap-2 whitespace-nowrap px-3"
            type="button"
            title="End quiz"
            onClick={onEndQuiz}
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
            <span>End quiz</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuizScreen;

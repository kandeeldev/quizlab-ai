import { useMemo, useState } from 'react';
import Home from './components/Home';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import ReviewScreen from './components/ReviewScreen';
import SelectionScreen from './components/SelectionScreen';
import deepLearningQuestions from './data/deep-learning.json';
import dataAnalysisQuestions from './data/data-analysis.json';
import machineLearningQuestions from './data/machine-learning.json';
import pythonQuestions from './data/python.json';
import type {
  Category,
  Difficulty,
  Question,
  Screen,
  UserAnswer,
} from './types/quiz';
import { createQuiz, getQuestionPool, scoreQuiz } from './utils/quizLogic';

const questionBank: Record<Category, unknown> = {
  Python: pythonQuestions,
  'Data Analysis': dataAnalysisQuestions,
  'Machine Learning': machineLearningQuestions,
  'Deep Learning': deepLearningQuestions,
};

const App = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const availableCount = useMemo(() => {
    if (!selectedCategory || !selectedDifficulty) {
      return null;
    }
    return getQuestionPool(questionBank[selectedCategory], selectedDifficulty).length;
  }, [selectedCategory, selectedDifficulty]);

  const summary = useMemo(
    () => scoreQuiz(quizQuestions, answers),
    [answers, quizQuestions],
  );

  const goToSelection = () => {
    setScreen('selection');
  };

  const startQuiz = () => {
    if (!selectedCategory || !selectedDifficulty) {
      return;
    }

    const nextQuestions = createQuiz(
      questionBank[selectedCategory],
      selectedDifficulty,
    );
    if (nextQuestions.length === 0) {
      return;
    }

    setQuizQuestions(nextQuestions);
    setAnswers(new Array(nextQuestions.length).fill(null));
    setCurrentQuestionIndex(0);
    setScreen('quiz');
  };

  const retryQuiz = () => {
    if (!selectedCategory || !selectedDifficulty) {
      return;
    }

    const nextQuestions = createQuiz(
      questionBank[selectedCategory],
      selectedDifficulty,
    );
    if (nextQuestions.length === 0) {
      setScreen('selection');
      return;
    }

    setQuizQuestions(nextQuestions);
    setAnswers(new Array(nextQuestions.length).fill(null));
    setCurrentQuestionIndex(0);
    setScreen('quiz');
  };

  const chooseDifferentSelection = () => {
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setQuizQuestions([]);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setScreen('selection');
  };

  const selectAnswer = (answerIndex: number) => {
    setAnswers((currentAnswers) => {
      const nextAnswers = [...currentAnswers];
      nextAnswers[currentQuestionIndex] = answerIndex;
      return nextAnswers;
    });
  };

  const advanceQuestion = () => {
    if (answers[currentQuestionIndex] === null || answers[currentQuestionIndex] === undefined) {
      return;
    }

    if (currentQuestionIndex === quizQuestions.length - 1) {
      setScreen('results');
      return;
    }
    setCurrentQuestionIndex((index) => index + 1);
  };

  return (
    <div className="screen-shell">
      <header className="flex items-center justify-between border-b border-slate-200/80 py-5">
        <div className="flex items-center gap-3" aria-label="QuizLab AI">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-600 font-mono text-[0.65rem] font-medium text-white"
          >
            Q
          </span>
          <span className="font-display text-sm font-extrabold tracking-[-0.02em] text-ink sm:text-base">
            QuizLab AI
          </span>
        </div>
        <span className="hidden font-mono text-[0.65rem] font-medium uppercase tracking-[0.16em] text-slate-500 sm:block">
          Learn by checking
        </span>
      </header>

      <main className="flex flex-1 flex-col">
        {screen === 'home' ? <Home onStart={goToSelection} /> : null}
        {screen === 'selection' ? (
          <SelectionScreen
            selectedCategory={selectedCategory}
            selectedDifficulty={selectedDifficulty}
            availableCount={availableCount}
            onCategoryChange={setSelectedCategory}
            onDifficultyChange={setSelectedDifficulty}
            onStart={startQuiz}
          />
        ) : null}
        {screen === 'quiz' && quizQuestions[currentQuestionIndex] ? (
          <QuizScreen
            question={quizQuestions[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            totalQuestions={quizQuestions.length}
            selectedAnswer={answers[currentQuestionIndex] ?? null}
            onSelectAnswer={selectAnswer}
            onNext={advanceQuestion}
            onEndQuiz={chooseDifferentSelection}
          />
        ) : null}
        {screen === 'results' && selectedCategory && selectedDifficulty ? (
          <ResultsScreen
            category={selectedCategory}
            difficulty={selectedDifficulty}
            summary={summary}
            onReview={() => setScreen('review')}
            onRetry={retryQuiz}
            onChangeSelection={chooseDifferentSelection}
          />
        ) : null}
        {screen === 'review' && selectedCategory && selectedDifficulty ? (
          <ReviewScreen
            category={selectedCategory}
            difficulty={selectedDifficulty}
            questions={quizQuestions}
            answers={answers}
            onRetry={retryQuiz}
            onChangeSelection={chooseDifferentSelection}
          />
        ) : null}
      </main>

      <footer className="border-t border-slate-200/80 py-5 text-center text-xs text-slate-500">
        No sign-up. No timer. Just a focused checkpoint.
      </footer>
    </div>
  );
};

export default App;

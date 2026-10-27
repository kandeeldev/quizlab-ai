import type {
  Difficulty,
  Question,
  QuizSummary,
  UserAnswer,
} from '../types/quiz';
import { difficulties } from '../types/quiz';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isDifficulty = (value: unknown): value is Difficulty =>
  typeof value === 'string' && difficulties.includes(value as Difficulty);

const isAnswerIndex = (value: unknown): value is 0 | 1 | 2 | 3 =>
  typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 3;

export const isValidQuestion = (value: unknown): value is Question => {
  if (!isRecord(value)) {
    return false;
  }

  const options = value.options;
  return (
    typeof value.id === 'string' &&
    value.id.trim().length > 0 &&
    typeof value.question === 'string' &&
    value.question.trim().length > 0 &&
    Array.isArray(options) &&
    options.length === 4 &&
    options.every(
      (option): option is string =>
        typeof option === 'string' && option.trim().length > 0,
    ) &&
    isAnswerIndex(value.correctAnswerIndex) &&
    typeof value.explanation === 'string' &&
    value.explanation.trim().length > 0 &&
    isDifficulty(value.difficulty)
  );
};

export const getValidQuestions = (source: unknown): Question[] => {
  if (!Array.isArray(source)) {
    return [];
  }

  const seenIds = new Set<string>();
  return source.filter((item): item is Question => {
    if (!isValidQuestion(item) || seenIds.has(item.id)) {
      return false;
    }
    seenIds.add(item.id);
    return true;
  });
};

export const getQuestionPool = (
  source: unknown,
  difficulty: Difficulty,
): Question[] =>
  getValidQuestions(source).filter(
    (question) => question.difficulty === difficulty,
  );

const shuffle = <T>(items: readonly T[]): T[] => {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }
  return shuffled;
};

export const createQuiz = (
  source: unknown,
  difficulty: Difficulty,
  maxQuestions = 10,
): Question[] => getQuestionPool(source, difficulty).length === 0
  ? []
  : shuffle(getQuestionPool(source, difficulty)).slice(0, maxQuestions);

export const getScoreMessage = (
  percentage: number,
): QuizSummary['message'] => {
  if (percentage >= 80) {
    return 'Excellent!';
  }
  if (percentage >= 50) {
    return 'Good effort!';
  }
  return 'Keep practicing!';
};

export const scoreQuiz = (
  questions: readonly Question[],
  answers: readonly UserAnswer[],
): QuizSummary => {
  const total = questions.length;
  const correct = questions.reduce(
    (score, question, index) =>
      score + (answers[index] === question.correctAnswerIndex ? 1 : 0),
    0,
  );
  const percentage = total === 0 ? 0 : (correct / total) * 100;

  return {
    correct,
    total,
    percentage,
    message: getScoreMessage(percentage),
  };
};

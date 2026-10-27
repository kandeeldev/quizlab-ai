export const categories = [
  'Python',
  'Data Analysis',
  'Machine Learning',
  'Deep Learning',
] as const;

export type Category = (typeof categories)[number];

export const difficulties = ['Easy', 'Medium', 'Hard'] as const;

export type Difficulty = (typeof difficulties)[number];

export type Screen = 'home' | 'selection' | 'quiz' | 'results' | 'review';

export interface Question {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctAnswerIndex: 0 | 1 | 2 | 3;
  explanation: string;
  difficulty: Difficulty;
}

export type UserAnswer = number | null;

export interface QuizSummary {
  correct: number;
  total: number;
  percentage: number;
  message: 'Excellent!' | 'Good effort!' | 'Keep practicing!';
}

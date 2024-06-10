export interface Question {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'short' | 'long';
  options?: string[];
  answer?: string | string[];
}

export interface Test {
  id: string;
  title: string;
  questions: Question[];
}

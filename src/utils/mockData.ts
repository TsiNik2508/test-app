import { Test } from '../types/types';

// Моковые данные для теста
export const mockTest: Test = {
  id: '1',
  title: 'Пример теста',
  questions: [
    {
      id: 'q1',
      question: 'Что должен знать фронтенд-разработчик? Назовите три ключевых технологии',
      type: 'single',
      options: ['HTML, CSS и JavaScript.', 'Kotlin, PHP и JavaScript.', 'PHP, HTML и CSS.'],
      answer: 'HTML, CSS и JavaScript.'
    },
    {
      id: 'q2',
      question: 'Какие фреймворки вы используете?',
      type: 'multiple',
      options: ['React', 'Angular', 'Vue', 'Svelte'],
      answer: ['React', 'Vue']
    },
    {
      id: 'q3',
      question: 'Напишите короткий ответ',
      type: 'short',
      answer: 'Короткий ответ'
    },
    {
      id: 'q4',
      question: 'Напишите развернутый ответ',
      type: 'long',
      answer: 'Развернутый ответ'
    },
  ],
};

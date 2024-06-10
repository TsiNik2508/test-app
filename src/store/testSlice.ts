import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question, Test } from '../types/types';
import { mockTest } from '../utils/mockData';

// Интерфейс состояния теста
interface TestState {
  currentTest: Test;
  currentQuestionIndex: number;
  answers: { [key: string]: string | string[] };
  isCompleted: boolean;
  timeRemaining: number;
  result: number | null;
}

// Начальное состояние теста
const initialState: TestState = {
  currentTest: mockTest,
  currentQuestionIndex: 0,
  answers: {},
  isCompleted: false,
  timeRemaining: 600, // 10 минут в секундах
  result: null,
};

// Срез состояния теста
const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    // Установка ответа на вопрос
    setAnswer(state, action: PayloadAction<{ questionId: string; answer: string | string[] }>) {
      state.answers[action.payload.questionId] = action.payload.answer;
    },
    // Переход к следующему вопросу
    nextQuestion(state) {
      if (state.currentQuestionIndex < state.currentTest.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    // Переход к предыдущему вопросу
    previousQuestion(state) {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    // Уменьшение оставшегося времени
    decrementTime(state) {
      if (state.timeRemaining > 0) {
        state.timeRemaining -= 1;
      } else {
        state.isCompleted = true;
      }
    },
    // Завершение теста
    completeTest(state) {
      state.isCompleted = true;
    },
    // Расчет результата теста
    calculateResult(state) {
      let correctAnswers = 0;
      state.currentTest.questions.forEach((question) => {
        const answer = state.answers[question.id];
        if (Array.isArray(question.answer) && Array.isArray(answer)) {
          if (question.answer.sort().toString() === answer.sort().toString()) {
            correctAnswers += 1;
          }
        } else if (question.answer === answer) {
          correctAnswers += 1;
        }
      });
      state.result = correctAnswers;
    },
    // Сброс теста
    resetTest(state) {
      state.currentQuestionIndex = 0;
      state.answers = {};
      state.isCompleted = false;
      state.timeRemaining = 600;
      state.result = null;
    }
  },
});

export const { setAnswer, nextQuestion, previousQuestion, decrementTime, completeTest, calculateResult, resetTest } = testSlice.actions;
export default testSlice.reducer;

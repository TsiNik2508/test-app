import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { nextQuestion, previousQuestion, decrementTime, completeTest, calculateResult, resetTest } from '../store/testSlice';
import QuestionComponent from '../components/Question/QuestionComponent';
import TimerComponent from '../components/Timer/TimerComponent';
import StepperComponent from '../components/Stepper/StepperComponent';
import ControlsComponent from '../components/Controls/ControlsComponent';
import ResultsComponent from '../components/Results/ResultsComponent';
import { Container, Typography, Paper } from '@mui/material';
import './TestPage.css';

const TestPage: React.FC = () => {
  const dispatch = useDispatch();
  const { currentTest, currentQuestionIndex, answers, isCompleted, timeRemaining } = useSelector((state: RootState) => state.test);

  const currentQuestion = currentTest.questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id] || '';

  // Установка таймера для уменьшения оставшегося времени каждую секунду
  useEffect(() => {
    if (!isCompleted) {
      const timer = setInterval(() => {
        dispatch(decrementTime());
      }, 1000);
      return () => clearInterval(timer); // Очистка таймера при размонтировании компонента
    }
  }, [isCompleted, dispatch]);

  // Завершение теста и расчет результата, когда время истекло
  useEffect(() => {
    if (timeRemaining === 0) {
      dispatch(completeTest());
      dispatch(calculateResult());
    }
  }, [timeRemaining, dispatch]);

  const handleNext = () => {
    if (currentAnswer) {
      dispatch(nextQuestion()); // Переход к следующему вопросу
    }
  };

  const handlePrevious = () => {
    dispatch(previousQuestion()); // Переход к предыдущему вопросу
  };

  const handleComplete = () => {
    dispatch(completeTest());
    dispatch(calculateResult()); // Завершение теста и расчет результата
  };

  const handleReset = () => {
    dispatch(resetTest()); // Сброс теста
  };

  if (isCompleted) {
    return <ResultsComponent onReset={handleReset} />; // Показ результатов после завершения теста
  }

  return (
    <Container className="test-page">
      <Typography variant="h5" className="test-page__title">Тестирование</Typography>
      <Paper elevation={3} className="test-page__content">
        <TimerComponent timeRemaining={timeRemaining} />
        <StepperComponent steps={currentTest.questions.length} activeStep={currentQuestionIndex} />
        <QuestionComponent question={currentQuestion} currentAnswer={currentAnswer} />
        <ControlsComponent
          onPrevious={handlePrevious}
          onNext={handleNext}
          onComplete={handleComplete}
          currentAnswer={currentAnswer}
          isLastQuestion={currentQuestionIndex === currentTest.questions.length - 1}
          currentQuestionIndex={currentQuestionIndex}
        />
      </Paper>
    </Container>
  );
};

export default TestPage;

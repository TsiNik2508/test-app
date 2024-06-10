import React from 'react';
import { Button } from '@mui/material';
import './ControlsComponent.css';

// Интерфейс для свойств компонента ControlsComponent
interface ControlsProps {
  onPrevious: () => void; // Функция для перехода к предыдущему вопросу
  onNext: () => void; // Функция для перехода к следующему вопросу
  onComplete: () => void; // Функция для завершения теста
  currentAnswer: string | string[]; // Текущий ответ на вопрос
  isLastQuestion: boolean; // Является ли текущий вопрос последним
  currentQuestionIndex: number; // Индекс текущего вопроса
}

// Компонент для управления навигацией по вопросам
const ControlsComponent: React.FC<ControlsProps> = ({ onPrevious, onNext, onComplete, currentAnswer, isLastQuestion, currentQuestionIndex }) => {
  return (
    <div className="controls">
      <Button variant="contained" onClick={onPrevious} disabled={currentQuestionIndex === 0} className="controls__button">
        Назад
      </Button>
      {isLastQuestion ? (
        <Button variant="contained" color="primary" onClick={onComplete} disabled={!currentAnswer} className="controls__button">
          Завершить тест
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={onNext} disabled={!currentAnswer} className="controls__button">
          Далее
        </Button>
      )}
    </div>
  );
};

export default ControlsComponent;

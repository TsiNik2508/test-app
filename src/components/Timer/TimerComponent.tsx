import React from 'react';
import { Typography } from '@mui/material';
import './TimerComponent.css';

// Интерфейс для свойств компонента TimerComponent
interface TimerProps {
  timeRemaining: number; // Оставшееся время в секундах
}

// Компонент для отображения таймера
const TimerComponent: React.FC<TimerProps> = ({ timeRemaining }) => {
  // Проверка, осталось ли мало времени
  const isTimeLow = timeRemaining <= 60; // 1 minute

  return (
    <div className="timer">
      <Typography variant="h6" className={`timer__text ${isTimeLow ? 'timer__text--low' : ''}`}>
        Оставшееся время: {Math.floor(timeRemaining / 60)}:{timeRemaining % 60 < 10 ? '0' : ''}{timeRemaining % 60}
      </Typography>
    </div>
  );
};

export default TimerComponent;

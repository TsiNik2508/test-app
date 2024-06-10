import React from 'react';
import { Button, Typography, Container, Paper } from '@mui/material';
import './ResultsComponent.css';

// Интерфейс для свойств компонента ResultsComponent
interface ResultsProps {
  onReset: () => void; // Функция для сброса теста
}

// Компонент для отображения результатов теста
const ResultsComponent: React.FC<ResultsProps> = ({ onReset }) => {
  return (
    <Container className="results">
      <Paper elevation={3} className="results__content">
        <Typography variant="h4" className="results__title">Тест завершен</Typography>
        <Typography variant="h6" className="results__subtitle">Ваш тест выполнен, ждите результата.</Typography>
        <Button variant="contained" color="primary" onClick={onReset} className="results__button">
          Вернуться к тесту
        </Button>
      </Paper>
    </Container>
  );
};

export default ResultsComponent;

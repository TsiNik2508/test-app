import React from 'react';
import { Question } from '../../types/types';
import { useDispatch } from 'react-redux';
import { setAnswer } from '../../store/testSlice';
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField, Checkbox, Typography } from '@mui/material';
import './QuestionComponent.css';

// Интерфейс для свойств компонента QuestionComponent
interface QuestionProps {
  question: Question; // Объект вопроса
  currentAnswer: string | string[]; // Текущий ответ на вопрос
}

// Компонент для отображения вопроса
const QuestionComponent: React.FC<QuestionProps> = ({ question, currentAnswer }) => {
  const dispatch = useDispatch();

  // Обработчик изменения ответа для одиночного выбора
  const handleSingleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAnswer({ questionId: question.id, answer: event.target.value }));
  };

  // Обработчик изменения ответа для множественного выбора
  const handleMultipleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let newAnswer = [...(currentAnswer as string[])];

    if (event.target.checked) {
      newAnswer.push(value);
    } else {
      newAnswer = newAnswer.filter(answer => answer !== value);
    }

    dispatch(setAnswer({ questionId: question.id, answer: newAnswer }));
  };

  // Обработчик изменения короткого ответа
  const handleShortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAnswer({ questionId: question.id, answer: event.target.value }));
  };

  // Рендеринг опций для вопроса
  const renderOptions = () => {
    if (question.type === 'single' && question.options) {
      return (
        <RadioGroup value={currentAnswer as string} onChange={handleSingleChange}>
          {question.options.map(option => (
            <FormControlLabel key={option} value={option} control={<Radio />} label={option} className="question__option" />
          ))}
        </RadioGroup>
      );
    }

    if (question.type === 'multiple' && question.options) {
      return (
        <FormControl>
          {question.options.map(option => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  checked={(currentAnswer as string[]).includes(option)}
                  onChange={handleMultipleChange}
                  value={option}
                />
              }
              label={option}
              className="question__option"
            />
          ))}
        </FormControl>
      );
    }

    if (question.type === 'short') {
      return <TextField value={currentAnswer as string} onChange={handleShortChange} variant="outlined" fullWidth />;
    }

    if (question.type === 'long') {
      return <TextField value={currentAnswer as string} onChange={handleShortChange} variant="outlined" fullWidth multiline rows={4} />;
    }

    return null;
  };

  return (
    <div className="question">
      <Typography variant="h6" className="question__text">{question.question}</Typography>
      {renderOptions()}
    </div>
  );
};

export default QuestionComponent;

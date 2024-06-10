import React from 'react';
import './StepperComponent.css';

// Интерфейс для свойств компонента Stepper
interface StepperProps {
  steps: number; // Общее количество шагов
  activeStep: number; // Текущий активный шаг
}

// Компонент Stepper для отображения прогресса в виде квадратов
const StepperComponent: React.FC<StepperProps> = ({ steps, activeStep }) => {
  return (
    <div className="stepper">
      {Array.from({ length: steps }, (_, index) => (
        <div
          key={index}
          className={`stepper__step ${index <= activeStep ? 'stepper__step--active' : ''}`}
        ></div>
      ))}
    </div>
  );
};

export default StepperComponent;

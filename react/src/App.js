import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const formatDisplay = (value) => {
    if (value === 'Error' || value === 'Infinity') return 'Error';
    const num = parseFloat(value);
    if (Math.abs(num) > 999999999) {
      return num.toExponential(5);
    }
    if (Math.abs(num) < 0.0000001 && num !== 0) {
      return num.toExponential(5);
    }
    if (Number.isInteger(num)) {
      return num.toString();
    }
    return num.toFixed(8).replace(/\.0+$/, '').replace(/0+$/, '');
  };

  const handleNumberClick = (value) => {
    let newDisplay = display;
    if (display === '0' && value !== '.') {
      newDisplay = value;
    } else if (value === '.' && display.includes('.')) {
      return;
    } else {
      newDisplay = display + value;
    }
    setDisplay(newDisplay);
    setWaitingForSecondOperand(false);
  };

  const handleOperationClick = (op) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setWaitingForSecondOperand(true);
  };

  const handleEqualsClick = () => {
    if (!previousValue || !operation) return;

    const currentValue = parseFloat(display);
    let result = 0;

    if (operation === '+') {
      result = previousValue + currentValue;
    } else if (operation === '-') {
      result = previousValue - currentValue;
    } else if (operation === '×') {
      result = previousValue * currentValue;
    } else if (operation === '÷') {
      if (currentValue === 0) {
        setDisplay('Error');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForSecondOperand(false);
        return;
      }
      result = previousValue / currentValue;
    }

    setDisplay(formatDisplay(result.toString()));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondOperand(false);
  };

  const handleClearClick = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondOperand(false);
  };

  const handleToggleSignClick = () => {
    if (display !== '0') {
      const newValue = (parseFloat(display) * -1).toString();
      setDisplay(formatDisplay(newValue));
    }
  };

  const handlePercentClick = () => {
    if (display !== '0') {
      const newValue = (parseFloat(display) / 100).toString();
      setDisplay(formatDisplay(newValue));
    }
  };

  const buttons = [
    'AC', '+/-', '%', '÷',
    '7', '8', '9', '×',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '='
  ];

  return (
    <ErrorBoundary>
      <div className="calculator">
        <div className="display">{display}</div>
        <div className="buttons">
          {buttons.map((btn) => {
            let className = 'button';
            if (['AC', '+/-', '%'].includes(btn)) {
              className += ' function';
            } else if (['÷', '×', '-', '+'].includes(btn)) {
              className += ' operation';
            } else if (btn === '=') {
              className += ' equals';
            } else if (btn === '0') {
              className += ' zero';
            }

            return (
              <button
                key={btn}
                className={className}
                onClick={() => {
                  if (['÷', '×', '-', '+'].includes(btn)) {
                    handleOperationClick(btn);
                  } else if (btn === '=') {
                    handleEqualsClick();
                  } else if (btn === 'AC') {
                    handleClearClick();
                  } else if (btn === '+/-') {
                    handleToggleSignClick();
                  } else if (btn === '%') {
                    handlePercentClick();
                  } else {
                    handleNumberClick(btn);
                  }
                }}
              >
                {btn}
              </button>
            );
          })}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;

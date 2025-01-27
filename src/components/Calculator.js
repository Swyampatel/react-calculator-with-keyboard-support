import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { evaluate } from 'mathjs';

const Calculator = () => {
  const [display, setDisplay] = useState('');

  const handleButtonClick = (value) => {
    if (value === 'C') {
      setDisplay(''); // Clear the display
    } else if (value === '=' || value === 'Enter') {
      try {
        setDisplay(evaluate(display).toString()); // Safely evaluate the expression using math.js
      } catch {
        setDisplay('Error'); // Handle invalid expressions
      }
    } else {
      setDisplay((prev) => prev + value); // Append the value to the display
    }
  };

  const handleKeyPress = (event) => {
    const validKeys = '1234567890+-*/=C';
    if (validKeys.includes(event.key)) {
      handleButtonClick(event.key);
    } else if (event.key === 'Backspace') {
      setDisplay((prev) => prev.slice(0, -1)); // Remove the last character
    } else if (event.key === 'Enter') {
      handleButtonClick('Enter'); // Trigger evaluation on Enter key
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [display]);

  return (
    <StyledWrapper>
      <div className="calculator">
        {/* Output Section */}
        <div className="output">
          <span className="result">{display || '0'}</span>
        </div>

        {/* Buttons Section */}
        <div className="buttons">
          {['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', 'C', '0', '=', '/'].map((btn, idx) => (
            <button key={idx} onClick={() => handleButtonClick(btn)}>
              {btn}
            </button>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .calculator {
    border: 1px solid rgb(179, 179, 179);
    border-radius: 0.375rem;
    width: 190px;
    height: 254px;
    font-family: Arial, sans-serif;
    margin: 0 auto;
    padding: 10px;
  }

  .output {
    border: 1px solid #ccc;
    border-radius: 0.375rem;
    height: 40px;
    margin-bottom: 10px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
  }

  .result {
    font-size: 20px;
    color: white;
  }

  .buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 5px;
  }

  button {
    border: none;
    border-radius: 0.375rem;
    padding: 10px;
    background-color: #eee;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background-color: #ddd;
  }

  button:active {
    background-color: #ccc;
  }

  .bg-green {
    background-color: rgba(0, 177, 29, 0.651);
    color: white;
  }

  .bg-green:hover {
    background-color: rgba(0, 231, 39, 0.651);
    color: white;
  }

  .bg-red {
    background-color: rgba(223, 4, 4, 0.651);
    color: white;
  }

  .bg-red:hover {
    background-color: rgba(255, 1, 1, 0.651);
    color: white;
  }
`;

export default Calculator;

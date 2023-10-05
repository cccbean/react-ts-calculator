import { useState } from 'react';

const App = () => {
  const [prev, setPrev] = useState('');
  const [curr, setCurr] = useState('');
  const [justCalculated, setJustCalculated] = useState(false);

  const inputNum = (e) => {
    setCurr(`${curr}${e.target.textContent}`);
  };

  const inputOperator = (e) => {
    if (justCalculated) {
      setPrev(`${curr} ${e.target.textContent}`);
      setCurr('');
    } else {
      setPrev(`${prev} ${curr} ${e.target.textContent}`);
      setCurr('');
    }
  };

  const inputDecimal = () => {
    if (!curr.includes('.')) {
      setCurr(`${curr}.`);
    }
  };

  const negateNum = () => {
    if (!curr.includes('-')) {
      setCurr(`-${curr}`);
    } else {
      setCurr(curr.replace('-', ''));
    }
  };

  const delLastNum = () => {
    const currSlice = curr.slice(0, curr.length - 1);
    setCurr(currSlice);
  };

  const clearScreen = () => {
    if (curr === '') {
      setPrev('');
    } else {
      setCurr('');
    }
  };

  class Calculator {
    expression: string;

    constructor(expression: string) {
      this.expression = expression;
    }
    add(a: number, b: number) {
      return a + b;
    }
    subtract(a: number, b: number) {
      return a - b;
    }
    multiply(a: number, b: number) {
      return a * b;
    }
    divide(a: number, b: number) {
      if (b !== 0) {
        return a / b;
      } else {
        throw new Error("Can't divide by zero");
      }
    }
    calculate() {
      const splitExpression = this.expression
        .split(' ')
        .filter((string) => string !== '');
      console.log(splitExpression);
      while (splitExpression.length > 1) {
        if (splitExpression.indexOf('/') !== -1) {
          const operatorIndex = splitExpression.indexOf('/');
          const a = Number(splitExpression[operatorIndex - 1]);
          const b = Number(splitExpression[operatorIndex + 1]);
          const result = this.divide(a, b).toString();
          splitExpression.splice(operatorIndex - 1, 3, result);
        } else if (splitExpression.indexOf('*') !== -1) {
          const operatorIndex = splitExpression.indexOf('*');
          const a = Number(splitExpression[operatorIndex - 1]);
          const b = Number(splitExpression[operatorIndex + 1]);
          const result = this.multiply(a, b).toString();
          splitExpression.splice(operatorIndex - 1, 3, result);
        } else if (splitExpression.indexOf('-') !== -1) {
          const operatorIndex = splitExpression.indexOf('-');
          const a = Number(splitExpression[operatorIndex - 1]);
          const b = Number(splitExpression[operatorIndex + 1]);
          const result = this.subtract(a, b).toString();
          splitExpression.splice(operatorIndex - 1, 3, result);
        } else if (splitExpression.indexOf('+') !== -1) {
          const operatorIndex = splitExpression.indexOf('+');
          const a = Number(splitExpression[operatorIndex - 1]);
          const b = Number(splitExpression[operatorIndex + 1]);
          const result = this.add(a, b).toString();
          splitExpression.splice(operatorIndex - 1, 3, result);
        }
      }
      setPrev(this.expression);
      setCurr(splitExpression.join(''));
      setJustCalculated(true);
    }
  }

  return (
    <div className="calculator">
      <div className="screen">
        <div className="prev">{prev}</div>
        <div className="curr">{curr}</div>
      </div>
      <div className="buttons">
        <button onClick={clearScreen}>C</button>
        <button onClick={delLastNum}>D</button>
        <button onClick={() => setCurr('Go fuck yourself')}>()</button>
        <button onClick={inputOperator}>/</button>
        <button onClick={inputNum}>7</button>
        <button onClick={inputNum}>8</button>
        <button onClick={inputNum}>9</button>
        <button onClick={inputOperator}>*</button>
        <button onClick={inputNum}>4</button>
        <button onClick={inputNum}>5</button>
        <button onClick={inputNum}>6</button>
        <button onClick={inputOperator}>-</button>
        <button onClick={inputNum}>1</button>
        <button onClick={inputNum}>2</button>
        <button onClick={inputNum}>3</button>
        <button onClick={inputOperator}>+</button>
        <button onClick={negateNum}>+/-</button>
        <button onClick={inputNum}>0</button>
        <button onClick={inputDecimal}>.</button>
        <button
          onClick={() => {
            const expression = `${prev} ${curr}`;
            const calculator = new Calculator(expression);
            calculator.calculate();
          }}
        >
          =
        </button>
      </div>
    </div>
  );
};

export default App;

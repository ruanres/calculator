import { useState } from 'react';
import { isDigit, isDiv, isMinus, isMul, isPlus, resolveExpression } from '../Utils';

type Input = string | number;

export default function useCalculator() {
  const [expression, setExpression] = useState<Array<Input>>([]);
  const isEmpty = expression.length == 0;
  const lastIndex = expression.length - 1;
  const penultimateInput = expression[lastIndex - 1];
  const lastInput = expression[lastIndex];

  const addToExpression = (value: Input) => {
    setExpression([...expression, value]);
  };
  
  const replaceLastInput = (value: Input) => {
    const newExp = [...expression.slice(0, lastIndex), value];
    setExpression(newExp);
  };
  
  const handleDigit = (value: number) => {
    if (isDigit(lastInput)) {
      const digit = lastInput as number;
      let newValue = Math.abs(digit) * 10 + value;
      newValue *= digit < 0 ? -1 : 1;
      replaceLastInput(newValue);
    } else if (isMinus(lastInput)) {
      value = -1 * value;
      replaceLastInput(value);
    } else {
      setExpression([...expression, value]);
    }
  };
  
  const handleOperator = (op: string) => {
    const opNotAllowed = isEmpty && !isMinus(op);
    const waitingDigit = isMinus(lastInput) && !isDigit(penultimateInput);
    if (opNotAllowed || waitingDigit) {
      return;
    } else if (isPlus(lastInput) || isMinus(lastInput)) {
      replaceLastInput(op);
    } else if((isMul(lastInput) || isDiv(lastInput)) && !isMinus(op)) {
      replaceLastInput(op);
    } else {
      addToExpression(op);
    }
  };
  
  const handleEqual = () => {
    const hasTwoOperandsOrMore = expression.length >= 2;
    if (isDigit(lastInput) && hasTwoOperandsOrMore) {
      try {
        const result = resolveExpression(expression);
        setExpression([result]);
      } catch (_) {
        setExpression([]);
      }
    }
  };

  const handleClear = () => setExpression([]);

  return {
    expression: expression.concat(''),
    handleDigit, 
    handleEqual,
    handleOperator,
    handleClear,
  };
}
export const isDigit = (value: number | string) => typeof value == 'number';
export const isMinus = (value: string| number) => value == '-';
export const isPlus = (value: string | number) => value == '+';
export const isMul = (value: string | number) => value == '*';
export const isDiv = (value: string | number) => value == '/';

type ExpressionInputs = Array<string | number>;
export const removePlus = (values: ExpressionInputs) => values.filter(
  (value) => !isPlus(value)
);

const resolveMult = (values: ExpressionInputs): ExpressionInputs => {
  const result = [];
  let i = 0;
  while(i < values.length) {
    if (isMul(values[i])) {
      const product: number = Number(result[result.length - 1]) * Number(values[i+1]);
      result[result.length - 1] = product;
      i = i + 2;
    } else {
      result.push(values[i]);
      i++;
    }
  }
  return result;  
};

const resolveDiv = (values: ExpressionInputs): ExpressionInputs => {
  const result = [];
  let i = 0;
  while(i < values.length) {
    if (isDiv(values[i])) {
      const dividend = values[i+1] as number;
      if (dividend == 0) {
        throw new Error();
      }
      const quotient = Math.floor(Number(result[result.length - 1]) / dividend);
      result[result.length - 1] = quotient;
      i = i + 2;
    } else {
      result.push(values[i]);
      i++;
    }
  }
  return result;  
};

const resolveSum = (values: number[]): number => {
  return values.reduce((sum: number, value: number) => sum + value, 0);
};

export const resolveExpression = (values: ExpressionInputs) => {
  values = removePlus(values);
  values = resolveMult(values);
  values = resolveDiv(values);
  return resolveSum(values as number[]);
};

export const getNumericButtonsData = () => new Array(10)
  .fill(null)
  .map((_, index) => ({
    title: index, 
    className: `digit-${index}`
  }));
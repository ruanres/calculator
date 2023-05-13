import { getNumericButtonsData } from '../Utils';
import useCalculator from '../hooks/useCalculator';
import Button from './Button';
import Display from './Display';

function Calculator() {
  const { 
    expression, 
    handleDigit, 
    handleOperator, 
    handleEqual, 
    handleClear 
  } = useCalculator();

  return (
    <div className="calculator">
      <Display>{expression}</Display>
      {
        getNumericButtonsData().map(({title, className}) => (
          <Button 
            key={title} 
            className={className} 
            title={String(title)} 
            onClick={() => handleDigit(title)} />
        ))
      }
      <Button className="op-add" title="+" onClick={() => handleOperator('+')} />
      <Button className="op-sub" title="-" onClick={() => handleOperator('-')} />
      <Button className="op-mul" title="*" onClick={() => handleOperator('*')} />
      <Button className="op-div" title="/" onClick={() => handleOperator('/')} />
      <Button className="eq" title="=" onClick={() => handleEqual()} />
      <Button className="clear" title="C" onClick={handleClear} />
    </div>
  ); 
}

export default Calculator;

// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({
      a: 1, 
      b: 2, 
      action: Action.Add,
    })).toEqual(3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({
      a: 5, 
      b: 2, 
      action: Action.Subtract,
    })).toEqual(3);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({
      a: 5, 
      b: 2, 
      action: Action.Multiply,
    })).toEqual(10);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({
      a: 6, 
      b: 2, 
      action: Action.Divide,
    })).toEqual(3);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({
      a: 2, 
      b: 2, 
      action: Action.Exponentiate,
    })).toEqual(4);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({
      a: 2,
      b: 2, 
      action: 'cook',
    })).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({
      a: 'cat', 
      b: 'dog', 
      action: Action.Multiply,
    })).toEqual(null);
  });
});

// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 5, b: 2, action: Action.Subtract, expected: 3 },
    { a: 3, b: 2, action: Action.Multiply, expected: 6 },
    { a: 10, b: 2, action: Action.Divide, expected: 5 },
    { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
    { a: 10, b: 2, action: 'sleep', expected: null },
    { a: {woof: 'meow'}, b: true, action: Action.Subtract, expected: null },
]; 

describe('simpleCalculator', () => {
  test.each(testCases)('perform operations with ($a, $b)', ({a, b, action, expected}) => {
    expect(simpleCalculator({
      a: a,
      b: b,
      action: action,
    })).toBe(expected);
  });
});

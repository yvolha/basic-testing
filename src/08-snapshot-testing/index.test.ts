import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const linkedArr = [1, 2, 3];
  const linkedResult = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: null,
          next: null,
        },
      },
    },
  };

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(linkedArr)).toStrictEqual(linkedResult);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(linkedArr)).toMatchSnapshot();
  });
});

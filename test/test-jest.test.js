import TestExample from '../src/test-jest';

it('should return true', () => {
  expect(TestExample.example()).toBe(true);
});

it('adds 1 + 2 to equal 3', () => {
  expect(TestExample.sum(1, 2)).toBe(3);
});
import TestExample from '../src/test-jest';
let test = TestExample.example();

it('should return true', () => {
  expect(test).toBe(true);
});
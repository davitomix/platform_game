const TestExample = (() => {
  const example = () => true;
  const sum = (a, b) => a + b;
  return {
    example,
    sum,
  };
})();

export default TestExample;
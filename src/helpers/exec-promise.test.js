const execPromise = require('./exec-promise');

describe(__filename, () => {
  test('Should be a function', () => {
    expect(execPromise).toBeInstanceOf(Function);
  });
});

const setup = require('.');

describe(__filename, () => {
  test('Should be a function', () => {
    expect(setup).toBeInstanceOf(Function);
  });
});

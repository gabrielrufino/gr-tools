const verifyBin = require('./verify-bin');

describe(__filename, () => {
  test('Should be a function', () => {
    expect(verifyBin).toBeInstanceOf(Function);
  });

  test('Should throw an error when doesn\'t receives the argument', () => {
    expect(
      () => verifyBin(),
    ).toThrow(Error('bins is required'));
  });
});

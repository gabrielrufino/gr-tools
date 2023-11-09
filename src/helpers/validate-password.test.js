const validatePassword = require('./validate-password');

describe(__filename, () => {
  test('Should be a function', () => {
    expect(validatePassword).toBeInstanceOf(Function);
  });

  test('Should throw an error when doesn\'t receive the argument', () => {
    expect(validatePassword()).rejects.toThrow(Error('password is required'));
  });
});

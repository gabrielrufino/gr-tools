const validatePassword = require('./validate-password')

describe(__filename, () => {
  test('Should be a function', () => {
    expect(validatePassword).toBeInstanceOf(Function)
  })
})

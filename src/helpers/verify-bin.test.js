const verifyBin = require('./verify-bin')

describe(__filename, () => {
  test('Should be a function', () => {
    expect(verifyBin).toBeInstanceOf(Function)
  })
})

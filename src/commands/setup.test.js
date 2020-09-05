const setup = require('./setup')

describe(__filename, () => {
  test('Should be a function', () => {
    expect(setup).toBeInstanceOf(Function)
  })
})

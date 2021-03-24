const clone = require('.')

describe(__filename, () => {
  test('Should be a function', () => {
    expect(clone).toBeInstanceOf(Function)
  })
})

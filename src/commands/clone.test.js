const clone = require('./clone')

describe(__filename, () => {
  test('Should be a function', () => {
    expect(clone).toBeInstanceOf(Function)
  })
})

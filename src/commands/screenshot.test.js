const screenshot = require('./screenshot')

describe(__filename, () => {
  test('Should be a function', () => {
    expect(screenshot).toBeInstanceOf(Function)
  })
})

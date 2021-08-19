const screenshot = require('.')

describe(__filename, () => {
  test('Should be a function', () => {
    expect(screenshot).toBeInstanceOf(Function)
  })
})

const update = require('.')

describe(__filename, () => {
  test('Should be a function', () => {
    expect(update).toBeInstanceOf(Function)
  })
})

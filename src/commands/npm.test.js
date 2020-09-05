const npm = require('./npm')

describe(__filename, () => {
  test('Should be a function', () => {
    expect(npm).toBeInstanceOf(Function)
  })
})

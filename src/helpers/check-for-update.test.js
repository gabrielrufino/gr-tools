const checkForUpdate = require('./check-for-update')

describe(__filename, () => {
  test('Should be a function', () => {
    expect(checkForUpdate).toBeInstanceOf(Function)
  })
})

const isRequired = require('./is-required')

describe(__filename, () => {
  test('Should be a function', () => {
    expect(isRequired).toBeInstanceOf(Function)
  })

  test('Should throw an error', () => {
    expect(
      () => isRequired('name')
    ).toThrow(Error('name is required'))
  })

  test('Should assume \'argument\' as default string for the argument', () => {
    expect(
      () => isRequired()
    ).toThrow(Error('argument is required'))
  })
})

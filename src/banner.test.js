jest.mock('figlet', () => ({
  textSync: jest.fn()
}))

console.log = jest.fn()

const banner = require('./banner')

const { textSync } = require('figlet')

describe(__filename, () => {
  const { version } = require('../package.json')

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Should be a function', () => {
    expect(banner).toBeInstanceOf(Function)
  })

  test('Should call the figlet.textSync with the correct argument', () => {
    banner({ version })

    expect(textSync).toBeCalledWith('gr-tools')
  })

  test('Should call the console.log twice', () => {
    banner({ version })

    expect(console.log).toBeCalledTimes(2)
  })

  test('Should prints the version with console.log', () => {
    banner({ version })

    expect(console.log).toBeCalledWith(`\nVersion: ${version}\n`)
  })

  test('Should throw an error when doesn\'t receives the version', () => {
    expect(
      () => banner({})
    ).toThrow()
  })
})

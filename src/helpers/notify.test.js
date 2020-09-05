jest.mock('shelljs', () => ({
  exec: jest.fn()
}))

const notify = require('./notify')

const { exec } = require('shelljs')

describe(__filename, () => {
  const message = 'Some text here'
  const level = 'normal'

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Should be a function', () => {
    expect(notify).toBeInstanceOf(Function)
  })

  test('Should call the shell.exec with the correct argument', () => {
    notify({ message, level })

    expect(exec)
      .toBeCalledWith(`notify-send --urgency=${level} gr-tools "${message}"`)
  })

  test('Should assume \'normal\' as the default value for level', () => {
    notify({ message })

    expect(exec)
      .toBeCalledWith(`notify-send --urgency=normal gr-tools "${message}"`)
  })

  test('Should throw an error when doesn\'t receive the message', () => {
    expect(
      () => notify({})
    ).toThrow()
  })

  test('Should throw an error when receiving an invalid level', () => {
    expect(
      () => notify({ message, level: 'invalid' })
    ).toThrow(Error)
  })
})

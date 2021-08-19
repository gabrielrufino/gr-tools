jest.mock('shelljs', () => ({
  exec: jest.fn()
}))

const clean = require('.')

const { exec } = require('shelljs')

describe(__filename, () => {
  test('Should be a function', () => {
    expect(clean).toBeInstanceOf(Function)
  })

  test('Should call shell.exec with the correct argument', () => {
    clean()

    expect(exec).toBeCalledWith('rm -R ~/.local/share/Trash/*')
  })
})

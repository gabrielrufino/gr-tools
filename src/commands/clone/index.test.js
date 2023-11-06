const { faker } = require('@faker-js/faker')

const github = require('./github')
const clone = require('.')

jest.mock('./github')

describe(__filename, () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('Should be a function', () => {
    expect(clone).toBeInstanceOf(Function)
  })

  test('Should call the github function with correct arguments', async () => {
    const npmInstall = faker.datatype.boolean()

    await clone('github', { npmInstall })

    expect(github).toBeCalledWith({ npmInstall })
  })
})

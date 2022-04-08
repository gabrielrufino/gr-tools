const faker = require('@faker-js/faker')

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
    const logs = faker.datatype.boolean()
    const npmInstall = faker.datatype.boolean()
    const ssh = faker.datatype.boolean()
    const user = faker.internet.userName()

    await clone('github', { logs, npmInstall, ssh, user })

    expect(github).toBeCalledWith({ logs, npmInstall, ssh, user })
  })
})

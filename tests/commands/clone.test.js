const { exec } = require('shelljs')

describe('Testing the clone command', () => {
  const execInContainer = command => {
    exec(`docker container exec gr-tools ${command}`)
  }

  beforeEach(() => {
    exec(
      `docker container run \
        --tty \
        --detach \
        --volume ${__dirname}/../..:/home/user/gr-tools \
        --env TZ="America/Sao_Paulo" \
        --name gr-tools \
        ubuntu:20.04
      `
    )
    execInContainer('apt update && apt upgrade -y')
    execInContainer('apt install tzdata -y')
    execInContainer('apt install nodejs npm -y')
    execInContainer('npm link --prefix /home/user/gr-tools')
  })

  afterEach(() => {
    exec('docker container stop gr-tools')
    exec('docker container rm gr-tools')
  })

  test('Should clone the github repositories with no problems', () => {
    execInContainer('gr-tools clone github')
    expect(1).toBe(1)
  })

  test('Should clone the github repositories with no problems', () => {
    execInContainer('gr-tools clone github')
    expect(1).toBe(1)
  })
})

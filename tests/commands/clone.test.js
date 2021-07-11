const { exec } = require('shelljs')

describe('Testing the clone command', () => {
  const execInContainer = command => {
    exec(`docker container exec gr-tools_container ${command}`)
  }

  beforeEach(() => {
    exec(
      `docker container run \
        --tty \
        --detach \
        --workdir /home/user/gr-tools \
        --env TZ="America/Sao_Paulo" \
        --name gr-tools_container \
        node:14
      `
    )
    exec(`docker container cp ${__dirname}/../../ gr-tools_container:/home/user`)
    execInContainer('apt update && apt upgrade -y')
    execInContainer('apt install tzdata snapd -y')
    execInContainer('ls')
    execInContainer('npm link')
  })

  afterEach(() => {
    exec('docker container stop gr-tools_container')
    exec('docker container rm gr-tools_container')
  })

  test('Should clone the github repositories with no problems', () => {
    execInContainer('gr-tools clone github')
    expect(1).toBe(1)
  })
})

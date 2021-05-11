'use strict'

const { exec } = require('shelljs')
const { readFileSync, existsSync } = require('fs')

exec('gr-tools --completion >> ~/.config/gr-tools.completion.sh')

const zshrcPath = `${process.env.HOME}/.zshrc`
if (existsSync(zshrcPath)) {
  const zshrc = readFileSync(zshrcPath, { encoding: 'utf8' })

  if (!zshrc.includes('source ~/.config/gr-tools.completion.sh')) {
    exec('echo "source ~/.config/gr-tools.completion.sh" >> ~/.zshrc')
  }
}

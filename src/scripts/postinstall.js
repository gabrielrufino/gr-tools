'use strict'

const { join } = require('path')
const { exec } = require('shelljs')
const { readFileSync, existsSync } = require('fs')

const zshrcPath = join(process.env.HOME, '.zshrc')
if (existsSync(zshrcPath)) {
  exec('gr-tools --completion >> ~/.config/gr-tools.completion.sh')
  const zshrc = readFileSync(zshrcPath, { encoding: 'utf8' })

  if (!zshrc.includes('source ~/.config/gr-tools.completion.sh')) {
    exec('echo "source ~/.config/gr-tools.completion.sh" >> ~/.zshrc')
  }
}

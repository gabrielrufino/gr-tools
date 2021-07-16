'use strict'

const { exec } = require('shelljs')

const { version } = require('../../package.json')

exec(`npm unlink && npm publish && sleep 20 && npm i -g gr-tools@${version}`)

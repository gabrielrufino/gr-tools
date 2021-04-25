'use strict'

const { exec } = require('shelljs')

const { version } = require('../../package.json')

exec(`npm unlink && npm publish && npm i -g gr-tools@${version}`)

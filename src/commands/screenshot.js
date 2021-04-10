'use strict'

const shell = require('shelljs')

const { verifyBin } = require('../helpers')

const screenshot = () => {
  verifyBin(['gnome-screenshot'])

  shell.exec('gnome-screenshot -a')
}

module.exports = screenshot

'use strict'

const shell = require('shelljs')

const verifyBin = require('../helpers/verify-bin')

const screenshot = () => {
  verifyBin(['gnome-screenshot'])

  shell.exec('gnome-screenshot -a')
}

module.exports = screenshot

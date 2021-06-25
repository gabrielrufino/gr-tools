'use strict'

const path = require('path')
const shell = require('shelljs')

const { verifyBin } = require('../helpers')

const screenshot = ({ filename = `Screenshot-${Date.now()}` }) => {
  verifyBin(['gnome-screenshot'])

  const folder = process.cwd()
  const filepath = path.join(folder, filename)

  shell.exec(`gnome-screenshot -a --file "${filepath}.png"`)
}

module.exports = screenshot

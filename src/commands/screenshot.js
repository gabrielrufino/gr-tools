'use strict'

const path = require('path')
const shell = require('shelljs')

const { verifyBin } = require('../helpers')

const screenshot = ({ filename }) => {
  verifyBin(['gnome-screenshot'])

  const folder = process.cwd()
  const file = path.join(folder, `${filename || `Screenshot-${Date.now()}`}.png`)

  shell.exec(`gnome-screenshot -a --file ${file}`)
}

module.exports = screenshot

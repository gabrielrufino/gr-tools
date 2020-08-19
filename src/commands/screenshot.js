const shell = require('shelljs')

const screenshot = () => {
  shell.exec('gnome-screenshot -a')
}

module.exports = screenshot

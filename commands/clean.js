const shell = require('shelljs')

const clean = () => {
  shell.exec('rm -R ~/.local/share/Trash/*')
}

module.exports = clean

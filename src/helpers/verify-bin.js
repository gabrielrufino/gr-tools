const { which } = require('shelljs')

const verifyBin = clis => {
  if (!clis.every(cli => which(cli))) {
    throw new Error(`Required CLIs: ${clis.join(', ')}`)
  }
}

module.exports = verifyBin

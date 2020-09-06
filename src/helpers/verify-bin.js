const { which } = require('shelljs')

const isRequired = require('./is-required')

const verifyBin = (bins = isRequired('bins')) => {
  if (!bins.every(bin => which(bin))) {
    throw new Error(`Required bins: ${bins.join(', ')}`)
  }
}

module.exports = verifyBin

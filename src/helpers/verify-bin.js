const { isRequired } = require('@gabrielrufino/is-required');
const { which } = require('shelljs');

const verifyBin = (bins = isRequired({ param: 'bins' })) => {
  if (!bins.every((bin) => which(bin))) {
    throw new Error(`Required bins: ${bins.join(', ')}`);
  }
};

module.exports = verifyBin;

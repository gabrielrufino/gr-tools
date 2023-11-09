const { execPromise, verifyBin } = require('../../helpers');

const nvm = {
  title: 'NVM - Node Version Manager',
  teardown: async () => {
    try {
      verifyBin(['curl', 'bash']);

      await execPromise('rm -rf "$NVM_DIR"');
    } catch (error) {
      console.error(error.message);
    }
  },
};

module.exports = nvm;

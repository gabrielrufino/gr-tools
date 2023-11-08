const { execPromise, verifyBin } = require('../../helpers');

const firebase = {
  title: 'firebase - Firebase Tools',
  executable: 'firebase',
  teardown: async () => {
    try {
      verifyBin(['npm']);

      await execPromise('npm uninstall -g firebase-tools');
    } catch (error) {
      console.error(error.message);
    }
  },
};

module.exports = firebase;

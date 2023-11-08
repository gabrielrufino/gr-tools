const { execPromise, verifyBin } = require('../../helpers');

const beekeeper = {
  title: 'Beekeeper Studio',
  executable: 'beekeeper-studio',
  teardown: async ({ password }) => {
    try {
      verifyBin(['snap']);

      await execPromise(`echo ${password} | sudo -S snap remove beekeeper-studio`);
    } catch (error) {
      console.error(error.message);
    }
  },
};

module.exports = beekeeper;

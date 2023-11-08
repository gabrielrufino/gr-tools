const { execPromise, verifyBin } = require('../../helpers');

const gh = {
  title: 'gh - Github CLI',
  executable: 'gh',
  setup: async ({ password }) => {
    try {
      verifyBin(['snap']);

      await execPromise(`echo ${password} | sudo -S snap install --edge gh`);
      await execPromise(`echo ${password} | sudo -S snap connect gh:ssh-keys`);
    } catch (error) {
      console.error(error.message);
    }
  },
};

module.exports = gh;

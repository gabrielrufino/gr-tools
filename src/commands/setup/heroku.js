const { execPromise, verifyBin } = require('../../helpers');

const heroku = {
  title: 'Heroku CLI',
  executable: 'heroku',
  setup: async ({ password }) => {
    try {
      verifyBin(['snap']);

      await execPromise(`echo ${password} | sudo -S snap install --classic heroku`);
    } catch (error) {
      console.error(error.message);
    }
  },
};

module.exports = heroku;

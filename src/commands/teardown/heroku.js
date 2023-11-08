const { execPromise, verifyBin } = require('../../helpers');

const heroku = {
  title: 'Heroku CLI',
  executable: 'heroku',
  teardown: async ({ password }) => {
    try {
      verifyBin(['snap']);

      await execPromise(`echo ${password} | sudo -S snap remove heroku`);
    } catch (error) {
      console.error(error.message);
    }
  },
};

module.exports = heroku;

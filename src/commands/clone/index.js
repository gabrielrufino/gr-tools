const { notify, verifyBin } = require('../../helpers');

const github = require('./github');

const clone = async (origin, { npmInstall }) => {
  try {
    verifyBin(['git', ...(npmInstall ? ['npm'] : [])]);

    if (origin === 'github') {
      await github({ npmInstall });
    } else {
      console.error('Invalid origin');
    }
  } catch (error) {
    console.error(error.message);
    notify({ message: 'An error occurred while cloning', level: 'critical' });
  }
};

module.exports = clone;

const { notify } = require('../../helpers');

const updateMe = require('./me');
const updateRepositories = require('./repositories');
const updateSystem = require('./system');

const update = (software, commandObject) => {
  try {
    switch (software) {
      case 'system':
        updateSystem(commandObject);
        break;
      case 'repositories':
        updateRepositories(commandObject);
        break;
      case 'me':
      case 'gr-tools':
        updateMe(commandObject);
        break;
      default:
        console.log('Invalid software');
        break;
    }
  } catch {
    const message = 'An unexpected error happened';

    console.error(message);
    notify({ message, level: 'critical' });
  }
};

module.exports = update;

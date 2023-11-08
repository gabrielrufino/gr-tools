const { execPromise, notify } = require('../../helpers');

const workbench = {
  title: 'MySQL Workbench',
  teardown: async ({ password }) => {
    try {
      await execPromise(`echo ${password} | sudo -S snap remove mysql-workbench-community`);

      notify({ message: 'Workbench environment removed' });
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = workbench;

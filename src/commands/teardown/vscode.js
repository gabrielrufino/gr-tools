const { execPromise } = require('../../helpers');

const vscode = {
  title: 'VSCode - Visual Studio Code',
  teardown: async ({ password }) => {
    try {
      await execPromise(`echo ${password} | sudo -S apt remove code`);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = vscode;

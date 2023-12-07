const { execPromise, notify } = require('../../helpers');

const zsh = {
  title: 'ZSH - Oh My Zsh',
  teardown: async ({ password }) => {
    try {
      await execPromise(`
        echo ${password} | sudo -S apt -y remove zsh
        echo ${password} | chsh -s $(which bash)
      `);

      notify({ message: 'zsh environment uninstalled' });
    } catch {
      notify({ message: 'zsh environment not uninstalled' });
    }
  },
};

module.exports = zsh;

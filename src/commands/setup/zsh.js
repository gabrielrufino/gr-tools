const { execPromise, notify } = require('../../helpers');

const zsh = {
  title: 'ZSH - Oh My Zsh',
  executable: 'zsh',
  setup: async ({ password }) => {
    try {
      await execPromise(`
        echo ${password} | sudo -S apt -y install zsh
        echo ${password} | chsh -s $(which zsh)
      `);

      notify({ message: 'zsh environment installed' });
    } catch {
      notify({ message: 'zsh environment not installed' });
    }
  },
};

module.exports = zsh;

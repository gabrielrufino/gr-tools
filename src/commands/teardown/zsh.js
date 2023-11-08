const { execPromise, notify, verifyBin } = require('../../helpers');

const zsh = {
  title: 'ZSH - Oh My Zsh',
  teardown: async ({ password }) => {
    verifyBin(['apt', 'sh', 'wget', 'git']);

    try {
      await execPromise('uninstall_oh_my_zsh');
      await execPromise(`echo ${password} | sudo -S apt -y remove zsh`);
      await execPromise(`echo ${password} | chsh -s $(which bash)`);

      notify({ message: 'zsh environment installed' });
    } catch {
      notify({ message: 'zsh environment not installed' });
    }
  },
};

module.exports = zsh;

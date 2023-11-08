const { execPromise } = require('../../helpers');

const vscode = {
  title: 'VSCode - Visual Studio Code',
  executable: 'code',
  setup: async ({ password }) => {
    try {
      await execPromise(`
        echo ${password} | sudo -S apt-get install wget gpg -y
        wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
        sudo install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg
        sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
        rm -f packages.microsoft.gpg
        sudo apt install apt-transport-https -y
        sudo apt update
        sudo apt install code -y
      `);

      const extensionIds = [
        'davidanson.vscode-markdownlint',
        'dbaeumer.vscode-eslint',
        'dracula-theme.theme-dracula',
        'eamodio.gitlens',
        'ms-azuretools.vscode-docker',
        'tomoki1207.pdf',
      ];

      await Promise.all(extensionIds.map((extensionId) => execPromise(`code --install-extension ${extensionId}`)));
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = vscode;

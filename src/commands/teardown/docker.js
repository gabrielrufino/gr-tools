const { execPromise } = require('../../helpers');

const docker = {
  title: 'Docker',
  teardown: async ({ password }) => {
    try {
      await execPromise(`
        echo ${password} | sudo -S apt-get purge docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras
        sudo rm -rf /var/lib/docker
        sudo rm -rf /var/lib/containerd
      `);
    } catch (error) {
      console.error(error.message);
    }
  },
};

module.exports = docker;

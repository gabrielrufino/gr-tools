const os = require('os');

const { execPromise } = require('../../helpers');

const minikube = {
  title: 'minikube',
  executable: 'minikube',
  teardown: async ({ password }) => {
    try {
      const arch = os.arch();
      if (arch === 'x64') {
        await execPromise(`echo ${password} | sudo -S rm $(which minikube)`);
      } else {
        throw new Error('Arch is not supported');
      }
    } catch (error) {
      console.error(error.message);
    }
  },
};

module.exports = minikube;

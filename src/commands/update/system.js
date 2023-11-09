const {
  execPromise,
  notify,
  validatePassword,
  verifyBin,
  getUserPassword,
} = require('../../helpers');

const system = async () => {
  try {
    verifyBin(['echo', 'sudo', 'apt']);

    const password = await getUserPassword();

    await validatePassword(password);

    await execPromise(`
      echo ${password} | sudo -S apt update
      echo ${password} | sudo -S apt full-upgrade -y
      echo ${password} | sudo -S apt autoremove -y
    `);

    notify({ message: 'System updated' });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = system;

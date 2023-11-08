const inquirer = require('inquirer');

const getUserPassword = async () => {
  const { password } = await inquirer.prompt([
    {
      type: 'password',
      mask: '*',
      name: 'password',
      message: 'User password: ',
      validate: (p) => (p ? true : 'Enter the password'),
    },
  ]);

  return password;
};

module.exports = getUserPassword;

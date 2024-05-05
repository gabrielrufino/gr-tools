const update = require('./update');

const commands = [
  {
    name: 'update',
    command: 'update <software>',
    targets: ['me', 'gr-tools', 'system', 'repositories'],
    action: update,
  },
];

module.exports = commands;

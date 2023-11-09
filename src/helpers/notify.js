const { isRequired } = require('@gabrielrufino/is-required');
const { exec } = require('shelljs');

const notify = ({ message = isRequired({ param: 'message' }), level = 'normal' }) => {
  if (!['low', 'normal', 'critical'].includes(level)) {
    throw new Error('Invalid level. Valid levels: low, normal and critical');
  }

  exec(`notify-send --urgency=${level} gr-tools "${message}"`);
};

module.exports = notify;

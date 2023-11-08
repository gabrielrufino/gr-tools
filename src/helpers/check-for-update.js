const { isRequired } = require('@gabrielrufino/is-required');
const compareVersions = require('compare-versions');
const latestVersion = require('latest-version');

const checkForUpdate = async ({
  name = isRequired({ param: 'name' }),
  version = isRequired({ param: 'version' }),
}) => {
  const newVersion = await latestVersion(name);

  const updateAvailable = compareVersions(newVersion, version);

  if (updateAvailable === 1) {
    console.log(`\nNew version available: ${newVersion}`);
  }
};

module.exports = checkForUpdate;

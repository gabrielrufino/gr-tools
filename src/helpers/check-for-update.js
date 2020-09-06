const compareVersions = require('compare-versions')
const latestVersion = require('latest-version')

const isRequired = require('./is-required')

const checkForUpdate = async ({ name = isRequired('name'), version = isRequired('version') }) => {
  const newVersion = await latestVersion(name)

  const updateAvailable = compareVersions(newVersion, version)

  if (updateAvailable) {
    console.log(`New version available: ${newVersion}`)
  }
}

module.exports = checkForUpdate

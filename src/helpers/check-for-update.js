const compareVersions = require('compare-versions')
const latestVersion = require('latest-version')

const checkForUpdate = async ({ name, version }) => {
  const newVersion = await latestVersion(name)

  const updateAvailable = compareVersions(newVersion, version)

  if (updateAvailable) {
    console.log(`New version available: ${newVersion}`)
  }
}

module.exports = checkForUpdate

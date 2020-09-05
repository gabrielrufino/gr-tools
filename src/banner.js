const figlet = require('figlet')

const banner = ({ version }) => {
  if (!version) {
    throw new Error('version is required')
  }

  const output = figlet.textSync('gr-tools')

  console.log(output)
  console.log(`\nVersion: ${version}\n`)
}

module.exports = banner

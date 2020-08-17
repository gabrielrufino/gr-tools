const figlet = require('figlet')

const banner = ({ version }) => {
  const output = figlet.textSync('gr-tools')

  console.log(output)
  console.log(`\nVersion: ${version}\n`)
}

module.exports = banner

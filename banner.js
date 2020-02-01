const figlet = require('figlet')

const banner = ({ version }) => {
  const output = figlet.textSync('gr-tools')

  console.log(output)
  console.log('\n')
  console.log(`Version: ${version}`)
}

module.exports = banner

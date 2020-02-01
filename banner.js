const figlet = require('figlet')

const banner = () => {
  const output = figlet.textSync('gr-tools')

  console.log(output)
  console.log('\n')
}

module.exports = banner

const scanNetwork = async () => {
  const localDevices = require('local-devices')

  const devices = await localDevices()
  console.table(devices)
}

const scan = environment => {
  switch (environment) {
    case 'network':
      scanNetwork()
      break
    default:
      break
  }
}

module.exports = scan

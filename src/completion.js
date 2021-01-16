const omelette = require('omelette')

const completion = omelette('gr-tools <command>')

completion.on('command', ({ reply }) => {
  reply(['update', 'clone'])
})

module.exports = completion

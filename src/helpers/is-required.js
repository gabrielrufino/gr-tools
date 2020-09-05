const isRequired = (argument = 'argument') => {
  throw new Error(`${argument} is required`)
}

module.exports = isRequired

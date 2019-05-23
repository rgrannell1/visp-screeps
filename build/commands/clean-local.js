
const fs = require('fs').promises
const path = require('path')
const execa = require('execa')
const rimraf = require('rimraf')

const command = {
  name: 'clean-local',
  dependencies: []
}

command.cli = `
Usage:
  script clean-local
Description:
  clean-local
`

command.task = async args => {
  const root = path.resolve(`${__dirname}/../../`)
  const dist = path.join(root, 'dist')

  rimraf.sync(dist)
  await fs.mkdir(dist)
}

module.exports = command

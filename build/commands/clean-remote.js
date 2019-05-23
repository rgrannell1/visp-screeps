
const os = require('os')
const fs = require('fs').promises
const path = require('path')
const pulp = require('@rgrannell/pulp')
const request = require('request-promise-native')
const {exec} = require('child_process')
const rimraf = require('rimraf')
const constants = require('../constants')

const command = {
  name: 'clean-remote',
  dependencies: []
}

command.cli = `
Usage:
  script clean-remote
Description:
  clean-remote
`

command.task = async (args, emitter) => {
  rimraf.sync(constants.paths.dest)
  await fs.mkdir(constants.paths.dest)
}

module.exports = command

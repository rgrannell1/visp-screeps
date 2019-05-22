
const os = require('os')
const fs = require('fs').promises
const path = require('path')
const pulp = require('@rgrannell/pulp')
const request = require('request-promise-native')
const {exec} = require('child_process')

const constants = {
  host: '127_0_0_1',
  port: '21025'
}

const command = {
  name: 'upload',
  dependencies: ['build']
}

command.cli = `
Usage:
  script upload
Description:
  upload
`

command.task = async (args, emitter) => {
  const paths = {
    visp: path.join(__dirname, '../../dist'),
    dest: path.join(os.homedir(), `/.config/Screeps/scripts/${constants.host}___${constants.port}/default/`)
  }


  for (const fname of await fs.readdir(paths.visp)) {
    const src = path.join(paths.visp, fname)
    const content = await fs.readFile(src)

    const dest = path.join(paths.dest, fname)
    await fs.writeFile(dest, content)
  }
}

module.exports = command

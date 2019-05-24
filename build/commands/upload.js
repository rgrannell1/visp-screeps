
const os = require('os')
const fs = require('fs').promises
const path = require('path')
const pulp = require('@rgrannell/pulp')
const request = require('request-promise-native')
const {exec} = require('child_process')

const constants = {
  host: '127.0.0.1',
  port: '21025'
}

const command = {
  name: 'upload',
  dependencies: ['build', 'clean-remote']
}

command.cli = `
Usage:
  script upload
Description:
  upload
`

const paths = {
  visp: path.join(__dirname, '../../dist'),
  main: path.join(__dirname, '../../dist/main.js'),
  dest: path.join(os.homedir(), `/.config/Screeps/scripts/${constants.host.replace(/\./g, '_')}___${constants.port}/default/`)
}

const upload = {}

upload.directory = async emitter => {
  for (const fname of await fs.readdir(paths.visp)) {
    const src = path.join(paths.visp, fname)
    const content = await fs.readFile(src)
    const dest = path.join(paths.dest, fname)
    await fs.writeFile(dest, content)
  }
}

upload.api = async emitter => {
  const main = (await fs.readFile(paths.main)).toString()

  const result = await request({
    method: 'POST',
    url: `http://${constants.host}:${constants.port}/api/user/code`,
    headers: {
      'X-Token': process.env.SCREEPS_TOKEN,
      'Content-Type': 'application/json; charset=utf-8'
    },
    json: {
      branch: 'default',
      modules: {main}
    }
  })
}

command.task = async (args, emitter) => {
  upload.directory(emitter)
}

module.exports = command

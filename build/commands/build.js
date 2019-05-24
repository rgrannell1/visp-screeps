
const fs = require('fs').promises
const path = require('path')
const execa = require('execa')
const Mustache = require('mustache')

const command = {
  name: 'build',
  dependencies: ['clean-local']
}

command.cli = `
Usage:
  script build [--watch]
Description:
  build
`

const writeTemplates = async root => {
  const paths = {
    mainJsTemplate: path.join(root, 'src/js/main.template.js'),
    mainJs: path.join(root, 'src/js/main.js'),
    mainVisp: path.join(root, 'src/visp/main.vp')
  }

  const content = (await fs.readFile(paths.mainJsTemplate)).toString()
  const view = {
    mainVisp: (await fs.readFile(paths.mainVisp)).toString(),
    date: (new Date).toString()
  }

  return fs.writeFile(paths.mainJs, Mustache.render(content, view))
}

command.task = async args => {
  const root = path.resolve(`${__dirname}/../../`)
  const webpackConfig = path.resolve(`${root}/webpack.config.js`)
  let cmd = path.resolve(`${root}/node_modules/.bin/webpack --config "${webpackConfig}" --mode development`)

  await writeTemplates(root)

  if (args && args['--watch']) {
    cmd += ' --watch'
  }

  const buildCmd = execa.shell(cmd)
  buildCmd.stdout.pipe(process.stdout)
  buildCmd.stderr.pipe(process.stderr)

  return buildCmd
}

module.exports = command

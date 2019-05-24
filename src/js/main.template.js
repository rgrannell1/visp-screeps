
const visp = require('@rgrannell/visp')
const prog = `{{{mainVisp}}}`


module.exports.loop = () => {
  const ast = visp.parse.program(prog)
  try {
    console.log('{{date}}')
    const result = visp.eval(ast, {Game})
  } catch (err) {
    console.log('{{date}}')
    throw err
  }
}

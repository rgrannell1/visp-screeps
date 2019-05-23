
const visp = require('@rgrannell/visp')
const prog = `{{{mainVisp}}}`

module.exports.loop = () => {
  const ast = visp.parse.program(prog)
  try {
    const result = visp.eval(ast, {Game})
  } catch (err) {
    console.log('+++++++++++++++++++++++')
    console.log(prog)
    console.log('+++++++++++++++++++++++')
    throw err
  }
}

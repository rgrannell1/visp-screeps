
const visp = require('@rgrannell/visp')
const prog = `

room-spawns <- $fn(room-name
  is-room? <- $fn(cand equal?(cand room-name))
  select(is-room? hash-values(get("spawns" Game))))

roomName <- "W5N3"

show("asasd")

room-spawns(roomName)

show("ok")
`

module.exports.loop = () => {
  const ast = visp.parse.program(prog)
  const result = visp.eval(ast, {
    Game
  })
}

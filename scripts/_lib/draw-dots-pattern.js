const { createCanvas } = require('canvas')

function createPatternImage() {
  var ctx = createCanvas(4, 4).getContext("2d");
  ctx.fillStyle = "#eee"
  ctx.fillRect(0,0,2,2)
  return ctx.canvas
}

module.exports = function (context, width, height) {
  const pattern = context.createPattern(createPatternImage(), "repeat")
  context.fillStyle = pattern
  context.fillRect(0, 0, width, height)
}
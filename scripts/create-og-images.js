// requiring path and fs modules
const fs = require('fs').promises
const frontmatter = require('@github-docs/frontmatter')
const { createCanvas, loadImage, registerFont } = require('canvas')

const drawMultiLine = require('./_lib/draw-multi-line')
const drawDotsPattern = require('./_lib/draw-dots-pattern')

const CANVAS = { width: 1200, height: 630 }
const PATHS = {
  POSTS: './content/posts',
  TAGS_IMAGES: './static/images/tags',
  OG_IMAGES: './static/images/og'
}


registerFont('./static/inter.ttf', { family: 'Inter' })

const centerImgPosition = (imgWidth) => (CANVAS.width / 2) - (imgWidth / 2)
const resizeImgByWidth = (img, desiredWidth) => {
  const {height: imgHeight, width: imgWidth} = img
  const desiredHeight = Math.round(imgHeight * desiredWidth / imgWidth)
  return {height: desiredHeight, width: desiredWidth}
}

const drawOgImage = ({logoImg, tagImg, title}) => {
  const {height, width} = CANVAS
  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')
  
  context.fillStyle = '#fff'
  context.fillRect(0, 0, width, height)

  drawDotsPattern(context, width, height)

  context.fillStyle = '#222'
  context.textAlign = 'center'
  drawMultiLine(context, title, {
    rect: {
			x: width / 2,
			y: 175,
			width: width - 150,
			height: height - 200
		},
		font: 'Inter',
		verbose: true,
		lineHeight: 1.1,
		minFontSize: 48,
		maxFontSize: 76,
		resizeCanvasToFitMinFontSize: false
  })

  const { height: logoHeight, width: logoWidth} = resizeImgByWidth(logoImg, 284)
  const { height: tagHeight, width: tagWidth } = resizeImgByWidth(tagImg, 100)

  context.drawImage(logoImg, centerImgPosition(logoWidth), 515, logoWidth, logoHeight)
  context.drawImage(tagImg, centerImgPosition(tagWidth), 32, tagWidth, tagHeight)
  const buffer = canvas.toBuffer('image/png')
  return buffer
}

// joining path of directory 
fs.readdir(PATHS.POSTS).then(async files => {
  for (const fileName of files) {
    console.log(`Reading ${fileName}`)
    const pathToPost = `${PATHS.POSTS}/${fileName}`
    const file = await fs.readFile(pathToPost, {encoding: 'utf-8'})

    const { data, content } = frontmatter(file)
    const { image, tags, title } = data

    if (!image && tags && tags.length) {
      const [tag] = tags

      await Promise.all([
        loadImage('./static/logo.png'),
        loadImage(`${PATHS.TAGS_IMAGES}/${tag}.png`)
      ]).then(([logoImg, tagImg]) => {
        const buffer = drawOgImage({title, logoImg, tagImg})
        const imageName = fileName.replace('.md', '.png')
        const pathToNewImage = `${PATHS.OG_IMAGES}/${imageName}`
        data.image = pathToNewImage
        const newFile = frontmatter.stringify({content}, data)
        return Promise.all([
          fs.writeFile(pathToNewImage, buffer),
          fs.writeFile(pathToPost, newFile)
        ])
      })
    }
  }
})
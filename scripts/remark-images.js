'use strict'

const visit = require('unist-util-visit')
const got = require('got')
const sharp = require('sharp')

const MIME_TYPES_BY_EXTENSIONS = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg'
}

const dest = './'

module.exports = images

const createVisitor = acc => node => {
  const {url} = node
  const filenameWithExtension = url.split('/').pop()
  const [filename, extension] = filenameWithExtension.split('.')
  const isExternal = url.indexOf('https://') >= 0
  return acc.push({isExternal, filename, extension, node, url})
}

const processImage = async ({isExternal, filename, extension, node, url}) => {
  if (isExternal) {
    const {body} = await got(url, {encoding: null}).catch(() => '')
    const pipeline = sharp(body).resize({
      width: 1000,
      withoutEnlargement: false
    })

    let images = [pipeline.clone().resize({width: 50})]
    if (extension === 'jpg') {
      images[1] = pipeline.clone().jpeg({quality: 95, progressive: true})
    } else if (extension === 'png') {
      images[1] = pipeline.clone().png()
    }

    return Promise.all([
      images[0].toFile(`./static/images/${filename}_tb.${extension}`),
      images[1].toFile(`./static/images/${filename}.${extension}`)
    ])
  }
}

function images(listOfImages) {
  return () => async (tree, file, done) => {
    let imagesToProcess = []
    // visit the three in order to extract images
    visit(tree, 'image', createVisitor(imagesToProcess))
    // filter images that we already have done
    imagesToProcess = imagesToProcess.filter(({filename, extension}) => {
      const fileToFind = `${filename}.${extension}`
      return listOfImages.find(img => fileToFind === img) === undefined
    })

    for (const image in imagesToProcess) {
      await processImage(imagesToProcess[image])
    }
    done()
  }
}

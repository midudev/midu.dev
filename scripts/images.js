const fs = require('fs')
const remark = require('remark')
const vfile = require('to-vfile')

const images = require('./remark-images')

fs.readdir('./static/images', (err, listOfImages) => {
  if (err) throw new Error(err)
  fs.readdir('./posts', (err, listOfPosts) => {
    if (err) throw new Error(err)
    listOfPosts.forEach(post => {
      remark()
        .use(images(listOfImages))
        .process(vfile.readSync(`./posts/${post}`), function(err, file) {
          console.log(`./posts/${post} done!`)
          if (err) throw err
        })
    })
  })
})

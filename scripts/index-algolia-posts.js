const algoliasearch = require("algoliasearch")

const client = algoliasearch("N06USNNE94", "9089a9d591b8c82c89e2a810f4c77fd5")
const index = client.initIndex("midudev_blog")

const posts = require('../public/algolia.json')

index.saveObjects(posts)
  .then(objectIds => {
    console.log({objectIds})
  })
  .catch(err => {
    console.error(err)
  })

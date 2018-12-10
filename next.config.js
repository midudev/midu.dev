const {withNextein} = require('nextein/config')

module.exports = withNextein({
  nextein: {
    plugins: [
      [
        'nextein-plugin-markdown',
        {
          remark: ['remark-external-links'],
          rehype: ['@mapbox/rehype-prism']
        }
      ]
      // your nextein plugins here
    ]
  }
  // Your own next.js config here
})

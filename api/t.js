const https = require('https')

const DEFAULT_OPTIONS = {
  hostname: 'www.google-analytics.com',
  port: 443,
  path: '/collect',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
}

const createOptionsObject = ({data}) => ({
  ...DEFAULT_OPTIONS,
  headers: {
    ...DEFAULT_OPTIONS.headers,
    'Content-Length': data.length
  }
})

module.exports = (req, res) => {
  const {hostname} = req.headers
  // activate this when ready
  // if (hostname !== 'midu.dev') res.end()

  const data = JSON.stringify(req.body)

  const collectRequest = https.request(createOptionsObject({data}))
  
  collectRequest.on('error', (error) => {
    res.error(error)
  })
  
  collectRequest.write(data)
  collectRequest.end()

}
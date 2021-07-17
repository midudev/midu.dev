const playwright = require('playwright-aws-lambda')

const { NOW_REGION } = process.env
const isDevelopment = NOW_REGION === 'dev1'
const host = isDevelopment ? 'http://localhost:3000' : 'https://midu.dev'

let browser = null

module.exports = async (req, res) => {
  const { tag, subtitle, title } = req.query

  try {
    if (!browser) {
      browser = await playwright.launchChromium({ headless: true })
    }

    const context = await browser.newContext()
    const page = await context.newPage()
    console.log(`${host}/og/?tag=${tag}&${encodeURI(title)}`)
    await page.goto(`${host}/og/?tag=${tag}&title=${title}&subtitle=${subtitle}`)
    const screenshot = await page.screenshot({ type: 'png' })

    res.setHeader('Content-Type', 'image/png')
    res.status(200).send(screenshot)
  } catch (error) {
    res.status(500).send({
      status: 'Failed',
      error
    })
  } finally {
    if (browser !== null) {
      await browser.close()
    }
  }
}

import chromium from 'chrome-aws-lambda'
import playwright from 'playwright-core'

const { NOW_REGION } = process.env
const isDevelopment = NOW_REGION === 'dev1'
const host = isDevelopment ? 'http://localhost:3000' : 'https://midu.dev'

let emojiFontLoaded = false

export default async (req, res) => {
  if (!emojiFontLoaded) {
    await chromium.font('https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf')
    emojiFontLoaded = true
  }

  let browser = null
  const { tag, subtitle, title } = req.query
  console.log('New request with:')
  console.log({ tag, subtitle, title })

  console.log(await chromium.executablePath)

  try {
    if (!browser) {
      browser = await playwright.chromium.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: chromium.headless
      })
    }

    const context = await browser.newContext()
    const page = await context.newPage()
    console.log(`${host}/og/?tag=${tag}&${encodeURI(title)}`)
    await page.goto(`${host}/og/?tag=${tag}&title=${title}&subtitle=${subtitle}`)
    const screenshot = await page.screenshot({ type: 'png' })

    res.setHeader('Content-Type', 'image/png')
    res.status(200).send(screenshot)
  } catch (error) {
    console.error(error)
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

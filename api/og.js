import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import { html } from 'satori-html'

export default async (req, res) => {
  // get query string from req
  const { query } = req
  // transform to object query
  const { title, tag } = query

  const opts = {
    background: '#fff',
    fitTo: {
      mode: 'width',
      value: 1200
    }
  }

  const inter = await fetch('https://midu.dev/inter.ttf').then((res) =>
    res.arrayBuffer()
  )

  const markup = html`<div
    style="display: flex; flex-direction: column; width: 100vw; height: 100vh; padding: 64px;background-image: url('https://midu.dev/images/blur-background-01.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;"
  >
    <img
      id="logo"
      src="https://midu.dev/images/solo-logo.png"
      alt="Solo logo"
      style="width: 150px;"
    />
    <img
      id="tag"
      src="https://midu.dev/images/tags/${tag}.png"
      alt="${tag} logo"
      style="width: 600px; position: absolute; bottom: -100px; right: -100px; opacity: .3;"
    />
    <h1
      style="font-size: 128px; color: #111; max-width: 70%; text-align: left; line-height: 105%; letter-spacing: -2px;"
    >
      ${title}
    </h1>
  </div>`

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: inter,
        weight: 400,
        style: 'normal'
      }
    ]
  })

  const resvg = new Resvg(svg, opts)

  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  res.setHeader('Content-Type', 'image/png')
  res.status(200).send(pngBuffer)
}

/*
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
*/

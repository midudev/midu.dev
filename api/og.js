import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import { html } from 'satori-html'
import fetch from 'isomorphic-fetch'

export default async (req, res) => {
  // get query string from req
  const { query } = req
  // transform to object query
  const { title, tag } = query

  const opts = {
    background: '#fff',
    fitTo: {
      mode: 'width',
      value: 2400
    }
  }

  const inter = await fetch('https://midu.dev/inter.ttf').then((res) =>
    res.arrayBuffer()
  )

  const titleFontSize = title.length > 50 ? '85px' : '96px'

  const markup = html`<div
    style="display: flex; position: relative; flex-direction: column; width: 100vw; height: 100vh;"
  >
    <img
      src="https://midu.dev/images/blur-background-01.jpg"
      style="position:
    absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;
    object-position: center;"
    />
    <div
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; padding: 64px;"
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
        style="width: 400px; position: absolute; bottom: -70px; right: -70px; opacity: .4;"
      />
      <h1
        style="font-size: ${titleFontSize}; color: #111; text-align: left; line-height: 105%; letter-spacing: -2px; padding-right: 32px;"
      >
        ${title}
      </h1>
    </div>
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

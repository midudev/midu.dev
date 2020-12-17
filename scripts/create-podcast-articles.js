const Parser = require('rss-parser')
const parser = new Parser()
const slugify = require('@sindresorhus/slugify')
const path = require('path')
const fs = require('fs/promises')
const stripHtml = require("string-strip-html")

const contentFolder = path.join(process.cwd(), '/content/podcast')

const createMarkdown = ({audio, content, description, image, pubDate, season, episode, title}) => `---
title: '${title} - ${season}x${episode}'
date: '${pubDate}'
image: '${image}'
description: '${description}'
category: 'podcast'
season: ${season}
episode: ${episode}
audio: ${audio}
tags:
- podcast
---

${content}
`

;(async () => {

  let feed = await parser.parseURL('https://anchor.fm/s/2c58e75c/podcast/rss')

  feed.items.forEach(item => {
    const { content, title, enclosure, pubDate, itunes } = item
    const { image, season = '0', episode = '0' } = itunes
    const { url: audio } = enclosure

    const normalizedSeason = season.padStart(2).replace(' ', '0')
    const normalizedEpisode = episode.padStart(2).replace(' ', '0')
    const filename = `${normalizedSeason}-${normalizedEpisode}-${slugify(title)}.md`

    const normalizedContent = content
      .replace('Send in a voice message', 'Envía un mensaje al podcast en')
      .replace('---', '')

    const firstLineBreak = content.indexOf('\n')
    console.log({firstLineBreak})

    let description = ''

    if (firstLineBreak < 155) {
      description = stripHtml(content).result.substring(0, firstLineBreak - 1)
    } else {
      description = stripHtml(content.replace('\n', '')).result.substring(0, 180)
    }

    const markdown = createMarkdown({
      audio,
      content: normalizedContent,
      description,
      image,
      pubDate,
      season: normalizedSeason,
      episode: normalizedEpisode,
      title
    })

    fs.writeFile(`${contentFolder}/${filename}`, markdown, 'utf-8')
      .then(() => {
        console.log(`✅ Created ${filename}`)
      })
  })

})()
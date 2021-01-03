const Parser = require('rss-parser')
const slugify = require('@sindresorhus/slugify')
const path = require('path')
const fs = require('fs/promises')
const {existsSync} = require('fs')
const stripHtml = require("string-strip-html")
const {oldPodcastPathsMap} = require('./_db/oldPodcastPathsMap.js')

const parser = new Parser()
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

    const normalizedSeason = season.padStart(2, '0')
    const normalizedEpisode = episode.padStart(2, '0')
    let filename = `${normalizedSeason}_${normalizedEpisode}_${slugify(title)}`
    const oldPathIndex = oldPodcastPathsMap.findIndex(([newPath]) => filename === newPath)
    const [, oldPath] = oldPodcastPathsMap[oldPathIndex] || []
    filename = oldPath || filename

    // check if file already exists
    const fullFileName = `${contentFolder}/${filename}.md`
    if (!existsSync(fullFileName)) {
      const normalizedContent = content.replace('---', '')

      const firstLineBreak = content.indexOf('\n')
  
      let description = ''
  
      if (firstLineBreak < 155) {
        description = stripHtml(content).result.substring(0, firstLineBreak - 1)
      } else {
        description = stripHtml(content.replace(/(\r\n|\n|\r)/gm,"")).result.substring(0, 180)
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
  
      fs.writeFile(fullFileName, markdown, 'utf-8')
        .then(() => {
          console.log(`✅ Created ${filename}`)
        })
    }
  })

})()

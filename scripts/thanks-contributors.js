const https = require("https")
const fs = require('fs').promises

const options = {
  hostname: 'api.github.com',
  path: '/repos/midudev/midudev.com/contributors',
  headers: { 'User-Agent': 'Thanks GitHub Contributors App' }
}

const COLUMNS = 7

async function writeREADMEfile (contributorsMarkdown) {
  const readmeContent = await fs.readFile('README.md', 'utf8')
  const newReadmeContent = readmeContent.replace(
    /\[\/\/\]: contributors(?:(?:\n.*)+\[\/\/\]: contributors)?/,
    `[//]: contributors\n\n${contributorsMarkdown}\n[//]: contributors`
  )
  await fs.writeFile('README.md', newReadmeContent)
}

function createContributorsMarkdown(contributors) {
  let markdown = ''

  contributors.forEach((contributor, index) => {
    const {
      avatar_url: avatarUrl,
      html_url: profileUrl,
      login: name,
      contributions
    } = contributor

    markdown += `| [<img src="${avatarUrl}" width="100px;"/><br /><sub><b>${name}</b></sub>](${profileUrl})<br />`

    if (index + 1 % COLUMNS === 0) {
      markdown += createSeparations(COLUMNS)
      return
    } else if (index === contributors.length - 1) {
      const separationsLeft = index % COLUMNS
      markdown += createSeparations(separationsLeft)
    }
  })

  return markdown
}

function createSeparations (n) {
  let separations = ' |\n|'
  for(let i = 0; i <= n; i++){
    separations += ' :-: |'
  }
  return `${separations}\n`
}

async function handleEnd (body) {
  const contributors = JSON.parse(body)
  // hey! I'm not a contributor! I don't deserve this!
  const contributorsWithoutMe = contributors.filter(({login}) => login !== 'midudev')
  const markdown = createContributorsMarkdown(contributorsWithoutMe)
  await writeREADMEfile(markdown)
}

function handleResponse (res) {
  res.setEncoding("utf8")
  let body = ""

  res.on("data", data => body += data)
  res.on("end", () => handleEnd(body))
}

https.get(options, handleResponse)
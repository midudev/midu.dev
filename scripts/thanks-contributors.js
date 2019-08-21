const https = require("https")
const fs = require('fs').promises

const NO_CONTRIBUTORS = ['imgbot[bot]', 'ImgBotApp', 'midudev']

const options = {
  hostname: 'api.github.com',
  path: '/repos/midudev/midu.dev/contributors',
  headers: { 'User-Agent': 'Thanks GitHub Contributors App' }
}

const COLUMNS = 7

async function writeREADMEfile (contributorsMarkdown) {
  console.log('')
  console.log('🗂  Opening README file...')
  const readmeContent = await fs.readFile('README.md', 'utf8')
  const newReadmeContent = readmeContent.replace(
    /\[\/\/\]: contributors(?:(?:\n.*)+\[\/\/\]: contributors)?/,
    `[//]: contributors\n\n${contributorsMarkdown}\n[//]: contributors`
  )
  console.log('✍️  Writing new README file')
  await fs.writeFile('README.md', newReadmeContent)
  console.log('🆗 Done!')
}

function createContributorsMarkdown(contributors) {
  let markdown = ''

  console.log('🏋️‍  Checking contributors... \n')
  contributors.forEach((contributor, index) => {
    const {
      avatar_url: avatarUrl,
      html_url: profileUrl,
      login: name,
      contributions
    } = contributor

    console.log(`${name} has made ${contributions} contributions.`)

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
  // Hey! They're not contributors! They don't deserve this!
  const contributorsWithoutMe = contributors.filter(({login}) => !NO_CONTRIBUTORS.includes(login) )
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
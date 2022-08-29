import bionicifyMarkdown from 'bionic-markdown'
import { execSync } from 'child_process'
import path from 'path'
import processFrontmatter from 'markdown-frontmatter-processor'
import fs from 'fs'

const ARTICLES_PATH = 'content/posts/articles/'
const BIONIC_PATH = 'content/posts/bionic/'

function getChangedArticleNames() {
  console.log('🔍 Checking which files to bionicify...')
  const changedFiles = execSync('git diff --name-only --cached')
    .toString()
    .split('\n')
  const changedArticles = changedFiles.filter((fn) => {
    return fn.includes(ARTICLES_PATH)
  })

  return changedArticles.map((an) => {
    return an.replace(ARTICLES_PATH, '')
  })
}

function changeFrontmatter(md) {
  const options = {
    date: '-',
    excerpt: '-',
    author: '-',
    template: '-',
    thumbnail: '-',
    tags: '-',
    slug: '-',
    bionic: true,
  }

  return processFrontmatter(md, options)
}

function bionicifyAll(articleNames) {
  articleNames.forEach((an) => {
    const oldFilePath = path.join(ARTICLES_PATH, an)
    const newName = an.replace('.md', '-bionic.md')
    const newFilePath = path.join(BIONIC_PATH, newName)
    const oldMd = fs.readFileSync(oldFilePath).toString()
    const newMd = changeFrontmatter(bionicifyMarkdown(oldMd))
    fs.writeFileSync(newFilePath, newMd)
  })
  if (articleNames.length > 0) {
    console.log(
      `📖 Bionicified ${articleNames.length} file${
        articleNames.length == 1 ? '' : 's'
      }!`
    )
  } else {
    console.log('🆗 No files to bionicify.')
  }
}
const filesToChange = getChangedArticleNames()
bionicifyAll(filesToChange)

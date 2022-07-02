import bionicifyMarkdown from 'bionic-markdown'
import { execSync } from 'child_process'
import path from 'path'
import processFrontmatter from 'markdown-frontmatter-processor'
import fs from 'fs'

const articles_path = 'content/posts/articles/'
const bionic_path = 'content/posts/bionic/'

function getChangedArticleNames() {
  console.log('🔍 Checking which files to bionicify...')
  const changedFiles = execSync('git diff --name-only --cached')
    .toString()
    .split('\n')
  const changedArticles = changedFiles.filter((fn) => {
    return fn.includes(articles_path)
  })

  return changedArticles.map((an) => {
    return an.replace(articles_path, '')
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

function bionificyAll(articleNames) {
  articleNames.forEach((an) => {
    const oldFilePath = path.join(articles_path, an)
    const newName = an.replace('.md', '-bionic.md')
    const newFilePath = path.join(bionic_path, newName)
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
bionificyAll(filesToChange)

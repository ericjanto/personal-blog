export function getSimplifiedPosts(posts, options = {}) {
  return posts.map((post) => ({
    id: post.node.id,
    date: post.node.frontmatter.date,
    slug: post.node.fields.slug,
    tags: post.node.frontmatter.tags,
    title: post.node.frontmatter.title,
    author: post.node.frontmatter.author,
    excerpt: post.node.frontmatter.excerpt,
    ...(options.thumbnails && {
      thumbnail: post.node.frontmatter.thumbnail.childImageSharp.fixed,
    }),
  }))
}

export function slugify(string) {
  return (
    string &&
    string
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join('-')
  )
}

export function colourCoder(tags) {
  const highlightedCategories = ['computer-science', 'life']
  const prefix = 'colour-category-'

  if (!tags) {
    return prefix + 'other'
  }

  for (let t of tags) {
    for (let hc of highlightedCategories) {
      if (t === hc) {
        return prefix + t
      }
    }
  }

  return prefix + 'other'
}

export function categoriser(tags) {
  const highlightedCategories = ['computer-science', 'life']

  if (!tags) {
    return 'other'
  }

  for (let t of tags) {
    for (let hc of highlightedCategories) {
      if (t === hc) {
        return t
      }
    }
  }

  return 'other'
}

export function catPrettyPrint(tag) {
  const s = JSON.stringify(tag)
  const words = s.split('-')
  console.log(words)

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].replace(/"/g, '')
    words[i] = words[i][0].toUpperCase() + words[i].substr(1)
  }

  return words.join(' ')
}

export function linkify(string) {
  const s = JSON.stringify(string)
  return (
    s &&
    s
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => (x === 'crumb' ? null : x.toLowerCase()))
      .join('')
  )
}

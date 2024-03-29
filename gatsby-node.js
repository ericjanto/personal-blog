const { createFilePath } = require('gatsby-source-filesystem')
const path = require('path')
const fsExtra = require('fs-extra')

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPage = path.resolve('./src/templates/post.js')
  const pagePage = path.resolve('./src/templates/page.js')
  const tagPage = path.resolve('./src/templates/tag.js')
  const otherTagPage = path.resolve('./src/templates/otherTag.js')

  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              id
              frontmatter {
                title
                tags
                template
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )

  const bionicResults = await graphql(
    `
      {
        allMarkdownRemark(filter: { frontmatter: { bionic: { eq: true } } }) {
          edges {
            node {
              id
              frontmatter {
                title
              }
              html
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const all = result.data.allMarkdownRemark.edges
  const posts = all.filter((post) => post.node.frontmatter.template === 'post')
  const bionicPosts = bionicResults.data.allMarkdownRemark.edges
  const pages = all.filter((post) => post.node.frontmatter.template === 'page')
  const tagSet = new Set()

  // =====================================================================================
  // Posts
  // =====================================================================================

  posts.forEach((post, i) => {
    const previous = i === posts.length - 1 ? null : posts[i + 1].node
    const next = i === 0 ? null : posts[i - 1].node

    let bionicPost = undefined
    bionicPosts.forEach((bpost) => {
      if (bpost.node.frontmatter.title === post.node.frontmatter.title) {
        bionicPost = bpost
      }
    })

    if (post.node.frontmatter.tags) {
      post.node.frontmatter.tags.forEach((tag) => {
        if (tag != 'other') {
          tagSet.add(tag)
        }
      })
    }

    createPage({
      path: post.node.fields.slug,
      component: blogPage,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
        bionicPost,
      },
    })
  })

  // =====================================================================================
  // Pages
  // =====================================================================================

  pages.forEach((page) => {
    createPage({
      path: page.node.fields.slug,
      component: pagePage,
      context: {
        slug: page.node.fields.slug,
      },
    })
  })

  // =====================================================================================
  // Tags
  // =====================================================================================

  const tagList = Array.from(tagSet)
  tagList.forEach((tag) => {
    createPage({
      path: `/tags/${slugify(tag)}/`,
      component: tagPage,
      context: {
        tag,
      },
    })
  })

  const otherTag = 'other'
  createPage({
    path: `/tags/other`,
    component: otherTagPage,
    context: {
      otherTag,
    },
  })
}

const createNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // =====================================================================================
  // Slugs
  // =====================================================================================

  let slug
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')) {
      slug = `/${node.frontmatter.slug}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    })
  }

  // =====================================================================================
  // Static Image URLs
  // =====================================================================================
  const sourceNorm = path.normalize(`${__dirname}/content/images`)
  const destination = `/images`

  if (node.internal.type === 'File') {
    const dir = path.normalize(node.dir)

    if (dir.includes(sourceNorm)) {
      const relativeToDestination = dir.replace(sourceNorm, '')
      const newPath = path.join(
        process.cwd(),
        'public',
        destination,
        relativeToDestination,
        node.base
      )

      fsExtra.copy(node.absolutePath, newPath, (err) => {
        if (err) {
          console.log('Error copying file: ', err)
        }
      })
    }
  }
}

exports.createPages = createPages
exports.onCreateNode = createNode

// Helpers
function slugify(str) {
  return (
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join('-')
  )
}

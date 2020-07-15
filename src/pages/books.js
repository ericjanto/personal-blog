import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Books from '../components/Books'
import SEO from '../components/SEO'

import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function BlogIndex({ data }) {
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(
    () => getSimplifiedPosts(posts, { thumbnails: true }),
    [posts]
  )

  return (
    <Layout>
      <Helmet title={`Book Notes | ${config.siteTitle}`} />
      <SEO />
      <section>
        <h1>Book Notes</h1>
        <p className="subtitle">Kind of chaotic reviews.</p>
        <p className="medium">
          Over the past few years, I came to realise that I'll forget most of
          what I read unless I take notes.
        </p>
        <p className="medium">
          I used to be a bookworm when I was younger, reading every single day.
          I hope to get back into the habit of reading by putting my book notes
          online. This is where I put all notes, thoughts and quotes.
        </p>
        <Books data={simplifiedPosts} />
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BooksQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: "Books" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            author
            date(formatString: "MMMM DD, YYYY")
            thumbnail {
              childImageSharp {
                fixed(width: 125, height: 190) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`

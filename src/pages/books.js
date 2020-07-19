import React, { useMemo } from 'react'
import { graphql, Link } from 'gatsby'
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
          what I read unless I take notes. That's why I set up a few rules for my reading behaviour:
        </p>
        <p>
          <ul>
            <li>Read every day at least 30min.</li>
            <li>Let reading be the first and last thing you do in a day.</li>
            <li>Read with a pen in your hand.</li>
          </ul>
        </p>
        <p className="medium">
          I follow along <Link to="/reading-list">this reading list</Link>. Below is where I put all notes, thoughts and quotes.
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

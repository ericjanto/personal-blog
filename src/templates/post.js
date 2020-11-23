import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import Suggested from '../components/Suggested'
import SEO from '../components/SEO'

import config from '../utils/config'

require(`katex/dist/katex.min.css`)

export default function PostTemplate({ data, pageContext, ...props }) {
  const post = data.markdownRemark
  const { previous, next } = pageContext
  const { thumbnail } = post.frontmatter

  return (
    <Layout>
      <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
      <SEO postPath={post.fields.slug} postNode={post} postSEO />
      <section className="grid post">
        <article>
          <header className="article-header medium">
            {thumbnail && (
              <Img
                fixed={thumbnail.childImageSharp.fixed}
                className={
                  post.frontmatter.categories
                    ? `guide-thumbnail`
                    : `post-thumbnail`
                }
              />
            )}
            <h1>{post.frontmatter.title}</h1>
          </header>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
        <Sidebar post={post} {...props} />
      </section>
      <Suggested previous={previous} next={next} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        live(formatString: "MMMM DD, YYYY")
        tags
        path
        author
        categories
        source
        thumbnail {
          childImageSharp {
            fixed(width: 75, height: 75) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`

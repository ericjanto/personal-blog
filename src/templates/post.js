import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import Suggested from '../components/Suggested'
import SEO from '../components/SEO'
import { slugify } from '../utils/helpers'

import BreadcrumbMenu from '../components/BreadcrumbMenu'

import config from '../utils/config'

require(`katex/dist/katex.min.css`)

export default function PostTemplate({ data, pageContext, ...props }) {
  const post = data.markdownRemark
  // const { previous, next } = pageContext
  const { thumbnail } = post.frontmatter
  const crumbs = [""]

  return (
    <Layout>
      <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
      <SEO postPath={post.fields.slug} postNode={post} postSEO />
      <BreadcrumbMenu crumbs={crumbs} page={ post }/>
      <section className="grid post">
        <article>
          <header className="article-header medium">
            {thumbnail && (
              <Img
                fixed={thumbnail.childImageSharp.fixed}
                className={
                  post.frontmatter.category
                    ? `guide-thumbnail`
                    : `post-thumbnail`
                }
              />
            )}
          </header>
          <h1>{post.frontmatter.title}</h1>
          <section>
            <p>
              {post.frontmatter.excerpt}
            </p>
          </section>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </section>
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
        date(formatString: "DD MMMM, YYYY")
        tags
        excerpt
        category
        template
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

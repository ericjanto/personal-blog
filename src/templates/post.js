import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import config from '../utils/config'
import { GlobalHotKeys } from 'react-hotkeys'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import BreadcrumbMenu from '../components/BreadcrumbMenu'
import keyMap from '../utils/keyMap'

require(`katex/dist/katex.min.css`)

export default function PostTemplate({ data, pageContext, ...props }) {
  const [readingModesState, setReadingModes] = useState({
    bionic: false,
    fuzzy: false,
  })

  const postHotKeyHandlers = {
    FUZZY: () => {
      setReadingModes((prev) => {
        return { ...prev, fuzzy: !prev.fuzzy }
      })
    },
    BIONIC: () => {
      setReadingModes((prev) => {
        return { ...prev, bionic: !prev.bionic }
      })
    },
  }

  function getReadingModeClass(readingModesState) {
    let classStr = ''
    Object.entries(readingModesState).forEach(function ([mode, isActive]) {
      if (isActive) {
        classStr += String(mode).toLowerCase() + ' '
      }
    })
    return classStr.trim()
  }

  const post = data.markdownRemark
  const bionicHTML = pageContext.bionicPost
    ? pageContext.bionicPost.node.html
    : undefined
  const { thumbnail } = post.frontmatter
  const crumbs = ['']

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={postHotKeyHandlers}>
      <Layout>
        <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
        <SEO postPath={post.fields.slug} postNode={post} postSEO />
        <BreadcrumbMenu crumbs={crumbs} page={post} />
        <section className="grid post">
          <article className={getReadingModeClass(readingModesState)}>
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
            <div
              dangerouslySetInnerHTML={
                readingModesState.bionic
                  ? { __html: bionicHTML }
                  : { __html: post.html }
              }
            />
          </article>
        </section>
      </Layout>
    </GlobalHotKeys>
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

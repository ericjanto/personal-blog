import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import config from '../utils/config'

export default function ImageDisplay() {
  return (
    <Layout>
      <Helmet title={`404 | ${config.siteTitle}`} />
      <SEO />
      <Img fixed={thumbnail.childImageSharp.fixed} />
    </Layout>
  )
}

export const ImageQuery = graphql`
  {
    allFile(
      filter: {
        sourceInstanceName: { eq: "posts" }
        relativePath: { regex: "/images/g" }
      }
    ) {
      edges {
        node {
          ext
          relativePath
          childImageSharp {
            original {
              height
              width
            }
          }
        }
      }
    }
  }
`

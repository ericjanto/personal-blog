import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import config from '../utils/config'

export default function BlogIndex() {

  const Brand = ({ title, ...props }) => (
    <div className="brand reversedLink" {...props}>
      <h4>
        <Link to="/">{title}</Link>
      </h4>
    </div>
  )

  return (
    <Layout>
      <Helmet title={config.siteTitle} />
      <SEO />
      <Brand title="Eric Janto">
      </Brand>
    </Layout>
  )
}

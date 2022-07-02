import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import BreadcrumbMenu from '../components/BreadcrumbMenu'

import config from '../utils/config'

export default function FourOhFour() {
  const crumbs = ['ERROR 404']
  return (
    <Layout>
      <Helmet title={`404 | ${config.siteTitle}`} />
      <SEO />
      <BreadcrumbMenu crumbs={crumbs} />
      <section>
        <p>This page doesn't exist.</p>
      </section>
    </Layout>
  )
}

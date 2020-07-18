import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import config from '../utils/config'
import CV from '../../content/files/cv.pdf'

export default function CurriculumVitae() {
  return (
    <Layout>
      <Helmet title={`CV | ${config.siteTitle}`} />
      <SEO />
      <h1>CV</h1>
      <ul>
        <li><a href={CV}>English</a></li>
        <li>German (soon™)</li>
      </ul>
    </Layout>
  )
}
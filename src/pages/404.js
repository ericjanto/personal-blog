import React, { Component } from 'react'
import ThemeContext from '../context/ThemeContext'
import Layout from '../layout'
import SEO from '../components/SEO'
import {NotFoundBox} from '../components/NotFoundBox';


export default class NotFoundPage extends Component {
  static contextType = ThemeContext

  componentDidMount() {
    const { setNotFound } = this.context

    setNotFound()
  }

  componentWillUnmount() {
    const { setFound } = this.context

    setFound()
  }

  render() {
    return (
      <Layout simple>
        <SEO title="404: Not found" />
        <NotFoundBox />
      </Layout>
  )
  }
}

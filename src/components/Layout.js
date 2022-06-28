import React from 'react'
import Helmet from 'react-helmet'

import favicon from '../../content/thumbnails/favicon.png'
import Navigation from './Navigation'

import '../style.css'
import '../tufte.css'
import '../new-moon.css'
import '../reading-modes.css'

export default function Layout({ children }) {
  return (
    <>
      <Helmet>
        <link rel="shortcut icon" type="image/png" href={favicon} />
      </Helmet>
      <main className="container">{children}</main>
      <Navigation />
    </>
  )
}

import React from 'react'
import { Link } from 'gatsby'

export default function Nav() {
  return (
    <nav className="navbar">
      <div className="container flex">
        <div>
          <Link to="/" className="brand">
            Eric Janto
          </Link>
        </div>
        <div>
          <Link to="/blog">Blog</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/books">Book Notes</Link>
        </div>
      </div>
    </nav>
  )
}

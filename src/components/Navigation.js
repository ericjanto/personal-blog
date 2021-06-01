import React from 'react'
import { Link } from 'gatsby'

export default function Nav() {
  return (
    <nav className="navigation container">
      <hr className="navline"></hr>
      <div className="grid">
        <div className="navlinks reversedLink">
          <ul>
            <li>
              <Link to="/notes">Notes</Link>
            </li>
            <li>
              <Link to="/writings">Writings</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
          </ul>
        </div>
        <div className="navlinks reversedLink">
          <ul>
            <li>
              <Link to="/me">Me</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="navlinks reversedLink">
          <ul>
            <li>
              <Link to="/follow">Follow</Link>
            </li>
            <li>
              <Link to="/newsletter">Newsletter</Link>
            </li>
            <li>
              <Link to="/what-is-rss">RSS</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

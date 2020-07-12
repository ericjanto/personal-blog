import React, { Component } from 'react'
import { Link } from 'gatsby'

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer container-extended">
        <div className="left-side">
          <Link to="/contact/">Contact</Link>
          <a href="https://www.ericjanto.com/rss.xml" target="_blank" rel="noopener noreferrer">
            RSS
          </a>
        </div>
        <div className="right-side">
          <Link to="/me/">About</Link>
          <Link to="/cv/">CV</Link>
        </div>
      </footer>
    )
  }
}

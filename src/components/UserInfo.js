import React, { Component } from 'react'
import eric from '../../content/images/portrait.jpg'
import patreon from '../../content/thumbnails/thumbnail.png'
import kofi from '../../content/thumbnails/thumbnail.png'

export default class UserInfo extends Component {
  render() {
    return (
      <aside className="note">
        <div className="container note-container">
          <div className="flex-author">
            <div className="flex-avatar">
              <img className="avatar" src={eric} alt="Eric Janto" />
            </div>
            <div>
              <h3>Author</h3>
              <p>
                Hey, I’m Eric.
              </p>

              <div className="flex">
                <a
                  href="https://ko-fi.com/"
                  className="donate-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={kofi} className="coffee-icon" alt="Coffee icon" />
                  Buy me a coffee
                </a>
                <a
                  className="patreon-button"
                  href="https://www.patreon.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={patreon} height="50" width="50" alt="Patreon" /> Become a Patron
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>
    )
  }
}

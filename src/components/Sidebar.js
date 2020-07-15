import React from 'react'
import { Link } from 'gatsby'
import { slugify } from '../utils/helpers'

export default function Sidebar({ post }) {
  const { tags } = post.frontmatter
  const project = post.frontmatter.path
  const source = post.frontmatter.source
  const live = post.frontmatter.live
  const author = post.frontmatter.author

  return (
    <aside>
      <div className="aside-content">
        <section>
          <h3>Published</h3>
          <time>{post.frontmatter.date}</time>
          <div className={author ? 'visible' : 'invisible'}>
            <h3>Author</h3>
            <p>{author}</p>
          </div>
          <div className={project ? 'visible' : 'invisible'}>
            <h3>Project Info</h3>
            <a href={project} target="_blank" rel="noopener noreferrer">
              Link to Project
            </a>
            <br />
            <a href={source} target="_blank" rel="noopener noreferrer">
              View Source
            </a>
          </div>
          <div className={live ? 'visible' : 'invisible'}>
            <h3>Live Article</h3>
            <p>
              This is a live article. As such, it will be regularly updated within
              the next few weeks.
            </p>
            <time>Last update: {live}</time><br />
            <Link to="/live-articles">The idea behind live articles</Link>
          </div>
          <h3>Feedback</h3>
          <p>Any questions, critiques or comments? Feel free to <Link to="/contact/">contact me</Link>, I'd be happy to hear from you.</p>
          <h3>Tags</h3>
          <div className="cell tags">
            {tags &&
              tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/tags/${slugify(tag)}`}
                  className={`tag-${tag}`}
                >
                  {tag}
                </Link>
              ))}
          </div>
        </section>
      </div>
    </aside>
  )
}

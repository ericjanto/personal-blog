import React from 'react'
import { Link } from 'gatsby'
import { slugify } from '../utils/helpers'

export default function Sidebar({ post }) {
  const { tags } = post.frontmatter
  const project = post.frontmatter.path
  const source = post.frontmatter.source
  const live = post.frontmatter.live

  return (
    <aside>
      <div className="aside-content">
        <section>
          <h3>Published</h3>
          <time>{post.frontmatter.date}</time>
          <div className={project ? 'visible' : 'invisible' }>
            <h3>Project Info</h3>
            <a
            href={project}
            target="_blank"
            rel="noopener noreferrer"
            >Link to Project</a>
            <br />
            <a
            href={source}
            target="_blank"
            rel="noopener noreferrer"
            >View Source</a>
          </div>
          <div className={live ? 'visible' : 'invisible' }>
            <h3>Live Article</h3>
            <p>This is a live article. As such, you can track it's progress and updates in realtime.</p>
            <p>Last update: {live}</p>
            <Link to="/live-articles">More about live articles</Link>
          </div>
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

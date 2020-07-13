import React from 'react'
import { Link } from 'gatsby'

import SearchForm from '../components/SearchForm'

import { slugify } from '../utils/helpers'

export default function Sidebar({ post, ...props }) {
  const { tags } = post.frontmatter

  return (
    <aside>
      <div className="aside-content">
        <section>
          <p>
            I'm Tania, a software engineer and open-source creator. This website
            is a compendium of things I've learned while writing code for fun
            and profit.
          </p>
        </section>
        <section>
          <h3>Published</h3>
          <time>{post.frontmatter.date}</time>
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
        
        <section>
          <h3>Search</h3>
          <SearchForm {...props} />
        </section>
      </div>
    </aside>
  )
}

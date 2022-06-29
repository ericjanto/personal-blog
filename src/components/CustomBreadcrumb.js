import React from 'react'
import { Link } from 'gatsby'

const CustomBreadcrumb = ({ crumbs }) => {
  const crumbNum = crumbs.length
  const crumbSeparator = ' / '

  return (
    <div className="breadCrumbs">
      {crumbs.map((crumb, i) => {
        if (i + 1 == crumbNum) {
          return (
            <div key={crumb.crumbLabel} style={{ display: 'inline' }}>
              {crumb.crumbLabel}
            </div>
          )
        } else if (i > 0) {
          if (crumbs[i - 1].pathname.includes('writings')) {
            return
          }
        } else {
          return (
            <div
              key={crumb.crumbLabel}
              className="reversedLink"
              style={{ display: 'inline' }}
            >
              <Link
                className={i == 0 ? 'homeBreadcrumb' : ''}
                to={crumb.pathname}
                style={{ ...crumb.crumbStyle }}
                activeStyle={{ ...crumb.crumbActiveStyle }}
              >
                {crumb.crumbLabel}
              </Link>
              {crumbSeparator}
            </div>
          )
        }
      })}
    </div>
  )
}

export default CustomBreadcrumb

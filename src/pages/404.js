import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import BreadcrumbMenu from '../components/BreadcrumbMenu'

import config from '../utils/config'

export default function FourOhFour() {
  const crumbs = ['ERROR 1203499(0005)B']
  return (
    <Layout>
      <Helmet title={`404 | ${config.siteTitle}`} />
      <SEO />
      <BreadcrumbMenu crumbs={crumbs} />
      <section>
        <p>
          Wellp, now you did it. Broke the damn computer. You probably didn’t
          even do anything major, did you? But see, I’m the dreaded Black Screen
          of Death, and I pop up totally randomly, and most times, for no good
          gah-damn reason.
        </p>
        <p>
          You’re probably sweatin’ bullets right now, aren’t you? I love it. So,
          there are a couple options you could try, neither of which will work
          whatsoever, but shit, be my guest.
        </p>
        <p>
          <ul>
            <li>
              Hit CTRL+ALT+DEL. This will restart me. But, everything you’ve
              done on me up until this point will be gone. Tough titties. But if
              you’re into downloading werid online GIF’s (which you are), I’m
              guessing this isn’t a terrible option. Pervert.
            </li>
            <li>
              Don’t hit CTRL+ALT+DEL and get on the phone with every computer
              repair guy in town. All of ‘em. Give ‘em all a shot. It’s fine.
              I’ll wait. I ain’t going anywhere. I can stay like this
              alllllllllllllll daaaaaaaaaaayyyyyy.
            </li>
          </ul>
        </p>
        <p>
          Still here? Well, don't worry. This is just a messed-up four-oh-four
          page. So you probably just tried to access a page that doesn't exist.
          Duh. Or you followed a faulty link in one of my articles. In that
          case, my bad.
        </p>
      </section>
    </Layout>
  )
}

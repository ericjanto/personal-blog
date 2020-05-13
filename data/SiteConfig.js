const config = {
  siteTitle: 'Eric Janto',
  siteTitleShort: 'Eric Janto',
  siteTitleAlt: 'Eric Janto',
  siteLogo: '/logos/logo-1024.png',
  siteUrl: 'https://ericjanto.com/',
  repo: 'https://github.com/ericjanto/personal-blog',
  pathPrefix: '',
  dateFromFormat: 'YYYY-MM-DD',
  dateFormat: 'MMMM Do, YYYY',
  siteDescription:
    'Eric Janto is an AI & CS student based in Edinburgh.',
  siteRss: '/rss.xml',
  googleAnalyticsID: 'UA-165301838-2',
  postDefaultCategoryID: 'Tech',
  newsletter: 'https://ericjanto.substack.com',
  newsletterEmbed: 'https://ericjanto.substack.com/embed',
  userName: 'Eric',
  userEmail: 'jantoeric@gmail.com',
  userTwitter: 'JantoEric',
  menuLinks: [
    {
      name: 'About',
      link: '/me/',
    },
    {
      name: 'Articles',
      link: '/blog/',
    },
    {
      name: 'Projects',
      link: '/projects/',
    },
  ],
  themeColor: '#3F80FF', // Used for setting manifest and progress theme colors.
  backgroundColor: '#ffffff',
}

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === '/') {
  config.pathPrefix = ''
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, '')}`
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === '/') config.siteUrl = config.siteUrl.slice(0, -1)

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== '/') config.siteRss = `/${config.siteRss}`

module.exports = config

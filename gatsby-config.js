module.exports = {
  siteMetadata: {
    title: 'Eric Janto',
    author: {
      name: 'Eric Janto',
    },
    pathPrefix: '/',
    siteUrl: 'https://www.ericjanto.com',
    description: 'I write about computer science and other stuff.',
    feedUrl: 'https://www.ericjanto.com/rss.xml',
  },
  plugins: [
    // ===================================================================================
    // Meta
    // ===================================================================================

    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Eric Janto',
        short_name: 'Eric Janto',
        description: 'I write about computer science and other stuff.',
        start_url: '/',
        background_color: 'white',
        theme_color: '#141414',
        display: 'minimal-ui',
        icon: `static/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  excerpt: edge.node.frontmatter.excerpt,
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { template: { eq: "post" } } }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { 
                        slug 
                      }
                      frontmatter {
                        excerpt
                        title
                        date
                        tags
                        template
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Eric Janto | RSS Feed',
          },
        ],
      },
    },

    // ===================================================================================
    // Images and static
    // ===================================================================================

    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static/`,
      },
    },

    // ===================================================================================
    // FUNCTIONALITIES
    // ===================================================================================

    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        defaultCrumb: {
          location: {
            pathname: '/',
          },
          crumbLabel: 'Eric Janto',
          crumbSeparator: ' / ',
        },
        exclude: [
          `**/writings/?search=**`,
          `**/dev-404-page/**`,
          `**/404/**`,
          `**/404.html`,
          `**/offline-plugin-app-shell-fallback/**`,
        ],
      },
    },

    // ===================================================================================
    // Markdown
    // ===================================================================================

    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showCaptions: ['title'],
              showLineNumbers: true,
              noInlineHighlight: true,
              prompt: {
                user: 'root',
                host: 'localhost',
                global: true,
              },
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `30`,
            },
          },
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: 'Table of Contents',
              tight: false,
              fromHeading: 1,
              toHeading: 6,
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`,
            },
          },
          {
            resolve: 'gatsby-remark-graph',
            options: {
              // this is the language in your code-block that triggers mermaid parsing
              language: 'mermaid', // default
              theme: 'default', // could also be dark, forest, or neutral
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-tufte',
        ],
      },
    },

    // ===================================================================================
    // Search
    // ===================================================================================

    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'pages',
        engine: 'flexsearch',
        engineOptions: {
          encode: 'icase',
          tokenize: 'forward',
          async: false,
        },
        query: `
          {
            allMarkdownRemark(filter: { frontmatter: { template: { eq: "post" } } }) {
              nodes {
                id
                frontmatter {
                  title
                  tags
                  slug
                  date(formatString: "MMMM DD, YYYY")
                  excerpt
                }
                rawMarkdownBody
              }
            }
          }
        `,
        ref: 'id',
        index: ['title', 'body', 'tags'],
        store: ['id', 'slug', 'title', 'tags', 'date', 'excerpt'],
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map((node) => ({
            id: node.id,
            slug: `/${node.frontmatter.slug}`,
            title: node.frontmatter.title,
            body: node.rawMarkdownBody,
            tags: node.frontmatter.tags,
            date: node.frontmatter.date,
            excerpt: node.frontmatter.excerpt,
          })),
      },
    },
    // ===================================================================================
    // Misc
    // ===================================================================================
    {
      resolve: `gatsby-plugin-html-comments`,
      options: {
        files: ['./public/**/*.html', './public/*.html'],
        comment: [
          {
            regexp: /<html-comment>(.*?)<\/html-comment>/g,
            comment: `<!--
            
            Hello!

            Nice to see that people are interested in how
            this website was built. If you're trying to
            reverse engineer this website, I can save you
            a lot of time: it is open-sourced on my GitHub
            account. If you only take it as an inspiration
            and change it more or less completely, feel
            free to show me what you did! Otherwise,
            please give me credits:)

            I started developing this website using Tania
            Rascia's personal website as a template. She
            strongly discourages exactly that, so I tried
            over the years to completely change the feel,
            look and functionality of my website - which I
            think I succeeded at. Except for some CSS, it is
            probably closer to the Gatsby Advanced Starter
            template now, which I would recommend as a general
            starting place if you want to build your own Gatsby
            website.

            If you want to hang out you can reach me via my
            contact details on this website.

            - Eric
            
-->`,
          },
        ],
      },
    },
  ],
}

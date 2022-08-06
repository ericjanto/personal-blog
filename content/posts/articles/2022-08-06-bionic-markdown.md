---
date: 2022-08-06
title: 'Implementing faster reading with bionic Markdown'
excerpt: This article describes the process of developing a bionic Markdown format and deploying it on my website.
template: post
slug: bionic-markdown
tags:
  - 'computer-science'
---

_Be more productive! Only read useful stuff! Read faster!_

If you're in the same YouTube productivity guru bubble as I used to be, you might have come across such advice. This article is not about whether I agree with it or not. [^ {-} In fact, I do not agree with that kind of generalised advice.] But I got interested. How _can_ we read faster?

One approach to faster reading that was [trending on HackerNews](https://news.ycombinator.com/item?id=30787290) a while ago is to highlight the beginning of every word. This approach is called [Bionic Reading®](https://bionic-reading.com/). It features various customisations, but for this article, I'll only focus on the basic concept. It claims to enable fast reading due to your brain only needing a certain fraction of a word to recognise it.

![Comparing normal and bionic reading modes](../images/bionic-reading.png 'Comparing normal and bionic reading modes')
[^{-} Image source: bionic-reading.com]

I wasn't even interested in whether this reading mode worked well for me or not. What rather caught my eye was the question of how I could implement it for my website. Would it be a useful addition? Probably not. Would I learn a little bit about web development on the way? Potentially. This article describes the process I went through to arrive at an experimental (yet pretty much working) implementation.

```toc
from-heading: 2
to-heading: 6
```

## Conceptual work

I started investigating. A few moments in, I came across the [official API](https://rapidapi.com/bionic-reading-bionic-reading-default/api/bionic-reading1/). Quickly, I realised that using the API was not an option for me for two reasons. Firstly, the API endpoint wasn't flexible enough. I needed to customise the behaviour of which text elements get bionificied [^{-} For ease of writing, let's call the process of converting text to bionic text "to bionificy". Perhaps I should've chosen "bionify" as it doesn't sound as silly when said out loud, but alas...], and which elements stay the same (for example, for code blocks I prefer non-bionic content). Secondly, I couldn't afford to pay for the API pro subscription. Sure, I could've set up a script which guaranteed to never surpass the freemium request limit by only making requests for changed and relevant files and creating a queue if the number of those files surpasses the limit...but where would've been the fun in that?

Ok, a custom implementation it was then. Looking at the structure of my website, I wasn't entirely sure where to begin. All of my writings on this website are stored in Markdown files. I use a static site generator to convert Markdown files to HTML. The generator itself is equipped with a tailored Markdown parser which supports customised syntax such as Pandoc-style inline footnotes and marginalia. Similar to the API, should I bionicify the Markdown content and generate HTML as output, essentially customising the Markdown parser? Or Markdown as output? Or should I rather bionicify the already generated HTML?

I chose to go with the option of bionicifying the Markdown files themselves, with Markdown as output. To me, this approach seemed the most sustainable as Markdown is a less cluttered (yet less expressive) markup language in comparison to HTML. This means that extracting relevant text and creating desired output is a bit simplified.[^ Turns out that extracting relevant text is achieved in a very similar way, but I did not know that at this point. Still, creating the output file is a bit simplified.] It was also motivated by the fact that highlighting word parts in Markdown is supported by default and doesn't require additional syntax: the highlighted part can be **bold** using the `**` or `__` syntax, the rest normal. [^{-} Fine, the latter argument is opinionated and probably doesn't hold at all: in HTML we can just use the _strong_ tag. I could've spent more time evaluating whether my approach was the most sensible but I just wanted to get down to hacking together a solution, I'll admit it.] Now I knew that my implementation should produce something like this:

```js
// Normal Markdown as input
const md = 'Soll ich nach Berlin oder München ziehen?'

// Bionicified Markdown as output
const bmd = bionicifyMarkdown(md)
console.log(bmd)
```

Yielding:

```
**Sol**l **ic**h **nac**h **Berl**in **ode**r **Münch**en **zieh**en?
```

## Implementation

For a simple conversion like this, [text-vide](https://github.com/Gumball12/text-vide) already exists. However, that package does not account for any syntax that needs to be preserved. It turns footnote syntax such as `[^fn_label]` into `[^__fn_l__abel]`, something my custom Markdown parser from my website generator did not like at all.

A more sophisticated solution was needed. My implementation needed to be able to syntactically differentiate between Markdown elements. It needed to know which text bits it was allowed to bionicify, and which text bits it should leave untouched. Be able to differentiate between different Markdown elements using their syntax? This rang a bell. Syntax syntax syntax (_echoing_)... Abstract syntax tree!

An abstract syntax tree (short: AST) is a [tree representation](<https://en.wikipedia.org/wiki/Tree_(data_structure)>) of the syntactic structure of text. There are various AST parsers customised towards different text types: text expressing programming languages, natural languages, and also markup languages such as HTML and Markdown. An AST representing a Markdown syntax structure is called MDAST.

---

```md
Soll ich nach Berlin oder München ziehen?

> Ich habe keine Ahnung!
```

In the above example (which, btw, is me contemplating whether I should move to Berlin or Munich), the Markdown content consists of two elements: normal text (paragraph) and a blockquote. An MDAST in JSON format looks like this: [^{-} The MDAST parser I'm using adds another field, "position", to the syntax tree which specifies where exactly the element occurs in the Markdown text. I omitted it here for readability.]

```js
{
    "type": "root",
    "children": [
        {
            "type": "paragraph",
            "children": [
                {
                    "type": "text",
                    "value": "Soll ich nach Berlin oder München ziehen?",
                }
            ],
        },
        {
            "type": "blockquote",
            "children": [
                {
                    "type": "paragraph",
                    "children": [
                        {
                            "type": "text",
                            "value": "Ich habe keine Ahnung!",
                        }
                    ],
                }
            ],
        }
    ],
}
```

To parse Markdown into an MDAST like above, I didn't have to re-invent the wheel. There are already lots of packages out there to solve that problem, and even though it would've been a nice challenge to test my _Introduction to Algorithms and Data Structures_ knowledge...that's a task for a different time. Some research made me aware of [unified](https://github.com/unifiedjs), a suite of tools designed to work with ASTs. They enable _parsing_ text into an AST, _transforming_ the AST, and eventually _serialising_ it to obtain the changed text. Tools tailored towards Markdown and MDASTs are available under the name [remark](https://github.com/remarkjs) and are the relevant subset of _unified_ for this project.

To obtain an MDAST from Markdown, I use [remark-parse](https://github.com/remarkjs/remark/tree/main/packages/remark-parse):

```js
const mdast = unified().use(remarkParse).parse(md)
```

I'll keep further implementation details brief, whoever is interested can dig into the code on [GitHub](https://github.com/ericjanto/bionic-markdown). I developed a custom plugin for the _unified_ processor which visits MDAST nodes which contain text, and changes that text via _text-vide_. I further defined a syntax dictionary which specifies elements which should not be bionicified:

```js
const invalid_element_indicators = {
  table_1: '| -',
  table_2: '|-',
  math: '$',
  footnote: '[^',
}
```

Along with a simple helper function:

[^{-} I'm sure there is a prettier way of writing this helper function... If you know one please let me know:)]

```js
function containsInvalidElement(text) {
  let invalid = false
  Object.entries(invalid_element_indicators).forEach(function ([_, val]) {
    if (text.includes(val)) {
      invalid = true
    }
  })
  return invalid
}
```

Any elements containing the indicators will not be bionicified. This is a crude solution as it can lead to large parts of text not being bionicified at all, but this solution is sufficient for reaching an experimental stage of this reading mode. More on this later.

I cleaned everything up and published it as an npm package.

## Website integration

After adding the package to my website, I started integrating it.
[^{-} Quite satisfying to be able to run _yarn add bionic-markdown_ and to know that I wrote every single line of code in that package myself.] Firstly, I set up a utility script which bionicified all my posts so that the `posts` directory would be structured like this:

```md
├── articles
│   ├── 2020-05-10-starting-this-blog.md
│   ├── 2020-05-24-understanding-lists.md
│   ├── 2020-06-07-haskell-list-comprehension.md
│   ├── 2020-07-03-gatsby-cpanel.md
│   ├── ...
└── bionic
│   ├── 2020-05-10-starting-this-blog-bionic.md
│   ├── 2020-05-24-understanding-lists-bionic.md
│   ├── 2020-06-07-haskell-list-comprehension-bionic.md
│   ├── 2020-07-03-gatsby-cpanel-bionic.md
│   ├── ...
├── ...
```

The script takes a file name as input and writes the bionicified version to the output directory, `bionic` in this case.

## Interlude: dealing with frontmatter

At this point, I realised I had missed out on an essential corner case: dealing with Markdown frontmatter. [^{-} Markdown frontmatter is an established way of defining metadata for the file using YAML, e.g. a post's desired URL, title, and date.] My current setup would bionificy the frontmatter field titles and their values – which was not desired.

I had to achieve two things: first of all, to not bionificy the frontmatter part of the Markdown file at all. Secondly, to remove, add or change some of the frontmatter fields. I wanted to keep some fields, such as the post title, and delete others, such as the desired URL.

The first challenge was easy to solve. _Remark_ has a module which recognises and parses frontmatter: [remark-frontmatter](https://github.com/remarkjs/remark-frontmatter). This could easily be integrated during the parsing process:

```js
const mdast = unified().use(remarkParse).use(remarkFrontmatter).parse(md)
```

To test this, I changed the test file to include a `title` frontmatter field.

```md
---
title: Berlin oder München? Eine schwierige Entscheidung
---

Soll ich nach Berlin oder München ziehen?

> Ich habe keine Ahnung!
```

Using _remark-frontmatter_, the following node was added to the MDAST:

```json
{
  "type": "yaml",
  "value": "title: Berlin oder München? Eine schwierige Entscheidung"
}
```

Ok, so now the frontmatter was recognised as a syntactically different element, which meant that I could ignore or access it when bionicifying the file.

Moving on to the second challenge, I wrote a further package, [markdown-frontmatter-processor](https://github.com/ericjanto/markdown-frontmatter-processor) which allowed for easily altering the frontmatter:

```js
import processFrontmatter from 'markdown-frontmatter-processor'

// ---
// field: example value
// another_field: some value
// ---
// Markdown content
const md =
  '---\nfield: example value\nanother_field: some value\n---\nMarkdown content'

const options = {
  field: 'new example value',
  another_field: 'del',
  new_field: 'a new field!',
}

console.log(processFrontmatter(md, options))
```

The above code snippet yields

```md
---
field: new example value
new_field: a new field!
---

Markdown content
```

## Website integration (continued)

Having sorted the frontmatter problem, I continued with the integration task. To be able to query bionic fiels easily using graphql, I added a `bionic: true` frontmatter field to them, using the package I created in the step before. Then, to query:

```js
const bionicResults = await graphql(
  `
    {
      allMarkdownRemark(filter: { frontmatter: { bionic: { eq: true } } }) {
        edges {
          node {
            id
            frontmatter {
              title
            }
            html
          }
        }
      }
    }
  `
)
```

Note how the parsed HTML was available at this point, thanks to the static site generator. I passed the bionicified HTML to the corresponding post as context parameter by matching the title:

```js
const bionicPosts = bionicResults.data.allMarkdownRemark.edges

posts.forEach((post, i) => {
  let bionicPost = undefined
  bionicPosts.forEach((bpost) => {
    if (bpost.node.frontmatter.title === post.node.frontmatter.title) {
      bionicPost = bpost
    }
  })

  createPage({
    // ...
    bionicPost,
    },
  })
})
```

Then, I created a constant holding the reading mode state using the react hook `useState`. It gets updated when a defined shortcut is used, enabled by [react-hotkeys](https://github.com/greena13/react-hotkeys):

```js
// keyMap.js
export default {
  BIONIC: 'ctrl+b',
}

// post.js
const [readingModesState, setReadingModes] = useState({
  bionic: false,
})

const postHotKeyHandlers = {
  BIONIC: () => {
    setReadingModes((prev) => {
      return { ...prev, bionic: !prev.bionic }
    })
  },
}
```

This setup allows for easily adding new shortcuts and reading modes, as I did for my [fuzzy reading mode](https://www.ericjanto.com/reverse-engineering-fuzzy-mode/).

Lastly, showing normal or bionicified content was done by a conditional attribute assignment:

```js
<div
  dangerouslySetInnerHTML={
    readingModesState.bionic ? { __html: bionicHTML } : { __html: post.html }
  }
/>
```

All of the above was enough to reach my minimum goal: I could show bionificied content on my website. However, there were a few bits I wanted to improve.

## Automating with pre-commit

To bionicify the files, I could just run `node bionicify.js [file-name.md]` whenever a new article needed to be bionicified. However, chances were big that I would forget about it at some point which would lead to an inconsistently available reading mode experience.

So I automated the process by using [pre-commit](https://pre-commit.com/) and adjusting the `package.json` file correspondingly:

```json
"scripts": {
  "bionicify": "node bionicify.js"
},
"pre-commit": [
  "bionicify",
],
```

I also wanted the script to only run on changed or added posts. So I modified my `bionicify.js` utility script to not take a filename as input but automatically detect changes not staged for git commits, filtering for the post directory.

```js
const ARTICLES_PATH = 'content/posts/articles/'

function getChangedArticleNames() {
  const changedFiles = execSync('git diff --name-only --cached')
    .toString()
    .split('\n')
  const changedArticles = changedFiles.filter((fn) => {
    return fn.includes(ARTICLES_PATH)
  })

  return changedArticles.map((an) => {
    return an.replace(ARTICLES_PATH, '')
  })
}
```

Then, I set up the script to bionicify all files specified by that helper function.

## Stylising

I noticed that simply using bold and normal text would not suffice to enable a similar reading experience to Bionic Reading®. This is because of my choice of font and colours for this website, especially in regard to the default dark mode. See yourself:

> **Hum**an–**comput**er **interacti**on (**HC**I) **i**s **resear**ch **i**n **th**e **desi**gn **an**d **th**e **us**e **o**f **comput**er **technolo**gy, **whi**ch **focus**es **o**n **th**e **interfac**es **betwe**en **peop**le (**use**rs) **an**d **compute**rs. **HC**I **researche**rs **obser**ve **th**e **way**s **huma**ns **intera**ct **wit**h **compute**rs **an**d **desi**gn **technologi**es **tha**t **all**ow **huma**ns **t**o **intera**ct **wit**h **compute**rs **i**n **nov**el **way**s.

The main issue, I found, was that the contrast between bold and normal text was not big enough. So I decreased the opacity of normal text:

![Image showing decreased opacity of normal text in contrast to the bionicified bold text. The bold text clearly stands more out.](../images/bionic-excerpt.jpg 'Decreased opacity for normal text parts increase contrast to bionicified content')

I also discovered that any coloured elements (such as [links](ericjanto.com) or code syntax highlighting, etc.) were too distracting for the bionic reading experience. A quick-and-dirty bit of CSS did the job:

```css
.bionic {
  filter: grayscale(100%);
}
```

## Concerns and caveats

My implementation is more an experiment and far from being a model example. As such, it comes with its irks and quirks.

Most concerning is the accessibility of this reading mode, at least how I have implemented it on my website. While the idea of Bionic Reading® might well work (or not, I do not know), the bold bit of a word might sometimes not be enough to guide a reader along and they need to read the normal text part as well. The decreased text opacity of the rest of the word might cause issues for people who have impaired eyesight; this should be investigated if the reading mode actually had an uprising in popularity.

I realise that the main functionality of my implementation is centred around _text-vide_. It would've been interesting to develop such a package on my own. However, I figured this wasn't the main challenge and would've been trivial (a simple string parser which bolds text depending on the word length). This would likely be the first step if I ever wanted to improve the quality of my reading mode as words with less than three letters should be all bold by default. Reading a highlighted letter _o_ only is not expressive enough for my brain to differentiate between any of _or, on, of_.

There are still a few corner cases which I haven't fixed yet, such as what should happen with text that is already bold in the original file. This can lead to strange **\_\_**frag\*\*\_\_ments. I also just ignore paragraphs which have any footnote syntax in them, leading to entire paragraphs with decreased opacity:

![An image of one of my published posts, in bionic mode. It shows that the paragraphs which feature footnotes or sidenotes are fully greyed out and do not feature any bold content.](../images/bionic-deficiency.png 'Corner case to fix: paragraphs which contain footnote syntax are completely ignored during the bionification process')

More delicate filtering of the MDAST would be needed to fix this.

The greyscale filter does its job, but some of the original colours lead to greytones with low contrast. This is especially an issue for code blocks and should be fixed by using explicit grey tones with high readability for syntax highlighting for this reading mode.

Lastly, changing factors like font type and size, spacing, and line height could increase the effectiveness of the reading mode.

## Conclusion

The accessibility concerns indicate why it would be a bad idea to fully replace normal reading modes with my implementation. Being an optional and experimental reading mode, however, I had a lot of fun implementing it and learned a lot on the way.

Any thoughts? [Let me know:)](/contact/)

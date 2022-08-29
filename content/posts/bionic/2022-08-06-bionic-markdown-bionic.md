---
title: Implementing faster reading with bionic Markdown
bionic: true
---

_**B**e **mor**e **producti**ve! **Onl**y **rea**d **usef**ul **stu**ff! **Rea**d **fast**er!_

If you're in the same YouTube productivity guru bubble as I used to be, you might have come across such advice. This article is not about whether I agree with it or not. [^ {-} In fact, I do not agree with that kind of generalised advice.] But I got interested. How _**ca**n_ **w**e **rea**d **fast**er?

**On**e **approa**ch **t**o **fast**er **readi**ng **tha**t **wa**s [**trendi**ng **o**n **HackerNe**ws](https://news.ycombinator.com/item?id=30787290) a **whi**le **ag**o **i**s **t**o **highlig**ht **th**e **beginni**ng **o**f **eve**ry **wor**d. **Thi**s **approa**ch **i**s **call**ed [**Bion**ic **Readi**ng®](https://bionic-reading.com/). **I**t **featur**es **vario**us **customisati**ons, **bu**t **fo**r **thi**s **artic**le, I'**l**l **onl**y **foc**us **o**n **th**e **bas**ic **conce**pt. **I**t **clai**ms **t**o **enab**le **fas**t **readi**ng **du**e **t**o **you**r **bra**in **onl**y **needi**ng a **certa**in **fracti**on **o**f a **wor**d **t**o **recogni**se **i**t.

![Comparing normal and bionic reading modes](../images/bionic-reading.png 'Comparing normal and bionic reading modes')
[^{-} Image source: bionic-reading.com]

I **was**n't **eve**n **interest**ed **i**n **wheth**er **thi**s **readi**ng **mod**e **work**ed **wel**l **fo**r **m**e **o**r **no**t. **Wha**t **rath**er **caug**ht **m**y **ey**e **wa**s **th**e **questi**on **o**f **ho**w I **cou**ld **impleme**nt **i**t **fo**r **m**y **websi**te. **Wou**ld **i**t **b**e a **usef**ul **additi**on? **Probab**ly **no**t. **Wou**ld I **lea**rn a **litt**le **bi**t **abo**ut **we**b **developme**nt **o**n **th**e **wa**y? **Potential**ly. **Thi**s **artic**le **describ**es **th**e **proce**ss I **wen**t **throu**gh **t**o **arri**ve **a**t **a**n **experiment**al (**ye**t **pret**ty **muc**h **worki**ng) **implementat**ion.

```toc
from-heading: 2
to-heading: 6
```

## **Conceptu**al **wor**k

I **start**ed **investigat**ing. A **fe**w **momen**ts **i**n, I **cam**e **acro**ss **th**e [**offici**al **AP**I](https://rapidapi.com/bionic-reading-bionic-reading-default/api/bionic-reading1/). Quickly, I realised that using the API was not an option for me for two reasons. Firstly, the API endpoint wasn't flexible enough. I needed to customise the behaviour of which text elements get bionificied [^{-} For ease of writing, let's call the process of converting text to bionic text "to bionicify". Perhaps I should've chosen "bionify" as it doesn't sound as silly when said out loud, but alas...], and which elements stay the same (for example, for code blocks I prefer non-bionic content). Secondly, I couldn't afford to pay for the API pro subscription. Sure, I could've set up a script which guaranteed to never surpass the freemium request limit by only making requests for changed and relevant files and creating a queue if the number of those files surpasses the limit...but where would've been the fun in that?

**O**k, a **cust**om **implementat**ion **i**t **wa**s **the**n. **Looki**ng **a**t **th**e **structu**re **o**f **m**y **websi**te, I **was**n't **entire**ly **sur**e **whe**re **t**o **beg**in. **Al**l **o**f **m**y **writin**gs **o**n **thi**s **websi**te **ar**e **stor**ed **i**n **Markdo**wn **fil**es. I **us**e a **stat**ic **sit**e **generat**or **t**o **conve**rt **Markdo**wn **fil**es **t**o **HTM**L. **Th**e **generat**or **itse**lf **i**s **equipp**ed **wit**h a **tailor**ed **Markdo**wn **pars**er **whi**ch **suppor**ts **customis**ed **synt**ax **suc**h **a**s **Pand**oc-**sty**le **inli**ne **footnot**es **an**d **marginal**ia. **Simil**ar **t**o **th**e **AP**I, **shou**ld I **bionici**fy **th**e **Markdo**wn **conte**nt **an**d **genera**te **HTM**L **a**s **outp**ut, **essential**ly **customisi**ng **th**e **Markdo**wn **pars**er? **O**r **Markdo**wn **a**s **outp**ut? **O**r **shou**ld I **rath**er **bionici**fy **th**e **alrea**dy **generat**ed **HTM**L?

I chose to go with the option of bionicifying the Markdown files themselves, with Markdown as output. To me, this approach seemed the most sustainable as Markdown is a less cluttered (yet less expressive) markup language in comparison to HTML. This means that extracting relevant text and creating desired output is a bit simplified.[^ Turns out that extracting relevant text is achieved in a very similar way, but I did not know that at this point. Still, creating the output file is a bit simplified.] It was also motivated by the fact that highlighting word parts in Markdown is supported by default and doesn't require additional syntax: the highlighted part can be \***\*bol**d\*\* **usi**ng **th**e `**` **o**r `__` syntax, the rest normal. [^{-} Fine, the latter argument is opinionated and probably doesn't hold at all: in HTML we can just use the _**stro**ng_ **ta**g. I **cou**ld'**v**e **spe**nt **mor**e **tim**e **evaluati**ng **wheth**er **m**y **approa**ch **wa**s **th**e **mos**t **sensib**le **bu**t I **jus**t **want**ed **t**o **ge**t **dow**n **t**o **hacki**ng **togeth**er a **soluti**on, I'**l**l **adm**it **i**t.] **No**w I **kne**w **tha**t **m**y **implementat**ion **shou**ld **produ**ce **somethi**ng **lik**e **thi**s:

```js
// Normal Markdown as input
const md = 'Soll ich nach Berlin oder München ziehen?'

// Bionicified Markdown as output
const bmd = bionicifyMarkdown(md)
console.log(bmd)
```

**Yieldi**ng:

    **Sol**l **ic**h **nac**h **Berl**in **ode**r **Münch**en **zieh**en?

## **Implementat**ion

**Fo**r a **simp**le **conversi**on **lik**e **thi**s, [**tex**t-**vid**e](https://github.com/Gumball12/text-vide) **alrea**dy **exis**ts. **Howev**er, **tha**t **packa**ge **doe**s **no**t **accou**nt **fo**r **an**y **synt**ax **tha**t **nee**ds **t**o **b**e **preserv**ed. **I**t **tur**ns **footno**te **synt**ax **suc**h **a**s `[^fn_label]` **int**o `[^__fn_l__abel]`, **somethi**ng **m**y **cust**om **Markdo**wn **pars**er **fro**m **m**y **websi**te **generat**or **di**d **no**t **lik**e **a**t **al**l.

A **mor**e **sophistica**ted **soluti**on **wa**s **need**ed. **M**y **implementat**ion **need**ed **t**o **b**e **abl**e **t**o **syntactica**lly **differenti**ate **betwe**en **Markdo**wn **elemen**ts. **I**t **need**ed **t**o **kno**w **whi**ch **tex**t **bit**s **i**t **wa**s **allow**ed **t**o **bionici**fy, **an**d **whi**ch **tex**t **bit**s **i**t **shou**ld **lea**ve **untouch**ed. **B**e **abl**e **t**o **differenti**ate **betwe**en **differe**nt **Markdo**wn **elemen**ts **usi**ng **the**ir **synt**ax? **Thi**s **ran**g a **bel**l. **Synt**ax **synt**ax **synt**ax (_**echoi**ng_)... **Abstra**ct **synt**ax **tre**e!

**A**n **abstra**ct **synt**ax **tre**e (**sho**rt: **AS**T) **i**s a [**tre**e **representat**ion](<https://en.wikipedia.org/wiki/Tree_(data_structure)>) **o**f **th**e **syntact**ic **structu**re **o**f **tex**t. **The**re **ar**e **vario**us **AS**T **parse**rs **customis**ed **towar**ds **differe**nt **tex**t **typ**es: **tex**t **expressi**ng **programmi**ng **languag**es, **natur**al **languag**es, **an**d **als**o **mark**up **languag**es **suc**h **a**s **HTM**L **an**d **Markdo**wn. **A**n **AS**T **representi**ng a **Markdo**wn **synt**ax **structu**re **i**s **call**ed **MDA**ST.

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

**T**o **par**se **Markdo**wn **int**o **a**n **MDA**ST **lik**e **abo**ve, I **did**n't **hav**e **t**o **r**e-**inve**nt **th**e **whe**el. **The**re **ar**e **alrea**dy **lot**s **o**f **packag**es **ou**t **the**re **t**o **sol**ve **tha**t **probl**em, **an**d **eve**n **thou**gh **i**t **wou**ld'**v**e **bee**n a **nic**e **challen**ge **t**o **tes**t **m**y _**Introducti**on **t**o **Algorith**ms **an**d **Dat**a **Structur**es_ **knowled**ge...**tha**t's a **tas**k **fo**r a **differe**nt **tim**e. **Som**e **resear**ch **mad**e **m**e **awa**re **o**f [**unifi**ed](https://github.com/unifiedjs), a **sui**te **o**f **too**ls **design**ed **t**o **wor**k **wit**h **AST**s. **The**y **enab**le _**parsi**ng_ **tex**t **int**o **a**n **AS**T, _**transformi**ng_ **th**e **AS**T, **an**d **eventual**ly _**serialisi**ng_ **i**t **t**o **obta**in **th**e **chang**ed **tex**t. **Too**ls **tailor**ed **towar**ds **Markdo**wn **an**d **MDAS**Ts **ar**e **availab**le **und**er **th**e **nam**e [**rema**rk](https://github.com/remarkjs) **an**d **ar**e **th**e **releva**nt **subs**et **o**f _**unifi**ed_ **fo**r **thi**s **proje**ct.

**T**o **obta**in **a**n **MDA**ST **fro**m **Markdo**wn, I **us**e [**rema**rk-**par**se](https://github.com/remarkjs/remark/tree/main/packages/remark-parse):

```js
const mdast = unified().use(remarkParse).parse(md)
```

I'**l**l **kee**p **furth**er **implementat**ion **detai**ls **bri**ef, **whoev**er **i**s **interest**ed **ca**n **di**g **int**o **th**e **cod**e **o**n [**GitH**ub](https://github.com/ericjanto/bionic-markdown). I **develop**ed a **cust**om **plug**in **fo**r **th**e _**unifi**ed_ **process**or **whi**ch **visi**ts **MDA**ST **nod**es **whi**ch **conta**in **tex**t, **an**d **chang**es **tha**t **tex**t **vi**a _**tex**t-**vid**e_. I **furth**er **defin**ed a **synt**ax **dictiona**ry **whi**ch **specifi**es **elemen**ts **whi**ch **shou**ld **no**t **b**e **bionicifi**ed:

```js
const invalid_element_indicators = {
  table_1: '| -',
  table_2: '|-',
  math: '$',
  footnote: '[^',
}
```

**Alo**ng **wit**h a **simp**le **help**er **functi**on:

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

**An**y **elemen**ts **containi**ng **th**e **indicato**rs **wil**l **no**t **b**e **bionicifi**ed. **Thi**s **i**s a **cru**de **soluti**on **a**s **i**t **ca**n **lea**d **t**o **lar**ge **par**ts **o**f **tex**t **no**t **bei**ng **bionicifi**ed **a**t **al**l, **bu**t **thi**s **soluti**on **i**s **sufficie**nt **fo**r **reachi**ng **a**n **experiment**al **sta**ge **o**f **thi**s **readi**ng **mod**e. **Mor**e **o**n **thi**s **lat**er.

I **clean**ed **everythi**ng **u**p **an**d **publish**ed **i**t **a**s **a**n **np**m **packa**ge.

## **Websi**te **integrati**on

After adding the package to my website, I started integrating it.
[^{-} Quite satisfying to be able to run _**yar**n **ad**d **bion**ic-**markdo**wn_ **an**d **t**o **kno**w **tha**t I **wro**te **eve**ry **sing**le **lin**e **o**f **cod**e **i**n **tha**t **packa**ge **myse**lf.] **First**ly, I **se**t **u**p a **utili**ty **scri**pt **whi**ch **bionicifi**ed **al**l **m**y **pos**ts **s**o **tha**t **th**e `posts` **directo**ry **wou**ld **b**e **structur**ed **lik**e **thi**s:

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

**Th**e **scri**pt **tak**es a **fil**e **nam**e **a**s **inp**ut **an**d **writ**es **th**e **bionicifi**ed **versi**on **t**o **th**e **outp**ut **directo**ry, `bionic` **i**n **thi**s **cas**e.

## **Interlu**de: **deali**ng **wit**h **frontmatt**er

At this point, I realised I had missed out on an essential corner case: dealing with Markdown frontmatter. [^{-} Markdown frontmatter is an established way of defining metadata for the file using YAML, e.g. a post's desired URL, title, and date.] My current setup would bionicify the frontmatter field titles and their values – which was not desired.

I **ha**d **t**o **achie**ve **tw**o **thin**gs: **fir**st **o**f **al**l, **t**o **no**t **bionifi**cy **th**e **frontmatt**er **par**t **o**f **th**e **Markdo**wn **fil**e **a**t **al**l. **Second**ly, **t**o **remo**ve, **ad**d **o**r **chan**ge **som**e **o**f **th**e **frontmatt**er **fiel**ds. I **want**ed **t**o **kee**p **som**e **fiel**ds, **suc**h **a**s **th**e **pos**t **tit**le, **an**d **dele**te **othe**rs, **suc**h **a**s **th**e **desir**ed **UR**L.

**Th**e **fir**st **challen**ge **wa**s **eas**y **t**o **sol**ve. _**Rema**rk_ **ha**s a **modu**le **whi**ch **recognis**es **an**d **pars**es **frontmatt**er: [**rema**rk-**frontmatt**er](https://github.com/remarkjs/remark-frontmatter). **Thi**s **cou**ld **easi**ly **b**e **integrat**ed **duri**ng **th**e **parsi**ng **proce**ss:

```js
const mdast = unified().use(remarkParse).use(remarkFrontmatter).parse(md)
```

**T**o **tes**t **thi**s, I **chang**ed **th**e **tes**t **fil**e **t**o **inclu**de a `title` **frontmatt**er **fie**ld.

```md
---
title: Berlin oder München? Eine schwierige Entscheidung
---

Soll ich nach Berlin oder München ziehen?

> Ich habe keine Ahnung!
```

**Usi**ng _**rema**rk-**frontmatt**er_, **th**e **followi**ng **nod**e **wa**s **add**ed **t**o **th**e **MDA**ST:

```json
{
  "type": "yaml",
  "value": "title: Berlin oder München? Eine schwierige Entscheidung"
}
```

**O**k, **s**o **no**w **th**e **frontmatt**er **wa**s **recognis**ed **a**s a **syntactica**lly **differe**nt **eleme**nt, **whi**ch **mea**nt **tha**t I **cou**ld **igno**re **o**r **acce**ss **i**t **whe**n **bionicifyi**ng **th**e **fil**e.

**Movi**ng **o**n **t**o **th**e **seco**nd **challen**ge, I **wro**te a **furth**er **packa**ge, [**markdo**wn-**frontmatt**er-**process**or](https://github.com/ericjanto/markdown-frontmatter-processor) **whi**ch **allow**ed **fo**r **easi**ly **alteri**ng **th**e **frontmatt**er:

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

**Th**e **abo**ve **cod**e **snipp**et **yiel**ds

```md
---
field: new example value
new_field: a new field!
---

Markdown content
```

## **Websi**te **integrati**on (**continu**ed)

**Havi**ng **sort**ed **th**e **frontmatt**er **probl**em, I **continu**ed **wit**h **th**e **integrati**on **tas**k. **T**o **b**e **abl**e **t**o **que**ry **bion**ic **fie**ls **easi**ly **usi**ng **graph**ql, I **add**ed a `bionic: true` **frontmatt**er **fie**ld **t**o **the**m, **usi**ng **th**e **packa**ge I **creat**ed **i**n **th**e **ste**p **befo**re. **The**n, **t**o **que**ry:

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

**Not**e **ho**w **th**e **pars**ed **HTM**L **wa**s **availab**le **a**t **thi**s **poi**nt, **than**ks **t**o **th**e **stat**ic **sit**e **generat**or. I **pass**ed **th**e **bionicifi**ed **HTM**L **t**o **th**e **correspond**ing **pos**t **a**s **conte**xt **paramet**er **b**y **matchi**ng **th**e **tit**le:

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

**The**n, I **creat**ed a **consta**nt **holdi**ng **th**e **readi**ng **mod**e **sta**te **usi**ng **th**e **rea**ct **hoo**k `useState`. **I**t **get**s **updat**ed **whe**n a **defin**ed **shortc**ut **i**s **use**d, **enabl**ed **b**y [**rea**ct-**hotke**ys](https://github.com/greena13/react-hotkeys):

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

**Thi**s **set**up **allo**ws **fo**r **easi**ly **addi**ng **ne**w **shortcu**ts **an**d **readi**ng **mod**es, **a**s I **di**d **fo**r **m**y [**fuz**zy **readi**ng **mod**e](https://www.ericjanto.com/reverse-engineering-fuzzy-mode/).

**Last**ly, **showi**ng **norm**al **o**r **bionicifi**ed **conte**nt **wa**s **don**e **b**y a **condition**al **attribu**te **assignme**nt:

```js
<div
  dangerouslySetInnerHTML={
    readingModesState.bionic ? { __html: bionicHTML } : { __html: post.html }
  }
/>
```

**Al**l **o**f **th**e **abo**ve **wa**s **enou**gh **t**o **rea**ch **m**y **minim**um **goa**l: I **cou**ld **sho**w **bionifici**ed **conte**nt **o**n **m**y **websi**te. **Howev**er, **the**re **wer**e a **fe**w **bit**s I **want**ed **t**o **impro**ve.

## **Automati**ng **wit**h **pr**e-**comm**it

**T**o **bionici**fy **th**e **fil**es, I **cou**ld **jus**t **ru**n `node bionicify.js [file-name.md]` **whenev**er a **ne**w **artic**le **need**ed **t**o **b**e **bionicifi**ed. **Howev**er, **chanc**es **wer**e **bi**g **tha**t I **wou**ld **forg**et **abo**ut **i**t **a**t **som**e **poi**nt **whi**ch **wou**ld **lea**d **t**o **a**n **inconsisten**tly **availab**le **readi**ng **mod**e **experien**ce.

**S**o I **automat**ed **th**e **proce**ss **b**y **usi**ng [**pr**e-**comm**it](https://pre-commit.com/) **an**d **adjusti**ng **th**e `package.json` **fil**e **correspondin**gly:

```json
"scripts": {
  "bionicify": "node bionicify.js"
},
"pre-commit": [
  "bionicify",
],
```

I **als**o **want**ed **th**e **scri**pt **t**o **onl**y **ru**n **o**n **chang**ed **o**r **add**ed **pos**ts. **S**o I **modifi**ed **m**y `bionicify.js` **utili**ty **scri**pt **t**o **no**t **tak**e a **filena**me **a**s **inp**ut **bu**t **automatica**lly **dete**ct **chang**es **no**t **stag**ed **fo**r **gi**t **commi**ts, **filteri**ng **fo**r **th**e **pos**t **directo**ry.

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

**The**n, I **se**t **u**p **th**e **scri**pt **t**o **bionici**fy **al**l **fil**es **specifi**ed **b**y **tha**t **help**er **functi**on.

## **Stylisi**ng

I **notic**ed **tha**t **simp**ly **usi**ng **bol**d **an**d **norm**al **tex**t **wou**ld **no**t **suffi**ce **t**o **enab**le a **simil**ar **readi**ng **experien**ce **t**o **Bion**ic **Readi**ng®. **Thi**s **i**s **becau**se **o**f **m**y **choi**ce **o**f **fon**t **an**d **colou**rs **fo**r **thi**s **websi**te, **especial**ly **i**n **rega**rd **t**o **th**e **defau**lt **dar**k **mod**e. **Se**e **yourse**lf:

> \***\*Hu**m\***\*a**n–\***\*comp**ut\***\*e**r \***\*interac**ti\***\*o**n (\***\*H**C**I) **i**s \*\***rese**ar\*\***c**h **i**n \*\***t**h**e \***\*des**i\***\*g**n \***\*a**n**d \*\***t**h**e \***\*u**s**e **o**f \*\***comp**ut\*\***e**r \*\***techno**lo\*\***g**y, \*\***wh**i\*\***c**h \*\***foc**us\*\***e**s **o**n \*\***t**h**e \***\*interf**ac\***\*e**s \***\*bet**we\***\*e**n \***\*peo**p\***\*l**e (\***\*us**e\***\*r**s) \***\*a**n**d \*\***compu**te\*\***r**s. \*\***H**C**I \***\*researc**he\***\*r**s \***\*obs**er\***\*v**e \***\*t**h**e \*\***wa**y**s \***\*hum**a\***\*n**s \***\*inte**ra\***\*c**t \***\*wi**t**h \*\***compu**te\*\***r**s \*\***a**n**d \***\*des**i\***\*g**n \***\*technolo**gi\***\*e**s \***\*th**a**t \*\***al**l\*\***o**w \*\***hum**a\*\***n**s **t**o \*\***inte**ra\*\***c**t \*\***wi**t**h \***\*compu**te\***\*r**s **i**n \***\*no**v\***\*e**l \***\*wa**y\*\*s.

**Th**e **mai**n **iss**ue, I **fou**nd, **wa**s **tha**t **th**e **contra**st **betwe**en **bol**d **an**d **norm**al **tex**t **wa**s **no**t **bi**g **enou**gh. **S**o I **decreas**ed **th**e **opaci**ty **o**f **norm**al **tex**t:

![Image showing decreased opacity of normal text in contrast to the bionicified bold text. The bold text clearly stands more out.](../images/bionic-excerpt.jpg 'Decreased opacity for normal text parts increase contrast to bionicified content')

I **als**o **discover**ed **tha**t **an**y **colour**ed **elemen**ts (**suc**h **a**s [**lin**ks](ericjanto.com) **o**r **cod**e **synt**ax **highlighti**ng, **et**c.) **wer**e **to**o **distracti**ng **fo**r **th**e **bion**ic **readi**ng **experien**ce. A **qui**ck-**an**d-**dir**ty **bi**t **o**f **CS**S **di**d **th**e **jo**b:

```css
.bionic {
  filter: grayscale(100%);
}
```

## **Concer**ns **an**d **cavea**ts

**M**y **implementat**ion **i**s **mor**e **a**n **experime**nt **an**d **fa**r **fro**m **bei**ng a **mod**el **examp**le. **A**s **suc**h, **i**t **com**es **wit**h **it**s **irk**s **an**d **quir**ks.

**Mos**t **concerni**ng **i**s **th**e **accessibil**ity **o**f **thi**s **readi**ng **mod**e, **a**t **lea**st **ho**w I **hav**e **implement**ed **i**t **o**n **m**y **websi**te. **Whi**le **th**e **ide**a **o**f **Bion**ic **Readi**ng® **mig**ht **wel**l **wor**k (**o**r **no**t, I **d**o **no**t **kno**w), **th**e **bol**d **bi**t **o**f a **wor**d **mig**ht **sometim**es **no**t **b**e **enou**gh **t**o **gui**de a **read**er **alo**ng **an**d **the**y **nee**d **t**o **rea**d **th**e **norm**al **tex**t **par**t **a**s **wel**l. **Th**e **decreas**ed **tex**t **opaci**ty **o**f **th**e **res**t **o**f **th**e **wor**d **mig**ht **cau**se **issu**es **fo**r **peop**le **wh**o **hav**e **impair**ed **eyesig**ht; **thi**s **shou**ld **b**e **investigat**ed **i**f **th**e **readi**ng **mod**e **actual**ly **ha**d **a**n **uprisi**ng **i**n **populari**ty.

I **reali**se **tha**t **th**e **mai**n **functional**ity **o**f **m**y **implementat**ion **i**s **centr**ed **arou**nd _**tex**t-**vid**e_. **I**t **wou**ld'**v**e **bee**n **interesti**ng **t**o **devel**op **suc**h a **packa**ge **o**n **m**y **ow**n. **Howev**er, I **figur**ed **thi**s **was**n't **th**e **mai**n **challen**ge **an**d **wou**ld'**v**e **bee**n **trivi**al (a **simp**le **stri**ng **pars**er **whi**ch **bol**ds **tex**t **dependi**ng **o**n **th**e **wor**d **leng**th). **Thi**s **wou**ld **like**ly **b**e **th**e **fir**st **ste**p **i**f I **eve**r **want**ed **t**o **impro**ve **th**e **quali**ty **o**f **m**y **readi**ng **mod**e **a**s **wor**ds **wit**h **les**s **tha**n **thr**ee **lette**rs **shou**ld **b**e **al**l **bol**d **b**y **defau**lt. **Readi**ng a **highlight**ed **lett**er _o_ **onl**y **i**s **no**t **expressi**ve **enou**gh **fo**r **m**y **bra**in **t**o **differenti**ate **betwe**en **an**y **o**f _**o**r, **o**n, **o**f_.

**The**re **ar**e **sti**ll a **fe**w **corn**er **cas**es **whi**ch I **hav**en't **fix**ed **ye**t, **suc**h **a**s **wha**t **shou**ld **happ**en **wit**h **tex**t **tha**t **i**s **alrea**dy **bol**d **i**n **th**e **origin**al **fil**e. **Thi**s **ca**n **lea**d **t**o **stran**ge **\_\_\*\***fra**g\*\*\_**\_men**ts. I **als**o **jus**t **igno**re **paragrap**hs **whi**ch **hav**e **an**y **footno**te **synt**ax **i**n **the**m, **leadi**ng **t**o **enti**re **paragrap**hs **wit**h **decreas**ed **opaci\*\*ty:

![An image of one of my published posts, in bionic mode. It shows that the paragraphs which feature footnotes or sidenotes are fully greyed out and do not feature any bold content.](../images/bionic-deficiency.png 'Corner case to fix: paragraphs which contain footnote syntax are completely ignored during the bionification process')

**Mor**e **delica**te **filteri**ng **o**f **th**e **MDA**ST **wou**ld **b**e **need**ed **t**o **fi**x **thi**s.

**Th**e **greysca**le **filt**er **doe**s **it**s **jo**b, **bu**t **som**e **o**f **th**e **origin**al **colou**rs **lea**d **t**o **greyton**es **wit**h **lo**w **contra**st. **Thi**s **i**s **especial**ly **a**n **iss**ue **fo**r **cod**e **bloc**ks **an**d **shou**ld **b**e **fix**ed **b**y **usi**ng **explic**it **gre**y **ton**es **wit**h **hig**h **readabili**ty **fo**r **synt**ax **highlighti**ng **fo**r **thi**s **readi**ng **mod**e.

**Last**ly, **changi**ng **facto**rs **lik**e **fon**t **typ**e **an**d **siz**e, **spaci**ng, **an**d **lin**e **heig**ht **cou**ld **increa**se **th**e **effectiven**ess **o**f **th**e **readi**ng **mod**e.

## **Conclusi**on

**Th**e **accessibil**ity **concer**ns **indica**te **wh**y **i**t **wou**ld **b**e a **ba**d **ide**a **t**o **ful**ly **repla**ce **norm**al **readi**ng **mod**es **wit**h **m**y **implementat**ion. **Bei**ng **a**n **option**al **an**d **experiment**al **readi**ng **mod**e, **howev**er, I **ha**d a **lo**t **o**f **fu**n **implementi**ng **i**t **an**d **learn**ed a **lo**t **o**n **th**e **wa**y.

**An**y **though**ts? [**Le**t **m**e **kno**w:)](/contact/)

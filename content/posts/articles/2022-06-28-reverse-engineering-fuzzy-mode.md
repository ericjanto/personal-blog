---
date: 2022-06-28
title: 'Reverse engineering fuzzy mode'
excerpt: 'Focus modes are fun: they allow the reader to filter out noise and to concentrate on chosen content only. This article is about reverse engineering a kind of focus mode which blurs out text, makes it fuzzy.'
template: post
slug: reverse-engineering-fuzzy-mode
tags:
  - 'computer-science'
---

I recently came across [Paco's website](https://paco.me/), which I adore for its simplicity, elegance, and meticulous attention to detail. One of those details is a fuzzy reading mode. Triggered by a shortcut (`alt` on Paco's website), certain website elements get blurred out. [^mn_paco] Only the element we let our mouse pointer hover over will be visible.

[^mn_paco]: {-} Try the feature on my website using 'ctrl+z'.

My very next thought was "wow, I need this on my website". So I started reverse engineering the feature.[^{-} I call it _reverse engineering_, some people might call it _getting inspiration_, yet other people will plainly call it _stealing_ ¯ct°_o)/¯] There are two challenges to overcome: firstly, figuring out how to blur out text elements and only show ones we hover over. Secondly, activate and de-activate fuzzy mode by using a customised shortcut.

Blurring out text elements can be done using CSS. I had this suspicion already when I saw that hovering unblurred elements. A simple `:hover` selector would be the perfect thing to use to this end. I opened the developer tools to inspect the styling of the website and saw my suspicions confirmed:

```css
.alt :where(p, pre, li, img, div, blockquote) {
  opacity: 0.6;
  filter: blur(2px);
}

.alt :where(p, pre, li, img, div, blockquote):hover {
  opacity: 1;
  filter: none;
}
```

These few lines select the elements in `:where()` within an HTML element of class `.alt` and apply the specified styling properties. So far so easy.

Triggering the reading mode with a shortcut was slightly more challenging. The goal is to add the `.alt` class to an element which is a parent element to all the elements we want to potentially blur out and include in the `:where()` selector. I chose to use the react library `react-hotkeys` for this purpose. Here is an excerpt[^ To be precise, not all of this code is within the same file anymore as I separated the use cases.] from my `post.js` template which is used to generate all writings pages on this website: [^{-} Please note that my JavaScript and react skills are still very undeveloped, I've never officially learned how to use either of those.]

```js
const keyMap = 'alt'
const [fuzzy, setFuzzy] = useState(false)
const readingModes = {
    FUZZY: fuzzy
}
const postHotKeyHandlers = {
    FUZZY: () => setFuzzy((prev) => !prev)
}

...

<GlobalHotKeys keyMap={keyMap} handlers={postHotKeyHandlers}>

...
          <article className={getReadingModeClass(readingModes)}>
...
```

There are a few things to notice here. We want to keep track of whether fuzzy mode is activated or not. We use the react hook `useState()` for this purpose as it allows us to keep track of the value of `fuzzy` even when it's already passed to an element's class name in the render function later on. Furthermore, I implemented it in a way that it'll be an easy task to add additional reading modes (hence the dictionary structure and not a simple boolean variable). `getReadingModeClass()` is a simple helper function which returns an appropriate class string.

This was a fun way of spending an hour of my free time after work! And to repeat, full credits to [Paco](https://paco.me/) for this fantastic idea and the CSS.

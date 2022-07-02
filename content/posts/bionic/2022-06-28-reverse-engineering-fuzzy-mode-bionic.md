---
title: Reverse engineering fuzzy mode
bionic: true
---

I **recent**ly **cam**e **acro**ss [**Pac**o's **websi**te](https://paco.me/), **whi**ch I **ado**re **fo**r **it**s **simplici**ty, **elegan**ce, **an**d **meticulo**us **attenti**on **t**o **deta**il. **On**e **o**f **tho**se **detai**ls **i**s a **fuz**zy **readi**ng **mod**e. **Trigger**ed **b**y a **shortc**ut (`alt` on Paco's website), certain website elements get blurred out. [^mn_paco] Only the element we let our mouse pointer hover over will be visible.

[^mn_paco]: {-} Try the feature on my website using 'ctrl+f'.

My very next thought was "wow, I need this on my website". So I started reverse engineering the feature.[^{-} I call it _**rever**se **engineeri**ng_, **som**e **peop**le **mig**ht **cal**l **i**t _**getti**ng **inspirati**on_, **ye**t **oth**er **peop**le **wil**l **plain**ly **cal**l **i**t _**steali**ng_ ¯**c**t°_o)/¯] **The**re **ar**e **tw**o **challeng**es **t**o **overco**me: **first**ly, **figuri**ng **ou**t **ho**w **t**o **blu**r **ou**t **tex**t **elemen**ts **an**d **onl**y **sho**w **one**s **w**e **hov**er **ove**r. **Second**ly, **activa**te **an**d **d**e-**activa**te **fuz**zy **mod**e **b**y **usi**ng a **customis**ed **shortc**ut.

**Blurri**ng **ou**t **tex**t **elemen**ts **ca**n **b**e **don**e **usi**ng **CS**S. I **ha**d **thi**s **suspici**on **alrea**dy **whe**n I **sa**w **tha**t **hoveri**ng **unblurr**ed **elemen**ts. A **simp**le `:hover` **select**or **wou**ld **b**e **th**e **perfe**ct **thi**ng **t**o **us**e **t**o **thi**s **en**d. I **open**ed **th**e **develop**er **too**ls **t**o **inspe**ct **th**e **styli**ng **o**f **th**e **websi**te **an**d **sa**w **m**y **suspicio**ns **confirm**ed:

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

**The**se **fe**w **lin**es **sele**ct **th**e **elemen**ts **i**n `:where()` **with**in **a**n **HTM**L **eleme**nt **o**f **cla**ss `.alt` **an**d **app**ly **th**e **specifi**ed **styli**ng **properti**es. **S**o **fa**r **s**o **eas**y.

**Triggeri**ng **th**e **readi**ng **mod**e **wit**h a **shortc**ut **wa**s **slight**ly **mor**e **challengi**ng. **Th**e **goa**l **i**s **t**o **ad**d **th**e `.alt` **cla**ss **t**o **a**n **eleme**nt **whi**ch **i**s a **pare**nt **eleme**nt **t**o **al**l **th**e **elemen**ts **w**e **wan**t **t**o **potential**ly **blu**r **ou**t **an**d **inclu**de **i**n **th**e `:where()` **select**or. I **cho**se **t**o **us**e **th**e **rea**ct **libra**ry `react-hotkeys` for this purpose. Here is an excerpt[^ To be precise, not all of this code is within the same file anymore as I separated the use cases.] from my `post.js` template which is used to generate all writings pages on this website: [^{-} Please note that my JavaScript and react skills are still very undeveloped, I've never officially learned how to use either of those.]

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

**The**re **ar**e a **fe**w **thin**gs **t**o **noti**ce **her**e. **W**e **wan**t **t**o **kee**p **tra**ck **o**f **wheth**er **fuz**zy **mod**e **i**s **activat**ed **o**r **no**t. **W**e **us**e **th**e **rea**ct **hoo**k `useState()` **fo**r **thi**s **purpo**se **a**s **i**t **allo**ws **u**s **t**o **kee**p **tra**ck **o**f **th**e **val**ue **o**f `fuzzy` **eve**n **whe**n **i**t's **alrea**dy **pass**ed **t**o **a**n **eleme**nt's **cla**ss **nam**e **i**n **th**e **rend**er **functi**on **lat**er **o**n. **Furthermo**re, I **implement**ed **i**t **i**n a **wa**y **tha**t **i**t'**l**l **b**e **a**n **eas**y **tas**k **t**o **ad**d **addition**al **readi**ng **mod**es (**hen**ce **th**e **dictiona**ry **structu**re **an**d **no**t a **simp**le **boole**an **variab**le). `getReadingModeClass()` **i**s a **simp**le **help**er **functi**on **whi**ch **retur**ns **a**n **appropria**te **cla**ss **stri**ng.

**Thi**s **wa**s a **fu**n **wa**y **o**f **spendi**ng **a**n **hou**r **o**f **m**y **fre**e **tim**e **aft**er **wor**k! **An**d **t**o **repe**at, **ful**l **credi**ts **t**o [**Pac**o](https://paco.me/) **fo**r **thi**s **fantast**ic **ide**a **an**d **th**e **CS**S.

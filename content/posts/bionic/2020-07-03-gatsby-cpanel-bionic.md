---
title: Deploying your Gatsby site to cPanel
bionic: true
---

**Gats**by **i**s a **stat**ic **sit**e **generat**or. **Thi**s **mea**ns, **fo**r **instan**ce, **tha**t **yo**u **ca**n **wri**te **som**e **par**ts **o**f **you**r **websi**te **usi**ng **Markdo**wn. **Gats**by **the**n **transfor**ms **i**t, **usi**ng **som**e **fan**cy **mag**ic, **int**o a **sing**le **HTM**L **fil**e **an**d **som**e **stat**ic **asse**ts. **Th**e **benef**it **i**s **tha**t **almo**st **eve**ry **hosti**ng **platfo**rm **suppor**ts **pla**in **HTM**L **an**d **mor**e **important**ly, **tha**t **Gats**by **sit**es **ar**e **usual**ly **real**ly **fas**t **an**d **secu**re.

**Whe**n I **fir**st **use**d **Gats**by **t**o **bui**ld **thi**s **websi**te, I **wa**s **amaz**ed **abo**ut **ho**w **eas**y **th**e **deployme**nt **wit**h **Netli**fy **wa**s. **Aft**er **th**e **developme**nt **proce**ss, I **go**t **thi**s **who**le **blo**g **onli**ne **with**in a **fe**w **minut**es.

**Howev**er, I **wa**s **forc**ed **t**o **us**e **cPan**el **a**s **hosti**ng **platfo**rm **fo**r a **ne**w **proje**ct. **Whi**le **i**t **i**s **certain**ly **possib**le **t**o **depl**oy **you**r **Gats**by **proje**ct **o**n **cPan**el **with**in a **fe**w **minut**es, I **struggl**ed **ver**y **muc**h **wit**h **i**t, **havi**ng **nev**er **don**e **i**t **befo**re. **Thi**s **artic**le **cove**rs a **simp**le **ste**p-**b**y-**ste**p **explanati**on **o**n **wha**t **exact**ly **t**o **d**o.

#### **Objectiv**es

- **Publi**sh a **Gats**by **sit**e **usi**ng **cPan**el
- **Integra**te a **GitH**ub **rep**o

#### **Wha**t **thi**s **i**s **no**t

- **Set**up **fo**r **continuo**us **deployme**nt
- **Set**up **o**f a **doma**in **wit**h **cPan**el

I **tri**ed **t**o **se**t **u**p **continu**os **deployme**nt **syst**em **whi**ch [**shou**ld **b**e **possib**le](https://blog.cpanel.com/git-version-control-soon-with-automatic-deployment/). I **tri**ed **i**t **fo**r a **fe**w **hou**rs **an**d **gav**e **u**p **aft**er **runni**ng **int**o **to**o **man**y **proble**ms (**plea**se [**conta**ct](/contact/) **m**e **i**f **yo**u **hav**e a **simp**le **ste**p-**b**y-**ste**p **gui**de **an**d **wan**na **hel**p **m**e **ou**t **i**n **tha**t **rega**rd).

## **Witho**ut **Gi**t – **Newb**ie **Versi**on

**I**f **yo**u'**r**e **total**ly **ne**w **t**o **usi**ng **Gi**t **an**d **yo**u **do**n't **wan**t **t**o **spe**nd **som**e **tim**e **learni**ng **th**e **basi**cs **ye**t, **thi**s **wa**y **wor**ks **perfect**ly **fin**e **fo**r **yo**u.

**Th**e **fir**st **thi**ng **t**o **d**o **i**s **t**o **ge**t **Gats**by **t**o **crea**te **th**e **HTM**L **an**d **CS**S **fil**es.
**G**o **int**o **you**r **proje**ct **directo**ry **an**d **ru**n `gatsby build`.

**I**t **shou**ld **loo**k **simil**ar **t**o **thi**s:

```bash
$ gatsby build
success open and validate gatsby-configs - 0.161s
success load plugins - 1.862s
success onPreInit - 0.014s
success delete html and css files from previous builds - 0.027s
success initialize cache - 0.011s
success copy gatsby files - 0.081s
success onPreBootstrap - 0.012s
success createSchemaCustomization - 0.298s
success source and transform nodes - 0.107s
success building schema - 0.375s
success createPages - 0.070s
success createPagesStatefully - 0.083s
success onPreExtractQueries - 0.001s
success update schema - 0.029s
success extract queries from components - 0.392s
success write out requires - 0.008s
success write out redirect data - 0.002s
success Build manifest and related icons - 0.004s
success onPostBootstrap - 0.014s
⠀
info bootstrap finished - 9.492s
⠀
success Building production JavaScript and CSS bundles - 15.705s
success Rewriting compilation hashes - 0.007s
success run queries - 15.870s - 3/3 0.19/s
success Building static HTML for pages - 2.142s - 28/28 13.07/s
success onPostBuild - 0.113s
info Done building in 27.744292266 sec
```

**Thi**s **shou**ld **crea**te a **ne**w `public` **directo**ry **i**n **you**r **proje**ct **directo**ry. **I**n **the**re **i**s **al**l **th**e **cod**e **yo**u **nee**d **t**o **depl**oy **you**r **websi**te.

**The**n **ru**n `gatsby serve` **t**o **che**ck **wheth**er **everythi**ng **i**s **alrig**ht **wit**h **th**e **websi**te.

```bash
$ gatsby serve
⠀
You can now view ericjanto.com in the browser.
⠀
  http://localhost:9000/
```

**O**n **mac**OS, **yo**u **ca**n **termina**te **th**e **ser**ve **proce**ss **b**y **typi**ng `^C` (**contr**ol + c).
**I**f **everythi**ng **loo**ks **alrig**ht, **g**o **t**o **cPan**el **an**d **lo**g **i**n.

**G**o **t**o **th**e **fil**e **manag**er **an**d **loo**k **fo**r **th**e `public_html` **directo**ry. **Usual**ly, **i**t **ha**s **th**e **we**b **ico**n (🌐) **i**n **fro**nt **o**f **th**e **nam**e.

**Dele**te **everythi**ng **i**n **the**re (**i**f **yo**u **do**n't **nee**d **i**t **fo**r **th**e **ne**w **websi**te) **an**d **cli**ck **o**n `Upload`. **Uplo**ad **th**e **enti**re **conte**nt **o**f **th**e `public` **directo**ry (**th**e **on**e **creat**ed **wit**h **th**e `gatsby build` **comma**nd). **Mak**e **sur**e **tha**t **th**e **fil**es **ar**e **direct**ly **i**n **th**e `public_html` **directo**ry, **no**t **i**n a **ne**w **subdirecto**ry.

**Tha**t's **i**t. **I**f **yo**u'**v**e **alrea**dy **link**ed a **doma**in **t**o **you**r **cPan**el **profi**le, **th**e **websi**te **shou**ld **no**w **b**e **onli**ne.

## **Usi**ng **GitH**ub

**Whi**le **th**e **wa**y **describ**ed **abo**ve **wor**ks **perfect**ly **fin**e, **i**t **get**s a **bi**t **tedio**us **t**o **downlo**ad **an**d **uplo**ad **th**e **enti**re `public` **fold**er **eve**ry **tim**e **yo**u **chan**ge **som**e **deta**il **o**n **you**r **websi**te. **A**n **eas**y **workarou**nd **i**s **t**o **us**e a **GitH**ub **reposito**ry.

**Th**e **fir**st **thi**ng **t**o **d**o **i**s **t**o **inclu**de a `.cpanel.yml` **fil**e **i**n **you**r **proje**ct **directo**ry. **Thi**s **fil**e **i**s **basical**ly **a**n **instructi**on **manu**al **fo**r **cPan**el **o**n **ho**w **an**d **whe**re **t**o **depl**oy **th**e **chang**es **yo**u **mak**e **o**r **respective**ly, **whi**ch **fil**es **t**o **igno**re.

**Yo**u **wan**t **you**r `.cpanel.yml` **fil**e **t**o **loo**k **lik**e **thi**s **fo**r **Gats**by **projec**ts:

```yml
---
deployment:
  tasks:
    - export DEPLOYPATH=/home/userName/public_html/
    - /bin/cp -R public/* $DEPLOYPATH
```

**Mak**e **sur**e **t**o **repla**ce `userName` **i**n **th**e **deploypa**th **wit**h **you**r **cPan**el **userna**me.

**Bu**t **wha**t's **goi**ng **o**n **her**e?

1.  **W**e **speci**fy **th**e **pat**h **t**o **th**e **directo**ry **whe**re **cPan**el **whe**re **shou**ld **pu**t **th**e **GitH**ub **reposito**ry **fil**es. **W**e **wan**t **thi**s **t**o **b**e `public_html`.
2.  **W**e **speci**fy **whi**ch **fil**es **t**o **depl**oy. **I**n **ou**r **cas**e, **w**e **onl**y **wan**t **th**e **bui**ld **fil**es, i.e. **fil**es **i**n **th**e `public` **fold**er, **t**o **b**e **deploy**ed. **Thi**s **i**s **wha**t `-R public/*` **i**s **fo**r. **I**t **say**s "**tak**e **al**l **folde**rs **an**d **fil**es **i**n `public`.

**No**w **ru**n `gatsby build` **t**o **crea**te **th**e `public` **fold**er **an**d **pus**h **i**t **t**o **you**r **rep**o. **Yo**u **ca**n **us**e `gatsby serve` **t**o **che**ck **th**e **bui**ld **fil**es.

**Onc**e **yo**u'**v**e **se**t **u**p **you**r **reposito**ry **an**d **everythi**ng **i**s **o**n **GitH**ub, **g**o **t**o **th**e **cPan**el **men**u **an**d **cli**ck **o**n `Git Version Control`. **Cli**ck **o**n `Create` **t**o **crea**te a **ne**w **rep**o **an**d **pas**te **th**e **clo**ne **ur**l **o**f **you**r **GitH**ub **rep**o.

**The**n **choo**se a **pat**h **whe**re **you**r **reposito**ry **shou**ld **b**e **stor**ed. **I**t **doe**sn't **real**ly **matt**er, **yo**u **ca**n **choo**se **an**y **pat**h.
I **cho**se `/home/userName/repositories` **a**s **i**t **mak**es **i**t **easi**er **t**o **fin**d **i**t **shou**ld I **eve**r **nee**d **t**o.

**Choo**se a **rep**o **nam**e **an**d **cli**ck **o**n `Create`. **Mak**e **sur**e **tha**t **you**r `public_html` **fold**er **i**s **emp**ty, **g**o **bac**k **t**o **th**e **Gi**t **contr**ol **pan**el **i**n **cPan**el **an**d **cli**ck **o**n **th**e `Manage` **butt**on **nex**t **t**o **you**r **reposito**ry **nam**e. **The**n **g**o **t**o `Pull or Deploy`, **cli**ck **o**n `Update from Remote` **an**d **the**n `Deploy HEAD Commit`.

**Tha**t **shou**ld **b**e **i**t! **Enj**oy **you**r **websi**te, **generat**ed **wit**h **Gats**by, **deploy**ed **t**o **an**d **host**ed **b**y **cPan**el.

---
title: Understanding lists in Haskell
bionic: true
---

_**Thi**s **artic**le **i**s **direct**ed **a**t **Haske**ll **beginne**rs. **I**f **yo**u'**r**e **alrea**dy **experienc**ed, **yo**u **mig**ht **wan**t **t**o
**che**ck **ou**t **m**y [**oth**er **Haske**ll **articl**es](/tags/haskell)._

## **Wha**t **Exact**ly **Ar**e **Lis**ts?

**I**n **Haske**ll, **lis**ts **ar**e **wide**ly **use**d.
**W**e **hav**e **som**e **fan**cy **wa**y **t**o **defi**ne **exact**ly **wha**t a **lis**t **i**s:

> A **lis**t **i**s a **homogeneo**us **dat**a **structu**re **whi**ch **ca**n **sto**re **multip**le **elemen**ts.

**Phe**w, **soun**ds a **bi**t **overcomplica**ted, **doe**sn't **i**t? **Le**t's **decompo**se **th**e **definiti**on.

- ****Dat**a **structu**re:** A **wa**y **t**o **sto**re **dat**a. **Som**e **dat**a **structur**es **ar**e **goo**d **fo**r **sorti**ng **you**r **dat**a, **oth**er **dat**a **structur**es **mig**ht **b**e **goo**d **fo**r **maki**ng a **lar**ge **amou**nt **o**f **dat**a **a**s **accessib**le **a**s **possib**le.
- ****Sto**re:** A **lis**t **kee**ps, **stor**es, **you**r **dat**a **s**o **tha**t **yo**u **ca**n **d**o **stu**ff **wit**h **i**t **lat**er.
- ****Elemen**ts:** **Tha**t's **jus**t **th**e **dat**a **yo**u **pu**t **int**o **you**r **lis**t. **I**f **yo**u **ha**d a **strawber**ry, a **lem**on, **an**d a **watermel**on **o**n **you**r **groce**ry **lis**t, **the**n **eac**h **o**f **the**m **wou**ld **b**e **precise**ly **on**e **eleme**nt.
- ****Homogeneo**us:** **Al**l **elemen**ts **i**n **th**e **lis**t **hav**e **t**o **b**e **o**f **th**e **sam**e **typ**e, **fo**r **examp**le **onl**y **intege**rs **o**r **onl**y **characte**rs.

### **Synt**ax

**Giv**en **thi**s **definiti**on, **the**re **i**s **on**e **mor**e **thi**ng **w**e **hav**e **t**o **lea**rn **abo**ut **lis**ts: **synt**ax. **Tha**t's **fair**ly **eas**y **an**d **straig**ht **forwa**rd:

1.  **Elemen**ts **ar**e **alwa**ys **insi**de **o**f **squa**re **bracke**ts `[]`
2.  **Al**l **elemen**ts **ar**e **separat**ed **b**y a **com**ma `,`
3.  **W**e **ca**n **assi**gn **th**e **lis**t **t**o a **nam**e **vi**a `=`

```haskell
someList = [2,3]
-- A list, namely "someList", containing 2 elements (2 and 3)
-- inside square brackets.

emptyList = []
-- we can also have lists containing none elements
```

### **Homogeneo**us

**W**e **stat**ed **tha**t **al**l **elemen**ts **hav**e **t**o **b**e **o**f **th**e ****sam**e **typ**e**. **Consid**er **thi**s **examp**le:

```haskell
 -- valid:
someNumbers = [1,2,3,42,42,1]

-- not valid, the compiler will shout at you:
invalidList = [1,"sneaky string",5]
```

**I**n **thi**s **cas**e, **w**e **tri**ed **t**o **sto**re **bot**h **intege**rs **an**d a **stri**ng **i**n `invalidList`. **Sin**ce **the**y **ar**e **no**t **o**f **th**e **sam**e **typ**e, **th**e **compil**er **wil**l **compla**in.

### **Lis**ts **Insi**de **Lis**ts (**Insi**de **Lis**ts **Insi**de **Lis**ts...)

**D**o **yo**u **kno**w **tho**se **cree**py [**matryosh**ka **dol**ls](https://en.wikipedia.org/wiki/Matryoshka_doll)? **Qui**te **comparab**le, **lis**ts **ca**n **als**o **conta**in **oth**er **lis**ts:

```haskell
ghci> let a = [[1,2],[2,3,4,5]]
ghci> a
[[1,2],[2,3,4,5]]
```

> ****Not**e:** **Lis**ts **contain**ed **i**n a **lis**t **ca**n **b**e **o**f **differe**nt **lengt**hs **bu**t **hav**e **t**o **conta**in **th**e **sam**e **typ**e **o**f **elemen**ts.

**Lis**ts **ca**n **eve**n **conta**in **functio**ns:

```haskell
ghci> let funlist = [length, sum]
ghci> :t funlist
funlist :: Foldable t => [t Int -> Int]
```

**Th**e **functio**ns **stor**ed **a**s **a**n **eleme**nt **mus**t **hav**e **th**e **sam**e **typ**e **signatu**re, **meani**ng **tha**t **the**y **ar**e **allow**ed **t**o **opera**te **o**n **th**e **sam**e **typ**es.

_(**Do**n't **wor**ry **abo**ut **i**t **ye**t **i**f **yo**u'**r**e **jus**t **starti**ng **an**d **do**n't **ful**ly **understa**nd **th**e **cod**e **abo**ve. **Yo**u **wo**n't **hav**e **t**o **sto**re **functio**ns **i**n a **lis**t **fo**r a **whi**le.)_

**Tha**t's **pret**ty **muc**h **everythi**ng **yo**u **nee**d **t**o **kno**w **abo**ut **lis**ts **t**o **ge**t **start**ed. **Whe**n **w**e **wan**t **t**o **pu**t **tha**t **int**o **practi**ce, **w**e **shou**ld **kno**w **abo**ut **lis**t **operatio**ns **whi**ch **com**e '**bui**lt-**i**n' **wit**h **Haske**ll.
**The**y **com**e **han**dy **whe**n **w**e **wan**t **t**o **manipula**te **lis**ts.

## **Lis**t **Operatio**ns

**Imagi**ne **havi**ng a **lis**t `argumentsWithMyGF` **whi**ch **stor**es **th**e **numb**er **o**f **argumen**ts **yo**u **hav**e **wit**h **you**r **girlfrie**nd **eac**h **da**y. **W**e **ca**n **easi**ly **compu**te **th**e **tot**al **numb**er **o**f **tho**se **argumen**ts **usi**ng `sum` :

```haskell
ghci> let argumentsWithMyGF = [1,4,20,5,1]
ghci> sum argumentsWithMyGF
31
ghci> sum[1,4,20,5,1]
31

-- (Maybe you should break up with your gf)
```

**W**e **wo**n't **g**o **throu**gh **eac**h **lis**t **operati**on **sin**ce **thi**s **woul**dn't **fi**t **th**e **purpo**se **o**f **thi**s **artic**le. **Howev**er, **dow**n **bel**ow **i**s a **tab**le **o**f **th**e **mos**t **comm**on **lis**t **operatio**ns, **bei**ng a **usef**ul **referen**ce **yo**u **ca**n **alwa**ys **com**e **bac**k **t**o. **Cli**ck **o**n **th**e **nam**e **o**f a **functi**on **t**o **ge**t **mor**e **detai**ls **an**d **som**e **exampl**es.

| Function                                                                                 | Purpose                                                                                                        |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [`(++)`](http://zvon.org/other/haskell/Outputprelude/HH_o.html)                          | **Concatenat**ion **operat**or, **concatenat**es **tw**o **lis**ts **t**o a **sing**le **lis**t                |
| [`(:)`](http://zvon.org/other/haskell/Outputprelude/C_o.html)                            | **Con**s **Operat**or, **construct**or, **add**s **a**n **eleme**nt **t**o **th**e **sta**rt **o**f a **lis**t |
| [`(!!)`](https://hackage.haskell.org/package/base-4.14.0.0/docs/Prelude.html#v:-33--33-) | **Indexi**ng **Operat**or, **allo**ws **t**o **acce**ss **th**e **nt**h **eleme**nt **fro**m **lis**t          |
| [`<` `>` `<=` `>=`](http://learnyouahaskell.com/starting-out)                            | **Comparis**on **i**n **lexicographi**cal **ord**er                                                            |
| [`head`](http://zvon.org/other/haskell/Outputprelude/head_f.html)                        | **Ge**t **fir**st **eleme**nt **fro**m a **lis**t                                                              |
| [`init`](http://zvon.org/other/haskell/Outputprelude/init_f.html)                        | **Ge**t **lis**t **witho**ut **las**t **eleme**nt                                                              |
| [`last`](http://zvon.org/other/haskell/Outputprelude/last_f.html)                        | **Ge**t **las**t **eleme**nt **fro**m a **lis**t                                                               |
| [`tail`](http://zvon.org/other/haskell/Outputprelude/tail_f.html)                        | **Ge**t **lis**t **witho**ut **th**e **fir**st **eleme**nt                                                     |
| [`length`](http://zvon.org/other/haskell/Outputprelude/length_f.html)                    | **Ge**t **numb**er **o**f **elemen**ts **i**n **lis**t                                                         |
| [`null`](http://zvon.org/other/haskell/Outputprelude/null_f.html)                        | **Chec**ks **i**f **lis**t **i**s **emp**ty                                                                    |
| [`reverse`](http://zvon.org/other/haskell/Outputprelude/reverse_f.html)                  | **Revers**es **lis**t                                                                                          |
| [`take`](http://zvon.org/other/haskell/Outputprelude/take_f.html)                        | **Tak**e `n` **fir**st **elemen**ts **o**f **lis**t                                                            |
| [`drop`](http://zvon.org/other/haskell/Outputprelude/drop_f.html)                        | **Dro**p **fir**st `n` **elemen**ts **o**f **lis**t                                                            |
| [`maximum`](http://zvon.org/other/haskell/Outputprelude/maximum_f.html)                  | **Ge**t **maxim**um **val**ue **fro**m **lis**t                                                                |
| [`minimum`](http://zvon.org/other/haskell/Outputprelude/minimum_f.html)                  | **Ge**t **minim**um **val**ue **fro**m **lis**t                                                                |
| [`sum`](http://zvon.org/other/haskell/Outputprelude/sum_f.html)                          | **Ge**t **tot**al **su**m **o**f **lis**t **elemen**ts                                                         |
| [`product`](http://zvon.org/other/haskell/Outputprelude/product_f.html)                  | **Ge**t **produ**ct **o**f **lis**t **elemen**ts                                                               |
| [`elem`](http://zvon.org/other/haskell/Outputprelude/elem_f.html)                        | **Determi**ne **i**f **lis**t **contai**ns **a**n **ite**m **equ**al **t**o **pass**ed **argume**nt            |

A **fe**w **thin**gs **t**o **not**e:

- **Th**e **concatenat**ion **operat**or `++` **tak**es ****tw**o **lis**ts** **containi**ng **elemen**ts **o**f **th**e **sam**e **typ**e.
- **Th**e **con**s **operat**or `:` **tak**es **a**n ****eleme**nt** **an**d a ****lis**t** **containi**ng **elemen**ts **o**f **th**e **sam**e **typ**e.
- **B**e **caref**ul **no**t **t**o **us**e `head`, `last`, `init`, `tail` **o**n **emp**ty **lis**ts **a**s **i**t **wou**ld **resu**lt **i**n **a**n **err**or.

## **Rang**es

**Rang**es **ar**e a **gre**at **shortha**nd **notati**on **whi**ch **ar**e **use**d **t**o **defi**ne **lis**ts.
**Knowi**ng **an**d **usi**ng **the**m **ca**n **sav**e **yo**u **lot**s **o**f **tim**e.

### **Basi**cs

**Rang**es **ar**e **use**d **t**o **mak**e **lis**ts **compos**ed **o**f **elemen**ts **tha**t **ca**n **b**e _**enumerat**ed_, **meani**ng **tha**t **th**e **elemen**ts **hav**e **som**e **kin**d **o**f **ord**er. **Fo**r **examp**le, **suc**h **elemen**ts **ca**n **b**e **numbe**rs `1,2,3...` **o**r **characte**rs `'a','b','c',...`.

**T**o **lis**t **al**l **numbe**rs **fro**m `1` **t**o `10` **w**e **wou**ld **usual**ly **g**o **lik**e **thi**s: `[1,2,3,4,5,6,7,8,9,10]`. **Lucki**ly, **the**re **i**s a **muc**h **simpl**er **wa**y: `[1..10]` . **The**re **i**s **n**o **semant**ic **differen**ce **betwe**en **tho**se **tw**o **lis**ts:

```haskell
ghci> [1..10] == [1,2,3,4,5,6,7,8,9,10]
True
```

**Mor**e **exampl**es:

```haskell
ghci> [1..10]
[1,2,3,4,5,6,7,8,9,10]
ghci> ['a'..'l']
"abcdefghijkl"
ghci> ['A'..'C']
"ABC"
```

### **Ste**ps

**Ste**ps **ar**e **usef**ul **whe**n **w**e **onl**y **wan**t **eve**ry **thi**rd **eleme**nt. **O**r **eve**ry **fif**th, **o**r ... **yo**u **ge**t **th**e **ide**a. A **ste**p **i**s **basical**ly **a**n **interv**al **i**n **whi**ch **th**e **elemen**ts **wil**l **appe**ar. **Th**e **interv**al **mus**t **alwa**ys **b**e **th**e **sam**e. **The**re **i**s **n**o **wa**y **t**o **hav**e **alternati**ng **ste**ps. **Her**e's **ho**w **t**o **us**e **ste**ps **i**n **Haske**ll:

- **Th**e **fir**st **tw**o **elemen**ts **speci**fy **th**e **ste**p, **th**e **las**t **eleme**nt **th**e **upp**er **lim**it

```haskell
ghci> [2,4..20]
[2,4,6,8,10,12,14,16,18,20]
```

**T**o **cou**nt **dow**n **i**n a **lis**t, **i**t's **no**t **sufficie**nt **t**o **wri**te `[20..1]`.

> **T**o **mak**e a **lis**t **wit**h **al**l **numbe**rs **fro**m 20 **dow**n **t**o 1 **yo**u **hav**e **t**o **typ**e `[20,19..1]` .

### **Infini**te **Lis**ts

**I**t's **als**o **possib**le **t**o **hav**e **infini**te **lis**ts (**cra**zy, **rig**ht?):

- **Whe**n **no**t **defini**ng **a**n **upp**er **lim**it, **th**e **lis**t **wil**l **b**e **infini**te
- **Fo**r **instan**ce `[1..]` **o**r `[1,4..]`
- **Becau**se **Haske**ll **i**s _**laz**y_, **i**t **wil**l **onl**y **evalua**te **a**s **man**y **elemen**ts **a**s **w**e **nee**d **fo**r **ou**r **computatio**ns (**the**re **i**t **i**s, **th**e '**onc**e **i**n a **lifeti**me'-**mome**nt **whe**re **bei**ng **laz**y **i**s **actual**ly **usef**ul)
- **Usef**ul **functio**ns **t**o **wor**k **wit**h **infini**te **lis**ts
  - [**cyc**le](http://zvon.org/other/haskell/Outputprelude/cycle_f.html)
  - [**repe**at](http://zvon.org/other/haskell/Outputprelude/repeat_f.html)
  - [**replica**te](http://zvon.org/other/haskell/Outputprelude/replicate_f.html)
  - [**itera**te](http://zvon.org/other/haskell/Outputprelude/iterate_f.html)

## **Conclusi**on

A **lis**t **i**s a **dat**a **structu**re **an**d **wide**ly **use**d **i**n **Haske**ll. **I**t **ca**n **b**e **emp**ty **o**r **sto**re **sever**al **elemen**ts **o**f **th**e **sam**e **typ**e. **On**e **o**f **th**e **benefi**ts **o**f **usi**ng a **lis**t **i**s **tha**t **the**re **ar**e **man**y **lis**t **operatio**ns **availab**le.

**Tha**t's **pret**ty **muc**h **everythi**ng **yo**u **nee**d **t**o **kno**w **t**o **ge**t **start**ed **wit**h **lis**ts **i**n **Haske**ll. <!-- For a deeper insight into the structure and use of lists check out the first bit of [Understanding Recursion in Haskell](/haskell-recursion). -->

### **Of**f-**Roa**d **Knowled**ge

- `'` **i**s a **val**id **charact**er **fo**r **functi**on **o**r **definiti**on **nam**es. **Howev**er, **i**t's **goo**d **practi**ce **t**o **us**e **i**t **onl**y **t**o **deno**te a **slight**ly **modifi**ed **versi**on **o**f a **functi**on.

```haskell
it'sMe = "Eric" -- valid but not good practice
```

- A **stri**ng **i**s **jus**t a **lis**t **o**f **characte**rs.

```haskell
ghci> ['h','i'] == "hi"
True
```

- **The**re **ar**e **tw**o **typ**es **o**f **commen**ts **i**n **Haske**ll.

```haskell
{- This is a multiple line comment.
Comments are ignored by the compiler. -}
-- This is an inline comment.
```

### **Furth**er **Readi**ng

- [**Ho**w **t**o **Us**e **Lis**t **Comprehens**ion **i**n **Haske**ll](/haskell-list-comprehension/)
- [**Understand**ing **Recursi**on **i**n **Haske**ll](/haskell-recursion)
- **Lea**rn **Yo**u a **Haske**ll **fo**r **Gre**at **Goo**d!, M. **Lipova**ča: `pp 7-14`

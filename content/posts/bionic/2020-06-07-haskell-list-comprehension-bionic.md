---
title: How to use list comprehension in Haskell
bionic: true
---

#### **Prerequisi**tes

- [**Understand**ing **Lis**ts **i**n **Haske**ll](/haskell-understanding-lists/)
- **Option**al: **Bas**ic **understand**ing **o**f **se**t **theo**ry

## **Lis**t **Comprehens**ion

I **coul**dn't **fin**d a **mor**e **conci**se **an**d **bett**er **definiti**on **tha**n **th**e **on**e **b**y **Mir**an **Lipova**ča:

> **Lis**t **comprehensi**ons **ar**e a **wa**y **t**o **filt**er, **transfo**rm, **an**d **combi**ne **lis**ts.

### **Fundament**al **Understand**ing

**Ou**r [**pro**f](https://en.wikipedia.org/wiki/Philip_Wadler) **lik**ed **t**o **descri**be **th**e **proce**ss **o**f **lis**t **comprehensi**ons **a**s "**swoo**sh", **meani**ng **tha**t **w**e **ca**n **imagi**ne **lis**t **comprehens**ion **a**s **somethi**ng **tha**t **manipulat**es _**al**l_ **lis**t **elemen**ts _**a**t **th**e **sam**e **tim**e_. **I**n **contra**st, **recursi**on **wa**s **describ**ed **a**s "**tic**ky **tic**ky **tic**ky", **somethi**ng **whi**ch **manipulat**es a **lis**t **ite**m **successive**ly – I **kno**w, **som**e **wei**rd **fir**st **yea**r **teachi**ng **techniqu**es. **Bu**t **the**y **real**ly **help**ed **m**e **t**o **understa**nd **tho**se **process**es, **s**o **n**o **bla**me **a**t **thi**s **poi**nt.

**Le**t's **div**e **rig**ht **int**o **a**n **examp**le:

```haskell
ghci> [x*10 | x <- [1..5]]
[10,20,30,40,50]
```

**Loo**k's **rath**er **confusi**ng, **rig**ht? **I**t's **no**t **to**o **ba**d **i**f **w**e **loo**k **a**t **thi**s **examp**le **par**t **fo**r **par**t.

### **Generato**rs

**Everythi**ng **aft**er **th**e **pip**e `|` **i**s **th**e ****Generat**or**.

A **Generat**or:

1.  _**Generat**es_ **th**e **se**t **o**f **valu**es **w**e **ca**n **wor**k **wit**h.
2.  _**Bin**ds_ **eac**h **eleme**nt **fro**m **tha**t **se**t **o**f **valu**es **t**o `x` .
3.  **W**e _**dra**w_ **ou**r **elemen**ts **fro**m **tha**t **se**t (`<-` **i**s **pronounc**ed "**dra**wn **fro**m").

**Everythi**ng **befo**re **th**e **pip**e **determin**es **th**e _**outp**ut_ **o**f **th**e **lis**t **comprehens**ion. **I**t's **basical**ly **wha**t **w**e **wan**t **t**o **d**o **wit**h **th**e **lis**t **elemen**ts.

**I**n **ou**r **examp**le, **w**e ****genera**te** a **se**t **o**f **valu**es **fro**m **th**e **lis**t `1..5` . **W**e **bin**d **eac**h **eleme**nt **o**f **th**e **lis**t **t**o `x`. **I**n **th**e **expressi**on (**befo**re `|`) **w**e **defin**ed **tha**t **eve**ry **eleme**nt (`x`) **shou**ld **b**e **multipli**ed **b**y `10`. **Therefo**re, **ou**r **resulti**ng **lis**t **i**s `[10,20,30,40,50]`.

**I**f **yo**u **did**n't **complete**ly **understa**nd **wha**t I **wa**s **talki**ng **abo**ut, **do**n't **wor**ry! **Jus**t **r**e-**rea**d **th**e **importa**nt **paragrap**hs **an**d **eac**h **tim**e **i**t **shou**ld **mak**e a **bi**t **mor**e **sen**se.

### **Predicat**es

**I**f **w**e **d**o **no**t **wan**t **t**o **dra**w **al**l **elemen**ts **fro**m a **lis**t, **w**e **ca**n **ad**d a **conditi**on, a _**predica**te_. A **predica**te **i**s a **functi**on **whi**ch **tak**es **a**n **eleme**nt **an**d **retur**ns a **boole**an **val**ue.

**Continui**ng **wit**h **ou**r **fir**st **examp**le, **le**t's **sa**y **w**e **onl**y **wan**t **t**o **bin**d **numbe**rs **t**o `x` **whi**ch **ar**e **strict**ly **great**er **tha**n `2`:

```haskell
ghci> [x*10 | x <- [1..5], x > 2]
[30,40,50]
```

**A**s **yo**u **ca**n **se**e, **w**e **onl**y **hav**e **t**o **ad**d a **com**ma **an**d **th**e **predica**te, **tha**t's **i**t! **Yo**u **ca**n **ad**d **a**s **man**y **predicat**es **a**s **yo**u **wan**t, **separat**ed **b**y **comm**as.

**S**o **concludi**ng **th**e **structu**re **o**f a **lis**t **comprehens**ion, **thi**s **mig**ht **hel**p **memori**se **everythi**ng:

```haskell
[ Output | Generator, predicate 1, predicate 2, ... ]
```

**Usi**ng **predicat**es **t**o **ge**t **exact**ly **th**e **elemen**ts **o**f a **lis**t **yo**u **wan**t **i**s **call**ed _**filteri**ng_.

**W**e **ca**n **als**o **hav**e **multip**le **generato**rs **t**o **dra**w **valu**es **fro**m **sever**al **lis**ts:

```haskell
ghci> [x*y | x <- [1,3,6], y <- [10,11,12]]
[10,11,12,30,33,36,60,66,72]
```

**I**n **thi**s **cas**e, **th**e **leng**th **o**f **th**e **resulti**ng **lis**t **i**s `9` **becau**se **w**e **ge**t **th**e **produc**ts **o**f **al**l **possib**le **combinatio**ns **o**f **numbe**rs.

## **Conclusi**on

**Lis**t **comprehens**ion **i**s a **gre**at **techniq**ue **t**o **manipula**te **lis**ts. **W**e **ca**n **imagi**ne **th**e **proce**ss **a**s **somethi**ng **whi**ch **act**s **o**n **eac**h **lis**t **eleme**nt **a**t **th**e **sam**e **tim**e.

**W**e **fir**st ****genera**te** a **se**t **o**f **valu**es **fro**m **som**e **lis**t. **Th**e **se**t **ca**n **b**e **filter**ed **usi**ng ****predicat**es**. **I**n **th**e **expressi**on **befo**re **th**e **pip**e, **w**e **defi**ne **wha**t **t**o **d**o **wit**h **th**e **generat**ed **elemen**ts, **an**d **th**e **outp**ut **o**f **th**e **lis**t **comprehens**ion.

### **Of**f-**Roa**d **Knowled**ge

- `_` **i**s **a**n **undefin**ed **variab**le, a _**wildca**rd **variab**le_. **W**e **ca**n **us**e **i**t **whe**n **w**e **do**n't **car**e **abo**ut **th**e **val**ue **whi**ch **i**s **assign**ed **t**o `_`

- **I**t's **alwa**ys a **goo**d **exerci**se **t**o **defi**ne **libra**ry **functio**ns **o**n **you**r **ow**n

```haskell
length' :: [a] -> int
length' ls = sum[1 | _ <- ls]
```

- **Inf**ix **functio**ns **ar**e **functio**ns **notat**ed **wit**h a \` **arou**nd **the**m, **apa**rt **fro**m **inf**ix **operato**rs **suc**h **a**s `+` **o**r `*`
- **Inf**ix **functio**ns **ar**e **syntact**ic **sug**ar, **bot**h **pref**ix **an**d **inf**ix **functio**ns **ca**n **b**e **writt**en **th**e **oth**er **wa**y

```haskell
λ> zip [1..] "ABCD" == [1..] `zip` "ABCD"
True
λ> (+) 4 5 == 4 + 5
True
```

### **Furth**er **Readi**ng

- [**Understand**ing **Recursi**on **i**n **Haske**ll](/haskell-recursion/)
- **Lea**rn **Yo**u a **Haske**ll **fo**r **Gre**at **Goo**d!, M. **Lipova**ča: `pp 15-18`

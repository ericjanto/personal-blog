---
title: Understanding recursion in Haskell
bionic: true
---

![Recursion Comic. Source: xkcd.com](../../images/recursion-xkcd.png 'xkcd on recursive patterns')

#### **Prerequisi**tes

- **Bas**ic **synt**ax **o**f **Haske**ll
- [**Understand**ing **Lis**ts **i**n **Haske**ll](/haskell-understanding-lists)

#### **Goa**ls

- **Understa**nd **ho**w **t**o **us**e **bas**ic **recursi**on
- **Lea**rn **differe**nt **syntact**ic **way**s **o**f **defini**ng **recursi**ve **functio**ns

## A **Furth**er **Gui**de **t**o **Lis**ts

**I**n **ord**er **t**o **understa**nd **recursi**on **proper**ly, **w**e **nee**d **t**o **kno**w a **bi**t **mor**e **abo**ut **lis**ts. **I**f **yo**u **fee**l **alrea**dy **confide**nt **wit**h **usi**ng **lis**ts **yo**u **ca**n **ski**p **t**o [**thi**s **par**t](/haskell-recursion/#an-introduction-to-recursion).

**I**n **Haske**ll, a **lis**t **ca**n **b**e **construct**ed **usi**ng **onl**y **th**e **con**s **operat**or `:` **an**d **th**e **emp**ty **lis**t `[]` **a**s a **bas**e **cas**e.

```haskell
[4,2,9] = 4 : (2 : (9 : []))

"list"  = ['l','i','s','t']
			  = 'l' : ('i' : ('s' : ('t' : [])))
```

**S**o **whe**n **defini**ng a **lis**t, **w**e **ca**n **ad**d **tho**se **tw**o **properti**es:

- a **lis**t **i**s **eith**er **emp**ty `[]`
- **o**r **construct**ed `x:xs`

  **whe**re

  - `x` **i**s **th**e **hea**d (**fir**st **eleme**nt) **an**d
  - `xs` **i**s **th**e **tai**l (a **lis**t)
  - **th**e **expressi**on `x:xs` **say**s 'I **tak**e a **hea**d **an**d **constru**ct **i**t **ont**o **th**e **tai**l'

```haskell
ghci> let (x:xs) = "hello"
ghci> "hello" == 'h' : ['e','l','l','o']
True
ghci> x
'h'
ghci> xs
"ello"
```

> `x:xs` **i**s a **comm**on **for**m **o**f \***\*patte**rn **matchi**ng**. **I**t's **basical**ly a **notati**on **t**o **sa**y '**he**y I'm **expecti**ng **th**e **dat**a **t**o **hav**e **thi**s **structu**re'. **Whe**n **th**e **patte**rn **confor**ms **th**e **dat**a, **w**e **ca**n **us**e **th**e **variabl**es `x` **an**d `xs` **t**o **acce**ss **th**e **regardi**ng **dat**a (**her**e **th**e **hea**d **an**d **tai**l **o**f a **lis\*\*t).

**Thi**s **definiti**on **giv**en, **w**e **ca**n **dedu**ce **tha**t **eve**ry **lis**t **mus**t **mat**ch **on**e **o**f **th**e **followi**ng **tw**o **patter**ns:

```haskell
[] -- only matches the empty list
(x:xs) -- matches any non-empty list

-- we don't have to use exactly those variables for head & tail
-- in fact, we can use any distinct variables:

(colin:stetson)

-- or

(head':tail')
```

## **A**n **Introducti**on **t**o **Recursi**on

**No**w **tha**t **w**e **hav**e **som**e **addition**al **knowled**ge **abo**ut **lis**ts, **w**e **ca**n **final**ly **ge**t **start**ed **wit**h **th**e **backbo**ne **o**f **recursi**on.

### **Bas**ic **Definiti**on

**Recursi**on **allo**ws **t**o **fin**d **conci**se **an**d **elega**nt **solutio**ns **t**o **proble**ms. **I**t **i**s a **wa**y **o**f **defini**ng a **functi**on:

- **I**n **th**e **definiti**on **o**f **th**e **functi**on, **th**e **functi**on **cal**ls **itse**lf: \***\*Sel**f-**Referen**ce\*\*.
- **I**n **ter**ms **o**f **lis**ts, **recursi**on **als**o **mea**ns: **defini**ng a **lis**t **i**n **ter**ms **o**f a **lis**t.

**A**s **ou**r **pro**f **sai**d: **W**e **al**l **kno**w **tha**t **defini**ng **somethi**ng **i**n **ter**ms **o**f **itse**lf **i**s **no**t **alwa**ys a **sensib**le **thi**ng **t**o **d**o.

> "**Brex**it **mea**ns **Brex**it" </br>
> – **There**sa **Ma**y

**Bu**t **tha**t's **no**t **ho**w **i**t **wor**ks **wit**h **recursi**on. **Sel**f-**referen**ce **i**s **fin**e **a**s **lon**g **a**s **lon**g **a**s **th**e **thi**ng, **yo**u **defi**ne **i**t **i**n **ter**ms **o**f, **i**s a \***\*small**er **instan**ce** \_(**fo**r **no\*\*w)\_.

**Applyi**ng **thi**s **t**o **lis**ts:

- **W**e **ar**e **buildi**ng **lis**ts **fro**m **oth**er **lis**ts, **bu**t **the**y **ar**e \***\*short**er\*\* **lis**ts. **An**d **eventual**ly **w**e **rea**ch a **defin**ed \***\*bas**e-**cas**e\*\* **whi**ch **i**s **oft**en **th**e **emp**ty **lis**t
- **W**e **bre**ak **dow**n a **probl**em **int**o **small**er **proble**ms, **solvi**ng **tho**se **small**er **proble**ms **b**y **breaki**ng **the**m **dow**n **to**o **et**c. **unt**il **w**e **rea**ch **th**e \***\*bas**e **cas**e\*\* **o**f **th**e **probl**em.

**The**re **ar**e **differe**nt **way**s **o**f **defini**ng a **recursi**on:

- **Patte**rn **Matchi**ng
- **Condition**al **Expressi**on
  - **i**f-**els**e-**the**n
  - **Guar**ds

### **Usi**ng **Patte**rn **Matchi**ng

**Whe**n **usi**ng **patte**rn **matchi**ng **fo**r **recursi**on, **w**e **oft**en **wan**t **t**o **us**e **th**e **mention**ed `x:xs` **patte**rn. **Consid**er **thi**s **examp**le **whe**re **w**e **wan**t **t**o **ge**t **eac**h **eleme**nt **o**f a **lis**t **squar**ed:

```haskell
squaresRec :: [Int] -> [Int]
squaresRec [] = []
squaresRec (x:xs) = x * x : squaresRec xs
```

**First**ly, **w**e **defin**ed, **rig**ht **aft**er **th**e **typ**e **signatu**re, **th**e \***\*bas**e **cas**e\*\* **o**f `squaresRec`. **Whe**n **th**e **functi**on **encounte**rs **a**n **emp**ty **lis**t, **i**t **retur**ns **a**n **emp**ty **lis**t. **Thi**s **mak**es **sen**se **becau**se **ho**w **wou**ld **w**e **squa**re **a**n **emp**ty **lis**t?
**The**n, **w**e **defin**ed **anoth**er **cas**e: **whe**n `squaresRec` **encounte**rs a **lis**t **whi**ch **match**es **th**e **patte**rn `x:xs` (**whi**ch **i**s **eve**ry **lis**t **exce**pt **th**e **emp**ty **lis**t), **w**e **squa**re **it**s **hea**d **an**d **appe**nd **i**t **t**o **whatev**er **i**s **return**ed **b**y `squaresRec xs`.

**Noti**ce **tha**t **patter**ns **hav**e **t**o **b**e **surround**ed **b**y **parenthes**is **whe**n **the**y **ar**e **giv**en **a**s a **functi**on's **argume**nt.

**I**t's a **goo**d **practi**ce **t**o **g**o **throu**gh **eac**h **ste**p **o**f a **recursi**on, **especial**ly **whe**n **yo**u **wan**t **t**o **fin**d **ou**t **wh**y a **functi**on **doe**sn't **beha**ve **th**e **wa**y **yo**u **wan**t **i**t. I **lik**e **t**o **cal**l **thi**s **techniq**ue **th**e \***\*rob**ot **techniq**ue\*\* **sin**ce **w**e **prete**nd **t**o **b**e a **dum**b **rob**ot **whi**ch **onl**y **kno**ws **ho**w **t**o **compu**te **somethi**ng **ste**p **b**y **ste**p.

```haskell
	squaresRec [1,2,3]
=
	squaresRec (1 : (2 : (3 : []))) -- write the list as a constructed list
=
	1*1 : squaresRec (2 : (3 : [])) -- after applying squaresRec to the head
=
	1*1 : (2 * 2 : squaresRec (3 : []))
=
	1*1 : (2 * 2 : (3 * 3 : squaresRec [])) -- aah that's the base case!
=
	1*1 : (2 * 2 : (3 * 3 : []))
=
	1 : (4 : (9 : []))
=
	[1,4,9]
```

### **Usi**ng **Condition**al **Expressio**ns

**W**e **ca**n **accompli**sh **th**e **sam**e **bi**t **o**f **cod**e **witho**ut **usi**ng **patte**rn **matchi**ng **bu**t **condition**al **expressio**ns.

#### **i**f-**the**n-**els**e

**W**e **ca**n **us**e **th**e `if-then-else` **synt**ax. **W**e **che**ck **fo**r a **conditi**on, **i**f **i**t **evaluat**es **fo**r `True` **th**e **cod**e **blo**ck **aft**er `then` **get**s **execut**ed. **Shou**ld **th**e **conditi**on **b**e `False`, **anoth**er **cod**e **blo**ck **get**s **execut**ed.

```haskell
squaresCond :: [Integer] -> [Integer]
squaresCond someList =
    if null someList then
      []
    else
      let
        x  = head someList
        xs = tail someList
      in
        x * x : squaresCond xs
```

**Her**e, **w**e **che**ck **i**n **ou**r **fir**st **conditi**on **fo**r **th**e **nulli**ty **o**f **th**e **functi**on's **paramet**er. **Shou**ld **th**e **lis**t **tur**n **ou**t **t**o **b**e **emp**ty, **w**e **jus**t **retu**rn **th**e **emp**ty **lis**t. **Aga**in, **thi**s **i**s **th**e \***\*bas**e **cas**e\*\*.

**Shou**ld **th**e **lis**t **b**e **no**n-**emp**ty, **w**e **defi**ne **variabl**es **fo**r **th**e **hea**d **an**d **tai**l **o**f **th**e **lis**t **s**o **tha**t **w**e **ca**n **ref**er **t**o **the**m. **Th**e **las**t **lin**e **sho**ws **th**e **actu**al **computati**on **whi**ch **allo**ws **th**e **functi**on **t**o **retu**rn **squar**ed **lis**t **elemen**ts.

> \***\*Not**e\*\*
>
> - `let ... in` **enabl**es **loc**al **bindi**ng **whi**ch **i**s **onl**y **val**id **i**n **th**e **sco**pe **o**f **th**e **secti**on **aft**er `in`
> - **onc**e **w**e **lea**ve **tha**t **par**t, **th**e **compil**er **doe**sn't **kno**w **wha**t `x` **an**d `xs` **i**s; **the**y **ar**e **onl**y **i**n **sco**pe **o**f `in` **an**d **nowhe**re **els**e

#### **Guar**ds

**W**e **ca**n **defi**ne **exact**ly **th**e **sam**e **functi**on **usi**ng **guar**ds. **The**y **all**ow **t**o **hav**e **multip**le **condition**al **expressio**ns, **bu**t **fo**r **recursi**on **w**e **onl**y **nee**d **t**o **distingui**sh **betwe**en **th**e **bas**e **cas**e **an**d **th**e **no**n-**bas**e **cas**e.

**I**f **th**e **expressi**on **aft**er **th**e **gua**rd **pip**e `|` **i**s **tru**e, **th**e **expressi**on **aft**er **th**e **equ**al **sig**n **get**s **evaluat**ed. **Al**l **oth**er **expressio**ns **ar**e **ignor**ed. **Haske**ll **goe**s **throu**gh **eac**h **gua**rd **i**n **ord**er, **fro**m **to**p **t**o **bott**om.

`otherwise` **i**s a **keywo**rd **whi**ch **ca**n **b**e **use**d **t**o **ensu**re **tha**t **a**t **lea**st **som**e **expressi**on **wil**l **b**e **evaluat**ed **shou**ld **al**l **oth**er **guar**ds **fai**l. **I**t **i**s **simil**ar **t**o **Jav**a's `default` **stateme**nt **i**n a **swit**ch-**clau**se.

```haskell
squaresCond' someList =
		| null someList = []
		| otherwise     =
				let x  = head someList
						xs = tail someList
				in
					x * x : squaresCond' xs
```

### **Whi**ch **Meth**od **o**f **Recursi**on **T**o **Us**e

I'm **confus**ed. **Wh**y **ar**e **the**re **s**o **man**y **differe**nt **thin**gs **t**o **accompli**sh **th**e **ver**y **sam**e **thi**ng? **Whi**ch **wa**y **o**f **defini**ng a **recursi**on **shou**ld a **us**e?

I **understa**nd **tha**t **thi**s **ca**n **b**e a **bi**t **overwhelmi**ng **a**t **th**e **beginni**ng. **The**re **ar**e **man**y **differe**nt **possibilit**ies **t**o **defi**ne a **recursi**on **becau**se **Haske**ll's **synt**ax **i**s **qui**te **versati**le **i**n **tha**t **sen**se. **Thi**s **i**s **whe**re **th**e \***\*sty**le\*\* **o**f **codi**ng **get**s **expos**ed.

A **goo**d **rul**e **o**f **thu**mb **i**s **t**o **loo**k **ou**t **whi**ch **versi**on **o**f a **functi**on **th**e **mos**t \***\*conci**se\*\* **an**d \***\*readab**le\*\* **versi**on **i**s. I **pref**er **t**o **us**e **patte**rn **matchi**ng **sin**ce **i**t **allo**ws **ver**y **sho**rt **bu**t **expressi**ve **definitio**ns.

**The**re **ar**e, **o**f **cour**se, **oth**er **cas**es **whe**re **yo**u **mig**ht **wan**t **t**o **g**o **fo**r a **long**er **an**d **mor**e **complicat**ed **functi**on **i**f **i**t **wa**s **mor**e _**efficie**nt_. **Bu**t **tha**t **shoul**dn't **b**e **th**e **cas**e **wit**h **recursi**ve **functio**ns **i**n **Haske**ll **sin**ce **al**l **differe**nt **synt**ax **versio**ns **ar**e **mor**e **o**r **les**s **simil**ar **i**n **ter**ms **o**f **efficien**cy.

**Yo**u **ca**n **tes**t **thi**s **yourse**lf **b**y **followi**ng **m**y [**gui**de](/haskell-efficiency/) **o**n **ho**w **t**o **tes**t **you**r **Haske**ll **process**es **fo**r **efficien**cy.

## **Testi**ng **Recursi**ve **Functio**ns

**It**s **bot**h **comm**on **practi**ce **an**d a **goo**d **exerci**se **t**o **wri**te a **lis**t **comprehens**ion **whi**ch **i**s **equivale**nt **t**o **ou**r **recursi**ve **functi**on. **W**e **the**n **ca**n **us**e a **QuickChe**ck **proper**ty **t**o **che**ck **th**e **correctne**ss **o**f **tho**se **functio**ns (**assumi**ng **tha**t **yo**u **go**t **a**t **lea**st **on**e **o**f **the**m **rig**ht).

```haskell
squares :: [Int] -> [Int]
squares xs = [ x^2 | x <- xs ]

prop_squares = [Int] -> Bool
prop_squares = squares == squaresRec

test_squares = quickCheck prop_squares
```

```haskell
ghci> test_squares
+++ OK, passed 100 tests.
```

<!-- You can check out my [quick tip article on QuickCheck]() if you don't know much about automatic testing or want to learn more about it. It's a very useful tool for automatic testing of Haskell programms! -->

## **Conclusi**on

**W**e **ca**n **defi**ne a **functi**on **recursive**ly **b**y **usi**ng \***\*sel**f-**referen**ce\*\* **an**d **th**e **fac**t **tha**t a **lis**t **i**s **eith**er **emp**ty `[]` **o**r **construct**ed `x:xs`.

**T**o **distingui**sh **betwe**en **th**e \***\*bas**e **cas**e\*\* **an**d **th**e **defau**lt **cas**e **o**f a **recursi**on, **w**e **ca**n **us**e **patte**rn **matchi**ng **o**r **condition**al **espressio**ns **suc**h **a**s `if-then-else` **o**r **guar**ds. **Patte**rn **matchi**ng **oft**en **tur**ns **ou**t **t**o **b**e **mor**e **conci**se **an**d **readab**le.

**T**o **tes**t a **recursi**ve **functi**on, **i**t **i**s **goo**d **practi**ce **t**o **defi**ne **th**e **sam**e **functi**on **usi**ng **lis**t **comprehens**ion **an**d **the**n **t**o **us**e \***\*QuickChe**ck\*\* **t**o **tes**t **bot**h **definitio**ns **fo**r **equali**ty.

**Sometim**es **w**e **als**o **wan**t **t**o **g**o **throu**gh **eac**h **ste**p **o**f a **recursi**ve **functi**on **cal**l **t**o **spo**t **bug**s, **whi**ch **i**s **call**ed \***\*rob**ot **techniq**ue\*\*.

### **Of**f-**Roa**d **Knowled**ge

**Bit**s **o**f **addition**al **knowled**ge.

#### 1. **Infini**te **Recursi**on

I **stat**ed **i**n **th**e **definiti**on **o**f **recursi**on **tha**t **sel**f-**referen**ce **i**s **oka**y **a**s **lon**g **a**s **w**e **referen**ce **t**o a **small**er **instan**ce. **Tha**t **wa**s **no**t **entire**ly **tru**e, **w**e **ca**n **als**o **defi**ne **somethi**ng **i**n **ter**ms **o**f **bigg**er **instanc**es. **I**n **tha**t **cas**e, **i**t **wou**ld **resu**lt **i**n a **nev**er **endi**ng **recursi**on **whi**ch **i**s **sensib**le **whe**n **w**e **wan**t **a**n **inifini**te **lis**t **t**o **b**e **return**ed.

**Fo**r **Examp**le, **w**e **wan**t **t**o **defi**ne `enumFrom m` **whi**ch **i**s **equivale**nt **t**o `[m..]` **o**n **ou**r **ow**n, **recursive**ly:

```haskell
-- we focus only on integers
-- in general, enumFrom could take any enum types as parameter

enumFromRec :: Int -> [Int]
enumFromRec m = m : enumFromRec (m+1)

-- results in an infinite list
-- use-case: same as [m..] for any Integer m
```

**Sin**ce **Haske**ll **i**s **laz**y, **i**t **onl**y **evaluat**es **somethi**ng **i**f **i**t **mus**t.

#### 2. **Pae**no **Axio**ms

**Whe**n **thinki**ng **abo**ut **recursi**on **i**n **Haske**ll, **the**re **exis**ts **a**n **adequa**te **analo**gy **t**o **th**e \***\*Pae**no **Axio**ms** (**Pae**no, 1858 - 1932) **whi**ch **offe**rs a **simil**ar **approa**ch **o**n **defini**ng **natur**al **numbe**rs **recursive\*\*ly:

A **natur**al **numb**er **i**s **eith**er

- `zero` **writt**en `0` (**equivale**nt **t**o **th**e **emp**ty **lis**t `[]`)
- **o**r a `successor` **writt**en `n+1` **wit**h `predecessor n` (a **natur**al **numb**er)

A **simp**le **examp**le **o**f **defini**ng `3` **recursive**ly:

`3 = ((0 + 1) + 1) + 1`

#### 3. **Getti**ng **th**e **onl**y **eleme**nt **fro**m a **lis**t

I **alwa**ys **use**d **t**o **cal**l `head` **o**n a **lis**t **o**f **leng**th `1` **t**o **ge**t **it**s **eleme**nt. **Oft**en, a **mor**e **elega**nt **an**d **als**o **saf**er **thi**ng **t**o **d**o **i**s **t**o **defi**ne a **help**er **functi**on `the` **inste**ad **o**f **calli**ng `head` **o**n **th**e **lis**t:

```haskell
the :: [a] -> a
the [x] = x
the _ = error "Can't get element from empty list!"
```

**Tha**t **wa**y **yo**u **ca**n **defi**ne **o**n **you**r **ow**n **ter**ms **wha**t **shou**ld **happ**en **i**n **th**e **cas**e **o**f **a**n **emp**ty **lis**t. **I**n **ou**r **definiti**on **o**f `the` **w**e **jus**t **thr**ow **a**n **err**or **messa**ge **bu**t **yo**u **ca**n **tail**or **th**e **functi**on **t**o **you**r **ow**n **nee**ds.

**Not**e **tha**t **i**n **thi**s **cas**e, `the` **wou**ld **als**o **thr**ow **th**e **emp**ty **lis**t **err**or **whe**n **w**e **pas**s a **lis**t **o**f **leng**th 2 **o**r **mor**e **t**o **i**t. **Dependi**ng **o**n **th**e **us**e **cas**e **o**f **you**r `the`-**functi**on, **yo**u **mig**ht **wan**t **t**o **defi**ne **somethi**ng **els**e **fo**r **tha**t **cas**e.

**Sometim**es, a **goo**d **soluti**on **wou**ld **b**e **t**o **mak**e **sur**e **tha**t **th**e **lis**t **i**s **nev**er **emp**ty, e.g. **b**y **addi**ng **alwa**ys a **bas**e **eleme**nt **t**o **th**e **en**d.

#### 4. '**I**t'

...**i**s **no**t **onl**y a **goo**d **boo**k. **Yo**u **cal**l `it` **i**n **GHC**i **t**o **ref**er **t**o **th**e **las**t **outp**ut **i**n **you**r **conso**le. `it` **i**s **alwa**ys **automatica**lly **bou**nd **t**o **sai**d **outp**ut.

### **Furth**er **Readi**ng

- [**Ho**w **t**o **Us**e **Lis**t **Comprehens**ion **i**n **Haske**ll](/haskell-list-comprehension)
- **Lea**rn **Yo**u a **Haske**ll **fo**r **Gre**at **Goo**d!, M. **Lipova**ča: `pp 51-53`

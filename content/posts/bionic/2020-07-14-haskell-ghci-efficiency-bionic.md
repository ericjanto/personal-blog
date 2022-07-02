---
title: How to test for efficiency in Haskell
bionic: true
---

**T**o **d**o **s**o, **yo**u **ca**n **us**e **th**e `:set +s` **comma**nd **i**n **GHC**i.

```bash
ghci> :set +s
```

**Yo**u **wo**n't **se**e **an**y **succe**ss **messa**ge. **No**w **yo**u **ca**n **tes**t **i**t:

```haskell
ghci> let filterPrime (p:xs) = p : filterPrime [x | x <- xs, x `mod` p /= 0]
ghci> primes = filterPrime [2..]
ghci> :set +s
ghci> take 10 primes
[2,3,5,7,11,13,17,19,23,29]
(0.01 secs, 514,216 bytes)
```

**Whe**n **yo**u'**r**e **tracki**ng **th**e **tim**e **o**f **fas**t **evaluatio**ns **lik**e **th**e **on**e **abo**ve, **yo**u **shou**ld **evalua**te **th**e **expressi**on a **coup**le **o**f **tim**es **an**d **tak**e **th**e **mea**n **o**f **al**l **tim**e **valu**es. **Sometim**es **GHC**i **nee**ds a **bi**t **tim**e **t**o **pow**er **u**p, **tha**t's **wh**y **a**n **evalutati**on **cou**ld **tak**e **long**er **th**e **fir**st **tim**e.

**Thi**s **meth**od **wor**ks **als**o **wit**h **functio**ns **yo**u'**v**e **defin**ed **i**n **a**n **ow**n .**h**s-**fil**e. **Yo**u **ca**n **remo**ve **th**e **tim**e **evaluati**on **b**y **usi**ng `:unset +s`.

**Ti**p: **I**f **yo**u'**r**e **interest**ed **i**n **pri**me **numb**er **algorith**ms, **che**ck **ou**t **th**e [**Sie**ve **o**f **Eratosthen**es](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes).

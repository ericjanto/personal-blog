---
date: 2020-07-14
title: 'How to Test For Efficiency in Haskell'
template: post
slug: haskell-efficiency
tags:
  - 'haskell'
  - 'quick-tip'
  - 'basics'
---

While Haskell isn't famous for it's efficiency, sometimes we still want to measure how long the evaluation of an expression takes.

To do so, you can use the `:set +s` command in GHCi.

```terminal
ghci> :set +s
```

You won't see any success message. Now you can test it:

```haskell
ghci> let filterPrime (p:xs) = p : filterPrime [x | x <- xs, x `mod` p /= 0]
ghci> primes = filterPrime [2..]
ghci> :set +s
ghci> take 10 primes
[2,3,5,7,11,13,17,19,23,29]
(0.01 secs, 514,216 bytes)
```

When you're tracking the time of fast evaluations like the one above, you should evaluate the expression a couple of times and take the mean of all time values. Sometimes GHCi needs a bit time to power up, that's why an evalutation could take longer the first time.

This method works also with functions you've defined in an own .hs-file. You can remove the time evaluation by using `:unset +s`.

---

Tip: If you're interested in prime number algorithms, check out the [Sieve of Eratosthenes](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes).


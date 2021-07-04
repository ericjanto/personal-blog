<!-- ---
date: 2021-04-30
title: 'Algorithms and Data Structures'
template: post
slug: algorithms
tags:
  - 'algorithms'
  - 'data-structures'
--- -->

Algorithms are methods for solving various problems. Before we write a program for solving a problem, we first need to come up with a suitable algorithm.

Data structures are ways of storing or representing data that make it easy to manipulate. Before we write a program that works with certain data, we first need to decide how this data is stored and structured.

Generally, the contents of this article are of introductory nature. It looks into famous standard algorithms, underlying data structures, and methodologies to analyse these algorithms. You can regard this article as course notes for the IADS course at the University of Edinburgh.

We will be using Python but you should be able to extract the concept from the code and use any language you like.

Here's an overview:

```toc
from-heading: 2
to-heading: 3
```

## Efficient vs Inefficient Algorithms

Often there is an obvious approach to solving a problem. That obvious approach can be inefficient in terms of memory usage and time to find a solution.

In fact, **memory** and **time** are the two main resource needs we are concerned about when writing a program. Depending on the situation, we may end up sacrificing a lot of memory to enable to program to run very quickly. Or the other way around, we may need to handle a lot of data without using too much memory, but we are not concerned about time.

### Problem 1: Modular Exponentiation

Consider a problem where we are given potentially large whole numbers $a$, $n$, $m$, and we want to compute $a^n\ \%\ m$. (We use $\%$ to denote the [modulo operation](https://en.wikipedia.org/wiki/Modulo_operation).) This is called the **Modular Exponentiation Problem**.

#### Obvious Approach

We can approach this problem by literally computing $a^n$ and then dividing by $m$ and taking the remainder. However, this can very cost-expensive for large inputs, both regarding memory and time.

For instance, if

$$
a=3, n=123456789012345678901234,
$$

then $a^n$ won't even fit in memory. So we need a better approach.

#### Non-Obvious Approach

Notice that it's easy to compute $e=a^n$ if we have already computed $d=a^{\lfloor n/2\rfloor}$.

- If $n$ is even, $e=(d*d)\ \%\ m$.
- If $n$ is odd, $e=(d*d*a)\ \%\ m$.

And if we can compute $e$ that way, we can also compute $d$ by dividing the problem further into smaller instances, etc. This suggests a recursive algorithm.

- Firstly, we define a method `expMod` which takes three arguments: `a`, `n`, and `m`.
- Every recursion needs a base case. In our case, it is `n == 0` as `n` is the exponent in our problem. Anything exponentiated by `0` results in `1`, and `1 % x` will result in `1` if `x` is a positive integer.

```python
def expMod(a, n, m):
  if n == 0: # base case
    return 1
  else:
    d = expMod(a, math.floor(n/2), m)
    if n % 2 == 0: # n is even
      return (d * d) % m
    else: # n is odd
      return (d * d * a) % m
```

### Problem 2: Sorting

## Algorithm Design

### Iterative Concept

### Divide-and-Conquer Concept

## Asymptotic Analysis

Sometimes we can use mathematical insight to gain improvements over an obvious algorithm. The improved algorithm may be non-obbious and may need justifying by using asymptotic analysis.

## Sources

_This article draws inspiration from various sources, and I ended up using very similar formulations as in my sources, so I do not take full credit. There is a list of all sources at the end of this article._

- Course content of _Informatics 2: Introduction to ALgorithms and Data Structures_ taught at the University of Edinburgh by Mary Cryan and John Longley.
- [Course notes](https://cathyatseneca.gitbooks.io/data-structures-and-algorithms/content/) for the Data Structures and Algorithms course at Seneca College

---
date: 2020-06-07
title: 'How to use list comprehension in Haskell'
excerpt: List comprehensions are one of my favourite features of Haskell. Just as recursion, list comprehension is a basic technique of functional programming and should be learned right in the beginning.
template: post
slug: haskell-list-comprehension
tags:
  - 'computer-science'
  - 'haskell'
  - 'data-structures'
---

#### Prerequisites

- [Understanding Lists in Haskell](/haskell-understanding-lists/)
- Optional: Basic understanding of set theory

## List Comprehension

I couldn't find a more concise and better definition than the one by Miran Lipovača:

> List comprehensions are a way to filter, transform, and combine lists.

### Fundamental Understanding

Our [prof](https://en.wikipedia.org/wiki/Philip_Wadler) liked to describe the process of list comprehensions as "swoosh", meaning that we can imagine list comprehension as something that manipulates _all_ list elements _at the same time_. In contrast, recursion was described as "ticky ticky ticky", something which manipulates a list item successively – I know, some weird first year teaching techniques. But they really helped me to understand those processes, so no blame at this point.

Let's dive right into an example:

```haskell
ghci> [x*10 | x <- [1..5]]
[10,20,30,40,50]
```

Look's rather confusing, right? It's not too bad if we look at this example part for part.

### Generators

Everything after the pipe `|` is the **Generator**.

A Generator:

1. _Generates_ the set of values we can work with.
2. _Binds_ each element from that set of values to `x` .
3. We _draw_ our elements from that set (`<-` is pronounced "drawn from").

Everything before the pipe determines the _output_ of the list comprehension. It's basically what we want to do with the list elements.

In our example, we **generate** a set of values from the list `1..5` . We bind each element of the list to `x`. In the expression (before `|`) we defined that every element (`x`) should be multiplied by `10`. Therefore, our resulting list is `[10,20,30,40,50]`.

If you didn't completely understand what I was talking about, don't worry! Just re-read the important paragraphs and each time it should make a bit more sense.

### Predicates

If we do not want to draw all elements from a list, we can add a condition, a _predicate_. A predicate is a function which takes an element and returns a boolean value.

Continuing with our first example, let's say we only want to bind numbers to `x` which are strictly greater than `2`:

```haskell
ghci> [x*10 | x <- [1..5], x > 2]
[30,40,50]
```

As you can see, we only have to add a comma and the predicate, that's it! You can add as many predicates as you want, separated by commas.

So concluding the structure of a list comprehension, this might help memorise everything:

```haskell
[ Output | Generator, predicate 1, predicate 2, ... ]
```

Using predicates to get exactly the elements of a list you want is called _filtering_.

We can also have multiple generators to draw values from several lists:

```haskell
ghci> [x*y | x <- [1,3,6], y <- [10,11,12]]
[10,11,12,30,33,36,60,66,72]
```

In this case, the length of the resulting list is `9` because we get the products of all possible combinations of numbers.

## Conclusion

List comprehension is a great technique to manipulate lists. We can imagine the process as something which acts on each list element at the same time.

We first **generate** a set of values from some list. The set can be filtered using **predicates**. In the expression before the pipe, we define what to do with the generated elements, and the output of the list comprehension.

### Off-Road Knowledge

- `_` is an undefined variable, a _wildcard variable_. We can use it when we don't care about the value which is assigned to `_`

- It's always a good exercise to define library functions on your own

```haskell
length' :: [a] -> int
length' ls = sum[1 | _ <- ls]
```

- Infix functions are functions notated with a \` around them, apart from infix operators such as `+` or `*`
- Infix functions are syntactic sugar, both prefix and infix functions can be written the other way

```haskell
λ> zip [1..] "ABCD" == [1..] `zip` "ABCD"
True
λ> (+) 4 5 == 4 + 5
True
```

### Further Reading

- [Understanding Recursion in Haskell](/haskell-recursion/)
- Learn You a Haskell for Great Good!, M. Lipovača: `pp 15-18`

---
date: 2020-05-24
title: 'Understanding Lists in Haskell'
template: post
thumbnail: '../thumbnails/haskell.png'
slug: understanding-lists
categories:
  - Coding
tags:
  - 'haskell'
  - 'data structures'
  - 'functional programming'
---

*This article is directed at Haskell beginners. If you're already experienced, you may want to
check out my [other Haskell articles](/tags/haskell).*


When you think about lists in general, you probably think about the grocery list
you've written last week. Or about a list of your New Year's resolutions.
Both lists have something in common: they store some data.

## What Exactly Are Lists?

In Haskell, lists are widely used.
We have some fancy way to define exactly what a list is:

>A list is a homogeneous data structure which can store multiple elements.

Phew, sounds a bit overcomplicated, doesn't it? Let's decompose the definition.

- **Data structure:** A way to store data. Some data structures are good for sorting your data, other data structures might be good for making a large amount of data as accessible as possible.
- **Store:** A list keeps, stores, your data so that you can do stuff with it later.
- **Elements:** That's just the data you put into your list. If you had a strawberry, a lemon, and a watermelon on your grocery list, then each of them would be precisely one element.
- **Homogeneous:** All elements in the list have to be of the same type, for example only integers or only characters.

### Syntax

Given this definition, there is one more thing we have to learn about lists: syntax. That's fairly easy and straight forward:

1. Elements are always inside of square brackets `[]`
2. All elements are separated by commas
3. We can assign the list to a name via `=` 

```haskell
someList = [2,3]
-- A list, namely "someList", containing 2 elements (2 and 3)
-- inside square brackets.

emptyList = []
-- we can also have lists containing none elements
```

### Homogeneous

We stated that all elements have to be of the **same type**. Consider this example:

```haskell
someNumbers = [1,2,3,42,42,1]       -- valid

invalidList = [1,"sneaky string",5] -- not valid, the compiler will shout at you
```

In this case, we tried to store both integers and a string in `invalidList`. Since they are not of the same type, the compiler won't compile our code.

### Lists Inside Lists (Inside Lists Inside Lists...)

Do you know those creepy [matryoshka dolls](https://en.wikipedia.org/wiki/Matryoshka_doll)? Quite similar, lists can also contain other lists:

```haskell
ghci> let a = [[1,2],[2,3,4,5]]
ghci> a
[[1,2],[2,3,4,5]]
```

>**Note:** Lists contained in a list can be of different lengths but have to contain the same type of elements.

Lists can even contain functions:

```haskell
ghci> let funlist = [length, sum]
ghci> :t funlist
funlist :: Foldable t => [t Int -> Int]
```

The functions stored as an element must have the same type signature, meaning that they are allowed to operate on the same types.

(Don't worry about it yet if you're just starting out and don't understand the code above. You'll won't have to store functions in a list for a while.)

That's pretty much everything you need to know about the theory of lists. When we want to put that into practice, we should know about some handy list operations which come 'built-in' with Haskell.

## List Operations

Imagine having a list `argumentsWithMyGF` which stores the number of arguments you have with your girlfriend each day. We can easily compute the total number of those arguments using `sum` :

```haskell
ghci> let argumentsWithMyGF = [1,4,20,5,1]
ghci> sum argumentsWithMyGF
31
ghci> sum[1,4,20,5,1]
31
```

We won't go through each list operation since this wouldn't fit the purpose of this article. However, down below is a table of the most common list operations, being a useful reference you can always come back to. Click on the name of a function to get more details and some examples.

| Function                                                                                 | Purpose                                                            |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [`(++)`](http://zvon.org/other/haskell/Outputprelude/HH_o.html)                          | Concatenation operator, concatenates two lists to a single list    |
| [`(:)`](http://zvon.org/other/haskell/Outputprelude/C_o.html)                            | Cons Operator, constructor, adds an element to the start of a list |
| [`(!!)`](https://hackage.haskell.org/package/base-4.14.0.0/docs/Prelude.html#v:-33--33-) | Indexing Operator, allows to access the nth element from list      |
| [`<` `>` `<=` `>=`](http://learnyouahaskell.com/starting-out)                            | Comparison in lexicographical order                                |
| [`head`](http://zvon.org/other/haskell/Outputprelude/head_f.html)                        | Get first element from a list                                      |
| [`init`](http://zvon.org/other/haskell/Outputprelude/init_f.html)                        | List without last element                                          |
| [`last`](http://zvon.org/other/haskell/Outputprelude/last_f.html)                        | Get last element from a list                                       |
| [`tail`](http://zvon.org/other/haskell/Outputprelude/tail_f.html)                        | List without the first element                                     |
| [`length`](http://zvon.org/other/haskell/Outputprelude/length_f.html)                    | Get number of elements in list                                     |
| [`null`](http://zvon.org/other/haskell/Outputprelude/null_f.html)                        | Checks if list is empty                                            |
| [`reverse`](http://zvon.org/other/haskell/Outputprelude/reverse_f.html)                  | Reverses list                                                      |
| [`take`](http://zvon.org/other/haskell/Outputprelude/take_f.html)                        | Take the n first elements of list                                  |
| [`drop`](http://zvon.org/other/haskell/Outputprelude/drop_f.html)                        | Drop the first n elements of list                                  |
| [`maximum`](http://zvon.org/other/haskell/Outputprelude/maximum_f.html)                  | Get the maximum value from list                                    |
| [`minimum`](http://zvon.org/other/haskell/Outputprelude/minimum_f.html)                  | Get the minimum value from list                                    |
| [`sum`](http://zvon.org/other/haskell/Outputprelude/sum_f.html)                          | Get total sum of list elements                                     |
| [`product`](http://zvon.org/other/haskell/Outputprelude/product_f.html)                  | Get product of list elements                                       |
| [`elem`](http://zvon.org/other/haskell/Outputprelude/elem_f.html)                        | Determine if list contains an item equal to passed argument        |

A few things to note:

- The concatenation operator takes **two lists** containing elements of the same type.
- The cons operator takes an **element** and a **list** containing elements of the same type.
- Be careful not to use `head`, `last`, `init`, `tail` on empty lists as it would result in an error.

## Conclusion

A list is a data structure and widely used in Haskell. It can be empty or store several elements of the same type. One of the benefits of using a list is that there are many list operations available.

That's pretty much everything you need to know to get started with lists in Haskell. <!-- For a deeper insight into the structure and use of lists check out the first bit of [Understanding Recursion in Haskell](/haskell-recursion). -->

### Off-Road Knowledge

- `'`  is a valid character for function or definition names. However, it's good practice to use it only to denote a slightly modified version of a function.
```haskell
it'sMe = "Eric" -- valid but not good practice
```

- A string is just a list of characters.
```haskell
ghci> ['h','i'] == "hi" -- the "hi" notation is syntactic sugar
True
```

### Further Reading

- Learn You a Haskell for Great Good!, M. Lipovaça: `pp 7-13`
<!-- - [List Comprehension](/haskell-list-comprehension) -->
<!-- - [Recursion](/haskell-recursion) -->

---

Any questions, critiques or comments? Feel free to [write me an email](mailto:jantoeric@gmail.com), I usually respond within a day.
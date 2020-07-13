---
date: 2020-05-24
title: 'Understanding Lists in Haskell'
template: post
slug: haskell-understanding-lists
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
2. All elements are separated by a comma `,`
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
 -- valid:
someNumbers = [1,2,3,42,42,1]

-- not valid, the compiler will shout at you:
invalidList = [1,"sneaky string",5]
```

In this case, we tried to store both integers and a string in `invalidList`. Since they are not of the same type, the compiler will complain.

### Lists Inside Lists (Inside Lists Inside Lists...)

Do you know those creepy [matryoshka dolls](https://en.wikipedia.org/wiki/Matryoshka_doll)? Quite comparable, lists can also contain other lists:

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

*(Don't worry about it yet if you're just starting and don't fully understand the code above. You won't have to store functions in a list for a while.)*

That's pretty much everything you need to know about lists to get started. When we want to put that into practice, we should know about list operations which come 'built-in' with Haskell.
They come handy when we want to manipulate lists.

## List Operations

Imagine having a list `argumentsWithMyGF` which stores the number of arguments you have with your girlfriend each day. We can easily compute the total number of those arguments using `sum` :

```haskell
ghci> let argumentsWithMyGF = [1,4,20,5,1]
ghci> sum argumentsWithMyGF
31
ghci> sum[1,4,20,5,1]
31

-- (Maybe you should break up with your gf)
```

We won't go through each list operation since this wouldn't fit the purpose of this article. However, down below is a table of the most common list operations, being a useful reference you can always come back to. Click on the name of a function to get more details and some examples.

| Function                                                                                 | Purpose                                                            |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [`(++)`](http://zvon.org/other/haskell/Outputprelude/HH_o.html)                          | Concatenation operator, concatenates two lists to a single list    |
| [`(:)`](http://zvon.org/other/haskell/Outputprelude/C_o.html)                            | Cons Operator, constructor, adds an element to the start of a list |
| [`(!!)`](https://hackage.haskell.org/package/base-4.14.0.0/docs/Prelude.html#v:-33--33-) | Indexing Operator, allows to access the nth element from list      |
| [`<` `>` `<=` `>=`](http://learnyouahaskell.com/starting-out)                            | Comparison in lexicographical order                                |
| [`head`](http://zvon.org/other/haskell/Outputprelude/head_f.html)                        | Get first element from a list                                      |
| [`init`](http://zvon.org/other/haskell/Outputprelude/init_f.html)                        | Get list without last element                                      |
| [`last`](http://zvon.org/other/haskell/Outputprelude/last_f.html)                        | Get last element from a list                                       |
| [`tail`](http://zvon.org/other/haskell/Outputprelude/tail_f.html)                        | Get list without the first element                                 |
| [`length`](http://zvon.org/other/haskell/Outputprelude/length_f.html)                    | Get number of elements in list                                     |
| [`null`](http://zvon.org/other/haskell/Outputprelude/null_f.html)                        | Checks if list is empty                                            |
| [`reverse`](http://zvon.org/other/haskell/Outputprelude/reverse_f.html)                  | Reverses list                                                      |
| [`take`](http://zvon.org/other/haskell/Outputprelude/take_f.html)                        | Take `n` first elements of list                                    |
| [`drop`](http://zvon.org/other/haskell/Outputprelude/drop_f.html)                        | Drop first `n` elements of list                                    |
| [`maximum`](http://zvon.org/other/haskell/Outputprelude/maximum_f.html)                  | Get maximum value from list                                        |
| [`minimum`](http://zvon.org/other/haskell/Outputprelude/minimum_f.html)                  | Get minimum value from list                                        |
| [`sum`](http://zvon.org/other/haskell/Outputprelude/sum_f.html)                          | Get total sum of list elements                                     |
| [`product`](http://zvon.org/other/haskell/Outputprelude/product_f.html)                  | Get product of list elements                                       |
| [`elem`](http://zvon.org/other/haskell/Outputprelude/elem_f.html)                        | Determine if list contains an item equal to passed argument        |

A few things to note:

- The concatenation operator `++` takes **two lists** containing elements of the same type.
- The cons operator `:` takes an **element** and a **list** containing elements of the same type.
- Be careful not to use `head`, `last`, `init`, `tail` on empty lists as it would result in an error.

## Ranges

Ranges are a great shorthand notation which are used to define lists.
Knowing and using them can save you lots of time.

### Basics

Ranges are used to make lists composed of elements that can be *enumerated*, meaning that the elements have some kind of order. For example, such elements can be numbers `1,2,3...` or characters `'a','b','c',...`.

To list all numbers from `1` to `10` we would usually go like this: `[1,2,3,4,5,6,7,8,9,10]`. Luckily, there is a much simpler way: `[1..10]` . There is no semantic difference between those two lists:

```haskell
ghci> [1..10] == [1,2,3,4,5,6,7,8,9,10]
True
```

More examples:

```haskell
ghci> [1..10]
[1,2,3,4,5,6,7,8,9,10]
ghci> ['a'..'l']
"abcdefghijkl"
ghci> ['A'..'C']
"ABC"
```

### Steps

Steps are useful when we only want every third element. Or every fifth, or ... you get the idea. A step is basically an interval in which the elements will appear. The interval must always be the same. There is no way to have alternating steps. Here's how to use steps in Haskell:

- The first two elements specify the step, the last element the upper limit

```haskell
ghci> [2,4..20]
[2,4,6,8,10,12,14,16,18,20]
```
To count down in a list, it's not sufficient to write `[20..1]`.

>To make a list with all numbers from 20 down to 1 you have to type `[20,19..1]` . 

### Infinite Lists

It's also possible to have infinite lists (crazy, right?):

- When not defining an upper limit, the list will be infinite
- For instance `[1..]` or `[1,4..]`
- Because Haskell is *lazy*, it will only evaluate as many elements as we need for our computations (there it is, the 'once in a lifetime'-moment where being lazy is actually useful)
- Useful functions to work with infinite lists
    - [cycle](http://zvon.org/other/haskell/Outputprelude/cycle_f.html)
    - [repeat](http://zvon.org/other/haskell/Outputprelude/repeat_f.html)
    - [replicate](http://zvon.org/other/haskell/Outputprelude/replicate_f.html)
    - [iterate](http://zvon.org/other/haskell/Outputprelude/iterate_f.html)

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
ghci> ['h','i'] == "hi"
True
```

- There are two types of comments in Haskell.
```haskell
{- This is a multiple line comment.
Comments are ignored by the compiler. -}
-- This is an inline comment.
```

### Further Reading

- Learn You a Haskell for Great Good!, M. Lipovača: `pp 7-14`
- [How to Use List Comprehension in Haskell](/haskell-list-comprehension/)
<!-- - [Recursion](/haskell-recursion) -->

---

Any questions, critiques or comments? Feel free to [contact me](/contact/), I'd be happy to hear from you.
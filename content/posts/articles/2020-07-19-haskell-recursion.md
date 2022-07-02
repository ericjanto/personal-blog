---
date: 2020-07-19
title: 'Understanding recursion in Haskell'
excerpt:
  Recursion has always been a weird and demanding method to me. It just seemed odd to me to define something in terms of itself.
  But after spending some time with defining recursive functions, I've learned to love it.
template: post
slug: haskell-recursion
tags:
  - 'computer-science'
  - 'haskell'
  - 'basics'
---

![Recursion Comic. Source: xkcd.com](../../images/recursion-xkcd.png 'xkcd on recursive patterns')

#### Prerequisites

- Basic syntax of Haskell
- [Understanding Lists in Haskell](/haskell-understanding-lists)

#### Goals

- Understand how to use basic recursion
- Learn different syntactic ways of defining recursive functions

## A Further Guide to Lists

In order to understand recursion properly, we need to know a bit more about lists. If you feel already confident with using lists you can skip to [this part](/haskell-recursion/#an-introduction-to-recursion).

In Haskell, a list can be constructed using only the cons operator `:` and the empty list `[]` as a base case.

```haskell
[4,2,9] = 4 : (2 : (9 : []))

"list"  = ['l','i','s','t']
			  = 'l' : ('i' : ('s' : ('t' : [])))
```

So when defining a list, we can add those two properties:

- a list is either empty `[]`
- or constructed `x:xs`

  where

  - `x` is the head (first element) and
  - `xs` is the tail (a list)
  - the expression `x:xs` says 'I take a head and construct it onto the tail'

```haskell
ghci> let (x:xs) = "hello"
ghci> "hello" == 'h' : ['e','l','l','o']
True
ghci> x
'h'
ghci> xs
"ello"
```

> `x:xs` is a common form of **pattern matching**. It's basically a notation to say 'hey I'm expecting the data to have this structure'. When the pattern conforms the data, we can use the variables `x` and `xs` to access the regarding data (here the head and tail of a list).

This definition given, we can deduce that every list must match one of the following two patterns:

```haskell
[] -- only matches the empty list
(x:xs) -- matches any non-empty list

-- we don't have to use exactly those variables for head & tail
-- in fact, we can use any distinct variables:

(colin:stetson)

-- or

(head':tail')
```

## An Introduction to Recursion

Now that we have some additional knowledge about lists, we can finally get started with the backbone of recursion.

### Basic Definition

Recursion allows to find concise and elegant solutions to problems. It is a way of defining a function:

- In the definition of the function, the function calls itself: **Self-Reference**.
- In terms of lists, recursion also means: defining a list in terms of a list.

As our prof said: We all know that defining something in terms of itself is not always a sensible thing to do.

> "Brexit means Brexit" </br>
> – Theresa May

But that's not how it works with recursion. Self-reference is fine as long as long as the thing, you define it in terms of, is a **smaller instance** _(for now)_.

Applying this to lists:

- We are building lists from other lists, but they are **shorter** lists. And eventually we reach a defined **base-case** which is often the empty list
- We break down a problem into smaller problems, solving those smaller problems by breaking them down too etc. until we reach the **base case** of the problem.

There are different ways of defining a recursion:

- Pattern Matching
- Conditional Expression
  - if-else-then
  - Guards

### Using Pattern Matching

When using pattern matching for recursion, we often want to use the mentioned `x:xs` pattern. Consider this example where we want to get each element of a list squared:

```haskell
squaresRec :: [Int] -> [Int]
squaresRec [] = []
squaresRec (x:xs) = x * x : squaresRec xs
```

Firstly, we defined, right after the type signature, the **base case** of `squaresRec`. When the function encounters an empty list, it returns an empty list. This makes sense because how would we square an empty list?
Then, we defined another case: when `squaresRec` encounters a list which matches the pattern `x:xs` (which is every list except the empty list), we square its head and append it to whatever is returned by `squaresRec xs`.

Notice that patterns have to be surrounded by parenthesis when they are given as a function's argument.

It's a good practice to go through each step of a recursion, especially when you want to find out why a function doesn't behave the way you want it. I like to call this technique the **robot technique** since we pretend to be a dumb robot which only knows how to compute something step by step.

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

### Using Conditional Expressions

We can accomplish the same bit of code without using pattern matching but conditional expressions.

#### if-then-else

We can use the `if-then-else` syntax. We check for a condition, if it evaluates for `True` the code block after `then` gets executed. Should the condition be `False`, another code block gets executed.

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

Here, we check in our first condition for the nullity of the function's parameter. Should the list turn out to be empty, we just return the empty list. Again, this is the **base case**.

Should the list be non-empty, we define variables for the head and tail of the list so that we can refer to them. The last line shows the actual computation which allows the function to return squared list elements.

> **Note**
>
> - `let ... in` enables local binding which is only valid in the scope of the section after `in`
> - once we leave that part, the compiler doesn't know what `x` and `xs` is; they are only in scope of `in` and nowhere else

#### Guards

We can define exactly the same function using guards. They allow to have multiple conditional expressions, but for recursion we only need to distinguish between the base case and the non-base case.

If the expression after the guard pipe `|` is true, the expression after the equal sign gets evaluated. All other expressions are ignored. Haskell goes through each guard in order, from top to bottom.

`otherwise` is a keyword which can be used to ensure that at least some expression will be evaluated should all other guards fail. It is similar to Java's `default` statement in a switch-clause.

```haskell
squaresCond' someList =
		| null someList = []
		| otherwise     =
				let x  = head someList
						xs = tail someList
				in
					x * x : squaresCond' xs
```

### Which Method of Recursion To Use

I'm confused. Why are there so many different things to accomplish the very same thing? Which way of defining a recursion should a use?

I understand that this can be a bit overwhelming at the beginning. There are many different possibilities to define a recursion because Haskell's syntax is quite versatile in that sense. This is where the **style** of coding gets exposed.

A good rule of thumb is to look out which version of a function the most **concise** and **readable** version is. I prefer to use pattern matching since it allows very short but expressive definitions.

There are, of course, other cases where you might want to go for a longer and more complicated function if it was more _efficient_. But that shouldn't be the case with recursive functions in Haskell since all different syntax versions are more or less similar in terms of efficiency.

You can test this yourself by following my [guide](/haskell-efficiency/) on how to test your Haskell processes for efficiency.

## Testing Recursive Functions

Its both common practice and a good exercise to write a list comprehension which is equivalent to our recursive function. We then can use a QuickCheck property to check the correctness of those functions (assuming that you got at least one of them right).

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

## Conclusion

We can define a function recursively by using **self-reference** and the fact that a list is either empty `[]` or constructed `x:xs`.

To distinguish between the **base case** and the default case of a recursion, we can use pattern matching or conditional espressions such as `if-then-else` or guards. Pattern matching often turns out to be more concise and readable.

To test a recursive function, it is good practice to define the same function using list comprehension and then to use **QuickCheck** to test both definitions for equality.

Sometimes we also want to go through each step of a recursive function call to spot bugs, which is called **robot technique**.

### Off-Road Knowledge

Bits of additional knowledge.

#### 1. Infinite Recursion

I stated in the definition of recursion that self-reference is okay as long as we reference to a smaller instance. That was not entirely true, we can also define something in terms of bigger instances. In that case, it would result in a never ending recursion which is sensible when we want an inifinite list to be returned.

For Example, we want to define `enumFrom m` which is equivalent to `[m..]` on our own, recursively:

```haskell
-- we focus only on integers
-- in general, enumFrom could take any enum types as parameter

enumFromRec :: Int -> [Int]
enumFromRec m = m : enumFromRec (m+1)

-- results in an infinite list
-- use-case: same as [m..] for any Integer m
```

Since Haskell is lazy, it only evaluates something if it must.

#### 2. Paeno Axioms

When thinking about recursion in Haskell, there exists an adequate analogy to the **Paeno Axioms** (Paeno, 1858 - 1932) which offers a similar approach on defining natural numbers recursively:

A natural number is either

- `zero` written `0` (equivalent to the empty list `[]`)
- or a `successor` written `n+1` with `predecessor n` (a natural number)

A simple example of defining `3` recursively:

`3 = ((0 + 1) + 1) + 1`

#### 3. Getting the only element from a list

I always used to call `head` on a list of length `1` to get its element. Often, a more elegant and also safer thing to do is to define a helper function `the` instead of calling `head` on the list:

```haskell
the :: [a] -> a
the [x] = x
the _ = error "Can't get element from empty list!"
```

That way you can define on your own terms what should happen in the case of an empty list. In our definition of `the` we just throw an error message but you can tailor the function to your own needs.

Note that in this case, `the` would also throw the empty list error when we pass a list of length 2 or more to it. Depending on the use case of your `the`-function, you might want to define something else for that case.

Sometimes, a good solution would be to make sure that the list is never empty, e.g. by adding always a base element to the end.

#### 4. 'It'

...is not only a good book. You call `it` in GHCi to refer to the last output in your console. `it` is always automatically bound to said output.

### Further Reading

- [How to Use List Comprehension in Haskell](/haskell-list-comprehension)
- Learn You a Haskell for Great Good!, M. Lipovača: `pp 51-53`


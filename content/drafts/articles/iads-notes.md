---
title: 'Introduction to Algorithms and Data Structures'
template: page
slug: iads-notes
---

_These are chronological notes for the Introduction to Algorithms and Datastructures course taught at the University of Edinburgh. They are fundamentally based on the lecture slides. A topologically structured article with in-depth explanations can be found [here](/algorithms)._

```toc
from-heading: 1
to-heading: 6
```

## 22 September 2020

### Algorithms and Data Structures Definitions

- **Algorithms**
  - Methods for solving various problems
  - To write a program, we first need to come up with a suitable algorithm
- **Data structures**
  - Ways of storing or representing data to make it easy to manipulate
  - To write a program, we first need to decide how this data should be stored and structured

### Greatest Common Divisor Algorithm

- Given 2 positive (potentially large) integers, compute the greatest common divisor (gcd)
  - gcd = the largest integer that evenly divides the two input integers

**Algorithm:**

We are given two integers $a$, $b$ and want to compute their gcd.

1. Take the remainder of whole-integer division of $a$ and $b$: $c=a\ \%\ b$.
2. If $c==1$ then $gcd=1$ (base case). Else repeat the first step where you exchange $b$ for $a$ and $c$ for $b$. You'll encounter either the basecase or $c==b$ for $c=\ \%\ b$, in which case $gcd=c$.

**Example:**

```
GCD (4851, 840) = GCD (840, 651)
                = GCD (651, 189)
                = GCD (189, 84)
                = GCD (84, 21)
                = 21
```

## 24 September 2020

### Inefficient vs Efficient Algorithms

- Often there is an obvious approach to solving a problem
- We want to show that we can improve the approach by using mathematical insight

#### Problem 1: Modular Arithmetic (n mod 9)

- Problem: Given a large decimal whole number $n$, compute $n\ \%\ 9$.
- Obvious approach: do normal division by hand, note the remainder
  - not particularly efficient, no cleverness involved
- Improved approach: casting out 9's

**Algorithm:**

1. Take $n'=$ (sum of the digits of $n$).
2. Do the same to $n'$.
3. Repeat until we get down to a single-place digit $d$.
4. If $d=9$, the answer is $0$ (since $9\ \%\ 9=0$). Else, the answer is $d$.

**Example:**

```
n = 26230496817346

2+6+2+3+0+4+9+6+8+1+7+3+4+6 = 61
                        6+1 = 7

n % 9 = 7
```

#### Problem 2: Modular Exponentiation

- Problem: Given (large) integers $a$, $n$, $m$, compute $a^n\ \%\ m$
- Obvious approach: literally compute $a^n$, then take modulo $m$
- Improved approach: fast modular exponentiation by dividing into subproblems
  - Notice that it's easy to compute $e=a^n\ \%\ m$ if we've already computed $d=a^{\lfloor n/2\rfloor}\ \%\ m$
  - If $n$ is even: $e=(d*d)\ \%\ m$
  - If $n$ is odd: $e=(d*d*a)\ \%\ m$
  - We can use a recursive algorithm which breaks the problem further down until reaching the base case of $n=0$.

**Algorithm:**

1. Base case: if $n=0$ then return $1$ (everything with $0$ as exponent evaluates to $1$).
2. Compute general case: $d = expMod(a, \lfloor n/2\rfloor,m)$. This is the recursive call.
3. If $n$ is even return $(d*d)\ \%\ m$.
4. Else return $(d*d*a)\ \%\ m$.

**Implementation:**

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

#### Primality Testing

- Procedure of testing whether a number is prime
- Using _Fermat's little theorem_: If $n$ is prime and $0<a<n$, then $a^{n-1}\ \%\ n=1$.
- Note that this is essentially an application of the [modular exponentiation problem](iads-notes#problem-2-modular-exponentiation)
  - Just choose an $a$ which is smaller than $n$ and apply algorithm

#### Problem 3: Sorting

- This is a famous problem, we'll discuss many more algorithms later
- Problem: given an array $A$ containing $n$ whole numbers, construct an array $B$ containing the same $n$ numbers in increasing order (permutation)
- Approach 1: Insert-sort
- Approach 2: Merge-sort

##### Insert-Sort

- The most straight-forward approach to solve the sorting problem
- **In-place**: we don't need to construct an additional array $B$; sorting happens withing input array $A$

**Algorithm:**

- Go through each element from left to right
  - Let's call the current element we want to insert `x`
- For each `x` we start comparing it to its left-hand elements after "taking it out of its array place"
  - until we find a smaller element, in which case we place `x` to the right of the smaller element
  - or until we have reached the start of the array, in which acase we place `x` at the very start of the array (it's the smallest element we've encountered so far)
- That "taking out" action creates an empty slot
  - allows us to move elements we compare `x` to one place to the right
  - also allows us to insert `x` once the right place is found

!['In-place Insert-Sort'](../../images/insert-sort.png 'In-place Insert-Sort')

**Implementation:**

```python
def insertSort(a):
    for i in range(1, len(a)):
        # We can skip the first element (index 0) as
        # there are no left-hand elements to compare it to
        x = a[i]  # Element to insert
        j = i - 1  # index of left-next element
        while j >= 0 and a[j] > x:
            # Keep moving elements to the right until start of array
            # or left-hand element is smaller than x
            a[j + 1] = a[j]
            j = j - 1
            a[j + 1] = x
    return a
```

##### Merge-Sort

- Another algorithm that solves the sorting problem
- Two main procedures: **splitting** the input array until the base case and then reassembling it by **merging**

**Algorithm:**

- We **split** input array `a` into two halves
  - Split these halves into two halves too etc.
  - Recursive application until we reach base case
    - **Base case**: array of length `1`
- Take split-up arrays and **merge** them
  - We have essentially 2 arrays `b` and `c` we need to merge
    - Create new array `d` where we can store sorted elements from `b` and `c`
      - Hence, `len(d) = len(b) + len(c)`
    - Start comparing elements of `b` and `c` by taking the left-most element of both and inserting the smaller one into `d`
      - Do this by keeping track of two different indices `i` and `j`, each of which indicates the current element of `b` or `c` we want to insert into `d`
      - Note that `b` and `c` are already sorted so `d` will also be filled up from smallest to largest
- Apply the merge procedure recursively to split-up arrays to build sorted array `a'` from bottom up

!['Merge-Sort'](../../images/merge-sort.png 'Merge-Sort: Black arrows represent the Split procudure, red arrows represent the Merge procedure')

**Implementation:**

```python
def merge(b, c):
    # Allocate 'empty' d of size |b| + |c|
    d = [0 * i for i in range(len(b) + len(c))]
    i, j = 0, 0  # indices for b and c

    for k in range(len(d)):
        if j >= len(c):
            # All elements from c are already inserted
            d[k] = b[i]
            i += 1
        elif i >= len(b):
            # All elements from b are already inserted
            d[k] = c[j]
            j += 1
        else:
            if b[i] < c[j]:
                d[k] = b[i]
                i += 1
            else:
                d[k] = c[j]
                j += 1
    return d


def mergeSort(a, f, t):
    # f = from, t = to; sorts segment of `a` from a[f] to a[t-1]
    if t - f == 1:
        # Base case where split-up array is of length 1
        return [a[f]]  # Need to return as array as merge(b, c) expects array input
    else:
        p = math.floor((f + t) / 2)  # index that halfs the segment that goes from f to t
        b = mergeSort(a, f, p)  # recall that this sorts to p-1
        c = mergeSort(a, p, t)
        d = merge(b, c)
    return d


def mergeAll(a):
    return mergeSort(a, 0, len(a))
```

## 29 September 2020

### Asymptotics: Little o and omega $\omega$

- We introduce **asymptotic analysis**
  - A way of making precise, quantitative statements about efficiency properties of algorithms

#### Comparing Runtimes for Insert-Sort and Merge-Sort

- Let's consider:
  - $T_I(n)$ = time taken by **Insert-Sort** on a list of length $n$
  - $T_M(n)$ = time taken by **Merge-Sort** on a list of length $n$
    - Time may vary between input lists, e.g. they may already be sorted etc.
    - We'll consider the **worst-case** times for a list, hence an input for which both sorting algorithms will take the **longest** possible time

![Comparison of Worst-time Runtimes of Merge-Sort and Insert-Sort](../../images/insert-merge-comparison.png 'Comparison of Worst-time Runtimes of Merge-Sort and Insert-Sort')

- Schematically, we get a graph like above
- $T_I$ grows much faster than $T_M$. But how can we express this?
  - **Attempt 1:** $∀n.T_M(n) < T_I(n)$
    - "For all input lists of length $n$, $T_I$ is bigger (slower) than $T_M$."
    - Attempt 1 is not true, we stated that $T_I$ has bigger runtimes _for all_ $n$
    - Note how the worst-case runtime of Insert-Sort is smaller than $T_M$ for lists of a small length
    - Only for lists longer than a certain length, Merge-Sort features a better runtime
      - Let's call that "certain length" $N$
  - **Attempt 2:** $∃N. ∀n ≥ N.T_M(n) < T_I(n)$
    - "There exists some limit N. For all lists of length $n$ which are longer (or of equal length) than $N$, the worst-case runtime of Merge-Sort is smaller than the one of Insert-Sort."
    - True, e.g. $N=100$ would do here
    - But doesn't capture the essential difference
      - We want to capture that _any_ implementation of Merge-Sort has better runtimes for large $n$, whereas this specific graph shows implementations which happen to make the above formula true for $N=100$
      - Might have different implementations or other compounding factors, so need a slightly different approach

![We give Insert-Sort an unfair advantage by running it on a machine 100 times faster](../../images/insert-merge-comparison-2.png 'We give Insert-Sort an unfair advantage by running it on a machine 100 times faster')

- **Attempt 3:** $∃N. ∀n ≥ N.T_M(n) < 0.01T_I(n)$
  - True, e.g. $N=100000$
  - Similar problem as before, what happens if we run Insert-Sort on a machine which is 1000 times faster? Or even faster than that? $N$ would always change
  - We introduce a variable $c$ which functions as a handicap factor
  - For _any_ handicap factor, no matter how close to zero (that is, how much advantage Insert-Sort has), $cT_I(n)$ will eventually overtake $T_M(n)$ in worst-case runtime: $∀c > 0. ∃N. ∀n ≥ N.T_M(n) < cT_I(n)$
- General $o$ formula, expressing $f$ is $o(g)$:

$$
∀c > 0. ∃N. ∀n ≥ N.f(n) < c*g(n)
$$

- We express the above formula by saying $T_M$ is $o(T_I)$

  - "$T_M$ is asymptotically smaller than $T_I$"

- $c$ makes the statement of $o$ robust, it's **unaffected by scaling**
  - E.g. $f = o(g) \iff 3f = o(0.2g)$

#### Proving That $f$ is $o(g)$

- **Informal:**
  - Show that $\frac{g}{f}\rarr \infty$
  - Reason: $f$ is asymptotically smaller than $g$
  - It grows slower, so for large $n$, $g$ will have much larger values and $f$ is insignificant, hence it tends to $\infty$
- **Formal:**
  - Show that $o$ formula is satisfied
    - Insert $f$ and $g$ into the formula
    - Solution is inequality:
      - "Take any $N>$"
      - Show what we have for all $n≥N$ by showing $c*g > f$ and inserting the inequality somewhere
      - I know this explanation is not perfect, I'm still not very good at this, might improve later
- **Disproving:**
  - Show that $o$ formula is not satisfied
  - Use negation of the $o$ formula
    - Recall that negated quantifiers switch from existential to universal and vice versa
  - Solution is a value for $c$ so that the negated formula is satisfied

#### Mathematical Notation around $o(g)$

- Officially, $o(g)$ is a _set_: the set of all $f$ that "are $o(g)$"

$$
o(g) = \{f : \mathbb{N} → \mathbb{R}_{≥0}\ |\ ∀c > 0. ∃N. ∀n ≥ N. f (n) < cg(n)\}
$$

- "The set $o(g)$ consists of all functions $f$ which map a natural number input to a real number which is $≥0$, and $f$ must satisfy the $o$ formula."
  - In our example, the natural number input is a list of length $n$
  - The real number output is the runtime to sort the list
- It is common convention to losen up that mathematical rigor:
  - For instance, we can write $f(n)=3n^2+o(n)$ which means "$f$ is a function which consists of the sum of $3n^2$ and some other function which is $o(n)$"
    - This is enough to know about $f$ if we're only interested in asymptotic properties!

#### Reducing Clutter Using $o$

- Useful when we're only interested in the **broad headlines** of how some function behaves
- For instance, can read $3n^2+o(n)$ as "$3n^2$ plus **small change**"

![Example of Reducing Clutter Using o](../../images/clutter-example.png)

- Generally, it helps to sketch graphs to understand what's going on! (very useful piece of advice!)

#### Introducing Little Omega: $\omega$

- Essentially the same as $o$
- Recall the $o$ formula

$$
∀c > 0. ∃N. ∀n ≥ N.T_M(n) < cT_I(n)
$$

- "$f$ is asymptotically smaller than $g$" is logically the same statement as "$g$ is asymptotically larger than $f$"
- We can express the latter by writing $g=\omega (f)$

$$
∀C > 0. ∃N. ∀n ≥ N.Cf(n) < g(n)
$$

- Note how the only difference is the position of the handicap factor $C$ (uppercase to have a further distinction)
  - Now in front of $f$, meaning that no matter how large $C$ is, $g$ will still be larger than $f$ (after some value $N$)
- Also, $f=o(g)\iff g=\omega (f)$
- For this course, use the $o$ notation
- The same proof and "reducing clutter" techniques for $o$ apply too

## 1 October 2020

### Theta $\Theta$, Big O and Omega $\Omega$

We introduce more set notations.

#### Big O

![Graph of two functions f and g, visualising "f is O(g)"](../../images/big-o.png)

- $f$ is $O(g)$
  - Reads as "$f$ grows no faster than $g$"
  - Hence, $g$ is an **asymptotic upper bound**
- Very similar to $o$
  - Difference: we only care about behaviour "in the limit", can disregard small values of $n$
  - We care about whether $f$ is _eventually_ bounded above by some multiple $Cg$ of $g$

$$
∃C > 0. ∃N. ∀n ≥ N. f (n) ≤ Cg(n)
$$

- "There exists some constant $C$ (greater than $0$). There exists some "
- Note the difference to $o(g)$ or $\omega(g)$ where we want to prove certain properties for all values of the constant $C$

  - This means that for $O(g)$ it's sufficient to find _some_ constant which makes the formula true

- $o(g)$ is a tighter bound than $O(g)$
  - $f=o(g)$ implies $f=O(g)$
    - But not conversely
- **Proving** that $f$ is $O(g)$
  - Again, only need to show that formula is satisfied
  - Insert $f$ and $g$ into formula
  - Find suitable $C$ and $N$
    - No need to find values for $C$ and $N$ which make the inequality _just_ true, there's a bit of freedom

#### Big Omega $\Omega$

![Graph of two functions f and g, visualising "f is Omega(g)"](../../images/big-omega.png)

- $f$ is $\Omega(g)$
  - Reads as "$f$ grows no slower than $g$"
  - Hence, $g$ is an **asymptotic lower bound**
- Dual to $O(g)$
  - Want to show that $f$ is _eventually_ bounded below by some sufficiently small multiple $cg$ of $g$

$$
∃c > 0. ∃N. ∀n ≥ N. cg(n) ≤ f (n)
$$

- Very similar to $O(g)$
  - In fact, $f=\Omega(g)\iff g=O(g)$

#### Theta $\Theta$

- $f$ is $\Theta(g)$
  - Reads as "$f$ has the same essential growth rate as $g$"
  - Or, $g$ is an **asymptotically tight bound** for $f$

$$
f = \Theta(g) \iff f = O(g)\ and\ f = \Omega(g)
$$

- Or equivalently,

$$
∃c_1, c_2 > 0. ∃N. ∀n ≥ N. c_1g(n) ≤ f (n) ≤ c_2g(n)
$$

- This is just a combination of the formulae for $O(g)$ and $\Omega(g)$!

  - Can prove $O(g)$ first and then $\Omega(g)$ or vice versa, whatever is easier

- Often used when we have a complicated function (e.g. $T_M(n)$ and want to describe its asymptotic behaviour using a simpler function)
  - E.g. $T_I$ is $\Theta(n^2)$ and $T_M$ is $\Theta(n\ lg\ n)$

### Overview of the Gang of Five

| Gang of Five        | Formula                                                  | Meaning                                      | Informal Proof                       |
| ------------------- | -------------------------------------------------------- | -------------------------------------------- | ------------------------------------ |
| $f$ is $o(g)$       | $∀c > 0. ∃N. ∀n ≥ N.f(n) < cg(n)$                        | $f$ is **asymptotically smaller** than $g$   | $\frac{g}{f}\rarr \infty$            |
| $f$ is $\omega (g)$ | $∀C > 0. ∃N. ∀n ≥ N.Cf(n) < g(n)$                        | $g$ is **asymptotically larger** than $f$    | $\frac{g}{f}\rarr \infty$            |
| $f$ is $O(g)$       | $∃C > 0. ∃N. ∀n ≥ N. f (n) ≤ Cg(n)$                      | $g$ is an **asymptotic upper bound** for $f$ | Cancel out non-dominant terms        |
| $f$ is $\Omega(g)$  | $∃c > 0. ∃N. ∀n ≥ N. cg(n) ≤ f (n)$                      | $g$ is an **asymptotic lower bound** for $f$ | Cancel out non-dominant terms        |
| $f$ is $\Theta(g)$  | $$∃c_1, c_2 > 0. ∃N. ∀n ≥ N. c_1g(n) ≤ f (n) ≤ c_2g(n)$$ | $g$ is an **asymptotic tight bound** for $f$ | $\frac{g}{f}\rarr C$ (some constant) |

## 6 October 2020

### Algorithms and Cost Models

- We're interested in the **cost** of various algorithms
  - There are different notions of cost, e.g. runtime, memory use, disk operations
- To analyse the cost, we need some **cost model**
  - that's a definition of how we intend the cost to be measured
- Cost model examples:
  - Runtime
  - Number of comparisons (<) between items
  - Number of basic steps performed, e.g. machine instructions for some machine model
    - A single machine instruction could be `v = 1`, translated into binary machine language

### Best Case, Worst Case, Average Case

*Note that the below explained concepts do not only apply to the cost model of runtime but other cost models too.*

- Assume we have an input array of length $n$
  - There are different kinds of possible inputs, even for fixed $n$
  - Could be already sorted, or almost sorted but the first two elements, not sorted at all etc.
  - Hence, different kinds of inputs of length $n$ result in different runtimes for sorting algorithms!
- We distinguish between
  - Worst case runtime: we pass the worst possible input to the algorithm, the runtime is the largest
  - Best case runtime: we pass the input that is the easiest to handle for the algorithm (e.g. already sorted input for Insert-Sort), the runtime is the smallest
  - Average runtime:
- All these runtimes are possible for a single algorithm
  - We basically consider all above cases as three different "functions" of an algorithm we can analyse asymptotically

!["Best/Worst/Avg Case for Insert-Sort, Schema"](../../images/best-worst-avg.png "Best/Worst/Avg Case for Insert-Sort, Schema")

- We are mainly concerned with the worst case during this course, so **just make sure that you don't confuse worst/best/avg with $O(g)/\Omega(g)\Theta(g)$**

### Number of Comparisons Analysis (Insert-Sort)

- Our cost model: number of comparisons
- Consider the code of the algorithm you want to analyse
  - Look for the lines where comparisons are happening
    - Check if they are in any `while` or `for` loops and consider the "size" of these loops
      - E.g. if a loop containing one comparison statment runs from `0` to `n`, then we have $O(n)$ comparisons in that loop ($O$ since we envoke the comparison at most `n` times)

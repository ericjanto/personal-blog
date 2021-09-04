<!-- ---
slug: haskell-quickcheck
tags:
  - 'haskell'
  - 'quick-tip'
  - 'basics'
--- -->

### Prerequisites

- How to write functions in Haskell

### Goals

- Theory: what is QuickCheck?
- Method: how exactly can I use QuickCheck?
- Application: when should I use QuickCheck?

---

```haskell
import Test.QuickCheck
```

If you want to quickly check a property within GHCi, you can import QuickCheck by `import Test.QuickCheck`.

---

```haskell
prop_sum :: Int -> Property
prop_sum n = n > 0 ==> sum[1..n] == n * (n+1) `div` 2
```

- `n > 0` is a property
- it tests 100 cases where this property holds
- kind of lets you define what kind of arguments quickcheck can take (only pos / neg etc)

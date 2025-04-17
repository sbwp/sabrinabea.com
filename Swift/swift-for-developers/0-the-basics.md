---
title: The Basics
parent: Swift For Developers
nav_order: 0
---
## The Basics
Swift is a strongly-typed, object-oriented language created and maintained by Apple with close collaboration with a vibrant open source community. It's main uses are for native app development on Apple's operating systems, but it is also used for server-side development and has implementations for Linux and Windows.

Variables are declared using the keyword `var` followed by the variable name, and constants are declared using the keyword `let` in place of `var`.

```
var myVar = "Hello"
let myConst = 58

myVar = "Yes" // valid
myConst = 17 // not valid
```

Comments use the standard format of `//` for a line comment and `/* ... */` for a block comment.

Although Swift does have type inference, it is *very* strongly typed. This means that if you declare and assign a variable at the same time, you can skip typing the type name.

```
var oneStr = "Hello"
var twoStr: String = "Hello"
```

Type names are specified by putting a colon after the variable name, followed by the type name. One thing that Swift does a little different from other languages is how you write array types:
```
var strArr: [String] = ["Hello", "Bye", "Thanks", "No Problem"]
```

This notation is meant to be a bit more intuitive than the typical notation found in similar languages, with the brackets after the type name, as it is clear which type is inside the array. This is also apparent with jagged arrays:

```
var strArrArr: [[String]] = [
    ["Hi", "Bye"],
    ["Thanks", "Yup"]
]
```

Another thing that may stand out depending on what language(s) you're coming from is the lack of a statement terminator like `;`. Unlike JavaScript, where semicolons are optional but recommended due to unexpected behavior when omitted, semicolons are only needed in Swift when writing multiple statements on the same line, which you should never do anyway.

Since Swift aims for simplicity, cutting out any unneeded syntax, many situations where you would normally add parentheses do not need parentheses in Swift, and in some cases, they are not allowed.

Example:
```
let strArr = ["This", "is", "an", "array", "of", "Strings"]

// Correct
if strArr.isEmpty {
    print("The array is empty")
}

// Compiles, but parentheses are redundant
if (strArr.isEmpty) {
    print("The array is empty")
}

// -----------------------------------------

// Correct
for str in strArr {
    print(str)
}

// Will not compile
for (str in strArr) {
    print(str)
}

// Compiles, but parentheses are redundant
for (str) in (strArr) {
    print(str)
}
```

Note that the parentheses are valid in the if condition only because the condition is an expression, which may contain parentheses. The parentheses are not valid in the for loop because they contain the `in` keyword, which is part of the `for ... in` syntax, not part of an expression.

Swift also does not have primitive types. The standard library provides the basic types as structs. In later sections we'll cover some topics that hopefully give some context on the benefits of this approach, but for now the important takeaway is that the basic types you would expect to be primitive have uppercase names, initializers, functions, and properties.

Some of these types include:
```
let str: String = "Foo"
let c: Character = "F"
let x: Int = 12
let y: Float = 3.5
let z: Double = 2.5
```
Notice that the `Character` type uses double quotes, not single quotes. This is a common mistake due to the difference from similar languages.

[Next: Value Type vs Reference Type](1-struct-class.md)

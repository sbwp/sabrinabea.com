---
title: Hoisting And Scope
parent: So You Think You Know JavaScript
nav_order: 6
---
[Previous: Not the Inheritance You Expected](5-prototype.md)

### Hoist Yourself Up
The first thing a lot of people hear about JavaScript is that it doesn't matter what order we declare and use variables in, because the declaration will get hoisted to the top of the file or function. Let's look at an example:

```
var z = 'potato';

function doSomething() {
    console.log('foo');
    var x = 'bar';
    console.log(x);
}

var y = 'lettuce';

console.log(z + 'with' + y);
```

This gets hoisted to:

```
var z;
var y;

z = 'potato';

function doSomething() {
    var x;

    console.log('foo');
    x = 'bar';
    console.log(x);
}

y = 'lettuce';

console.log(z + 'with' + y);
```

For this reason, it was a common best practice back in ES5 and earlier to put all of the variable declarations at the top of the function they were declared in (or the top of the file if they were declared globally). That way, it would be more apparent how it would be processed after hoisting.

### Let's Scope This Out

According to the Oxford English Dictionary, scope is, "The extent of the area or subject matter that something deals with or to which it is relevant." That is exactly what it means in code, so a variable's scope is the context in which that variable is relevant (valid/accessible).

We cannot access a variable outside of its scope:

```
function doSomething() {
    var x = 5;
    console.log(x);
}

console.log(x); // This won't work!
```


In ES5 and earlier, all JavaScript variables had function scope. This can lead to some unexpected situations such as this example:

```
function doSomething() {
    for (var i = 0; i < 3; i++) {
        console.log(i);
    }

    console.log('Final value of i:', i);
}

doSomething();
```
```
> 0
  1
  2
  Final value of i: 3
```

Even though `i` was declared inside the for loop, it is accessible outside of the loop. In this example it doesn't seem particularly dangerous, but consider this example:
```
// Adds all numbers that are either a multiple of seven
// or their digits add to seven
function getTheSum(numbers) {
    var sum = 0;

    for (var i = 0; i < numbers.length; i++) {
        var n = numbers[i];
        var shouldAdd = false;

        if (n % 7 === 0) {
            shouldAdd = true;
        } else {
            var digits = n.toString();
            var sum = 0;

            for (var j = 0; j < digits.length; j++) {
                sum += parseInt(digits.charAt(j));
            }

            if (sum === 7) {
                shouldAdd = true;
            }
        }

        if (shouldAdd) {
            sum += n;
        }
    }

    return sum;
}

console.log(getTheSum([22, 7, 4, 16, 8, 49, 34]));
```
This code should add `7 + 16 + 49 + 34` and return `106`, but instead it returns `41`.

Do you see the flaw in this program? The problem is that `sum` is defined inside and outside of the loop. JavaScript hoists the variable definition to the top of the function `getTheSum`, which means that the two `var sum` declarations are in the same scope.

Here is what this function looks like after hoisting:
```
// Adds all numbers that are either a multiple of seven
// or their digits add to seven
function getTheSum(numbers) {
    var sum;
    var i;
    var n;
    var shouldAdd;
    var digits;
    var j;

    sum = 0;

    for (i = 0; i < numbers.length; i++) {
        n = numbers[i];
        shouldAdd = false;

        if (n % 7 === 0) {
            shouldAdd = true;
        } else {
            digits = n.toString();
            sum = 0; // <---------------

            for (j = 0; j < digits.length; j++) {
                sum += parseInt(digits.charAt(j));
            }

            if (sum === 7) {
                shouldAdd = true;
            }
        }

        if (shouldAdd) {
            sum += n;
        }
    }

    return sum;
}

console.log(getTheSum([22, 7, 4, 16, 8, 49, 34]));
```

After hoisting, the issue is much more apparent. When we set `sum` to `0` in the inner block, we're using the same `sum` defined above.

This means that while processing the last number, `34`, the function resets `sum` to `0`, then adds the digits of `34` (which is `7`), and then adds `34` to `sum` to get `41`.

ES2015 solves this by introducing two new keywords, `let` and `const`. Variables declared using these keywords have block scope. Essentially this means that the variables are defined only within the set of curly braces that the definition is contained within (the parentheses of a `for` loop are treated like a block that contains the actual block of the loop).

Let's try our first example using the `let` keyword instead.

```
function doSomething() {
    for (let i = 0; i < 3; i++) {
        console.log(i);
    }

    console.log('Final value of i:', i);
}

doSomething();
```
```
> 0
  1
  2
x Uncaught ReferenceError: i is not defined
    at <stack trace>
```

Now the scope of the variable is correctly limited to the block in which it is used. If we replace `var` with `let` in our `getTheSum()` example, it returns `106` as expected.

If you've uses other languages with constants before, you can probably guess that the difference between `let` and `const` is that `const` defines a constant and `let` defines a variable. However, you have to be careful because "constant" means something different in different languages.

In languages like C and Swift, constants refer to values that deeply cannot be modified (are immutable). Once an object is declared as a constant, the value must be copied elsewhere before it or any of its properties can be modified.

In JavaScript, however, `const` just means we can't reassign the variable, so the "constantness" (immutability) is shallow.

This means that the following code is valid:
```
const martin = {
    name: "Martin Banks",
    job: "Data Entry Clerk",
    location: "London, England, UK",
    time: new Date("April 15, 2012 11:17:54")
};

martin.time = new Date("May 1, 1150 10:30:00");
```
But this is not:
```
const martin = {
    name: "Martin Banks",
    job: "Data Entry Clerk",
    location: "London, England, UK",
    time: new Date("April 15, 2012 11:17:54")
};

martin = {
    name: "Phillip McCall",
    job: "Programmer",
    location: "Murray Hill, New Jersey, USA",
    time: new Date("June 17, 1984 15:31:45")
};
```

When writing modern JavaScript, you should use `const` by default, and change it to `let` if and when you decide to reassign the variable. This can be made easier by using an IDE that will warn you if a `const` is reassigned or if a `let` isn't. Never use `var`, because it leads to confusion.

[Next: Templated String Literals](7-templated-string-literals.md)

[Table of Contents](0-intro.md)

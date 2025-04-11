<!-- TODO: All content will go in this file, to be moved around and broken down later -->
# Intro to Programming, with JavaScript
This course provides an introduction to programming, using the programming language JavaScript. It assumes no prior knowledge of programming.

One thing to note is that because this course attempts to avoid using anything in a coding sample that has not yet been covered, some examples will intentionally use a suboptimal way of solving a problem or not make use of a feature that has not yet been covered in order to avoid confusion or distraction from the point of the section.

This is a work in progress, but I decided I'd rather merge in what I have so far than leave it in a branch since I probably won't be finishing it for a while.

## Setup
_Simple Setup:_  
I wanted to focus as much as possible on programming itself rather than setup and tooling in this, so my recommended setup for this course is to simply visit [https://playcode.io/new/](https://playcode.io/new/) in your browser.

There are a lot of elements on the screen that you can ignore, but if you want to simplify your view, you can close the "RESULT VIEW" tab in the bottom right corner of the screen as well as the "index.html" and "style.css" tabs at the top of the screen. If at any point you accidentally close "script.js", you can reopen it by clicking on "script.js" on the left side bar under the "JS" header. If you accidentally close "CONSOLE", you can re-open it by clicking the button in the top left of the screen that is a rectangle with `>_` inside. If you need to refresh the view entirely and clear out your changes, simply refresh the page.

_Optional Advanced Setup:_  
If you want to try something more complex and/or want to save your code for later, I would recommend installing Node.JS and Visual Studio Code (available on Windows/macOS/Linux).

Once those are installed properly, open VS Code and click "Open Folder". Select a folder that will contain your code, creating one if necessary.

In the bar on the left side of the screen, next to the name of your folder, look for an icon with a piece of paper with a plus sign in the top left corner. This is the create file button. Name the file something ending in the file extension `.js` (e.g. `my-code.js`). This is where your code will go.

To run it, open the command line/terminal within VS Code by pressing `Ctrl` + `` ` `` (the button to the left of 1 on your keyboard), type the command `node my-code.js` (replacing `my-code.js` with the name of your file if it's different), and press the ENTER key to run the command.

## What's a Program?
A program is a series of instructions for a computer to follow in order to do something. You can think of it kind of like a recipe that the computer follows:
> &nbsp;  
> _Don't try this at home. This is **not** a real recipe._
> 1. Preheat the oven to 350 degrees.
> 2. In a large mixing bowl, combine 3 eggs, 2 cups of flour, and 1 cup of sugar.
> 3. Beat the mixture until there are no chunks.
> 4. Form the dough into 1-inch balls and place on a baking sheet.
> 6. Bake for 30 minutes or until golden brown.  
     > &nbsp;

The only difference is that when you read a recipe, you are able to use common sense to fill in the gaps. For example, in the above recipe, I did not say to put the baking sheet into the oven. I also did not specify what type of oven you should use or with what you should beat the mixture.

You could follow this recipe as follows:

1. Start a fire inside your microwave oven until it reaches 350 degrees Celsius.
2. Put 3 whole eggs (including shell), 2 drinking glasses full of coconut flour, and 1 coffee mug full of sugar into a 500-gallon mixing bowl.
3. Take a baseball bat and smack the mixture until there are no chunks of dough stuck to the bat.
4. Use your mouth to form the dough into 1-inch balls and place them on your neighbor's baking sheet.
5. Put an old t-shirt into the flaming microwave for 30 minutes or until it turns golden brown.

However, [humans](https://www.youtube.com/watch?v=78G3yhp4MG0) will try to apply common sense to a recipe and fill in those gaps in a more reasonable way. A computer, however, needs more precise instructions.

Because of this, human languages, like English, are not a good fit for giving instructions to a computer. Instead, we use a _programming language_. Once such language is _JavaScript_.


### Your First Program
Let's look at a really simple program, written in JavaScript, that simply shows the phrase "Hello, world!" on the screen:
```JavaScript
console.log('Hello, world!');
```

```Java
public class Main {
    public static void main(String[] args) {
        System.out.printLn("Hello, world!");
    }
}
```

```Python
print("Hello, world!")
```

If any of this is a bit confusing now, don't worry too much. It should make sense later when you have more context, but let's try to break down what we are saying here:

1. The word `console` here is referring to the JavaScript console, the place on screen where messages from the program are displayed.
1. The `.` after the word `console` says that we want to access some of the information or capabilities of `console`.
1. The word `log` refers to the capability of logging (writing or printing) text to the `console`.
1. The parentheses wrap around the information that we want to provide to the logging capability.
1. The single quotes (`'`) wrap around text that will be used by the program as data. You can also use double quotes (`"`) instead, but we will use single quotes (`'`) since that is the more common choice in JavaScript.
1. The text `Hello, world!` is the text we want logged to the console.
1. The semicolon (`;`) at the end of the line is like a period at the end of a sentence in English. It signifies the end of a complete instruction, or _statement_.

If we run this program, we will see the following in the console:
```
Hello, world!
```

Try this out for yourself, and try changing `Hello, world!` to something else. You should see your text in the console.

Congratulations, you've written your first program!

## Invariably
Before we can move on to more complex programs, we need a way to keep track of the data we're using in our program. To do that, we use _variables_. A variable is like a box with a label on it. Consider the following recipe:

1. In a large mixing bowl, combine 2 eggs, 1 cup of flour, 1 cup of sugar, and a stick of butter.
1. Put this bowl into a box and write "cookie dough" on the box.
1. In another large mixing bowl, combine 2 cups of flour, 1 cup of water, and a dash of salt.
1. Put this bowl into a box and write "pasta dough" on the box.
1. Take the dough out of the "cookie dough" box and form it into 1-inch balls and place evenly on a baking sheet.

In step 5, we are able to differentiate between the two types of dough based on the labels we gave them. Variables serve a similar purpose. Let's add a variable to our "Hello, world!" program to see how they work in JavaScript:

```JavaScript
let message = 'Hello, world!';
console.log(message);
```

Once again, let's break this code down one piece at a time.

1. The word `let` means that we are creating a new variable (rather than providing a new value for an existing variable). Think of the meaning of 'let' as in, "Let there be light!", or in this case, "Let there be a variable whose name is `message`!"
1. The name of this variable is `message`. Think of it like the label we write on the side of the box in the recipe example.
1. The `=` sign separates the variable name from the value we are "storing inside" the variable.
1. `'Hello, world!'` represents the text `Hello, world!` just like in the last example. This is the value we will store in the variable `message`.
1. Once again we end the statement with a semicolon (`;`).
1. In the next line notice that when we use the variable `message`, it works just like if we took the contents of the variable and put them there instead.

If you try this out for yourself, you will see that the program still puts the message `Hello, world!` into the console. Notice also that if you read this line out loud, it sounds exactly like what the code does, "Let message equal Hello, world!"

### Reassigning a Variable
We can also modify or replace the value of a variable. Let's modify the recipe from earlier as an example:

1. In a large mixing bowl, combine 2 eggs, 1 cup of flour, 1 cup of sugar, and a stick of butter.
1. Put this bowl into a box and write "cookie dough" on the box.
1. In another large mixing bowl, combine 2 cups of flour, 1 cup of water, and a dash of salt.
1. Put this bowl into a box and write "pasta dough" on the box.
1. Add chocolate chips into the "cookie dough" box.
1. Take the dough out of the "pasta dough" box and put 6 eggs into it.

Let's see how that looks in code:
```JavaScript
let message = 'Hello, world!';
message = 'Hello, variables!';
console.log(message);
```

Let's break this down:

1. First we assign the value `'Hello, world!` to the variable `message`.
2. Next, we assign the value `Hello, variables!` to the variable `message`, replacing the previous value.
3. We log the value of `message`, which is now `Hello, variables!`.

One thing worth pointing out is that you don't need to provide a value when creating a new variable. We are really doing two steps in the line:
```JavaScript
let message = 'Hello, world!';
```

1. We are creating, or _declaring_, a new variable named `message`.
1. We are assigning a value (`'Hello, world!'`) to the variable.

We can break down these steps into separate lines like this:

```JavaScript
let message;
message = 'Hello, world!';
```

In general, you will usually want to provide a value when you declare a variable, but later in this course we will run into situations where we will need to do these steps separately.

## Literally
A literal value (sometimes just called a literal) is a value that is not stored in a variable. We've already seen literals in the examples we've looked at previously:

```JavaScript
let message = 'Hello, world!';
```

In this example, we declared a variable called `message`, and initialized it (set its value for the first time) to the literal value `'Hello, world!'`.

### Literal Types
There are a few different _types_ of literal values that can appear. We've already seen how to represent text. A value of this type is called a `string`. You can find the type of a value (literal or variable) using the `typeof` operator:

```JavaScript
let x = 'This value is stored in a variable';
console.log(typeof x);
console.log(typeof 'Hello, world!');
```

_Console:_
```
string
string
```

The other two types of literal values you're likely to run into are `number` and `boolean`. A `number` is exactly what it sounds like, any numeric value:

```JavaScript
console.log(typeof 2);
console.log(typeof 215_902_168);
console.log(typeof 3.4271);
```
_Console:_
```
number
number
number
```

_Note: Above we used underscores to improve readability of the large number `215_902_168`, similar to how we may write "215,902,168" (or in some countries "215.902.168" or "2.1590.2168") just to break up the number into smaller pieces for legibility. We use underscores because they have no other meaning in this context. They are completely optional and can be placed between whichever numbers you want without changing the value. This means that `1234`, `1_234`, and `1_2_3_4` all have the same value._

The final type of literal value is a `boolean`, which is just a fancy way of saying `true` or `false`. Those are the only two values a boolean can be set to, and they are written without quotes*.

&ast; This is important: `'true'` is not the same value as `true`. We'll see later why it is especially important that `'false'` is not the same value as `false`.

```JavaScript
console.log(typeof true);
console.log(typeof false);
console.log(typeof 'true');
console.log(typeof 'false');
```

_Console:_
```
boolean
boolean
string
string
```


## Hello, Operator!
Now it's time to make computers do what they were built to do: compute.

```JavaScript
console.log(3 + 4);
```
_Console:_
```
7
```
Here we log the result of adding `3` and `4`. We can see that in the console, we get the value 7. The `+` operator works just like it does in math, taking the two numbers around it and calculating their sum.

<br />

We can also add variables:
```JavaScript
let a = 3;
let b = 4;
console.log(a + b);
```
_Console:_
```
7
```

Here we define two variables, `a` and `b`, which we assign with the values `3` and `4`, respectively. We then log the sum of these two numbers, which we do using the `+` operator. It works just like adding numbers, adding the values on the left and right of it.

<br />

We can also assign the sum to a variable:
```JavaScript
let a = 3;
let b = 4;
let c = a + b;
console.log(c);
```
_Console:_
```
7
```

<br />

And we can mix and match numbers and variables:
```JavaScript
let a = 3;
let b = a + 4;
console.log(c);
```
_Console:_
```
7
```

<br />

In addition to the `+` operator for addition, we have `-` for subtraction, `*` (Shift + 8) for multiplication, and `/` (forward slash, to the right of `.`) for division:

```JavaScript
console.log(3 + 4);
console.log(10 - 7);
console.log(3 * 4);
console.log(10 / 2);
```
_Console:_
```
7
3
12
5
```

<br />

One final thing to note before moving on is that we can use a variable when calculating a new value for itself:

```JavaScript
let a = 3;
a = a + 4;
console.log(a);
```
_Console:_
```
7
```

Here we set the value of `a` to be `3`. Then we set the new value of `a` to be the result of adding `4` to the previous value of `a`. If you don't fully understand this, I recommend stopping and playing around with this on your own until you understand it before moving forward.

## Challenge #1: Converting Fahrenheit to Celsius
With these tools, we are ready to tackle our first challenge: write a program to convert a temperature from degrees Fahrenheit to degrees Celsius. The steps to do this are:

1. Subtract 32 from the temperature in degrees Fahrenheit
1. Divide that number by 1.8
1. Log the result

You can use any number as the starting temperature in Fahrenheit. To test your application, you can try the following test values:

* -40°F = -40°C
* 0°F = -17.7778°C
* 32°F = 0°C
* 45.5°F = 7.5°C
* 71.6°F = 22°C
* 212°F = 100°C
* 451°F = 232.778°C

> NB: If the values are very slightly off (e.g. 21.9999999 instead of 22), don't worry about it. The details are beyond the scope of this course, but the kind of calculations we are doing here have a slight margin of error because of how computers work, and different techniques are required when precision is important.

After you've tried the challenge yourself, you can compare your solution with the solution below.

<details> <summary>Solution (Click to Show)</summary>

```JavaScript
let fahrenheit = 212;
let celsius = fahrenheit - 32;
celsius = celsius / 1.8;
console.log(celsius);
```
_Console:_
```
100
```

Note that your solution may differ slightly. As long as the correct values appear in the console, that's fine!

</details>

<br />

<!-- TODO: This should be a page break because it will spoil Challenge #1 -->
## What's Your Function?
With your solution to the first challenge, you can easily convert one temperature from Fahrenheit to Celsius, but what if you needed to convert many temperatures?

You could copy and paste the code a bunch of times, replacing the number each time, but then what if you notice a mistake? You'd have to fix it for each copy of the code.

What we need is a way to use the same bit of code multiple times, with a different starting value. To do this, we can use a _function_.

Here is an example of a function in action:
```JavaScript
function fahrenheitToCelsius(fahrenheit) {
    let celsius = fahrenheit - 32;
    celsius = celsius / 1.8;
    console.log(celsius);
}

fahrenheitToCelsius(32);
fahrenheitToCelsius(71.6);
fahrenheitToCelsius(212);
```
_Console:_
```
0
22
100
```

There's a lot to unpack here, so let's break it down bit-by-bit:

1. The word `function` tells us that we are creating a new `function`.
1. Then we give the function a name, we name ours `fahrenheitToCelsius`.
1. The parentheses wrap around the information, or _parameters_, our function needs. In this case, we need one bit of information, the temperature in degrees Fahrenheit, which we label as `fahrenheit`.
1. After the parentheses, we wrap the function's behavior in curly braces (`{` and `}`, which you can type by pressing Shift + `[` and Shift + `]`). These separate the function's code from the rest of the program.
1. Inside the function, notice that we are able to use `fahrenheit` just like any other variable.
1. Then we call the function 3 times with different temperatures in Fahrenheit. We do this by writing the name of the function, `fahrenheitToCelsius`, followed by a set of parentheses. Between the parentheses, we write the value we want to use for the parameter `fahrenheit`.

Try creating a function out of your own Fahrenheit to Celsius code. If you would like an additional challenge, try implementing a `celsiusToFahrenheit` function (multiply the degrees Celsius by 1.8 and then add 32).

### A Return to Form
In the previous example, our function logged the result to the console, but what if we wanted to do more computations with the result? For example, what if we want to double the temperature in Celsius after the conversion?

We can access our result by _returning_ it from the function. Returning a value is really easy. All you do is write the `return` keyword, followed by the value you want to return:
```JavaScript
function fahrenheitToCelsius(fahrenheit) {
    let celsius = fahrenheit - 32;
    celsius = celsius / 1.8;
    return celsius;
}

console.log(fahrenheitToCelsius(32) * 2);
console.log(fahrenheitToCelsius(71.6) * 2);
console.log(fahrenheitToCelsius(212) * 2);
```
_Console:_
```
0
44
200
```

Here we can see that when the function returns a value, we can use the function call as if it were a value. In this example, we multiply the result by 2 and then return it. I know this is a common area for confusion in people new to programming, so here is another example showing a few ways a function's return value can be used. Play around with these examples and modify the code on your own until you are comfortable with how this works:

```JavaScript
function fahrenheitToCelsius(fahrenheit) {
    let celsius = fahrenheit - 32;
    celsius = celsius / 1.8;
    return celsius;
}

let result1 = fahrenheitToCelsius(32);
console.log(result1 * 2);

let result2 = fahrenheitToCelsius(71.6) * 2;
console.log(result2);

console.log(fahrenheitToCelsius(212));
```
_Console:_
```
0
44
100
```

### Multiple Parameters
Some functions require more than one parameter. In this case, the parameters are separated by commas, both when defining the function and when using it:

```JavaScript
function average(x, y, z) {
    let sum = x + y + z;
    return sum / 3;
}

let result = average(1, 2, 3);
console.log(result);
```
_Console:_
```
2
```

We've actually already been using a function since the very beginning that takes multiple parameters: `console.log`. If you provide multiple parameters to console.log, they will all be printed, one after the other:

```JavaScript
console.log(1, 2, 3);
```
_Console:_
```
1 2 3
```

### No Parameters
Functions can also have no parameters. This is useful when we want to run the same code multiple times, but there is no input needed that changes each time. In this case, we just don't put anything between the parentheses:

```JavaScript
function whatDoesTheFoxSay() {
    console.log('kfajsdfaspfuiasdfaui');
}

whatDoesTheFoxSay();
```
_Console:_
```
kfajsdfaspfuiasdfaui
```

## How Typical
Earlier we covered the basic literal types `string` (e.g. `'hello'`), `number` (e.g. `5`), and `boolean` (e.g. `true`). Let's now go over the rest of the types you will need for this course, and provide a slightly more formal definition for the ones we've already seen.

There are currently nine types in JavaScript, but for the purposes of this course, we will only cover six:
* A `number` is any number with or without a decimal point (e.g. `4`, `123`, `8.92`)
* A `string` is a sequence of 1 or more characters representing text, which when used in code must be wrapped in quotes (e.g. `'Hello'`, `'123'`, `'Hello, world!'`)
* A `boolean` is a true/false value (e.g. `true`, `false`)
* A `function` is a piece of reusable behavior that can be provided values and may or may not return a result. See the previous section for examples.
* The value `undefined` gets its own special type. This is the default value of variables or parameters that haven't been assigned a value.
* An `object` is a structure containing multiple properties. We have seen one object so far: `console`.

If you want to learn about the other types or more in depth about these types after completing this course, check out [the section _Just My Type_ in So You Think You Know JavaScript](../So%20You%20Think%20You%20Know%20JavaScript/1-type.md).

One thing that JavaScript does a little differently from many other programming languages, is that it doesn't restrict variables to containing a particular type. This allows us to do things like this:

```JavaScript
let someVariable = 'this is a string';
console.log(someVariable.toUpperCase());

someVariable = 5;
console.log(someVariable + 7);

someVariable = true;
console.log(!someVariable);

someVariable = function () {
    console.log('hi');
}
someVariable();

someVariable = undefined;
console.log(someVariable);

someVariable = console;
someVariable.log('test');
```
_Console:_
```
THIS IS A STRING
12 
false 
hi
undefined 
test
```

If anything in the latter half of that example is confusing, don't worry about it, but feel free to pause and ponder on it for a bit before moving on. We will address it in future sections, but it's always good to try and think through things you don't understand.

### Arrays
One thing that is not a type in JavaScript, but often feels like it should be, is an array. An array is an object representing an ordered list of values. They are notated by wrapping the comma-separated list of values in square brackets `[]`:
```JavaScript
let myArray = [4, 2, 7, 15, 8];
```

To get a single value from an array or modify a single value, simply write the name of the array followed by a pair of square brackets containing the index of the number, e.g. `myArray[4]` to get the element at index 4 from the array called `myArray`.

```JavaScript
let myArray = [4, 2, 7, 15, 8];
console.log(myArray[2]);
myArray[2] = 5;
console.log(myArray[2]);
console.log(myArray);
```
_Console:_
```
7
5
[4, 2, 5, 15, 8]
```

You may be confused why when we specified the index `2` above, the _third_ element was accessed/changed. This is because array indices start at `0`. The reason for this has to do with how arrays work in lower level languages (languages with fewer abstractions distancing themselves from what's actually happening on the processor).

Imagine the memory of a computer as a filing cabinet, with the drawers numbered from top to bottom. Suppose the array starts in drawer 7, and one element fits in each drawer. This means the first element is stored in drawer 7, which is 7 + 0, the second element is stored in drawer 8, which is 7 + 1, the third element is stored in drawer 9, which is 7 + 2, and so on. This means that the index of the element is its offset from the start of the array, which is zero for the first element.

If that went in one ear and out the other, that's fine, and you don't need to know this to get started programming in JavaScript, but I wanted to include an explanation for those who were curious. The important thing to know is that the first element in an array is at index 0.

Arrays in JavaScript can contain any type, and there is no limitation to only store one particular type in an array. This is perfectly valid code:

```JavaScript
let x = [15, 'fish', true, undefined, 7];
x[2] = 'pumpkins';
```

You can even put an array inside an array:
```JavaScript
let x = [15, 2, [4, 3, 1], 6];
console.log(x[2][1]);
console.log(x[3]);
```

_Console:_
```
3
6
```

JavaScript provides a lot of useful functions for working with arrays that are beyond the scope of this course, but there are two things you should be familiar with:

```JavaScript
let x = [5, 3, 6, 3];
console.log(x.length);

x.push(73);
console.log(x);
console.log(x.length);
```

_Console:_
```
4
[5, 3, 6, 3, 73]
5
```

`Array.length` gives you the length of an array, and `Array.push(value)` adds an element (or multiple if you pass more parameters to the function) to the array.

## Branching Out
All of our programs so far have followed a fairly linear path. They start at the first line, and go through line by line to the bottom executing every line. What if we want to only execute some code in certain cases.

For example, what if we want to print "I am cold", only if the temperature is below 40 degrees Fahrenheit. We know we can print "I am cold" using the following code:
```JavaScript
console.log('I am cold');
```

But this will always execute. To make something execute _conditionally_, we need to use a piece of code called an _if statement_, or a _conditional_. An if statement will look something like this:

```JavaScript
if (someBoolean) {
    console.log('I am cold');
}
```

The code inside of the curly braces `{}` will only be executed if the _condition_ `someBoolean` evaluates to `true`. We could put in a literal value of `true` or `false`:

```JavaScript
if (true) {
    console.log('I am cold');
}
```

But that won't behave any differently than just writing the line without the if statement (or not writing it, in the case of `false`). What we need is some way to get a boolean value that is true when the temperature in Fahrenheit is less than 40 and false when it is not.

### Comparison operators
Just like we have operators that return numbers, like `+`, `-`, `*`, and `/`, we have operators that return booleans. If we want to compare the values of two numbers, we can use the operators `==` (abstract equality), `===` (strict equality), `!=` (abstract inequality), `!==` (string inequality), `>` (greater than), `<` (less than), `>=` (greater than or equal to), and `<=` (less than or equal to). We'll come back to the difference between abstract and strict equality later, but for now, let's focus on what we need for our example: `<` (less than):
__Example 1:__
```JavaScript
let temperatureInFahrenheit = 38;
if (temperatureInFahrenheit < 40) {
    console.log('I am cold');
}
```
_Console:_
```
I am cold
```

__Example 2:__
```JavaScript
let temperatureInFahrenheit = 72;
if (temperatureInFahrenheit < 40) {
    console.log('I am cold');
}
```
_Console:_
```
```

_NB: We will not be covering getting input from the user in this course, because it is completely different depending on whether you are running JavaScript in a browser or in Node.js. We will instead hardcode any values at the beginning of the program._

## Kinda Loopy
So we can now use an if condition to run a block of code either one or zero times based on some condition. What if we want to run code multiple times? The answer is to use a loop.

### While Loops
The simplest type of loop is a `while` loop. It executes code as long as its condition is true:
```JavaScript
let someValue = 0;
while(someValue < 10) {
    someValue = someValue + 1;
}
console.log(someValue);
```
_Console:_
```
10
```

In this example, we start with the value of `someValue` set to `0`. Then we enter the `while` loop, so we check whether or not the condition is true. 0 is less than 10, so we execute the body of the loop. This sets `someValue` to itself plus 1 (`1`). Now we need to re-evaluate the condition of the loop. Since 1 is still less than 10, we execute the body again. Now `someValue` gets set to 2.

We repeat this process until eventually, we set `someValue` to 10. Now we check the condition and find that 10 is not less than 10, so we do not execute the body of the loop again and proceed ot the next line of code, logging out the final value of `someValue`.

### For Loops
The kind of loop we just wrote (initializing a value, testing a condition, executing a  loop body, and incrementing the value) is pretty common. So common in fact, that most languages have a special kind of loop called a `for` loop built in to handle this case:

```JavaScript
for (let i = 0; i < 10; i++) {
    console.log(i);
}
```
_Console:_
```
0
1
2
3
4
5
6
7
8
9
```

That may look like a lot inside the parentheses, but if we break it down, it's not as bad as it might look:
1. First, we have `let i = 0;`. We've seen this before. This runs before the loop starts and initializes the variable `i` with the value `0`.
2. Next, we have `i < 10;`. This is the condition for the loop. Before each iteration of the loop, we evaluate this to decide whether or not to continue looping, just like with a `while` loop.
3. Finally, we have `i++`. We haven't seen this syntax before, but it is just a shorthand for `i = i + 1;`, or in other words, it adds `1` to the current value of `i`. A fancier way to say this is that it _increments_ `i` by `1`. This happens after each run of the loop body, before the condition is checked again.

So in this case, we see that first `i` gets initialized to `0`, then the condition is checked. Since `0 < 10` evaluates to `true`, the loop body runs, and `0` is logged. Then `i` gets incremented by `1`, and we check if we need to keep looping. `1 < 10` evaluates to `true`, so we log `1`, and then we increment `i` again.

This continues until after we log `9`. We increment `i` up to `10`, and then we evaluate the condition. `10 < 10` evaluates to `false`, so we do not run the loop, and so `10` never gets logged.

One common use case for a for loop is to loop over an array:
```JavaScript
let myArray = [4, 1, 6, 2, 5];
for (let i = 0; i < myArray.length; i++) {
    console.log(myArray[i]);
}
```
_Console:_
```
4
1
6
2
5
```

### Two more loops: for ... of and for ... in
However, since this is such a common case, JavaScript provides a faster way of doing this:
```JavaScript
let myArray = [4, 1, 6, 2, 5];
for (let value of myArray) {
    console.log(value);
}
```
_Console:_
```
4
1
6
2
5
```

This loops over the elements of the array directly, rather than needing to keep track of a variable for the index and reaching into the array.

If you do need an index, you can also use the `for ... in` loop to get the index of the array:

```JavaScript
let myArray = [4, 1, 6, 2, 5];
for (let value in myArray) {
    console.log(value);
}
```
_Console:_
```
0
1
2
3
4
```

Be careful not to confuse these two.

### Infinite Loops
One thing you need to be very careful with when working with loops is infinite loops. It is possible (actually quite easy) to accidentally write a loop where the condition will never become false. In this case, the loop will run forever.

The result will often be your computer fans spinning up and the program never completing. It will often cause the application to freeze, and if you don't kill the process quick enough, your entire computer may become unresponsive and need to be rebooted.

Here is a trivial example (I don't recommend trying this):
```JavaScript
while (true) {
    console.log('hi');
}
```

~~If you end up~~ _When_ you end up in this situation, you will need to stop your program. In the browser, this will often mean closing the tab. If you are running your program in Node.js from the terminal/command prompt, press `Ctrl`+`C` to kill the process (repeat if it doesn't work the first time). If you are running a Node.js program from an [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment), utilize the stop program button in your [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment).

## No Comment
When writing code, you should always write it in a way that makes sense if somebody else were to read it back, or if you were to come back to it after a few weeks or months and try to figure out what you wrote.

Using meaningful, unabbreviated variable names and using more "readable" constructs like `for ... of` loops can help with this, but you will often come across situations where something is confusing and needs an explanation or you can significantly improve performance of a performance-critical piece of code by writing it in a more confusing way.

When this happens, you should add a _comment_ to your code. There are two ways to add a comment in JavaScript.

First is the single-line comment:
```JavaScript
// This is a comment. It has no impact at runtime.
// This text appears only to aid in understanding the code.
let x = 7; // Comments can appear at the end of lines with code
```

If you put two forward slashes `//`, the rest of the line is considered a comment and ignored when the program runs.

The second way is the multi-line comment:
```JavaScript
/*
 This is a multiline comment
 all lines appearing between the forward-slash-asterisk and
 asterisk-forward-slash will be treated as a comment and ignored
 at runtime.
 let x = 7;
 Code appearing inside here will not be run.
 */

let x = 10; /* Multiline comments can start
 and end on lines containing
 code */ let y = 12; /* But I don't recommend doing this */
```

Since code inside comments is ignored, when programmers want to temporarily disable a line of code while testing something without deleting it, they will often turn the line into a comment. This is called "commenting out" the code:

```JavaScript
let x = 10;
// x = 7;
console.log(x);
```
_Console:_
```
10
```

This can be done quickly in most editors/[IDEs](https://en.wikipedia.org/wiki/Integrated_development_environment) by highlighting the lines you wish to comment out and pressing something like `Ctrl`+`/` (`Cmd`+`/` on macOS). The same shortcut usually uncomments the lines if they are already commented out.

### Comments and static analyzers
Sometimes you may come across a comment that is clearly not written for a human to read. These are usually for programs that process the code for some reason or another prior to runtime. One such tool is [ESLint](https://eslint.org/).

ESLint scans JavaScript code to determine whether or not it is up to whatever the configured style rules are. Teams use this to keep code formatted in the agreed-upon way. Sometimes, however, there is a situation where a particular rule needs to be broken, so you may see a line like this:
```JavaScript
// eslint-disable-next-line no-console
console.log(x);
```

The line still has no impact at runtime, but is being interpreted by a tool that processes the code prior to runtime.

Another format you will often see is [Javadoc](https://en.wikipedia.org/wiki/Javadoc). This is a format that originated with the language Java and is often understood by editors other software to provide hints and information to people using the code. This is a sort of hybrid where it is human-readable but must be in a specific format to be picked up by tools that parse Javadoc. You can spot a Javadoc because it will be a multiline comment beginning with `/**` instead of just `/*`.

## New Objective
We have referred a few times to something called an object, so what is an object? In JavaScript, an object is a collection of multiple _properties_. A property is sort of like a variable. It has a key (which you can think of as its name) and a value, and that value can be of any of the types we have seen so far. We notate an object with a pair of curly braces `{}`. Inside these braces are a comma-separated list of properties, written in the format `key: value`. Here is an example:

```JavaScript
let myObject = {
    propertyName: 5,
    someOtherProperty: true,
    anotherOne: 45
};
```

We define a variable called `myObject` and set its value to be an object that we create. The object has the properties `propertyName`, `someOtherProperty`, and `anotherOne`, which all have values defined.

If we want to access a property, we write the name of the object `myObject`, followed by a dot `.`, followed by the name of the property, e.g. `myObject.propertyName`. We can use this to access or modify the property's value:

```JavaScript
let myObject = {
    propertyName: 5,
    someOtherProperty: true,
    anotherOne: 45
};

console.log(myObject.propertyName);

myObject.anotherOne = 76;

console.log(myObject.anotherOne);
```

_Console:_
```
5
76
```

This works even when the property is a function, as we've already seen when we accessed the property `log` on the built-in object `console` and called it:

```JavaScript
console.log('hi');
```

While we can define a function as a property of an object the same way as other types of property:

```JavaScript
let myObject = {
    thisPropertyIsAString: 'foo',
    thisPropertyIsAFunction: function () {
        // Do something useful
    },
    thisPropertyIsANumber: 5
}
```

There is a special shorthand for creating properties that are functions:
```JavaScript
let myObject = {
    thisPropertyIsAString: 'foo',
    thisPropertyIsAFunction() {
        // Do something useful
    },
    thisPropertyIsANumber: 5
}
```


### This
Sometimes (quite often), you want to refer to an object within one of its function properties. You can do that using the `this` keyword:

```JavaScript
let myObject = {
    someString: 'hey',
    someFunction() {
        console.log(this.someString);
    }
}

myObject.someFunction();
```

_Console:_
```JavaScript
hey
```

The `this` keyword can be very complicated to understand, as it doesn't always refer to the object you'd expect it to. I explain it in a little more detail in the chapter ["Can't Function Without You" of _So You Think You Know JavaScript_](../So%20You%20Think%20You%20Know%20JavaScript/11-functions.md).

## Challenge #2: Calculating GPA
Now that we know how to work with objects, we can try another challenge. Below is an object named `michael`, representing a student named Michael. For this challenge, you must add two new properties to `michael`:
1. Add a `string` property with the key `birthDate` and the value `'1990-02-05'`.
2. Add a `function` property with the key `calculateGpa`, which calculates Michael's 4.0-scale GPA using the `reportCard` property and the `calculateSingleGpa` function, which calculates the 4.0-scale GPA for a single class.
    - We will define a student's GPA to be the average ([arithmetic mean](https://en.wikipedia.org/wiki/Arithmetic_mean)) of the GPAs for all courses on their `reportCard`.
    - If a student has not taken any courses yet, their GPA is 0.
```JavaScript
let michael = {
    name: 'Michael Smith',
    // TODO: Put birthDate here
    reportCard: [
        {
            subject: 'math',
            grade: 100
        },
        {
            subject: 'science',
            grade: 89
        },
        {
            subject: 'english',
            grade: 78
        },
        {
            subject: 'history',
            grade: 49
        },
        {
            subject: 'music',
            grade: 94
        }
    ],
    // TODO: Put calculateGpa here
    calculateSingleGpa(grade) {
        if (grade < 60) {
            return 0;
        }
        if (grade < 70) {
            return 1;
        }
        if (grade < 80) {
            return 2;
        }
        if (grade < 90) {
            return 3;
        }
        return 4;
    }
}

// Remaining code is to test your implementation
console.log(michael.birthDate)

console.log(michael.calculateGpa());

// Drop all but the first 2 entries from reportCard
michael.reportCard.length = 2;
console.log(michael.calculateGpa());

// Drop all entries from reportCard
michael.reportCard.length = 0;
console.log(michael.calculateGpa());
```
_Expected Output:_
```
1990-02-05
2.6
3.5
0
```
After you've tried the challenge yourself, you can compare your solution with the solution below. Your solution does not need to match exactly, as long as you get the correct output.

<details> <summary>Solution (Click to Show)</summary>

```JavaScript
let michael = {
    name: 'Michael Smith',
    birthDate: '1990-02-05',
    reportCard: [
        {
            subject: 'math',
            grade: 100
        },
        {
            subject: 'science',
            grade: 89
        },
        {
            subject: 'english',
            grade: 78
        },
        {
            subject: 'history',
            grade: 49
        },
        {
            subject: 'music',
            grade: 94
        }
    ],
    calculateGpa() {
        if (this.reportCard.length === 0) {
            return 0;
        }

        let total = 0;
        for (let course of this.reportCard) {
            total = total + this.calculateSingleGpa(course.grade);
        }
        return total / this.reportCard.length;
    },
    calculateSingleGpa(grade) {
        if (grade < 60) {
            return 0;
        }
        if (grade < 70) {
            return 1;
        }
        if (grade < 80) {
            return 2;
        }
        if (grade < 90) {
            return 3;
        }
        return 4;
    }
}

// Remaining code is to test your implementation
console.log(michael.birthDate)

console.log(michael.calculateGpa());

// Drop all but the first 2 entries from reportCard
michael.reportCard.length = 2;
console.log(michael.calculateGpa());

// Drop all entries from reportCard
michael.reportCard.length = 0;
console.log(michael.calculateGpa());
```

Note that your solution may differ slightly. As long as the correct values appear in the console, that's fine!

</details>

<br />

## Again, But With Class!
What if we want to create a bunch of objects that all share functionality? For example, looking back at the challenge from the previous section, we defined functionality on how to calculate a student's GPA. But what if we wanted to add multiple students?
```JavaScript
let michael = {
    name: 'Michael Smith',
    birthDate: '1990-02-05',
    reportCard: [
        {
            subject: 'math',
            grade: 100
        },
        {
            subject: 'science',
            grade: 89
        },
        {
            subject: 'english',
            grade: 78
        },
        {
            subject: 'history',
            grade: 49
        },
        {
            subject: 'music',
            grade: 94
        }
    ],
    calculateGpa() {
        if (this.reportCard.length === 0) {
            return 0;
        }

        let total = 0;
        for (let course of this.reportCard) {
            total = total + this.calculateSingleGpa(course.grade);
        }
        return total / this.reportCard.length;
    },
    calculateSingleGpa(grade) {
        if (grade < 60) {
            return 0;
        }
        if (grade < 70) {
            return 1;
        }
        if (grade < 80) {
            return 2;
        }
        if (grade < 90) {
            return 3;
        }
        return 4;
    }
}

let john = {
    name: 'John Markov',
    birthDate: '1993-01-16',
    reportCard: [
        {
            subject: 'math',
            grade: 78
        },
        {
            subject: 'science',
            grade: 25
        },
        {
            subject: 'english',
            grade: 89
        },
        {
            subject: 'history',
            grade: 79
        },
        {
            subject: 'music',
            grade: 65
        }
    ],
    calculateGpa() {
        if (this.reportCard.length === 0) {
            return 0;
        }

        let total = 0;
        for (let course of this.reportCard) {
            total = total + this.calculateSingleGpa(course.grade);
        }
        return total / this.reportCard.length;
    },
    calculateSingleGpa(grade) {
        if (grade < 60) {
            return 0;
        }
        if (grade < 70) {
            return 1;
        }
        if (grade < 80) {
            return 2;
        }
        if (grade < 90) {
            return 3;
        }
        return 4;
    }
}
```

In order to give both students the same base functionality, we had to repeat a lot of code! While there are a number of steps we could take with what we've covered so far to reduce this duplicated code, there is a feature just for this purpose, to define a whole class of objects with similar functionality: The `class`.

```JavaScript
class Student {
    name;
    birthDate;
    reportCard = [];

    constructor(name, birthDate) {
        this.name = name;
        this.birthDate = birthDate;
    }

    calculateGpa() {
        if (this.reportCard.length === 0) {
            return 0;
        }

        let total = 0;
        for (let course of this.reportCard) {
            total = total + this.calculateSingleGpa(course.grade);
        }
        return total / this.reportCard.length;
    }

    calculateSingleGpa(grade) {
        if (grade < 60) {
            return 0;
        }
        if (grade < 70) {
            return 1;
        }
        if (grade < 80) {
            return 2;
        }
        if (grade < 90) {
            return 3;
        }
        return 4;
    }
}

let michael = new Student('Michael Smith', '1990-02-05');
michael.reportCard.push(
    {
        subject: 'math',
        grade: 100
    },
    {
        subject: 'science',
        grade: 89
    },
    {
        subject: 'english',
        grade: 78
    },
    {
        subject: 'history',
        grade: 49
    },
    {
        subject: 'music',
        grade: 94
    }
);

let john = new Student('John Markov', '1993-01-16');
john.reportCard.push(
    {
        subject: 'math',
        grade: 78
    },
    {
        subject: 'science',
        grade: 25
    },
    {
        subject: 'english',
        grade: 89
    },
    {
        subject: 'history',
        grade: 79
    },
    {
        subject: 'music',
        grade: 65
    }
);
```

In the above example, we create two objects `michael` and `john` that work just like the ones in the previous example, but now instead of repeating all the common behavior for calculating GPAs, we define it in one place (the `class` called `Student`) and only need to repeat the parts that are unique to that particular student.

## Const
There are two more ways to declare a variable besides the `let` keyword.

The first is `const`, which declares a constant. It works just like `let`, except that you can never reassign the value after declaring it:

```JavaScript
const x = 42;
console.log(x);
x = 37;
```

_Console:_
```
42
ERROR: Assignment to constant variable.
```

So why would you want to declare a variable that can never be changed? Why not just write 42 instead of x? There are a few reasons.

First of all, it makes it easier to change the value if needed. Consider the following two ways of writing the same functionality:

```JavaScript
let arr = [];

for (let i = 0; i < 14; i++) {
    arr.push(i * 14);
}

i = i + 14;

console.log('The answer is', i / 14);
```

```JavaScript
let arr = [];
const length = 14;

for (let i = 0; i < length; i++) {
    arr.push(i * length);
}

i = i + length;

console.log('The answer is', i / length);
```

Imagine we want to update this code to have `length` be `15`. In the first case, where we wrote out `14` by hand each time, we have to replace every occurrence. In the second example, we only have to change it in one place. It may not seem like much here, but what if this was a real project with thousands of lines of code across multiple files? This is an example of having a _single source of truth_, which is a very important rule to follow when writing code to avoid problems down the road.

But you may be wondering why we can't just use `let` in this case, since it can define a repeated value as well. The reason we prefer to use `const` is that it makes it easier to understand the code when reading it and ensures nobody editing this later changes the value without realizing it was intended to represent a constant value. By looking at this code, we know immediately that `length` will always be `14`, so if we see a usage of it far away form where it was declared, we don't need to read all the code in between to know what its value is.

In general, you want to use `const` by default and only change things to `let` if you know they get overwritten at some point. That means in our previous example, we actually should have written:
```JavaScript
const arr = [];
const length = 14;

for (let i = 0; i < length; i++) {
    arr.push(i * length);
}

i = i + length;

console.log('The answer is', i / length);
```

Because `arr` never gets _reassigned_. Some of its properties are updated when we add elements to it in the loop, but we never completely reassign the variable.

One thing that's a little trickier to understand is when to use `let` vs `const` in `for` loops. For standard `for` loops (`let i = 0; i < length; i++`), we need to use `let` because we are modifying the variable when we say `i++`. But for `for ... in` and `for ... of` loops, the variable actually gets re-declared every loop, so we want to use `const` to ensure we don't accidentally re-assign the variable in the loop body:

```JavaScript
const people = [
    { name: 'Alice', age: '59' },
    { name: 'Bob', age: '27' },
    { name: 'Charlie', age: '14' },
    { name: 'David', age: '83' }
];

for (let i = 0; i < people.length; i++) {
    console.log(people[i].name);
}

for (const person of people) {
    console.log(person.name);
}

for (const key in people) {
    console.log(people[key].name);
}
```

The other way to declare a variable is with the keyword `var`, but we will not cover it in this course, as it should never be used. It was how variables were declared in JavaScript prior to the introduction of `let` and `const`, and it behaves unintuitively. It only remains in the language for backwards compatibility with existing code. If you want to learn more about the introduction of `let` and `const` to replace `var`, see the section ["Hoist Yourself Up" in _So You Think You Know JavaScript](../So%20You%20Think%20You%20Know%20JavaScript/6-hoisting-and-scope.md).

## Not all equals are equal
Earlier, we briefly mentioned that there were two ways of comparing for equality in JavaScript, `==` (abstract equality) and `===` (strict equality). The best example to show the difference between the two is to look at how they compare the `string` `'1'` with the `number` `1`:

```JavaScript
console.log('1' == 1);  // true
console.log('1' === 1); // false
```
_NB: For this section, I'll put the console logs in comments so it's easier to see which log goes with which line in the code._

However, while this may seem useful, it can often lead to confusion, when you are expecting a value to be of one type, but it is actually of another. There are also certain cases where trying to push something of one type into another is very confusing:


```JavaScript
const x = {
    something: 'hello'
}

console.log('[object Object]' == x); // true
console.log(0 == false);   // true
console.log('0' == false); // true
console.log(1 == true);    // true
console.log('1' == true);  // true
console.log(2 == true);    // false
console.log(2 == false);   // false
```

When using abstract equality, strings are attempted to be converted in to numbers if compared to something other than a string, booleans are converted into `0` for `false` and `1` for `true`, and objects are converted to a string, but for most objects they end up being turned in the string `'[object Object]'`, which is not helpful and can lead to serious confusion.

For this reason, most JavaScript developers just don't use `==` and use `===` all the time. With `===` if two items being compared are of different types, they are always considered not equal. The only thing to be careful with when using `===` (or `==`) is that objects are only considered equal if they are actually the same object, not just identical objects). For example:

```JavaScript
const myCar = {
    make: 'Subaru',
    model: 'Legacy',
    year: 2019,
    color: 'black'
}

const timsCar = {
    make: 'Subaru',
    model: 'Legacy',
    year: 2019,
    color: 'black'
}

const yourCar = myCar;

console.log(myCar === yourCar); // true
console.log(myCar === timsCar); // false
```

In this example, `myCar` and `timsCar` are declared with the exact same properties and values, but they are not considered equal because they aren't actually the same car. We say that they are the same _by value_, but not the same _by reference_.

By contrast, `yourCar` is actually `myCar` (suppose we are sharing a car). Not only do they have the same properties with the same value (equal by value), but they are actually the very same car (by reference). If we share a car, and you wreck your car, my car is wrecked. If you change your paint color, my car's paint color changes too:

```JavaScript
const myCar = {
    make: 'Subaru',
    model: 'Legacy',
    year: 2019,
    color: 'black'
}
const yourCar = myCar;

yourCar.color = 'red';

console.log(myCar.color); // red

myCar.color = 'blue';

console.log(yourCar.color); // blue
```

If we wanted to check for equality by value between two objects, we would need to use some other method to compare. This is referred to as "deep equality", since rather than only looking at the surface level to see if they are the same object, you are looking into each of their properties, or may even their properties' properties to see if they are equal. This can get somewhat complicated, but solutions exist to do this.

A trivial case that works for simple objects (and uses only a few concepts we haven't covered in this course) would be this:

```JavaScript
function deepEquals(a, b) {
    // x !== y is false if x and y are strictly equal, true if they are not
    if (typeof a !== typeof b) {
        return false;
    }
    
    if (typeof a !== 'object') {
        return a === b;
    }

    // Object.keys(someObject) returns an array of all keys of someObject
    const keys = Object.keys(a); 
    if (keys.length != Object.keys(b).length) {
        return false;
    }
    
    for (const key of keys) {
        // ! inverts a boolean, so !true === false and !false === true
        // If you have a property key name in a string variable,
        // you can access the property using square brackets
        if (!deepEquals(a[key], b[key])) {
            return false;
        }
    }
    
    return true;
}
```

This is an example of what is called a _recursive_ function, which is just a fancy way of saying it is a function that calls itself. The danger of recursive functions is that they are loops in disguise, so you need to be careful to avoid an infinite loop. The example above can actually loop infinitely as is seen in the following example:

```JavaScript
const x = {
    someObject: {
        x: 0,
        y: 1,
        z: 2,
        parent: x
    },
    prop: 'hello'
}

const y = {
    someObject: {
        x: 0,
        y: 1,
        z: 2,
        parent: y
    },
    prop: 'hello'
}

console.log(deepEquals(x, y)); // INFINITE LOOP
```

These objects contain references to themselves (just like with functions, we call these recursive objects). This means when we go to compare them for deep equality, we will reach an infinite loop. First, we call `deepEquals(x, y)`. Since they're both objects, they pass through the first two early exit cases. They both have 2 properties, so we pass through the next early exit case.

Now we enter the main loop. First, we compare the key `someObject`, so we call `deepEquals(x.someObject, y.someObject)`. Once again, since these are objects with the same number of keys, we get past the early exit cases and through to the main loop. The first 3 keys `x`, `y`, and `z` are all of type `number` and have the same value, so `deepEquals` exits early and returns true.

When we get to the final property, however, `parent`, we find `x` and `y` as the values. So now we call `deepEquals(x, y)` again. This means in order to find the return value for `deepEquals(x, y)`, we first need to find the return value for `deepEquals(x, y)`. This puts us into an infinite loop, in which we continuously calculate the first part of the equality and never finish.

There are a number of solutions to this problem, but they are beyond the scope of this course.

## Challenge #3: The Final Challenge


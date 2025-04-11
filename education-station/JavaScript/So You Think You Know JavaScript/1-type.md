---
title: Type
parent: So You Think You Know JavaScript
nav_order: 1
---
[Previous: Intro](0-intro.md)

### Just My Type
For many people new to JavaScript, their first response may be, "JavaScript doesn't have types." But that's not true, it does! Every variable has a type, but they are not written explicitly. When we assign a value to a variable, the type is implied behind the scenes. However, since variables can be reassigned later to be a different type, it's easy to see why this misconception exists. 

We can see these types with the `typeof` operator.

```
var w = 'boat';
var x = 7;
var y = '7';
var z = { a: '7', b: 6 };

console.log('typeof x:', typeof x);
console.log('typeof y:', typeof y);
console.log('typeof z:', typeof z);
console.log('typeof z.a:', typeof z.a);
console.log('typeof z.b:', typeof z.b);
```
```
> typeof w: string
  typeof x: number
  typeof y: string
  typeof z: object
  typeof z.a: string
  typeof z.b: number
```

The types are `number`, `string`, `boolean`, `symbol`, `bigint`* `object`, `function`, `null`, and `undefined`.

You may notice that `array` does not appear in this list, and that's because in JavaScript, arrays are essentially a type of object that gets special treatment by the language.

\*`BigInt` is only need when working with numbers larger than 9,007,199,254,740,991 (that's 2<sup>53</sup> - 1), so we will not be covering it in this article. If you need to use it, you can read about it [on the Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).

Here are some more type examples:
```
var num = 14;
console.log('num:', typeof num);

var str = 'camera';
console.log('str:', typeof str);

var bool = true;
console.log('bool:', typeof bool);

var sym = Symbol('description');
console.log('sym:', typeof sym);

var bi = 3n;
console.log('bi:', typeof bi);

var obj = { count: 47, item: 'egg' };
console.log('obj:', typeof obj);

var fn = function() {
    console.log('Hello, world!');
};
console.log('fn:', typeof fn);

var nl = null;
console.log('nl:', typeof nl);

var und = undefined;
console.log('und:', typeof und);

console.log('---------------');

var arr = [num, str, bool, sym, obj, fn, nl, und];
console.log('arr:', typeof arr);
```
```
> num: number
  str: string
  bool: boolean
  sym: symbol
  bi: bigint
  obj: object
  fn: function
  nl: object
  und: undefined
  ---------------
  arr: object
```

In JavaScript, type tends to lurk in the shadows, never explicitly written, but ready to strike at any moment and cause a TypeError. Let's see an example of how this can happen:

```
var fish = 'swordfish';
fish();
```
```
x Uncaught TypeError: fish is not a function
    at <call stack>
```

In this case, we attempt to call a string as if it were a function. Since that is not possible, we get a TypeError. One important thing to note is that JavaScript will _coerce_ any variable to another type whenever possible. Type coersion is when there is a defined way to map a value of type A to a value of type B, so the language automagically does that conversion if we use a value of type A where a value of type B is expected. Here's a few examples:

```
var answer = 4 / 'fish';
console.log(answer);

answer = 6 + 'karaoke';
console.log(answer);

answer = { a: 2, b: 7 } + 'pencil';
console.log(answer);
```
```> NaN
  6karaoke
  [object Object]pencil
```

In the first example, because division only works with numbers, the string 'fish' gets coerced into the numeric value `NaN`, which is short for "Not a Number". Any arithmetic with `NaN` will result in `NaN`, so that's what gets produced.

Next we add a number to a string. Thi time, because a number can be coerced into a string, and addition is defined for strings as concatenation, we append '6' to the front of the string to get '6karaoke'.

If we coerce an object into a string, we get '[object Object]'. This is frequently a source of frustration for JavaScript developers, as it is easy to forget, especially because when we log an object to the browser console, it logs an interactive, collapsable representation of the object where we can see all the properties, but if we append a string to it, it changes to '[object Object]'. If we need a string representation in a context like this, we options are to pass multiple parameters to console.log, which will print them all space-separated, or to use `JSON.stringify()` to convert the object into a JSON string.

```
var obj = { a: 5, b: 7 };

console.log(obj);
console.log(obj + ' is my favorite object');
console.log(obj, 'is my favorite object');
console.log(JSON.stringify(obj) + ' is my favorite object');
```
```
> {a: 5, b: 7}
  [object Object] is my favorite object
  {a: 5, b: 7} "is my favorite object"
  {"a":5,"b":7} is my favorite object
```

[Next: What the Heck-ma Is an Ecma?](2-ecma.md)

[Table of Contents](0-intro.md)
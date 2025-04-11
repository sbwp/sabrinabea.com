---
title: Strictly Speaking
parent: So You Think You Know JavaScript
nav_order: 3
---
[Previous: What the Heck-ma Is an Ecma](2-ecma.md)

## Strictly Speaking

While we now look at ES5 as "old JavaScript", it was at its time a groundbreakingly progressive change for the language. While it wasn't able to include many of the major syntax additions that eventually became ES2015, it laid the groundwork with a number of progressive changes, but to do this while maintaining compatibility, it had to introduce a new concept called strict mode.

Strict mode was intended to harden JavaScript against common mistakes and make it more predictable. To set a script to run in strict mode, add the following to the top of the file:
```
'use strict';
```
It works with single or double quotes. We can also put it at the top of a function to change just that function to strict mode:
```
function doSomething() {
    "use strict";
    // do something
}
```

There is no way to switch back to sloppy mode (not an official term, but it's what people call it), so a strict mode context cannot contain a sloppy mode context.

This article won't go very deep into the differences between strict mode and sloppy mode, but here's an example where we try to assign to an undeclared variable in sloppy mode and strict mode:
```
function sloppyMode() {
    notDeclared = 5;
    console.log('sloppy: ', notDeclared);
}

function strictMode() {
    'use strict';
    notDeclared = 5;
    console.log('strict: ', notDeclared);
}

sloppyMode();
strictMode();
```

You should always write code assuming you're in strict mode. Sloppy mode is there for backwards compatibility and the changes made to strict mode produce better, more maintainable code. Plus, there are certain contexts in which strict mode is required (such as ES6 modules) and if you're using a framework that includes "use strict", you have no option to break back out into sloppy mode.

[Next: JavaScript Just Got Classier](4-class.md)

[Table of Contents](0-intro.md)

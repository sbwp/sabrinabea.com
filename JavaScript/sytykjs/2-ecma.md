---
title: What the Heck-ma Is an Ecma?
parent: So You Think You Know JavaScript
nav_order: 2
---
[Previous: Just My Type](1-type.md)

## What the Heck-ma Is an Ecma?
Have you ever heard of "EcmaScript", "ES5", "ES6", or "ES2015"?

Early on, developers of different browsers disagreed on what directions JavaScript should go in, so they started to write inconsistent implementations of the language. This made web developers understandably upset because their code that worked in their favorite browser didn't necessarily work in other browsers.

Ecma International (formerly known as the European Computer Manufacturers Association) saw this issue and decided to do what standards organizations do best: They created a standard specification for JavaScript, called EcmaScript. Over the years, as they've updated this, they numbered the versions, and people refer to the versions as ES, short for EcmaScript, followed by the number of the version. In 2015, they switched the naming scheme to use the year instead of a number (because who doesn't love inconsistent versioning), and that version marked a major shift for the EcmaScript standard towards more frequent updates. 

One thing to point out is that everyone's favorite dinosaur, Internet Explorer, only supports up to ES5, whereas all other major browsers support pretty much all features up through ES2020. For any project where Internet Explorer support is required, use one of the many tools available to convert your modern JavaScript to work on the legacy platform, rather than punishing yourself by not making use of the last 10 years of progress.

We won't go into the details, but here is an example of how JavaScript has changed since ES5 came out in 2009.

ES5:
```
function addItemsInRowsContainingSeven(grid) {
    return grid.reduce(function(sum, row) {
        var result = row.reduce(function(state, n) {
            return {
                sevenFound: state.sevenFound || n === 7,
                sum: state.sum + n
            };
        }, { sevenFound: false, sum: 0 });
        return result.sevenFound ? sum + result.sum : sum;
    }, 0);
}
```

ES2020:
```
const addItemsInRowsContainingSeven = grid =>
    grid.filter(row => row.includes(7))
        .reduce((sum, row) => sum + row.reduce((sum, n) => sum + n), 0);
```
[Next: Stricly Speaking](3-strict-mode.md)

[Table of Contents](index)

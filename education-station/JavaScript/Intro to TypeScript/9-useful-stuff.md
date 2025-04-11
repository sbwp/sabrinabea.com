---
title: Useful Stuff
parent: Intro to TypeScript
nav_order: 9
---
[Previous: Strict Null Checks](8-strict-null-checks.md)

# More Useful Features

## Functions That Return `never`
A while back, we introduced the type `never`, which is a way of asserting to the type system, that the value is essentially impossible to occur. For example, the intersection type `string & number` evaluates to the type `never`, since no value can be both a `string` and a `number`. Another common use-case of the type `never` is as the return type to a function. This is used to signify that a function never returns.

Note the distinction between `never` and `void`. A `void`-returning function may not feature any `return` statements (and if it does, they will not have a value attached to them), but once execution reaches the end of the function without returning, the function returns automatically. In fact, you can assign the result to a variable, which will be of type `void` (the value is often `undefined`, but the specifics of this are out of the scope of this article).

A `never`-returning function, however, actually does not return. The compiler will basically treat it like a return statement, in that code appearing after a call to the function will be unreachable, since the function does not return and execution does not return to the callsite.

This will be more clear once we look at some examples. There are three common usecases for this. The most common is a function that is guaranteed to throw an error:

```TypeScript
function throwValidationError(validationResults: ValidationResults): never {
    const errorMessage = validationResults.errors[0].message;
    throw new Error(`Validation Error: ${errorMessage}`);
}

function validate(input: string, validator: Validator): void {
    const results = validator.validate(input);
    throwValidationError(results);
    console.log('done'); // ERROR: Unreachable code detected.
}
```

Hopefully this makes it a bit more clear what is going on. Remember that at the end of the day, the return type gets stripped away when compiling to JavaScript, so there is no magic behind the `never` keyword that stops the function from returning. In this case, it is an unconditional `throw` that prevents the function from returning. All the `never` type does is allow us to provide that hint to the compiler so it can infer from that.

Another use for `never` as a return type is in Node when the function causes the program to exit:
```TypeScript
function failGracefully(reason: string, reasonCode: number): never {
    console.error(`Shutting down due to ${reason}`);
    process.exit(reasonCode);
}
```

In fact, `process.exit` has a return type of `never`, which is what allows the TypeScript compiler to know you cannot run additional code after calling it.

The other common use case is for satisfying generics with parameters you don't intend to use. Technically this is returning a generic type with the parameter set to `never`, but it's a similar situation:
```TypeScript
async function throwValidationError(validationResults: ValidationResults): Promise<never> {
    const errorMessage = await validationResults.getErrorMessage():
    return Promise.reject(new Error(`Validation Error: ${errorMessage}`));
}
```

Note that unlike in the previous cases, since the return type isn't actually `never`, the function will return and execution will return to its calling context. However, we labeled the output type of the `Promise` as `never` to signify that the promise will never output successfully, since it is guaranteed to reject.

Note also that `Promise.reject` has a return type of `Promise<never>`. It accepts a type parameter for the type parameter to `Promise` in case there's some reason you need to consider it as returning a certain type, but it defaults to `never`. If you're familiar with the library RxJS, `throwError` similarly returns `Observable<never>`.

## Optional Chaining
The optional chaining operator, `?.`, allows code to short circuit execution of an expression upon reaching a null value in the chain. If the LHS is non-nullish, it continue evaluating the chain, but if the LHS is nullish, it returns `undefined` and short circuits the chain. This is actually part of JavaScript, but it was only recently added (ES2020) and was added to TypeScript before it was officially accepted into the EcmaScript standard.

Note that "nullish" means the value is `null` or `undefined`, as opposed to the term "falsy", which means the value is coerced to `false` when used as a boolean. The falsy values as of ES2020 are `false`, `undefined`, `null`, `''`, `0`, `0n` (BigInt 0), and `NaN`.

### Optional Property Access
In JavaScript prior to ES2020 and in TypeScript prior to version 3.7 it is fairly common to have code like this when dealing with optional properties and potentially nullish variables:
```TypeScript
let city: string | undefined = undefined;

if (person && person.address) {
    city = person.address.city;
}
```

With optional property access, we can simplify that code to this:
```TypeScript
const city: string | undefined = person?.address?.city;
```

### Optional Element Access
We can also do something similar when accessing a property of an object using bracket notation, including accessing an element of an array.

Without optional element access:
```TypeScript
let firstInitial: string | undefined = undefined;

if (person && person.firstName) {
    firstInitial = person.firstName[0];
}
```

With optional element access:
```TypeScript
const firstInitial: string | undefined = person?.firstName?.[0];
```

### Optional Call
There's also a similar feature for calling functions, called optional call.
Without optional call:
```TypeScript
let resume: File | undefined = undefined;

if (person && person.generateResume) {
    resume = person.generateResume();
}
```

With optional call:
```TypeScript
const resume: File | undefined = person?.generateResume?.();
```

Be careful not to forget the `.` when using `?.` with element access and calling.


## Nullish Coalescing
The nullish coalescing operator, `??` should now be used in place of `||` when supplying a default value. Like optional chaining, it was added in ECMAScript 2020 and TypeScript 3.7.

As for usage, it works just like `||`, except _only nullish values_ will cause the rhs value to be used, as opposed to all falsy values like with `||`.

Example:
```TypeScript
const a = 'foo' || 'bar';     // a = 'foo'
const b = 'foo' ?? 'bar';     // b = 'foo'
const c = undefined || 'bar'; // c = 'bar'
const d = undefined ?? 'bar'; // d = 'bar'
const e = '' || 'bar';        // e = 'bar'
const f = '' ?? 'bar';        // f = ''
const g = 3 || 4;             // g = 3
const h = 3 ?? 4              // h = 3
const i = 0 || 4;             // i = 4
const j = 0 ?? 4              // j = 0
```

## Type-Only Imports and Exports
This allows you to avoid code actually being imported/exported at runtime when the import/export is _only_ for type information.

Example:
```TypeScript
import type { Animal, Phylum } from 'zoology';
import { AnimalRegistry } from './animal-registry';

function getBestAnimalInPhylum(phylum: Phylum): Animal {
    const rankedAnimals = AnimalRegistry.getAnimalsByPhylum(phylum).sort((lhs, rhs) => {
        if (lhs.isBetterThan(rhs)) {
            return -1;
        } else if (rhs.isBetterThan(lhs)) {
            return 1;
        } else {
            return 0;
        }
    });
    return rankedAnimals[0];
}
```

In the above example, the `zoology` imports are only needed for typing (i.e. the return type and parameter type of the `getBestAnimalInPhylum` function). The following would give an error:

```TypeScript
import type { Animal } from 'zoology';

class BadgerMole extends Animal { // Error: 'Animal' only refers to a type, but is being used as a value here.
    // ...
}
```

The benefit of using `import type` over `import` is that the TypeScript compiler can use the types for type-checking and you can specify parameters and return types using the type name, but in the compiled JavaScript, the actual class definition will only be included if it is actually used. This is particularly useful if you are creating a library that supports the consumer passing in classes from multiple different other libraries. The class definitions from the libraries the consumer does not use will not be included in their compiled code if neither you or the consumer `import` them.

### ECMAScript Private Fields ("Hard" Private Fields)
As we briefly mentioned while discussing visibility, there is an upcoming JavaScript feature to support runtime private fields. This makes fields _actually_ private, as in they cannot be accessed (or even detected) outside of their class definition, even with type assertions. The syntax is a bit different, and the `public` and `private` modifiers cannot be used with ECMAScript private fields (since they are obviously always `private`).

```TypeScript
class Person {
    #name: string;
    
    constructor(name: string) {
        this.#name = name;
    }

    public greet() {
        console.log(`My name is ${this.#name}! Nice to meet you!`)
    }
}

const john = new Person('John');

console.log(john.#name); // Error: Property '#name' is not accessible outside class 'Person' because it has a private identifier
```

One thing worth noting is that currently, you cannot define an ECMAScript private field as a parameter property in the constructor signature since it does not have a visibility modifier. My guess is that it will never be supported because one of the features of a private field is that it cannot even be detected by consumers, so having it as a parameter name in the constructor seems to go against that in spirit, but it could be implemented some day.

Once this proposal is widely adopted by modern browsers, this will be the preferred way of making variables private in TypeScript, but for now, there are severe negative performance implications due to how the feature is back-ported using [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap).

Also, if Internet Explorer support is necessary for your project, this feature cannot be used because it is only supported when targeting ES2015 (ES6) or higher.

## Target, Libs, Polyfills, and Language Level

### Targets
Speaking of targets, we haven't formally discussed what is meant by that. In the `tsconfig.json`, the property `compilerOptions.target` can be configured to a specific ECMAScript version. The valid options as of June 18, 2021 are: `ES3`, `ES5`, `ES6`, `ES2015` (equivalent to `ES6`), `ES7`, `ES2016` (equivalent to `ES7`), `ES2017`, `ES2018`, `ES2019`, `ES2020`, and `ESNext`.

When we compile our code, it will be output such that the syntax is valid in the target ECMAScript version. For example, if define a `class` in our code, and we use a target of `ES5` (or `ES3`), that code is syntactically invalid in the target version, so the TypeScript compiler will convert it into a function-style class definition, as was used in `ES3`/`ES5`-era JavaScript.

Note that the default is `ES3` which is almost certainly not what you want, so be sure to configure this appropriately. In general, if you're supporting Internet Explorer, you'll want `ES5`, and if you want broad, safe support for relatively modern browsers, you can choose `ES6`.

`ES2020` is currently acceptable if you don't need to support even slightly out of date browsers, with a few exceptions according to the commonly referenced [ECMAScript Compatibility Table](https://kangax.github.io/compat-table/es2016plus/):
- Chrome (and by extension Edge and Opera) browsers do not support spreading parameters after optional chaining (from ES2020)
- The table does not know whether Safari supports `BigInt64Array`, `BigUInt64Array`, `DataView.prototype.getBigInt64`, or `DataView.prototype.getBigUInt64` (from ES2020)
- Safari does not support RegExp lookbehind assertions (from ES2018)
- Safari does not support shared memory and atomics (from ES2017)

If you take a look at [the table](https://kangax.github.io/compat-table/es2016plus/), you may also notice that all features currently planned for ES2021 are supported by all major browsers, and all features currently planned for ES2022 are supported by the pre-release versions, except that Safari does not yet support private class methods.

So what if you want to make use of some of these JavaScript features but you cannot safely target as high of a version as you would like? For that, we have polyfills and libs, which together allow us to write at a higher language level than we are targeting.

### Polyfills
A polyfill is not unique to TypeScript, but it is an implementation for a new language feature/API using the language features and APIs of an older version. For example, a polyfill for the ES2021 `Promise.any` function would add a function `any` to the `Promise` prototype with the same behavior as the built-in `Promise.any` in ES2021. Then code that has included the polyfill can be run in a lower language version, such as ES2020 while still using that feature as if it existed in that previous version.

One of TypeScripts "Non-Goals" (things they actively try to avoid doing) is including polyfills. The only time the TypeScript compiler will automatically polyfill language features is if the syntax itself is invalid in the previous version. For example, we previously mentioned that it will transform a `class` into a `function` if targeting `ES5`:

_TypeScript:_
```TypeScript
class Dog {
    public name: string = 'fido';

    public bark() {
        console.log('woof');
    }
}
```

_JavaScript generated using target ES5:_
```JavaScript
"use strict";
var Dog = /** @class */ (function () {
    function Dog() {
        this.name = 'fido';
    }
    Dog.prototype.bark = function () {
        console.log('woof');
    };
    return Dog;
}());
```

_JavaScript generated using target ES2015:_
```JavaScript
"use strict";
class Dog {
    constructor() {
        this.name = 'fido';
    }
    bark() {
        console.log('woof');
    }
}
```

Note that in the above example, it similarly transformed the class field definition and initialization into a constructor since ES2015 does not support class fields. A polyfill is not possible because the syntax itself is illegal.

By contrast, if we use `Array.flatMap`, which is not available until ES2019 in an ES2015 context, it will not change it, because the syntax is valid (calling a function), so we can define a polyfill to add the functionality to the API:

_TypeScript:_
```TypeScript
const foo = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

const bar = foo.flatMap(x => x * 2);
```

_JavaScript generated using target ES2015:_
```JavaScript
"use strict";
const foo = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
const bar = foo.flatMap(x => x * 2);
```

Here, we get the same code (with the "use strict" added and an excess newline removed) out because polyfilling is possible. However, if you try this example, you may get a compiler error. Luckily, it tells us exactly how to fix the issue: `Property 'flatMap' does not exist on type 'number[][]'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2019' or later.`

### Libs
The `compilerOptions.lib` option in `tsconfig.json` accepts an array of strings, which specify which JavaScript APIs/features will be avaiable in your TypeScript code. This is defaulted based on the specified `target` to include the features available in the specified target version when running in a browser context.

If you are providing a polyfill for a feature, you can enable it by specifying it in the `lib` array. For example, specifying `lib` as `['ES2019']` will allow the above code to be compiled. Make sure you provide the polyfill, though, because if not, the code will fail at runtime.

In addition to a lib for each ECMAScript version, there are also libs for specific features as well as optional APIs to include, like `"DOM"` to include DOM APIs for a web browser, which you can read more about in [the official documentation](https://www.typescriptlang.org/tsconfig#lib).

By default, `lib` will be set to the target ECMAScript version, plus `"dom"`, `"webworker.importscripts"`, `"scripthost"`, and `"dom.iterable"`. If you specify something, be sure to include any of these that are needed for your project.

[Next: Next Steps](10-next-steps.md)

[Table of Contents](0-intro.md)

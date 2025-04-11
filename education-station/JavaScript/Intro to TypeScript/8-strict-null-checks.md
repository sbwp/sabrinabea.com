---
title: Strict Null Checks
parent: Intro to TypeScript
nav_order: 8
---
[Previous: Type Predicates and Assert Signatures](7-type-predicates.md)

## Strict Null Checks
So far, we have allowed ourselves to assign `undefined` to variables of any type. This is only possible, however, when strict null checks are turned off (in the `tsconfig.json` compiler options), and this is no longer the standard for new TypeScript projects.

Enabling strict null checks makes assigning `undefined` to a variable whose type does not explicitly include `undefined` a compiler error to prevent situations like this:
```TypeScript
// Strict Null Checks Is Off

let myName: string = undefined;

// ... (Code that doesn't always assign to myName)

console.log(myName.toLowerCase());
```

without needing to "play it safe" with null checks when you're not sure if a variable will be undefined or not:

```TypeScript
// Strict Null Checks Is Off

let myName: string = 'foo';

// ... (Confusing code that always assigns to myName)

console.log(myName?.toLowerCase?.());
```

If you have strict null checks on, and you want to "allow" `undefined` as a value, you only  need to change the type:
```TypeScript
// Strict Null Checks Is On

let myName: string | undefined = 'foo';

console.log(myName.toLowerCase()); // ERROR: Object is possibly 'undefined'.
```

But now how can we access the properties and functions of `string`? It works just like with any other union type. If the compiler is sure that the value is a `string` from context, it will automatically treat the value as if the type were just `string`:
```TypeScript
// Strict Null Checks Is On

let myName: string | undefined = 'foo';

// ... (Code which may or may not modify myName)

myName = 'bar';
console.log(myName.toLowerCase());
```

Because we assigned the string `'bar'` to `myName`, TypeScript knows that it is safe to call `myName.toLowerCase()` automatically. But what if the value might actually be `undefined`? Then you will need a runtime typecheck to avoid hitting a runtime error. TypeScript will detect your type checking and assume that the value is of that type:

```TypeScript
// Strict Null Checks Is On

let myName: string | undefined = 'foo';

if (flipACoin()) {
    myName = undefined;
}

if (typeof myName === 'string') {
    console.log(myName.toLowerCase());
} else {
    console.log('name is undefined');
}
```

Here, a check using the `typeof` operator was sufficient for the compiler to trust that `myName` is a `string` within the path where the check showed that the value was a string. For the other path, it is assumed to be `undefined`. For more complex type checking (like checking that an object conforms to an interface), you can create a function to do the type checking, making use of [type predicates or assert signatures](7-type-predicates.md), or perform manual [type assertions](6-return-of-the-types.md) if needed:
```TypeScript
// Strict Null Checks Is On

interface Person {
    name: string;
    age: number;
}

const isPerson(candidate: unknown): candidate is Person {
    return 
}

let somebody: Person | undefined = 'foo';

if (flipACoin()) {
    myName = undefined;
}

if (typeof myName === 'string') {
    console.log(myName.toLowerCase());
} else {
    console.log('name is undefined');
}
```



Then you either need to provide a type check to confirm it is a string or if you're sure and want to skip runtime checking, use the `!` operator to assert the value as non-nullish.
```TypeScript
// Strict Null Checks Is On
let myName: string | undefined = 'foo';

console.log(myName!.toLowerCase());

if (flipACoin()) {
    myName = undefined;
}

if (typeof myName === 'string') {
    console.log(myName.toLowerCase());
} else {
    console.log('name is undefined');
}

myName = 'bar';
console.log(myName.toLowerCase());
```

[Next: More Useful Features](9-useful-stuff.md)

[Table of Contents](0-intro.md)

---
title: Intro to TypeScript
parent: JavaScript
nav_order: 3
---
# Introduction to TypeScript
This will be an introduction to TypeScript, starting from the most basic syntax and leading up to advanced features of the type system. Note that in JavaScript examples, we will use `require` for imports. Even though the ESM `import` is becoming increasingly common in JavaScript projects, it is still very likely that many people will first encounter `import` or first switch fully to it when learning TypeScript, so I've treated this like a language difference even though it technically isn't.

### Table of Contents
0. [Introduction - Why TypeScript?](index)
1. [Interfaces](1-interfaces.md)
1. [Classes](2-classes.md)
1. [More Types of Types](3-types.md)
1. [Generics and Type Parameters](4-generics.md)
1. [Optional Properties And Utility Types](5-utility.md)
1. [Working With Types](6-return-of-the-types.md)
1. [Type Predicates and Assert Signatures](7-type-predicates.md)
1. [Strict Null Checks](8-strict-null-checks.md)
1. [More Useful Features](9-useful-stuff.md)
1. [Next Steps](10-next-steps.md)

## Why TypeScript?
I think many people who are new to TypeScript (especially if they're not using it by choice, e.g. they've joined a team that uses TypeScript, or they've started a project using a framework like Angular that requires TypeScript) often feel like TypeScript is only limiting them and question why anyone would *choose* to use TypeScript.

The key to understanding why TypeScript is preferred for medium-scale and large-scale JavaScript applications is to realize that everything in TypeScript is there to save you time debugging later. Let's look at a simple example exerpt from an application using JavaScript (not TypeScript):

_index.js_
```JavaScript
const { getMailingAddress } = require('./mail');

const johnDoe = {
    firstName: 'John',
    lastName: 'Doe',
    address: {
        streetNumber: '1256',
        streetName: 'Benson Rd',
        city: 'Townington',
        stateCd: 'ST',
        zipCd: '12345'
    }
};

const mailingAddress = getMailingAddress(johnDoe);
// Do something with the mailing address
```

_mail.js_
```JavaScript
function getMailingAddress(person) {
    const line1 = person.firstName + ' ' + person.lastName;
    const line2 = person.address.streetNumber + ' ' + person.address.street;
    const line3 = person.address.city + ', ' + person.address.stateCd + ' ' + person.address.zipCd;
    return line1 + '\n' + line2 + '\n' + line3;
}

module.exports = { getMailingAddress };
```

Let's say you include this code in your app, but there's a mistake. In your app, the property on address object for the street name is `streetName`, not `street`. JavaScript would give you no way of finding this error until you run the code and you start seeing mailing addresses getting generated like this:

_John Doe_  
_1256 undefined_  
_Townington, ST 12345_

Then you would have to go back to the code and figure out where the street name comes from (`address.street` in the above function) and what the property name should be (find where `address.streetName` is set to see what it was set as).

Now let's look at that same example using TypeScript:

_index.ts_
```TypeScript
import { getMailingAddress } from './mail';
import { Person } from './person';

const johnDoe: Person = {
    firstName: 'John',
    lastName: 'Doe',
    address: {
        streetNumber: '1256',
        streetName: 'Benson Rd',
        city: 'Townington',
        stateCd: 'ST',
        zipCd: '12345'
    }
};

const mailingAddress = getMailingAddress(johnDoe);
// Do something with the mailing address
```

_mail.ts_
```TypeScript
import { Person } from './person';

export function getMailingAddress(person: Person): string {
    const line1 = person.firstName + ' ' + person.lastName;
    const line2 = person.address.streetNumber + ' ' + person.address.street;
    /* ^^^ Compiler Error: Property 'street' does not exist on type 'Address'. ^^^ */
    const line3 = person.address.city + ', ' + person.address.stateCd + ' ' + person.address.zipCd;
    return line1 + '\n' + line2 + '\n' + line3;
}
```

_address.ts_
```TypeScript
export interface Address {
    streetNumber: string;
    streetName: string;
    city: string;
    stateCd: string;
    zipCd: string;
}
```

_person.ts_
```TypeScript
import { Address } from './address';

export interface Person {
    firstName: string;
    lastName: string;
    address: Address;
}
```

In this case, while there was more code to write to define the types and add the type annotations, the type system was able to immediately tell you through IDE's syntax highlighting (or at compile time if you didn't notice the red squiggle or use an editor without syntax highlighting), without the need for you to notice the mistake while running the code. Plus, it gives you a helpful error message that explains the problem, and there is a single place to look to find the actual name of the property: the definition of the `Address` interface.

[Next: Interfaces](1-interfaces.md)

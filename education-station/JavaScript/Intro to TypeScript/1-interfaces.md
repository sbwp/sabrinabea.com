---
title: Interfaces
parent: Intro to TypeScript
nav_order: 1
---
## Interfaces

If you've used another language with the concept of an "interface" before, like Java, you may be confused about why we're using interfaces this way. While a TypeScript `interface` can be used for the same purpose as a Java interface, it also fills a role somewhat similar to a structure (struct) in other languages.

Interfaces are very useful for adding compile-time type-checking to objects in TypeScript without affecting runtime performance, because they only exist in TypeScript. When the code is compiled to JavaScript, the interface is completely removed. Let's take a look at a smaller example to see an interface in action:

```TypeScript
import { mailService } from '../services/mail';

interface USAddress {
    name: string;
    streetAddress: string;
    city: string;
    stateCd: string;
    zipCd: string;
}

const sendLetter = (salutation: string, message: string, address: USAddress) => {
    const letter = mailService.createLetter(salutation, address.name, message);
    mailService.post(address, letter);
}

const address = {
    name: 'Bob Smith',
    streetAddress: '123 Fake St',
    city: 'Townington',
    stateCd: 'ST',
    zipCd: '12345'
};

const message = 'I hope you are well.';

sendLetter('Dear', message, address);
```

We define the interface using the keyword `interface` followed by the name of the interface, `USAddress`. The properties are listed similar to how they are in a JavaScript object literal, except instead of values, we have the type of each property. We also end the lines with semicolons in this example, rather than separating the properties with commas, but TypeScript interfaces actually can use commas instead if you prefer. My preference is to use semicolons when defining an interface over multiple lines and commas when defining one inline.

Then we use the type in the signature for the function `sendLetter` the same way we would use a primitive type like `string`. Notice that below, we don't explicitly type the variable `address` as `USAddress`. We could, but we don't have to, because the TypeScript type system will recognize that `address` has all the properties required of `USAddress`, and thus will allow you to pass it into `sendLetter`.

[Next: Classes](2-classes.md)

[Table of Contents](0-intro.md)

---
title: Optional Properties And Utility Types
parent: Intro to TypeScript
nav_order: 5
---
[Previous: Generics and Type Parameters](4-generics.md)

## Optional Properties And Utility Types

### Optional Properties
An interface can have optional properties in addition to the required ones. We notate this by putting a questionmark after the property name.

```TypeScript
interface Person {
    firstName: string;
    middleName?: string;
    lastName: string;
}

const bob: Person = {
    firstName: 'Robert',
    middleName: 'James',
    lastName: 'Smith'
};

const theresa: Person = {
    firstName: 'Theresa',
    lastName: 'Jones'
}
```

Here we define the `middleName` property as optional, which allows us to typecheck it if it is included, but also to omit it if needed. It might seem strange at first that we put the question mark after the property name rather than the type name (especially if you are familiar with Swift), but there is logic behind this decision. In a language like Swift, where you put the question mark with the type, you are saying that an object of that type will _always_ have a property of that name, but sometimes its value will be null. In this case, we are saying that sometimes an object of type `Person` won't even have the `middleName` property. It won't be `null`, it will not even exist on the object.

If we did want to represent an always present property that can sometimes be null (similar to `String?` in Swift), we could use Union Types:
```TypeScript
type OptionalString = string | null;
```

> &nbsp;  
Note that when using TypeScript with strict null checks turned off, all values can be set to `undefined` in addition to their normal allowed values. With strict null checks on (which is becoming more and more standard these days), this is not allowed, and a union type would be needed to allow `undefined`, e.g. `string | undefined`.  
&nbsp;

### Partial
One common usecase for optional properties is for an "options" object, where you allow the user to provide a subset of the available options, e.g.:

```TypeScript
interface Options {
    format?: ResponseFormat;
    output?: string;
    query?: string;
    maxRetries?: number;
}

const defaultOptions: Options {
    format: 'json',
    output: './build',
    maxRetries: 4
}

function doSomething(options: Options = {}) {
    const opts: Options = {
        ...defaultOptions,
        ...options
    };

    // Use opts to perform actions
}

doSomething({
    format: 'text',
    output: '../build/dist'
});

doSomething({
    query: 'Tamago wa tabemono desuka'
});

doSomething();
```

Notice however, that some properties on Options, such as `query` are actually optional on the final `opts` variable and may not appear, whereas others, like `format` are always present. How can we represent this in the type data? A naïve approach would be to create a second interface, and have one with all proprties optional and the other with only some optional, but TypeScript provides us an easier way. Let's take a look at our first Utility Type, `Partial`.

```TypeScript
interface Options {
    format: ResponseFormat;
    output: string;
    query?: string;
    maxRetries: number;
}

const defaultOptions: Options {
    format: 'json',
    output: './build',
    maxRetries: 4
}

function doSomething(options: Partial<Options> = {}) {
    const opts: Options = {
        ...defaultOptions,
        ...options
    };

    // Use opts to perform actions
}

doSomething({
    format: 'text',
    output: '../build/dist'
});

doSomething({
    query: 'Tamago wa tabemono desuka'
});

doSomething();
```

By providing `Options` as a type parameter to the built-in `Partial` Utility Type, we create a new type that is equivalent to `Options`, but with all properties made optional.

There are a bunch of useful Utility Types in TypeScript, but we'll go over just a couple more. One is `Required`, which is the opposite of `Partial`, making all optional properties required:

```TypeScript
interface Options {
    format: ResponseFormat;
    output?: string;
    query?: string;
    maxRetries: number;
}

const options: Required<Options> = {};
/* 
   ERROR: Type '{}' is missing the following properties from type
   'Required<Options>': format, output, query, maxRetries
 */
```

The other one we'll show off is `Readonly`, which (as the name implies) makes all properties on the type `readonly`:

```TypeScript
interface Options {
    format: ResponseFormat;
    output: string;
    query?: string;
    maxRetries: number;
}

const options: Readonly<Options> = {
    format: 'json',
    output: './build',
    maxRetries: 12
};

options.maxRetries = 4;
/* 
   ERROR: Cannot assign to 'maxRetries'
   because it is a read-only property.
 */
```

[Next: Working With Types](6-return-of-the-types.md)

[Table of Contents](0-intro.md)

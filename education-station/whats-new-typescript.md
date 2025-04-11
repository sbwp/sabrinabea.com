# What's New in TypeScript
This document provides an overview of the most interesting features added to TypeScript since version 3.7. It is largely based on the release notes [found here](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html), but trimmed down to just the stuff worth knowing.

## New in TypeScript 3.7

### Optional Chaining
The optional chaining operator, `?.`, allows code to short circuit execution of an expression upon reaching a null value in the chain. If the LHS is non-nullish, it continue evaluating the chain, but if the LHS is nullish, it returns `undefined` and short circuits the chain.

#### Optional Property Access
In TypeScript <= 3.6 it is fairly common to have code like this when dealing with optional properties and potentially nullish variables:
```TypeScript
let city: string = undefined;

if (person && person.address) {
    city = person.address.city;
}
```

With optional property access, we can simplify that code to this:
```TypeScript
const city: string = person?.address?.city;
```

#### Optional Element Access
We can also do something similar when dealing with arrays or objects with non-identifier (string, number, or symbol) properties.
Without optional element access:
```TypeScript
let firstInitial: string = undefined;

if (person && person.firstName) {
    firstInitial = person.firstName[0];
}
```

With optional element access:
```TypeScript
const firstInitial: string = person?.firstName?.[0];
```

#### Optional Call
There's also a similar feature for calling functions, called optional call.
Without optional call:
```TypeScript
let resume: File = undefined;

if (person && person.generateResume) {
    resume = person.generateResume();
}
```

With optional call:
```TypeScript
const resume: File = person?.generateResume?.();
```

Be careful not to forget the `.` when using `?.` with element access and calling.


### Nullish Coalescing
The nullish coalescing operator, `??` should now be used in place of `||` when supplying a default value. Like optional chaining, it is currently a stage 4 proposal for ECMAScript that was added to TypeScript in 3.7.

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

### Assertion Functions
Assertion functions allow you to guarantee that once a function has been called that throws an error when a parameter does not conform to a type, that parameter is guaranteed to conform to that type.

Example:
```TypeScript
class Perception {
    public listen(noise: Noise) {
        if (noise.speechToText() === 'Wow, I sure am cooking in here!') {
            const speaker = noise.source;
            this.registerChef(speaker); // <- This asserts that the speaker is of type Chef
            this.lureWithBait(speaker.favoriteCookingUtensil); // <- Now we know the speaker is a chef, so we can access its unique property, favoriteCookingUtensil
        }
    }

    private registerChef(chef: Person) asserts chef is Chef {
        if (!(chef instanceof Chef)) {
            throw new TypeError(`Expected a chef, but received ${chef}`);
        }

        ChefRegistry.register(chef);
    }

    private lureWithBait(bait: Item) {
        // ...
    }
}

// Types used in example, for context:
interface Person {
    name: string;
    age: number;

    public giveGift(gift: Item);
}

class Chef implements Person {
    public name: string;
    public age: number;
    public favoriteCookingUtensil: Item;
}

class ChefRegistry {
    public static registerChef(chef: Chef) {
        // ...
    }
}

class Noise {
    public source: Person;
    
    public speechToText(): string {
        // ...
    }
}
```

This is closely related to type guards, which we will recount here, even though they were added before 3.7:

#### Type Predicates
This defines the return type of a function to be a boolean, which if true, guarantees the predicate to be true for typing. Note that it is written like it is the return type, because it defines the return type to be `boolean` while also telling the type system additional information for paths where the function returns `true` vs `false`.
Example:
```TypeScript
function isChef(person: Person): person is Chef {
    return person instanceof Chef;
}

function giveGift(target: Person) {
    if (isChef(target)) {
        target.giveGift(target.favoriteCookingUtensil); // We know target is a Chef, so we can access favoriteCookingUtensil
    } else {
        target.giveGift(BadGifts.coal);
    }
}
```

#### `in` Operator
If we just want to check for existence of a property, we can use the `in` operator as follows:
```TypeScript
function giveGift(target: Person) {
    if ('favoriteCookingUtensil' in target) {
        target.giveGift(target.favoriteCookingUtensil); // We know target has property favoriteCookingUtensil, so we can access it
    } else {
        target.giveGift(BadGifts.coal);
    }
}
```

#### `typeof` and `instanceof` Guards
Note that for simple checks of `typeof` or `instanceof`, we don't need to add a function such as `isString()` just to get the benefits of type predicates for type checking purposes, because TypeScript will automagically know that the variable conforms to the type after using `typeof` or `instanceof`.

Example:
```TypeScript
function giveGift(target: Person) {
    if (target instanceof Chef) {
        target.giveGift(target.favoriteCookingUtensil); // We know target is a Chef, so we can access favoriteCookingUtensil
    } else {
        target.giveGift(BadGifts.coal);
    }
}

function toUpperCaseString(input: string | number): string {
    if (typeof input === 'string') {
        return input.toUpperCase(); // We know input is a string, so we can call toUpperCase()
    } else {
        return input.toString();
    }
}
```

### `never`-Returning Functions
TypeScript 3.7 slightly improved support for `never`-returning functions, so we will take the opportunity to cover them even though they aren't new.

The return type `never` indicates that a function will never return. This is useful in Node if the function results in exiting the program, as well as for functions that always throw an error.

```TypeScript
function handleError(error: Error): never {
    // ...
    throw error;
}
```

What 3.7 fixed is that you no longer need to return the function that returns `never` in order to appease the type system in the calling function:
```TypeScript
function toUpperCase(input: any): string {
    if (typeof input === 'string') {
        return input.toUpperCase();
    }
    process.exit(1); // Used to need to put `return process.exit(1);`.
}
```

## TypeScript 3.8

### Type-Only Imports and Exports
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

### ECMAScript Private Fields ("Hard" Private Fields)
This adds support for the upcoming JavaScript feature of private fields. This makes fields _actually_ private, as in they cannot be accessed outside of their context, even with typecasting. The syntax is a bit different, and the `public` and `private` modifiers cannot be used with ECMAScript private fields (since they are obviously `private`).

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

Note that these properties cannot be accessed (or even detected) outside of the class definition, even at runtime (in JavaScript). Note: This feature is only possible when **targeting** ES2015 (ES6) or higher.

### Export From
TypeScript 3.8 adds support for the new `export * as whatever` syntax from ES2020 (and compiles it properly for older target ECMAScript versions).

Example:
```TypeScript
// TypeScript <= 3.7
import * as util from './util';
export { util };

// TypeScript >= 3.8
export * as util from './util';
```

### Top-Level `await`
This allows you to use `await` at the top level of a module (top level of a file containing `import` or `export`). This requires your `tsconfig.json` to have a `target` of `es2017` or higher and a `module` of `esnext` or `system`.

Example:
```TypeScript
// Before TypeScript 3.8
import { Whatever } from 'wherever';

async function doAsyncStuff() {
    const stuff = await getStuff();
    const info = await getInfoFor(stuff);
    console.log(info);
}

doAsyncStuff().catch(console.error);

// After TypeScript 3.8
import { Whatever } from 'wherever';

const stuff = await getStuff();
const info = await getInfoFor(stuff);
console.log(info);
```

This effects the order in which modules are loaded. JavaScript uses post-order traversal of the dependency graph. When top-level `await` is used in a module, that module will wait to finish loading until the Promise is resolved. In the meantime, its siblings and its ancestors' siblings will be allowed to finish while it and its ancestors wait for the `await` to complete.


## TypeScript 3.9
Surprisingly, no features worth mentioning were added in TypeScript 3.9. There were some improvements to edge cases of some recent features and general improvements around tooling and type interpretation, but no headlining features.

## TypeScript 4.0

### Variadic Tuple Types
To understand variadic tuple types, you first must understand that a tuple type in TypeScript is a subset of `any[]`, which is to say that any tuple that is assignable to `[string, number]` is also assignable to `Array<string | number>`, and therefore assignable to `any[]`.

Variadic Tuple Types allow us to specify complex relationships between different array/tuple types. For example, suppose we have the following JavaScript function:
```JavaScript
// Returns a new tuple/array, which is the parameter `arg` without its first element
function tail(arg) {
    const [_, ...result] = arg;
    return result;
}

const tuple = [1, 'fish', true]
const result = tail(tuple); // result is ['fish', true]
const usesSecond = result[0].toUpperCase();
```

How would we type this function to make sure that the result of this function retains the type information of the parameter? Variadic tuple types provide the answer:

```TypeScript
// Returns a new tuple/array, which is the parameter `arg` without its first element
function tail<T extends any[]>(arg: [any, ...T]): T {
    const [_, ...result] = arg;
    return result;
}

const tuple: [number, string, boolean] = [1, 'fish', true]
const result = tail(tuple); // result is ['fish', true]
const usesSecond = result[0].toUpperCase();
```

In this function, the type parameter `T` describes the return type, and it is inferred from the parameter `arg`. When we provide a parameter of type `[number, string, boolean]`, `T` is inferred to be `[string, boolean]` (note that `[number, string, boolean]` is a subset of `[any, string, boolean]`).

#### Rest Parameters Can Go Anywhere
They also removed the restriction on the position of rest elements in a tuple. Previously if you tried to put a rest element anywhere other than the end, you would get an error `A rest element must be last in a tuple type.` Now it can go wherever it wants.

Example:
```TypeScript
type StringTuple = [string, string];
type NumberTuple = [number, number];

type ComplexTuple = [...StringTuple, ...NumberTuple, boolean];
// resulting type: [string, string, number, number, boolean]
```

We can also use arrays, but because the length is unbounded, there is some loss of type information:
Example:
```TypeScript
type StringTuple = [string, string];
type NumberArray = number[];

type ComplexTuple = [...StringTuple, ...NumberArray, boolean];
// resulting type: [string, ...Array<number | boolean>]
```

The release notes also provide a cool example of the usage of this feature. Take the following JavaScript function, which takes as input a function and its first few parameters and returns a new function that needs only the remaining parameters.
```JavaScript
function partialCall(f, ...headArgs) {
  return (...tailArgs) => f(...headArgs, ...tailArgs);
}

const test = (a, b, c, d) => {
    return `${a} is first, and ${d} comes after ${c}. ${b} is next to ${a}.`
}

const foo = partialCall(test, 'hey', 3);

console.log(foo(true, 'hello')); // hey is first, and hello comes after true. 3 is next to hey.
```

Variadic tuple types allow us to strongly type this function so that the list of arguments are still known by the type system (important for features like IntelliSense, as well as for catching errors):

```TypeScript
function partialCall<T extends any[], U extends any[], R>(
    f: (...args: [...T, ...U]) => R,
    ...headArgs: T
): (...args: U) => R {
  return (...tailArgs: U) => f(...headArgs, ...tailArgs);
}

const test = (a: string, b: number, c: boolean, d: string) => {
    return `${a} is first, and ${d} comes after ${c}. ${b} is next to ${a}.`
}

const foo = partialCall(test, 'hey', 3);

console.log(foo(true, 'hello')); // hey is first, and hello comes after true. 3 is next to hey.
```

### Labeled Tuple Types
In order to support parameter hints for spread tuple parameters appearing no different than parameter hints for normal parameters, TypeScript 4.0 provides support for labeled tuple types. The labels work just like parameter labels, but they are only for documentation reasons. Using a labeled tuple type does not create a variable of that name.

Example:
```TypeScript
type StringTuple = [string, string];
type Point2D = [x: string, y: string];

function goToPoint(...point: Point2D) {
    setXPos(point[0]);
    setYPost(point[1]);
}
```

When using the function `goToPoint`, IDE parameter hints would show the function as if it were defined as `goToPoint(x: string, y: string)`.

This can also provide context on the meaning of tuple values, for example:
```TypeScript
// <= 3.9
type SearchState = [BinaryTreeNode<number>, boolean, number, number];
const searchState: SearchState = [root, true, 0, array.length - 1];

// >= 4.0
type SearchState = [root: BinaryTreeNode<number>, isLeftChild: boolean, minIndex: number, maxIndex: number];
const searchState: SearchState = [root, true, 0, array.length - 1];
```

### Short-Circuiting Assignment Operators
TypeScript 4.0 supports the new assignment operators recently added to ECMAScript, `&&=`, `||=`, and `??=`. Like the existing assignment operators, such as `+=`, they provide a shorthand for performing an operation between 2 operands and then assigning the result to the LHS.

So instead of:
```TypeScript
a = a && b;
a = a || b;
a = a ?? b;
```

You would write:
```TypeScript
a &&= b;
a ||= b;
a ??= b;
```

This is also useful in places where variables are assigned only if they are falsy or nullish:
```TypeScript
if (!a) {
    a = b;
}

// becomes

a ||= b;

// or in cases where the previous syntax was an oversight ignoring the case where a is falsy but non-nullish

a ??= b;
```

The "Short-Circuiting" part of the name comes from how these operators work. Just like how `&&`, `||`, and `??` only compute their RHS if the LHS is falsy, truthy, or non-nullish (respectively), `&&=`, `??=`, and `||=` do not perform the assignment when the LHS is falsy, truthy, or non-nullish (respectively). Since the assignment would have assigned the LHS to itself without the short-circuiting, this detail only matters when assigning to a custom setter.

Example:
```TypeScript
class Foo {
    private pa: string;

    public get a(): string {
        return this.pa;
    }

    public set a(val: string) {
        console.log(`The setter was called with ${val}`);
        this.pa = val;
    }

    constructor(a: string) {
        this.pa = a;
    }
}

// &&=
let truthy = new Foo('bar');
let falsy = new Foo('');
let nullish = new Foo(undefined);

truthy.a &&= 'truthy &&=';
falsy.a &&= 'falsy &&=';
nullish.a &&= 'nullish &&=';

// ||=
console.log('\n');
truthy = new Foo('bar');
falsy = new Foo('');
nullish = new Foo(undefined);

truthy.a ||= 'truthy ||=';
falsy.a ||= 'falsy ||=';
nullish.a ||= 'nullish ||=';

// ??=
console.log('\n');
truthy = new Foo('bar');
falsy = new Foo('');
nullish = new Foo(undefined);

truthy.a ??= 'truthy ??=';
falsy.a ??= 'falsy ??=';
nullish.a ??= 'nullish ??=';
```

Output:
```
The setter was called with truthy &&=

The setter was called with falsy ||=
The setter was called with nullish ||=

The setter was called with nullish ??=
```

### Allowing `unknown` for `catch` Clause Parameters
Previously, `catch` clause parameters had to be type `any`. This meant that it was easy to forget to do type checking, which could result in more errors if we tried to access a non-existent property.

Now we can choose to type them as `unknown`, which will force us to use type checks in the `catch` block if we want to treat the variable as a specific type.

Example of potential runtime error due to type `any`:
```TypeScript
try {
    // ...
} catch (e) {
    console.log(x.toUpperCase()); // No problem at compile time, `x` is `any`, but at runtime, who knows!
}
```

Example of caught mistake with type `unknown`:
```TypeScript
try {
    // ...
} catch (e: unknown) {
    console.log(x.toUpperCase()); // Error: Object is of type 'unknown'.
}
```

Example of successful error handling with type `unknown`:
```TypeScript
try {
    // ...
} catch (e: unknown) {
    if (typeof e === 'string') {
        console.log(x.toUpperCase()); // No problem, we know `x` is `string`
    }
}
```

Example of intentionally only catching errors of certain types
```TypeScript
try {
    // ...
} catch (e: unknown) {
    if (typeof e === 'string') {
        console.error(x);
    } else if (e instanceof UserServiceError) {
        console.error(x.message);
    } else if (e instanceof AuthenticationError) {
        console.error('Authentication Failed');
    } else {
        throw e;
    }
}
```

### Convert to Optional Chaining
In TypeScript 4.0, a feature was added to the language service to allow for automatic refactoring where optional chaining can be used. Note that the behavior may subtly change, but it should achieve the intended behavior in most situations.

Example:
```TypeScript
// Before
a && a.b.c && a.b.c.d.e.f();

// After using refactoring option "Convert to optional chain expression"
a?.b.c?.d.e.f();
```

### Smarter Auto-Imports
Previously, auto-import only worked for packages already used by your project, or with typings provides by `@types`. This is to avoid looping through all of `node_modules` for type information. This means that the first time you `import` from a package that provides its own typings, auto-import will not work.

In 4.0, if your `package.json` contains ten or fewer typed dependencies that haven't been imported yet, auto-import will be available for all packages listed under `dependencies` or `peerDependencies` in your `package.json`.

IDEs should have settings to remove the ten dependency cap or to turn this feature entirely off. In VS Code, this is `typescript.preferences.includePackageJsonAutoImports`. I couldn't find such a setting in the latest version of IntelliJ IDEA.

### Operands for `delete` must be optional
The `delete` operator can no longer delete non-optional properties when using `strictNullChecks`. It will allow deleting properties of type `any`, `unknown`, `never`, or any optional type.

Example:
```TypeScript
interface User {
    name: string;
    status: string?;
}

function clearUser(user: User) {
    delete user.status; // This works.
    delete user.name;   // Error: The operand of a 'delete' operator must be optional.
}
```

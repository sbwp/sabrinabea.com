[Previous: Optional Properties And Utility Types](5-utility.md)

## Working With Types
We've already seen type aliases in action several times already. We use the `type` keyword to define the name of a new type, and on the right-hand side, we put an expression that evaluates to the type we want it to be equivalent to. Here are a few examples similar to what we've already seen:

```TypeScript
type AliasForString = string;
type PrimaryColor = 'red' | 'blue' | 'green';
type ThreeNamedPerson = Required<Person>;
```

These type expressions appear in a few other places, one of which is after the colon when adding the type for a variable or parameter or function return type. While we won't get into the _very_ complex types you can get into with TypeScript, here is one useful feature that can help in a pinch if you don't feel like adding an interface for a type (perhaps you're only specifying it once) but need to set multiple properties with different types:

```TypeScript
type Person = {
    firstName: string,
    middleName?: string,
    lastName: string
}
```

Notice that we basically just defined an interface, but as a sort of "Type Literal" on the right-hand side of a type alias expression. We can use this same sort of type in-line when a type is needed as well:

```TypeScript
function doSomething(options: { maxRetries: number, query?: string }): void {
    // Function Body
}

const person: { firstName: string, middleName?: string, lastName: string} = {
    firstName: 'Michael',
    lastName: 'Thompson'
}
```

### Type Assertion

If the type system believes a variable to be of one type, but we need to assert that it is of a different type, we can use a type assertion (similar to casting):

```TypeScript
type PrimaryColor = 'red' | 'blue' | 'green';

function doSomething(color: PrimaryColor): void {
    // ...
}

function getSomeBuiltinValue(): string {
    // Known to always return 'red', 'blue', or 'green'
}

function handleButtonPress(): void {
    const value = getSomeBuiltinValue(); // This is of type string
    doSomething(value as PrimaryColor)
}
```

Note that the types have to be compatible (the desired type needs to be assignable to the current type) for a type coersion to be allowed. In the above example, `PrimaryColor` can be assigned to `string`, so a `string` can be coerced into a `PrimaryColor`. If the type system is flat-out wrong about a type and you need to coerce into an incompatible type (e.g. `number` into `string`), then you will need to cast to `any` in between:

```TypeScript
const a: number = 7;
let b: string = 'foo';

b = a as any as string;
```

There is also an alternate syntax `<Target>foo` instead of `foo as Target`, which was added to increase support for coersion in `tsx` files for React projects. They function the same.

## Tuple Types
One type in TypeScript that can be a little confusing is the tuple. If you're not familiar with the concept from another language, a tuple is an ordered group of values. If you're familiar with the concept of a pair, it's like that, but it may have more than 2 values.

Since JavaScript has no concept of a tuple, we represent them as arrays, but we write their types differently. As a simple example, imagine you want to represent a 2D point using a tuple. You would do that like this:

```TypeScript
const point: [number, number] = [3.4, 2.7];
```

So what's the benefit of using this type over `number[]`? We are asserting using the type system that there are specifically two values, no more, no less. That means we can safely access `point[0]` and `point[1]` without having to check the length of the array. We can also mix and match the types within the tuple, but unlike with an array, we will be able to safely infer the types of each value in the tuple:

```TypeScript
const tuple: [number, string] = [47, 'hammond'];

const double = tuple[0] * 2;
const caps = tuple[1].toUpperCase();

// VERSUS

const array: Array<number | string> = [47, 'hammond'];

const double = array[0] * 2; // ERROR: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
const caps = array[1].toUpperCase(); // ERROR: Property 'toUpperCase' does not exist on type 'string | number'. Property 'toUpperCase' does not exist on type 'number'.
```

You may be wondering what the benefit is of using a type like this over an object. It's a combination of shorter notation (`[a, b]` vs `{ foo: a, bar: b }`), compatibility with libraries that expect or provide arrays, and getting the iterable property of arrays for free.

You can also use this in combination with [JavaScript array destructuring](../So%20You%20Think%20You%20Know%20JavaScript/9-properties) to return multiple values from a function:
```TypeScript
function authorizeDevice(device: Device): [boolean, number] {
    // ...
    return didSuccessfullyAuthorize, numberOfAuthorizationsRemaining;
}

// ...

const [success, remaining] = authorizeDevice(myLaptop);

if (success) {
    showSuccessMessage(remaining);
} else {
    showErrorMessage();
}
```

Note that the above example would likely be handled better by using exceptions rather than a `success` return value. Ignoring that, though, there is another problem with the above example. If you couldn't see the implementation details of the function, how would you know what the two values in the tuple represent?

To answer this, TypeScript 4.0 introduced the ability to name properties in a tuple. The function from the previous example would become:

```TypeScript
function authorizeDevice(device: Device): [success: boolean, remainingAuthorizations: number] {
    // ...
    return didSuccessfullyAuthorize, numberOfAuthorizationsRemaining;
}
```

This means when our IDE pops up the return type, we will see this full type name suggested, and if we hover over the `[0]` or `[1]`, we will see type hints that include the name:
- `(property) 0: boolean (success)`
- `(property) 1: number (remainingAuthorizations)`


### Variadic Tuple Types
Before we wrap up this section, there is one more feature of tuples that is pretty cool. Before learning about this, you should be familiar with JavaScript [array/parameter spreading and destructuring](../So%20You%20Think%20You%20Know%20JavaScript/9-properties). If you aren't comfortable with that yet, feel free to skip this section, as it's more of a bonus topic to demonstrate the power of TypeScript's type system. Also note that some of the examples in this section are modified from the examples in the TypeScript handbook.

Suppose we have the following code in JavaScript that takes a tuple as input and returns a new tuple equivalent to the first tuple, except with its first value removed (e.g. `['a', 'b', 'c'] => ['b', 'c']`):

```JavaScript
// Returns a new tuple/array, which is the parameter `arg` without its first element
function tail(arg) {
    const [_, ...result] = arg;
    return result;
}

const tuple = [1, 'fish', true]
const result = tail(tuple); // result is ['fish', true]
const bigFish = result[0].toUpperCase();
```

In the example, the function `tail` takes our input tuple `[1, 'fish', true]` as input, stored in the variable `arg`. We then use object destructuring to set the variable `_` to the first value, `1`. We use the name `_` to signify that we don't care about this value and will not be using it. We then spread the rest of the parameters out into a new array/tuple named `result`, which we return. We then demonstrate that we have acheived our goal by taking the first value from the resulting tuple (the string `'fish'`), and calling the `toUpperCase` function on it.

The question here is how we can add TypeScript type annotations to this such that we can safely access `toUpperCase()`, knowing that the output must start with a string since the second value of the input was a stirng. We can do this with _variadic tuple types_:

```TypeScript
// Returns a new tuple/array, which is the parameter `arg` without its first element
function tail<T extends any[]>(arg: [any, ...T]): T {
    const [_, ...result] = arg;
    return result;
}

const tuple: [number, string, boolean] = [1, 'fish', true]
const result = tail(tuple); // result is ['fish', true]
const bigFish = result[0].toUpperCase();
```

First, we can see that the function `tail` is generic, taking a type parameter `T` that is restricting to being some kind of array. Since tuples are arrays, this means it will accept a tuple as well. This makes sense because we want to have the return type change based on the input, so the function must be generic. Notice, however, that when we call the function, we do not pass the parameter and leave it to be inferred based on the parameter we pass in.

Next, let's skip ahead to the return type of the function. We can see that it returns type `T`. So that means that `T` must be the type of the input tuple with the first value removed. All that's left now is to figure out how to represent that input type in terms of `T`.

Looking back to the type of the parameter `arg`, we can see that the type is `[any, ...T]`. This resembles in the implementation how we write `[_, ...result]`. We're saying that the first parameter's type doesn't matter (which makes sense, since we assign it to `_` and ignore it), and then the rest of the tuple should consist of the values of `T`, the return type.

If we follow the example, we pass in a parameter of type `[number, string, boolean]`. In order to match this with the input type of `[any, ...T]`, `T` is inferred to be `[string, boolean]`, so the return type is `[string, boolean]`.

Also note how we were able to spread out a tuple within another tuple when we wrote `[any, ...T]`. We can even do this with arrays. Here are a few more examples of this:

```TypeScript
type StringPair = [string, string];
type NumberTriplet = [number, number, number];
type FullHouse = [...StringPair, ...NumberTriplet]; // [string, string, number, number, number]

type Request = [string, boolean]
type Response = [number, string];
type FullTransaction = [...Request, ...Response, number]; // [string, boolean, number, string, number]

type StringAndNums = [string, ...number[]]; // [string, number, number, number, ...]

type ComplexTuple = [number, ...string[], boolean]; /// [number, string | boolean, string | boolean, string | boolean, ...]
```

Note that if a spread array in a tuple is not the last item in the tuple, all items from the start of the array on will be a union type of the array element type and all types that come after, since the length of the array is variable.

[Next: Type Predicates and Assert Signatures](7-type-predicates.md)

[Table of Contents](0-intro.md)

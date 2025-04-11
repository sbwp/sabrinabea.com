[Previous: More Types of Types](3-types.md)

## Generics and Type Parameters
The place where a langauge's type system can get complicated is usually with generics, and TypeScript is no exception. In fact, TypeScript's type system is so powerful that it is treated almost like a second language written alongside the JavaScript, and thus the generic type arguments are referred to as Type Parameters, like a second set of parameters being provided to functions and constructors (The term Type Variable also comes up).

If you're not comfortable with generics already from another language, I would recommend following this chapter up with some additional resources on the topic such as [this section of the TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/generics.html).

At it's simplest, TypeScript's generics aren't particularly difficult to understand. Take the following example which would benefit from generics:

```TypeScript
function getFifthElement(arr: any[]): any {
    return arr[4];
}

const myStrArr: string[] = ['some', 'body', 'once', 'told', 'me', 'the', 'world'];
const myNumArr: number[] = [0, 1, 1, 8, 9, 9, 9, 8, 8, 1, 9, 9, 9, 1, 1, 9, 7, 2, 5, 3];

let a = getFifthElement(myStrArr);
let b = getFifthElement(myNumArr);
```

This example (while trivial) demonstrates a common and annoying situation. You pass data into a function and get a result. Based on the input, _you_ know that the output should be of a specific type, but the type system doesn't. In this case, both `a` and `b` are typed as `any`, but you know that `a` should be `string` and `b` should be `number`. Essentially, there is a specific result type, which can be determined based on the input type. Let's look at this example using generics.

```TypeScript
function getFifthElement<T>(arr: T[]): T {
    return arr[4];
}

const myStrArr: string[] = ['some', 'body', 'once', 'told', 'me', 'the', 'world'];
const myNumArr: number[] = [0, 1, 1, 8, 9, 9, 9, 8, 8, 1, 9, 9, 9, 1, 1, 9, 7, 2, 5, 3];

let a = getFifthElement(myStrArr);
let b = getFifthElement(myNumArr);
```

Now the type system knows that `a` is a `string` and `b` is a `number`. Notice that we didn't actually have to pass the type parameter _to_ the function when we called it. It automagically inferred the type parameter based on the value we passed in. It saw that `arr` was a `string[]` in the first case, and new that `getFifthElement` should return a `string`. In cases where the type logic is too complex to infer, or the information is not there to infer it, we can provide the type parameter manually like this:

```TypeScript
let a = getFifthElement<string>(myStrArr);
```

There are all sorts of usecases for generics in TypeScript. Since this is just an introduction, we won't even scratch the surface of the complex type system, but here is an example of a very useful real-world use-case for generics in TypeScript:

```TypeScript
function queryDOM<ElementType = HTMLElement>(query: string): ElementType {
    let debugElement = fixture.debugElement.query(By.css(query));
    return debugElement.nativeElement as ElementType;
}

expect(queryDOM<HTMLInputElement>('.nameInput').value).toEqual('Robert Smith');
expect(queryDOM('.profileTab').classList).toContain('active');
```

This is loosely based on (read: it's supposed to be accurate, but I didn't test it) Angular component testing. The function queries for an element on the DOM and then casts the result to the expected type to allow accessing properties specific to that element type, like `value` on [`HTMLInputElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement). If we don't care about specific properties, we can just call the function without a tyep argument and it will default to [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) (note the syntax for specifying a default value for a type parameter, which is similar to the syntax for a default value for a regular function parameter).

[Next: Optional Properties And Utility Types](5-utility.md)

[Table of Contents](0-intro.md)

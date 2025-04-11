[Previous: Creating Observables](2-create-observables.md)
### Operators
In RxJS, _operators_ allow us to apply a transformation to an observable and subscribe to the output. Let's start by taking a look at the most common operator in action: `map`.

```TypeScript
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

const myObservable$ = from([1, 2, 3, 4, 5]);

const modifiedObservable$ = myObservable$.pipe(
    map(x => x * 2)
);

modifiedObservable$.subscribe(console.log);
```

_Output:_
```
2
4
6
8
10
```

From the previous sections, we should be familiar with [creating an observable using `from`](./2-create-observables) and [subscribing to an observable](./1-observables-observers), so the only part that should be new here is this part:

```TypeScript
const modifiedObservable$ = myObservable$.pipe(
    map(x => x * 2)
);
```

From the output, we can see that the end result is that we are taking each value in the input observable and multiplying it by two, and that result is output by the resulting observable.

There are two ways to look at what is happening here: what the operators are doing to the observable as a pipeline, and what the code is actually doing as imperative code. Let's start with the latter.

### Understanding the Code
If we break down the code, we can see that we are calling the function `pipe` on the `Observable` class, and we are passing in 1 parameter.

To create the value for that parameter, we are calling the standalone function `map`, and passing in a single parameter, a function that multiplies a single parameter by 2. We could rewrite the code as follows:

```TypeScript
const fn: (x: number) => number = x => x * 2;
const op = map(fn);
const modifiedObservable$ = myObservable$.pipe(op);
```

The natural question to ask here is, "What is `op`?", or put differently, "What is the type of `op`?". If you look at the inferred type in your IDE (CMD+hover in JetBrains IDEs), it will say `OperatorFunction<number, number>`. This tells us that this represents an operator that will transform an `Observable` whose values are `number`s into another `Observable` whose values are also `number`s. If we look at the type of `modifiedObservable$`, we can see that it is `Observable<number>`, the same as `myObservable$`.

What if we pass in a function that returns something other than `number`?

```TypeScript
const fn: (x: number) => string = x => `I have ${x} cats.`;
const op = map(fn);
const modifiedObservable$ = myObservable$.pipe(op);
```

Here, the type of `op` is `OperatorFunction<number, string>`, and the type of `modifiedObservable$` becomes `Observable<string>`.

### The Observable Pipeline
When actually programming with Observables and operators, it is not very common to think of things the way we did above. Usually, we tend to think of it as a pipeline, where each operator is as step in the pipeline. To understand this, let's take a look at a pipeline with multiple operators. To keep things simple, we'll use multiple `map` operators, rather than introduce a new one yet:

```TypeScript
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

const myObservable$ = from([1, 2, 3, 4, 5]);

const modifiedObservable$ = myObservable$.pipe(
    map(x => x * 2),
    map(x => x * x),
    map(x => `I have ${x} cats.`)
);

modifiedObservable$.subscribe(console.log);
```

_Output:_
```
I have 4 cats.
I have 16 cats.
I have 36 cats.
I have 64 cats.
I have 100 cats.
```

We can see that each step in the pipeline is applied sequentially for each value that passes along it. The first value (`1`) goes into the pipeline and gets to the first `map`. This multiplies it by `2`, giving us a new value (`2`). Then, we reach the second `map`, which squares the number, giving us a new value (`4`). Finally, the third `map` is executed, giving us the `string` to print: `'I have 4 cats.'`. Each of the values goes through the same process. The resulting variable is of type `Observable<string>`, because the last operator has an output type of `string`.

What if we switch the last two `map` operators?

```TypeScript
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

const myObservable$ = from([1, 2, 3, 4, 5]);

const modifiedObservable$ = myObservable$.pipe(
    map(x => x * 2),
    map(x => `I have ${x} cats.`),
    map(x => x * x)
);

modifiedObservable$.subscribe(console.log);
```

_Compiler Output:_
```
src/index.ts:9:18 - error TS2362: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.

9     map(x => x * x)
```

We get a compilation error (If we tried the same in JavaScript, it would print `NaN` 5 times), because the output type of the second `map` is a `string`, and then we try to multiply that by itself. This reminds us that the input for each operator (each stage in the pipeline) is the output from the previous operator.

## Common Operators
RxJS defined a _lot_ of operators, so we will cover a few common ones in addition to `map`. For the sake of brevity, we will leave out the import statements for these examples. All operators used below can be imported from `rxjs/operators`, just like `map`. We will also continue using the following observable as input:

```TypeScript
const myObservable$ = from([1, 2, 3, 4, 5]);
```

First, let's look at `filter`:

```TypeScript
const modifiedObservable$ = myObservable$.pipe(
    filter(x => x % 2 == 0)
);

modifiedObservable$.subscribe(console.log);
```
_Output:_
```
2
4
```

Just like the `filter` function on an array, the `filter` operator takes a function that returns a `boolean` as input. The resulting Observable will only emit the values for which the function returned `true`. The values that are filtered out do not pass through any later stages in the pipeline.

We can verify this with another operator, `tap`. This operator allows us to access an intermediate value in the pipeline without modifying the pipeline values. Think of it like tapping a phone line to listen to a call.

```TypeScript
const modifiedObservable$ = myObservable$.pipe(
    tap(x => console.log(`before: ${x}`)),
    filter(x => x % 2 == 0),
    tap(x => console.log(`after: ${x}`))
);

modifiedObservable$.subscribe(console.log);
```
_Output:_
```
before: 1
before: 2
after: 2
2
before: 3
before: 4
after: 4
4
before: 5
```

<!-- TODO: switchMap -->

This next one requires a different observable as input. The `distinctUntilChanged` operator will skip any values that are equal to the previous value.

```TypeScript
const myObservable$ = from([1, 2, 2, 2, 4, 2])

const modifiedObservable$ = myObservable$.pipe(
    tap(x => console.log(`before: ${x}`)),
    distinctUntilChanged()
);

modifiedObservable$.subscribe(console.log);
```
_Output:_
```
before: 1
1
before: 2
2
before: 2
before: 2
before: 4
4
before: 2
2
```

For our next operator, we need to insert a time delay between each value. Normally, this would be due to the application waiting on real world events, but to simulate this, we will use a somewhat complicated line of code to create an observable that emits ten values spread out over time, getting closer together in the middle, and spreading out again towards the end.

> It's not necessary to try to understand how the source observable is created, but I'll give some information about the RxJS features it uses in case you want to figure it out. It makes use of the standalone `concat` function (imported `from 'rxjs'`), which puts multiple observables together, one after the other, and the `delay` operator. It takes a single parameter, which is the number of milliseconds to delay the observable by, but note that it shifts the entire observable by that much, so the distance between values doesn't change. The values just start emitting later.

The operator we are looking at here is `debounceTime`. It adds a debounce to the values, which is a way of making sure values don't come through too close together. It will delay each value by the number of milliseconds passed in to the operator, and if another value comes in before the time passes, it cancels the previous value.

```TypeScript
const myObservable$ =
    concat(...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => of(x).pipe(delay(Math.abs(6 - x) * 200))));

const modifiedObservable$ = myObservable$.pipe(
    tap(x => console.log(`before: ${x}`)),
    debounceTime(300)
);

modifiedObservable$.subscribe(console.log);
```
_Output:_
```
before: 1
1
before: 2
2
before: 3
3
before: 4
before: 5
before: 6
before: 7
7
before: 8
8
before: 9
9
before: 10
10
```

Here, the values 1-3 come in each more than 300ms apart, so they are passed through, but the values 5-7 each come through too quickly after the last value, so the previous value is skipped. Then values 7-10 are printed, since no value comes by the time the debounce time ends.

Note that more than 300ms passes between when the value 4 is emitted and when the value 6 is emitted, and 6 is still not emitted, because the time resets with each newly emitted value, even if the previous value was stopped by the debounce operator.


<!-- TODO: catchError -->
Note: The reason `catchError` doesn't pick back up where it left off on the source observable like `switchMap` does is because the source observable has emitted an error, and therefore by definition, it cannot have anymore values.


[Next: Subjects](4-subjects.md)

---
title: Observables
parent: So You Think You Know JavaScript
nav_order: 16
---
[Previous: Awaiting Your Response](15-async-await.md)

### Like, Comment, and Subscribe
Imagine you've come across a YouTube channel you like, so you _subscribe_ to it. There are a number of videos out on the channel already that you can immediately get access to, and any new videos that the channel releases will appear in your Subscriptions feed.

There are a few ways you can stop receiving videos. You could unsubscribe, or the channel could be deleted, or some sort of error could occur due to a bug within YouTube and cause your subscription to stop working. Also, if the end of the world comes along, all of your subscriptions end with it.

If you stop watching the channel and forget to unsubscribe, your feed will continue to receive the videos, wasting resources and potentially causing issues (like you could accidentally click on that video instead of one from a channel you still watch).

If you understood that, you understand RxJS Observables.

Just like YouTube channels release a series of videos, Observables emit a series of values. When you _subscribe_ to an observable, you receive all of the values it has emitted so far, and you will receive any future values when they are emitted.

To stop receiving values, you can unsubscribe. Just like a YouTube channel could be deleted and therefore stop producing videos, an observable can _complete_ and stop producing values. Just like an error within YouTube can mess up your subscription, an Observable can emit an _error_, and your subscription will stop receiving values. Instead of the end of the world, all it takes is your program ending to stop all of your observables.

If you no longer need to receive values from an Observable and you forget to unsubscribe, your subscription will continue to receive the values, wasting resources and potentially causing errors (like attempting to access an object that has been destroyed).

##### RxJS
There's only one catch to using Observables: they're not in the JavaScript language. OK, that was a bit of a clickbait statement. They come from a popular third-party library called RxJS. While I wanted to keep this article limited to vanilla JavaScript, RxJS observables are so common and so transformative to how asynchronous code is written that I would be remiss to leave them out.

An interesting thing to note is that promises and `async`/`await` were both available as third-party libraries before they were added to the ECMAScript standard, and even then, they were commonly used in production code as well.

The Reactive Extensions Library for JavaScript, more commonly known as RxJS is an open source library for reactive programming in JavaScript.

If you've ever used reactive programming in another language, it is likely you may have run into one of the other ReactiveX libraries, such as RxJava, Rx.NET, RxCpp, RXPY, RxSwift, etc. The primary concept in ReactiveX is the Observable. An observable emits values over time. It can emit any number of values, followed by either an error or a completion.

We will use this notation to show observables:
```
-------1---15--3------37--2---|----->

--3-------14-------7--------2-----X->
```
Each number is an emitted value, an `X` is an error, and the vertical bar is a completion. Note that in the case of an error, there is no completion, and no more values can be emitted after a completion or an error.

We were able to await the results of a promise using `.then(resolveHandler[, rejectHandler])`. For Observables, since there can be multiple values, we use this:
```
.subscribe(nextHandler[, errorHandler[, completionHandler]])

// Alternatively, we can use `.subscribe(partialObserver)`,
// where partial observer is defined as:

interface PartialObserver {
    next?: (value) => void
    error?: (error) => void
    complete?: () => void
}
```
That interface definition was TypeScript. If you haven't used TypeScript, don't worry about the details. The important thing here is that subscribe can take an object with `next`, `error`, and/or `complete` defined as functions. If this sounds confusing, here are some examples:

```
someObservable$.subscribe(
    value => console.log(value),
    err => console.log(err)
    () => console.log('complete')
);

someObservable$.subscribe({
    next: value => console.log(value),
    error: err => console.log(err)
    complete: () => console.log('complete')
});

someObservable$.subscribe({ error: err => console.log(err) });

someObservable$.subscribe({
    error: err => console.log(err)
    complete: () => console.log('complete')
});

someObservable$.subscribe({
    next: value => registerValue(value),
    complete: () => processRegisteredValues()
});
```

```
const someObservable$ = fnThatReturnsAnObservable();

const subscription = someObservable$.subscribe(val => {
    /* Do something with the value */
});

/* A bunch of unrelated stuff happens */

subscription.cancel();
```

In order to show some examples, we first need to learn some utility functions to help with creating Observables for the examples:

```
// ---1234|------>
const anObservable$ = from([1, 2, 3, 4]);

// ---5|--------->
const anotherObservable$ = of(5);

// ---X---------->
const yetAnotherObservable$ = throwError('Oh no!');

// ---|---------->
const heyLookAnObservable$ = empty();
```
The function `from(array)` returns a new observable that will immediately emit all of the values of the provided array and then complete.

The function `of(value)` returns a new observable will emit the single provided value and then complete.

The function `throwError(error)` returns a new observable that will emit the provided error immediately as an error.

The function `empty()` returns a new observable that will emit nothing and immediately complete.


Now that we have some tools at our disposal, let's take a look at RxJS operators:

```
import { from, of } from 'rxjs';
import { skip, filter, take, map, catchError } from 'rxjs/operators';

const menuOptions$ = from([
    'avocado', 'lemons', 'onions', 'steak', 'bacon',
    'brussel sprouts', 'tuna fish', 'swordfish',
    'potato', 'fish and chips', 'mac and cheese',
    'lettuce', 'tomato', 'spaghetti', 'fishy-smelling slop'
]);

const modified$ = menuOptions$.pipe(
    skip(3),
    filter(option => !option.includes('fish')),
    take(4),
    map(option => option + ' with fries'),
    catchError(_ => of('I dropped the food'))
);
```
First, we create an observable containing a number of food choices. Then we call `pipe()` on that observable to begin applying operators.

We:
- `skip` the first 3 items
- `filter` the items to remove anything that includes the word `'fish'`. 
- `limit` the response to complete after the first 4 values  
- use `map` to add `' with fries'` to the end of each entry
- use `catchError` so that if an error occurs during any of this, we stop what we're doing, emit `'I dropped the food'`, and complete the observable.

This new modified observable gets stored in a variable `modified$` to be used later. One important thing to point out is that we still need to `subscribe` to the modified observable for anything to happen. None of this code inside the operators runs until the observable is subscribed to.

##### RxJS Next Steps
Hopefully that's enough to get started with RxJS. I could write a whole separate article covering the basics of it, but if you are going to continue learning about it, I recommend looking at how to use `Subject`s, including `BehaviorSubject` and `ReplaySubject`.

`Subject`s are kind of like junctions in the observable ecosystem. They are both an `Observable` and an `Observer`, so we can `subscribe` to them like an observable, or we can provide values to the subject by passing it to the `subscribe()` function on another observable. We can also manually provide values calling the .next(), .error(), and .complete() functions on the `Subject`.

I'd also recommend looking into multicasting and the various ways to combine together multiple observables.

You can find the documentation for RxJS at rxjs.dev/api. I highly recommend checking out this documentation, as there are some operators that behave slightly differently than you'd expect.

When you google terms in RxJS, you're also likely to come across learnrxjs.io, which has some helpful documentation. Be careful though if you read documentation from reactivex.io. Some of the general ReactiveX terminology is different in RxJS due to naming conflicts with reserved words (such as switch being called switchMap in RxJS), and the part where it says what the equivalent is in RxJS is wrong, because it is based on an old version of RxJS, which had a completely different interface for using operators. They do have some pictures for explaining concepts, though.

[Next: Next Steps](17-next-steps.md)

[Table of Contents](0-intro.md)

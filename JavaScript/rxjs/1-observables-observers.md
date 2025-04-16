---
title: Observables and Observers
parent: RxJS
nav_order: 1
---
### Observables and Observers

#### What is an Observable?
An observable is something that provides a series of values over time. This may seem a bit complicated, but chances are, you're already familiar with the concept -- not from programming, but from YouTube.

In the Intro section, I gave an analogy between Observables and YouTube subscriptions. That was actually an excerpt from the [section on Observables](../sytykjs/16-observables.md) in [_So You Think You Know JavaScript_](../So%20You%20Think%20You%20Know%20JavaScript/0-intro.md). Here is the full quote from So You Think You Know JavaScript:

> &nbsp;
> Imagine you've come across a YouTube channel you like, so you _subscribe_ to it. There are a number of videos out on the channel already that you can immediately get access to, and any new videos that the channel releases will appear in your Subscriptions feed.
> 
> There are a few ways you can stop receiving videos. You could unsubscribe, or the channel could be deleted, or some sort of error could occur due to a bug within YouTube and cause your subscription to stop working. Also, if the end of the world comes along, all of your subscriptions end with it.
>
> If you stop watching the channel and forget to unsubscribe, your feed will continue to receive the videos, wasting resources and potentially causing issues (like you could accidentally click on that video instead of one from a channel you still watch).
> 
> If you understood that, you understand RxJS Observables.
> 
> Just like YouTube channels release a series of videos, Observables emit a series of values. When you _subscribe_ to an observable, you receive all of the values it has emitted so far, and you will receive any future values when they are emitted.
> 
> To stop receiving values, you can unsubscribe. Just like a YouTube channel could be deleted and therefore stop producing videos, an observable can _complete_ and stop producing values. Just like an error within YouTube can mess up your subscription, an Observable can emit an _error_, and your subscription will stop receiving values. Instead of the end of the world, all it takes is your program ending to stop all of your observables.
> 
> If you no longer need to receive values from an Observable and you forget to unsubscribe, your subscription will continue to receive the values, wasting resources and potentially causing errors (like attempting to access an object that has been destroyed).
> &nbsp;

#### What is an Observer?
In order to represent the act of _observing_ values over time, we need something that will _observe_. We call one of these an `Observer`. In the YouTube analogy above, you are the `Observer`, since you _observe_ videos being released by the channel and perform an action (watch the video).

#### What does this look like in code?

##### The Observer Interface
An `Observer` observes three types of events:
- `next`: A new value has been emitted
- `error`: An error has occurred, so there will be no more values.
- `complete`: There will be no more values.

Since values are _pushed_ to an `Observer` rather than _pulled_ by it, the `Observer` doesn't have to do any work to observe the values. Therefore an `Observer` is any object that defines three functions to handle each of the above events. In TypeScript, we can define the `Observer` as an interface as follows:

```TypeScript
interface Observer<ValueType> {
    next: (ValueType) => void;
    error: (any) => void;
    complete: () => void;
}
```

_Note: Some similar libraries, like Apple's Combine choose to strongly type errors, but RxJS does not. This is why the `error` handler parameter is of type `any`._

##### The Observable Class
So where does the work happen? This is handled by the `Observable` class, which represents things which can _be_ observed. An `Observable` has a method called `subscribe` which takes an `Observer` as input. After you `subscribe` to an `Observable` with an `Observer`, the `next` function of the `Observer` will be called whenever the `Observable` emits a value (and the `error` and `complete` functions when the `Observable` emits an error or completes, respectively).

```TypeScript
someObservable$.subscribe({
    next: n => console.log(`value: ${n}`),
    error: e => console.error(`error: ${e}`),
    complete: () => console.log('complete');
});
```

_Note: There is a common convention to name observables ending in `$`, in a sort of reverse [Hungarian Notation](https://en.wikipedia.org/wiki/Hungarian_notation). I find this convention useful, both because you can spot an `Observable` from a mile away and know you're going to have to handle its asynchronicity, and because it often helps resolve variable name collisions, especially when exposing a `Subject` as an `Observable` (we'll cover this in a later section)._

Sometimes you want to subscribe to an `Observable`, but you don't have any behavior to run for one or more of the handlers (`next`, `error`, or `complete`). To cover this use case, `Observable.subscribe` takes a `Partial<Observer>` as input. If you're not familiar with `TypeScript`'s `Partial` type, the resulting type is equivalent to this:
```TypeScript
interface PartialObserver<ValueType> {
    next?: (ValueType) => void;
    error?: (any) => void;
    complete?: () => void;
}
```

In other words, all three handlers are optional in the `Observer` passed to `Observable.subscribe`:
```TypeScript
someObservable$.subscribe({
    next: n => console.log(`value: ${n}`),
    complete: () => console.log('complete');
});

anotherObservable$.subscribe({
    complete: () => console.log('complete');
});

oneMoreObservable$.subscribe({
    error: () => console.error('error');
});
```
 
##### Subscriptions
The return type of `Observable.subscribe(Partial<Observer>)` is a `Subscription`. A `Subscription` has a function called `unsubscribe()`, which unsurprisingly cancels the subscription. Once `unsubscribe()` is called, none of the `Observer`'s functions will be called as a result of that subscription. Note that `complete` and `error` are _**not**_ called when a subscription is canceled. It is important to cancel any subscriptions that are not known to have completed or errored.

_Note: `Subscription` only has 2 other functions, `add(Subscription)` and `remove(Subscription)`. When `unsubscribe()` is called on a `Subscription`, all child subscriptions added to it are canceled, recursively._

##### Subscribe Shorthand
It is common to subscribe to an observable with just a `next` function or with just an `error` function. In these cases, it gets a bit wordy to include the curly braces and the `next` and `error` labels. To support this situation, `Observable.subscribe` can alternatively take just a `next` function or just a `next` and `error` function as input.

Examples:
```TypeScript
someObservable$.subscribe(n => console.log(`value: ${n}`));

anotherObservable$.subscribe(
    n => console.log(`value: ${n}`),
    e => console.error(`error: ${e}`)
);

youtubeChannel$.subscribe(url => {
    const video = downloadVideo(url);
    play(video);
});

userNotifications$.subscribe(notification => {
    const notificationContent = generateContent(notification);
    displayToast(notificationContent);
}, error => {
    if (error?.reason === 'unauthorized') {
        routeTo('/login');
    } else {
        displayToast('Failed to fetch notifications. Please try again later.');
    }
});
```

#### Errors and Completion
Before we move on, we should re-iterate what is considered valid within an `Observable` lifecycle.

1. The `Observable` will emit 0 or more values (these will get passed to the `next` function on a subscribed `Observer`).

2. If there is an error, it will emit 1 error (this will get passed to the `error` function on a subscribed `Observer`), and nothing else will follow.

3. If there is no error, the `Observable` may or may not complete, after which there can be no values or errors.

If you're familiar with regular expressions, this would be the expression to match a valid observable lifecycle, where `n` represents `next`, `e` represents `error`, and `c` represents `complete`: `/n*(e|c)?/`

Examples:
- Empty observable. This observable does not emit anything and completes immediately. It is available as a `static` constant on the `Observable` class, as `Observable.EMPTY`. The `next` and `error` functions are _never_ called, and the `completion` is called once. In the regex example above, this would be the string `c`.
- Immediately-completing observable with one value. This observable emits one value and then completes. It can be created using RxJS's `of()` function, which we will cover in the next section. It calls the `next` function with its one value and then the `complete` function. The string for this in the regex example would be `nc`.
- If you were to actually create an `Observable` that emitted the URLs for videos posted on a YouTube channel, it would emit URLs over time, never completing or reaching an error. This would call the `next` function with the new URL every time a new video is posted, and it would never call the `complete` or `error` function. In our regex example, this string would be an infinite (as far as we're concerned) string of `n`s.
- Let's tweak the previous example and say that after receiving 4 videos, the channel is taken down due to copyright strikes, and our `Observable` interprets this as an error. The `next` function would be called for each of the four URLs while the channel is still up, and then as soon as the channel is taken down, the `error` function would be called once with some value representing the error (maybe an object `{ reason: 'copyright takedown' }`). After that, there would be no more values emitted and no completion. The string for our regex example would be `nnnne`.

[Next: Creating Observables](2-create-observables.md)

[Previous: Operators](3-operators.md)

### Subjects
Now that we've covered Observables, Observers, and the Operators that modify them, let's talk about a different subject: Subjects. 

Let's imagine we're creating an application with a button and a text field. The text field's current value is accessible through `textField.value`, and when the button is pressed, a function called `handleButtonClick()` is called. We want to create an Observable `textValue$` that emits the latest value from the text field whenever the button is clicked:

```TypeScript
const textField = document.getElementById('myTextField') as HTMLInputElement;

function handleButtonClick() {
    // TODO: Create an observable that emits the latest value from the text field every time the button is clicked
}
```

We want something that we can subscribe to and receive values over time like an `Observable`, but we also need to be able to push a value into it from the `handleButtonClick()` function, like with an `Observer`. RxJS provides us with the perfect tool for this job: the `Subject`. Is it an `Observable` or an `Observer`? The answer is subjective, as it can fill either role depending on your perspective. A `Subject` is an `Observable` that is _also_ an `Observer`. Any calls to its `next`, `error`, or `complete` functions are passed along to its subscribers. There are many useful use cases for a `Subject`, but for now let's focus on the above example.

First, let's create a `Subject` to hold our value. This can be done by simply calling its `constructor` with no parameters:

```TypeScript
const textValueSubject = new Subject<string>();
```

_TypeScript note: We provided a type parameter of `string` to type-check the input/output of the subject, but this type parameter is optional._

Now let's pass the value along to the subject:

```TypeScript
const textField = document.getElementById('myTextField') as HTMLInputElement;
const textValueSubject = new Subject<string>();

function handleButtonClick() {
    textValueSubject.next(textField.value);
}
```

All we need to do is call the `next` function on the subject, just like any other `Observer`. Now let's subscribe to the value and log it to the console:

```TypeScript
const textField = document.getElementById('myTextField') as HTMLInputElement;
const textValueSubject = new Subject<string>();

function handleButtonClick() {
    textValueSubject.next(textField.value);
}

textValueSubject.subscribe(console.log);
```

Just like with a normal `Observable`, all we need to do is call the `subscribe` function and provide an `Observer` or `next` function.

What if we want to be able to update a subject like this ourselves, but we want to provide consumers with a way to subscribe to the values without having write access? This is a common scenario, and `Subject` provides a simple solution: the `asObservable()` function:

```TypeScript
const textField = document.getElementById('myTextField') as HTMLInputElement;
const textValueSubject = new Subject<string>();
const textValue$ = textValueSubject.asObservable();

function handleButtonClick() {
    textValueSubject.next(textField.value);
}

textValue$.subscribe(console.log);
```

Here, we can create an observable `textValue$` that has access to all the values emitted from `textValueSubject` without also giving consumers access to the input side of the `Subject`.

A common pattern in TypeScript is to make a Subject `private` and expose a `public` Observable, as in the following example:

```TypeScript
class MenuService {
    public currentMenu$: Observable<Menu>;
    private currentMenu = new Subject<Menu>();

    public constructor() {
        this.currentMenu$ = currentMenu.asObservable();
    }

    public selectMenu(menu: Menu) {
        this.currentMenu$.next(menu);
    }
}
```

### BehaviorSubject and ReplaySubject
Let's take a closer look at that previous example, because there's a problem with it. First, let's get some context. This service is in a food delivery app, and the current menu represented by the `Subject` is the restaurant's menu that is currently selected by the user. The `selectMenu()` function is called when the user selects a restaurant, and the view logic uses the `currentMenu$` observable to get information about the menu to display to the user.

What happens if a consumer in the view logic subscribes to `currentMenu$` _after_ the value is set? The answer is nothing, until the user selects a different menu. The `Subject` does not cache values; it simply passes them along to consumers in real time. Luckily, `rxjs` provides some additional types of `Subject` that cache previous values to provide to new consumers. These are called `ReplaySubject` and `BehaviorSubject`.

The constructor for `ReplaySubject` takes as a parameter the number of values to cache and replay to new subscribers. Note that if you do not provide a value, it will default to `Infinity`. This can potentially create a memory leak if not used carefully. It is a good idea to always specify a max buffer size for `ReplaySubject`, and there is even an [eslint rule](https://github.com/cartant/eslint-plugin-rxjs/blob/main/docs/rules/no-ignored-replay-buffer.md) to help prevent accidentally leaving the value empty (it allows manually specifying `Infinity` for the cases when that makes sense).

What we want for the `MenuService`, however, is the much more common `BehaviorSubject`. `BehaviorSubject` is basically a specialized case of the `ReplaySubject` for a buffer size of 1, but it has one additional property which is very useful: it must always have a value. Since a `BehaviorSubject` is guaranteed to have a single, unique value at any point in time, the value can be accessed synchronously using the `readonly` property, `value`. This comes in handy a lot when you need to get the current value as part of a synchronous, one-time action.

Let's update the above example to use a `BehaviorSubject` and add a function for reporting a menu error:

```TypeScript
class MenuService {
    public currentMenu$: Observable<Menu>;
    private currentMenu = new BehaviorSubject<Menu>(undefined);

    public constructor(private customerServiceSvc: CustomerServiceService) {
        this.currentMenu$ = currentMenu.asObservable();
    }

    public selectMenu(menu: Menu) {
        this.currentMenu$.next(menu);
    }

    public reportMenuError(errorDescription: string) {
        const menu = this.currentMenu.value;

        if (menu) {
            this.customerServiceSvc.reportMenuError(menu, errorDescription);
        }
    }
}
```

We replaced `Subject` with `BehaviorSubject`, and provided an initial value, which we set to be `undefined`. Note that depending on your `TSC` options, TypeScript may require you to type the `BehaviorSubject` as `BehaviorSubject<Menu | undefined>` to support this. Either way, remember to check if the value is `undefined` before using it.

In `reportMenuError`, we access the current menu synchronously by using `currentMenu.value`. If the value is not `undefined`, we then make use of that value to submit the report.

Remember that new subscribers to a `BehaviorSubject` will immediately receive the current value, and they will then receive all future values when the `BehaviorSubject` receives them via its `next` function.

New subscribers to a `ReplaySubject` with a buffer size of `n` will receive the most recent `n` values in rapid succession, in the order they arrived. If there are fewer than `n` previous values, all previous values will be received. Then they will receive all future values as the `ReplaySubject` receives them via its `next` function.

For all types of `Subjects`, if the `Subject` receives an error, all existing consumers will receive an error, and all future consumers will immediately receive the error. If the `Subject` receives a completion, all existing consumers will receive the completion, as will future consumers as they subscribe. New values passed to `next` will be ignored after error/completion.

_Note that `ReplaySubject` seems to continue functioning after completion, adding new values from `next` into its buffer and providing them to new subscribers before the completion. Just try to avoid this situation, as it is a bug that has been misconstrued as being intended due to its similarity with another unrelated situation, and it may change in the future._

<!-- [Next: ](TODO) -->

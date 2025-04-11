---
title: Promise
parent: So You Think You Know JavaScript
nav_order: 14
---
[Previous: Please Callback](13-callbacks.md)

## I Promise I'll Change
There is! ES2015 introduced the `Promise` to JavaScript. A `Promise` is an object that represents a value that is not yet determined. Take the following example:
```
function handleButtonClick() {
    get('http://example.com/api/fish').then(result => {
        clearAnimals();
        setBackground('aquarium');
        setFishForDisplay(result.fish);
    }, error => 
        showErrorMessage('Sorry. We failed to find the fish.')
    );
}
```

Like with callbacks, this allows us to perform asynchronous tasks like web requests and respond to the results when they are ready. In this simple example, it just looks like more code, but let's look at the complicated example from above. We will go back to when it was all in one function.

```
function populateFriendsOfFriends() {
    return get(`http://example.com/api/users?email=${state.email}`).then(
        result => get(`http://example.com/api/friends?user="${result.users[0].userId}"`),
        _ => rejectWithMessage('Sorry. We failed to find the user.')
    ).then(
        result => Promise.allSettled(result.friends
            .map(friend => get(`http://example.com/api/friends?user="${friend.userId}"`))
        ),
        reason => rejectWithMessage('Sorry. We failed to find friends for the user.', reason)
    ).then(
        results => Promise.allSettled(results
            .filter(result => result.status === 'fulfilled')
            .flatMap( result => result.value.friends.map(
                friend => get(`http://example.com/api/users?userId=${friend.userId}`)
            ))
        ),
        _ => Promise.reject()
    ).then(
        results => results
            .filter(result => result.status === 'fulfilled')
            .map(result => result.value.users[0])
            .forEach(user => registerFriendOfFriend(user)),
        _ => Promise.reject();
    );
}

function rejectWithMessage(message, error) {
    if (error !== 'upstream failure') {
        showErrorMessage(message);
    }
    return Promise.reject('upstream failure');
}
```

Here we can see that what was previously highly nested, with each subsequent piece of code being passed as a callback to the previous piece of code, is now much more sequential, with everything nested one level deep inside of a `.then()`, and the error handlers passed as the second parameter to `.then()`. This is all possible because of _Promise chaining_.

One thing worth pointing out is how we `return` the promise chain. This allows consumers of the function to perform an action after it has finished by passing a callback to `.then()` on the call to this function (i.e. `populateFriendsOfFriends().then(/* use results */)`).

Of course this example was meant to demonstrate how it handles a complex situation, so here's a simpler example:
```
function isItRainingAtLatLng(lat, lng) {
    return getAddressForLatLng(lat, lng)
        .then(address => address.zipCode)
        .then(zip => getWeatherForZip(zip))
        .then(weather => weather.precipChance)
        .then(precipChance => precipChance > 0.5);
}
```
There's a lot to unravel here for such a short code sample. First of all, we have the functions `getAddressForLatLng(lat, lng)` and `getWeatherForZip(zip)`, which we can assume make a call to a third-party API and return a Promise based on the response.

First, we call `getAddressForLatLng()` and call `.then()` on the response. Seems straightforward. Inside of that `.then()`, we extract the zipCode from the address. We can see that `.then()` nicely wraps up the result of its success handler in a Promise, because we are able to call `.then()` on the result of it. This promise resolves when the first promise has resolved and the sucess handler has been run.

In the next `.then()`, we call `getWeatherForZip()`. This also returns a promise. `.then()` will automagically detect that the return value is a Promise and flatten out the structure so that we receive a single promise that will resolve to the weather object.

After this, we simply use 2 more chained `.then()` calls to extract the precipitation chance from the weather and check that it is greater than 50%.

It's worth noting that some of these chained `.then()` calls are superfluous for the sake of demonstrating how `.then()` works. This example would be better written as:
```
function isItRainingAtLatLng(lat, lng) {
    return getAddressForLatLng(lat, lng)
        .then(address => getWeatherForZip(address.zipCode))
        .then(weather => weather.precipChance > 0.5);
}
```

Also of note in our friends of friends example is the use of `Promise.allSettled`. This is the much less common counterpart to `Promise.all`, and both allow us to wait on an array of promises. `Promise.all` will resolve if and when all promises are resolved successfully, but it will reject if any of the promises passed to it rejects, whereas `Promise.allSettled` will resolve after all promises passed to it have either resolved or rejected. To handle the rejections, the resulting array will contain an object with a `status` of either `fulfilled` or `rejected`, and either a `value` (if fulfilled) or `reason` (if rejected).

Example:
```
let allSuccessful = [Promise.resolve(4), Promise.resolve(5), Promise.resolve(6)];
let mixedSuccess = [Promise.resolve(4), Promise.reject('OH NO'), Promise.resolve(6)];
let allFailed = [Promise.reject('Whoops'), Promise.reject('That was a mistake'), Promise.reject('I dropped it')];

Promise.all(allSuccessful).then(
    result => console.log(`Success: ${JSON.stringify(result)}`)
    error => console.log(`Error: ${JSON.stringify(error)}`)
);
Promise.allSettled(allSuccessful).then(
    result => console.log(`Success: ${JSON.stringify(result)}`)
    error => console.log(`Error: ${JSON.stringify(error)}`)
);
```
```
> Success: [4,5,6]
  Success: [{"status":"fulfilled","value":4},{"status":"fulfilled","value":5},{"status":"fulfilled","value":6}]
```
```
Promise.all(mixedSuccess).then(
    result => console.log(`Success: ${JSON.stringify(result)}`)
    error => console.log(`Error: ${JSON.stringify(error)}`)
);
Promise.allSettled(mixedSuccess).then(
    result => console.log(`Success: ${JSON.stringify(result)}`)
    error => console.log(`Error: ${JSON.stringify(error)}`)
);
```
```
> Error: 'OH NO'
  Success: [{"status":"fulfilled","value":4},{"status":"rejected","reason":"OH NO"},{"status":"fulfilled","value":6}]
```
```
Promise.all(allFailed).then(
    result => console.log(`Success: ${JSON.stringify(result)}`)
    error => console.log(`Error: ${JSON.stringify(error)}`)
);
Promise.allSettled(allFailed).then(
    result => console.log(`Success: ${JSON.stringify(result)}`)
    error => console.log(`Error: ${JSON.stringify(error)}`)
);
```
```
> Error: 'Whoops'
  Success: [{"status":"rejected","reason":"Whoops"},{"status":"rejected","reason":"That was a mistake"},{"status":"rejected","reason":"I dropped it"}]
```
In that example, we also used `Promise.resolve(value)`, which will return a promise which immediately resolves with the appropriate `value`, and `Promise.reject(reason)`, which will return a promise which immediately rejects with the appropriate reason.

```
const promise1 = Promise.resolve();
const promise2 = Promise.resolve('foo');
const promise3 = Promise.reject();
const promise4 = Promise.reject('foo');

promise1.then(val => console.log(val))
promise2.then(val => console.log(val))
promise3.then(() => {}, reason => console.log(reason))
promise4.then(() => {}, reason => console.log(reason))
```
```
> undefined
  foo
  undefined
  foo
```

#### Make a Promise
```
// Will resolve to 4 after 1 second
const p = new Promise((resolve, reject) => {
    setTimeout(() => resolve(4), 1000);
});

// Will reject with an undefined error after 2.5 seconds
const q = new Promise((resolve, reject) => {
    setTimeout(reject, 2500);
});

// Convert a callback-based function to work with Promises
const getWithPromises = url => {
    return new Promise((resolve, reject) => {
        get(url, (result, error) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

getWithPromises('http://example.com/api/birds')
    .then(birds => binoculars.lookAt(birds));
```
Here we can see that the promise constructor takes a function as its parameter. That function takes two parameters, resolve and reject, which we can call within the function to resolve or reject. Just like with the convenience functions we saw previously, they take an optional value to resolve to or reject with.

We create two promises, `p` and `q`. The first promise, `p`, resolves to `4` after 1 second, and `q` rejects with no reason after `2.5` seconds.

Then for a more concrete example, we show what it would look like to convert our `get` function from the callback examples to use promises. Note that we can convert a callback-based function to use Promises using the promisify npm package.

#### Returning Promises
Earlier, we saw the promise chain being returned from a function so that callers of the function can chain `.then()` calls on it. Let's break down our friends of friends example into functions again to see that put to use. I also added a `makeApiCall` function to show off a few of the other features we've covered in a more realistic context.

There should be no new concepts covered in this example, but hopefully it demonstrates how returning promises from functions helps to keep async code reusable and readable.
```
function makeApiCall(endpoint, params) {
    let url = `http://example.com/api/${endpoint}?`;
    for (const key in params) {
        url += `${key}=${params[key]}&`;
    }
    url = url.slice(0, -1);
    return get(url);
}

function rejectWithMessage(message, error) {
    if (error !== 'upstream failure') {
        showErrorMessage(message);
    }
    return Promise.reject('upstream failure');
}

function getUserDetails(params) {
    return makeApiCall('users', params))
        .then(
            result => result.users[0],
            error => rejectWithMessage('Sorry. We failed to find the user.', error)
        );
}

function getFriendsByUserId(userId) {
    return makeApiCall('friends', { user: userId }))
        .then(
            result => result.friends,
            error => rejectWithMessage('Sorry. We failed to find friends for the user.', error)
        );
}

function getSuccessfulResults(promises) {
    return Promise.allSettled(promises)
        .then(results =>
            results
                .filter(result => result.status === 'fulfilled')
                .map(result => result.value)
        );
}

function getDetailsForFriends(userId) {
    return getFriendsByUserId(userId)
        .then(friends => {
            const friendDetails = friends.map(
                friend => getUserDetails({ userId: friend.userId })
            )
            return getSuccessfulResults(friendDetails)
        });
}

function getDetailsForFriendsOfFriends(userId) {
    return getFriendsByUserId(userId)
        .then(friends => {
            const fofDetails = friends.map(
                friend => getDetailsForFriends(friend.userId)
            )
            return getSuccessfulResults(fofDetails)
        })
        .then(friends => friends.flat());
}

function populateFriendsOfFriends() {
    return getUserDetails({ email: state.email })
        .then({ userId } => getDetailsForFriendsOfFriends(userId))
        .then(registerFriendOfFriend);
}
```

[Next: Awaiting Your Response](15-async-await.md)

[Table of Contents](0-intro.md)

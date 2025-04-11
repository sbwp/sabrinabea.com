---
title: Async Await
parent: So You Think You Know JavaScript
nav_order: 15
---
[Previous: I Promise I'll Change](14-promise.md)

### Awaiting Your Response
While promises are a huge step up over callbacks, they can still be a bit confusing, especially when it comes to error handling and returning from functions. ES2017 helped to alleviate these issues with the introduction of two new keywords: `async` and `await`. The `async` keyword marks a function as asynchronous, which simply means that it returns a promise. If the function does not include a `return` statement, it will return an empty promise when the end of the function has been reached.

```
function someFunction() {
    return 4;
}

async function someAsyncFunction() {
    return Promise.resolve(4);
}

console.log(someFunction());
someAsyncFunction().then(value => console.log(value));
```
```
> 4
  4
```

The `await` keyword can only be used _inside_ a function marked as `async`, and if it is placed in front of a promise, it will cause the function to wait until promise completes. If the promise is rejected, the reason will be thrown.

Example:
```
async function getUserNames() {
    const users = await getUsers();
    return users.map(user => user.name);
}

async function thisWillFail() {
    await Promise.reject('Oh No!');
}

getUserNames().then(names => console.log(names));
thisWillFail();
```
```
> ["Liz","Phil","Chuck","Anne","Andy","Ed"]
x Uncaught (in promise) Oh No!
```

Here's a comparison of error handling with promises vs `async`/`await`.
With promises:
```
handleError(error) {
    resetAppState();
    logFailure(error);
    routeToErrorPage();
}

fetchData()
    .then(data => {
        // interpret the data
        return fetchRelatedResults();
    }, handleError)
    .then(results => {
        // manipulate the results
        return fetchRelevantFindings();
    }, handleError)
    .then(findings => {
        // display the findings
    }, handleError)
```

With `async`/`await`
```
try {
    const data = await fetchData();
    // interpret the data

    const results = await fetchRelatedResults();
    // manipulate the results

    const findings = await fetchRelevantFindings();
    // display the findings
} catch(error) {
    resetAppState();
    logFailure(error);
    routeToErrorPage();
}
```
This is _extremely_ useful, because it allows us to write asynchronous code __as if it was synchronous__. Let's revisit our weather example from earlier, this time using `async`/`await`.
```
async function isItRainingAtLatLng(lat, lng) {
    const address = await getAddressForLatLng(lat, lng)
    const weather = await getWeatherForZip(address.zipCode)
    return weather.precipChance > 0.5;
}
```
This function is a great example of how straightforward and seemingly synchronous `async`/`await` makes asynchronous code. All we need to do is assign the results of the asynchronous functions to variables using the `await` keyword, and it looks just like we had called a synchronous function.
```
async function isItRainingAtLatLng(lat, lng) {
    const { zipCode } = await getAddressForLatLng(lat, lng)
    const { precipChance } = await getWeatherForZip(zipCode)
    return precipChance > 0.5;
}
```
Since the results are normal values, we can also use Object Destructuring syntax to get only the properties we need.
```
async function isItRainingAtLatLng(lat, lng) {
    return (await getWeatherForZip((await getAddressForLatLng(lat, lng)).zipCode)).precipChance > 0.5;
}
```
And, in case you were wondering, `await` will work in contexts other than assignment too, so we can even make this a one-liner (although I wouldn't recommend doing that, since it makes the code difficult to read, as this example demonstrates).

Now let's see what it does to our complex asynchronous example:

```
async function populateFriendsOfFriends() {
    try {
        const { users } = await get(`http://example.com/api/users?email=${state.email}`);
        const { friends } = await get(`http://example.com/api/friends?user=${users[0].userId}`);

        const fofIds = (await Promise.allSettled(friends.map(friend => get(`http://example.com/api/friends?user=${friend.userId}`))))
            .filter(result => result.status === 'fulfilled')
            .flatMap(result => result.value.friends)
            .map(friend => friend.userId);

        (await Promise.allSettled(fofIds.map(id => get(`http://example.com/api/users?userId=${id}}`))))
            .filter(result => result.status === 'fulfilled')
            .map(result => result.value.users[0])
            .forEach(user => registerFriendOfFriend(user));
    } catch(e) {
        await showErrorMessage('Sorry. We failed to find friends of friends for the user.')
    }
}

function rejectWithMessage(message) {
    showErrorMessage(message);
    return Promise.reject();
}
```
That's much more straightforward.

It's worth pointing out that in the above example, we use one error message for all types of failure (in the previous versions of this example, we used different error messages for the user request vs the friends request), but it would be trivial to add specific error messages for each service call using separate try/catch blocks for each call if we wanted to.

[Next: Like, Comment, and Subscribe](16-observables.md)

[Table of Contents](0-intro.md)

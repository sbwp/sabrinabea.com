[Previous: I Have Asynching Feeling](12-asynchronous.md)

### Please Callback
How do we write asynchronous code? The first answer was callbacks. A callback is a function that is passed to another function to be called when some asynchronous action completes. This is really the cornerstone of asynchronous code in JavaScript.

We'll show this off with the example we mentioned earlier: making a web request.

To simplify the code that's irrelevant to this example, we'll use a pretend library that has a function `get(url, callback)` which will make an HTTP get request to the url `url` and then call the function `callback` with the response. `callback` should take two parameters, `result` and `error`. One will be `undefined` and the other will be set to the appropriate value based on the response. This is a fairly typical format for an asynchronous JavaScript library using callbacks.
```
function handleButtonClick() {
    get('http://example.com/api/fish', (result, error) => {
        if (error) {
            showErrorMessage('Sorry. We failed to find the fish.');
            return;
        }

        clearAnimals();
        setBackground('aquarium');
        setFishForDisplay(result.fish);
    });
}
```

That is a very typical example of what asynchronous JavaScript looks like using callbacks. Where it can get confusing is when they start getting nested. For example, imagine trying to debug this:

```
function populateFriendsOfFriends() {
    get(`http://example.com/api/users?email=${state.email}`, (result, error) => {
        if (error) {
            showErrorMessage('Sorry. We failed to find the user.');
            return;
        }

        get(`http://example.com/api/friends?user=${result.users[0].userId}`, (result, error) => {
            if (error) {
                showErrorMessage('Sorry. We failed to find friends for the user.');
                return;
            }

            if (result.friends.length > 0) {
                result.friends.forEach(friend => {
                    get(`http://example.com/api/friends?user=${friend.userId}`, (result, error) => {
                        if (!error && result.friends && result.friends.length > 0) {
                            result.friends.forEach(friend => {
                                get(`http://example.com/api/users?userId=${friend.userId}`, (result, error) => {
                                    if (!error && result.users && result.users.length > 0) {
                                        registerFriendOfFriend(result.users[0]);
                                    }
                                });
                            });
                        }
                    });
                });
            }
        });
    });
}
```
This issue is so common that it has been given a name, "Callback Hell". When working with callbacks, the best way to prevent this issue is to break down the requests into smaller functions to provide perspective.

If we break this down into smaller functions, we get:
```
function getUserDetailsByUserId(userId, callback) {
    get(`http://example.com/api/users?userId=${userId}`, (result, error) => {
        if (error) {
            showErrorMessage('Sorry. We failed to find the user.');
            return;
        }

        callback(result.users[0]);
    });
}

function getUserDetailsByEmail(email, callback) {
    get(`http://example.com/api/users?email=${email}`, (result, error) => {
        if (error) {
            showErrorMessage('Sorry. We failed to find the user.');
            return;
        }

        callback(result.users[0]);
    });
}

function getFriendsByUserId(userId, callback) {
    get(`http://example.com/api/friends?user=${userId}`, (result, error) => {
        if (error) {
            showErrorMessage('Sorry. We failed to find friends for the user.');
            return;
        }

        callback(result.friends);
    });
}

function getFriendsByEmail(email, callback) {
    getUserDetailsByEmail(email, { userId } => {
        getFriendsByUserId(userId, callback);
    });
}

function getFriendsOfFriendsByEmail(email, callback) {
    getFriendsByEmail(state.email, friends => {
        for (const { userId } of friends) {
            getFriendsByUserId(userId, friendsOfFriend => {
                friendsOfFriend.forEach(callback);
            });
        }
    });
}

function getFofDetailsByEmail(email, callback) {
    getFriendOfFriendsByEmail(email, fof => {
        getUserDetailsByUserId(fof.userId, callback);
    });
}

function populateFriendsOfFriends() {
    getFofDetailsByEmail(state.email, registerFriendOfFriend);
}
```
Even after breaking down the steps into separate functions, in a complex situation like this one, it can stille be a bit difficult to understand. If only there was a better way...

[Next: I Promise I'll Change](14-promise.md)

[Table of Contents](0-intro.md)

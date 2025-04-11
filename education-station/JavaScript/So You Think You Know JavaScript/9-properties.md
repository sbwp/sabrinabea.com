[Previous: What Do We Need Four Fors For?](8-for.md)

### That's My Property!

Let's walk through this code sample:

```
const a = {
    foo: 'hello',
    bar: 'bye'
};

a.foo = 'hey';
a.day = 'monday';
delete a.bar;

console.log(a);
```
```
> {foo: "hey", day: "monday"}
```

We define an object, `a`, and we assign to it two properties, `foo` and `bar`. Below, we are able to reassign the `foo` property and we can even add a new property, `day`, because JavaScript objects are not limited to the properties they are initially defined with.

We can even `delete` the property `bar`. We can see that when we log it, `a` has only the properties `foo` and `day`.

Because we can add and remove properties at runtime, we can think of JavaScript objects as kind of like dictionaries, with bunch of key-value pairs. This is really useful when working with JSON data from a web API.

Let's look at another example:
```
const something = Symbol('something');
const fooPropName = 'foo'

const b = {
    [fooPropName]: 'this is the foo property',
    ['spider-man']: 'peter',
    [7]: 'fish',
    [something]: 'bear'
};

console.log(b[fooPropName]);
console.log(b.foo);
console.log(b[7]);
console.log(b[something]);

console.log('******************************');

console.log(b);
console.log(JSON.stringify(b));
```
```
> this is the foo property
  this is the foo property
  fish
  bear
  ******************************
  {7: "fish", foo: "this is the foo property", spider-man: "peter", Symbol(something): "bear"}
  {"7":"fish","foo":"this is the foo property", "spider-man":"peter"}
```

First we define a `symbol`, one of the 8 types in JavaScript. We will cover them in more detail in the next section, but for now, just know that they are unique identifiers and can be used as keys for objects. We also define a string `fooPropName`, set to `'foo'`.

Next we define an object, `b`, but we use some different kinds of keys. We can use anything as a key, but if it is coming from a variable, or it is not a valid identifier (wouldn't be allowed as a variable name), we have to surround the value in square brackets.

First we use a string property name from a variable, `fooPropName`. Below, we log `b[fooPropName]` and `b.foo`, and we can see that they both correctly log `this is the foo property`.

Then we define the property `spider-man`, which has a hyphen, so it would not be a valid identifier. That means that in order to use it as a property name, we have to put it inside square brackets and make it a string, i.e. `['spider-man']`.

The next key we define is `7`. Notice that the syntax for accessing this property, a number inside square brackets, is the same as accessing an element of an array. Arrays are just specialized objects, and their elements are properties that have numbers as keys.

There's something else interesting going on here, though. JavaScript only allows two types of keys: `string` and `symbol`. When we use another type as a key, like number, it gets _coerced_ into a string.

This is why you shouldn't use objects as keys. Objects all get converted to the string `[Object object]`, so they will all reference the same property.

The final property here is the `symbol` `something` we defined above. Symbols cannot be coerced into strings, but they are also allowed as keys. In this case, I should point out that we are not defining a property whose key is the `string` `'something'`, we're defining a property whose key is the unique `symbol` we declared above, which is assigned to the variable `something` (and has the description `'something'`).

Next we print the object in 2 different ways, once by just logging it, again by converting it to JSON and logging that. When we covert the object into JSON, the `something` property is not there. That's because only `string` keys are included by `JSON.stringify`. Since Symbols all have to be unique, there's no way to store them in JSON that could be properly parsed later on.

##### Spreading and Destructuring
When we get an object back from a function, or we get an object as input to a function and it has a bunch of properties we don't care about and a couple that we do, there's this great feature called Object Destructuring that allows us to assign the properties of an object to specific variables.

```
const fred = {
    name: 'Fred',
    age: 27,
    phoneNumber: '5550123',
    favoriteFood: 'tacos'
};

const { name, age } = fred;

console.log(name);
console.log(age);

const { favoriteFood: food } = fred;
console.log(food);
```
```
> Fred
  27
  tacos
```

First we assign the properties `name` and `age` from the object `fred` to their own variables, `name` and `age`. All we do is write `const` or `let`, followed by the a pair of curly braces containing the names of the properties we want to extract in a comma separated list.

Below that, we have an example of how we can use a different name for the variable than the property name. Here, we access the property `favoriteFood` and call the variable `food`. That's `{ propertyName: variableName }`.

There's a similar analog for arrays called, you guessed it, Array Destructuring. We can extract the first _n_ elements of an array by providing _n_ identifiers in the same format as for Object Destructuring, except with square brackets instead of curly braces.

We can leave a blank to match any properties we want to skip.
```
const bears = ['Brown', 'Grizzly', 'Pooh', 'Polar', 'Black'];
const [, grizzly,, pooh] = bears;

console.log(grizzly);
console.log(pooh);
```
```
> Grizzly
  Pooh
```
We can see that we are able to log out the grizzly and pooh variables specifically.

Next up is another cool feature, Object Spreading.
```
const fred = {
    name: 'Fred',
    age: 27,
    phoneNumber: '5550123',
    favoriteFood: 'tacos'
};

const fredsTwinBrother = {
    ...fred,
    name: 'Tom',
    favoriteBeatle: 'Ringo'
};

console.log(fredsTwinBrother.name);
console.log(fredsTwinBrother.age);
console.log(fredsTwinBrother.phoneNumber);
console.log(fredsTwinBrother.favoriteFood);
console.log(fredsTwinBrother.favoriteBeatle);
```
```
> Tom
  27
  5550123
  tacos
  Ringo
```
We assign a new variable, `fredsTwinBrother` by spreading out the values from `fred` and overriding the `name` property to `'Tom'`. This will give our new object all of the properties that `fred` has, but with the addition or replacement of any properties we add below it.

In this case, we add `name`, which already exists on `fred`, but it gets overridden by our value. When we log out each of these properties, we can see that the `name` is `'Tom'` and our new property `favoriteBeatle` is `'Ringo'`, but the other properties are the same as from `fred`.

If we wanted the properties from `fred` to take precedent over the ones we define here, we would simply put our properties before the spreading of `fred`. Whatever gets the last say wins. 

```
const fred = {
    name: 'Fred',
    age: 27,
    phoneNumber: '5550123',
    favoriteFood: 'tacos'
};

const fredsTwinBrother = {
    name: 'Tom',
    favoriteBeatle: 'Ringo',
    ...fred
};

console.log(fredsTwinBrother.name);
console.log(fredsTwinBrother.age);
console.log(fredsTwinBrother.phoneNumber);
console.log(fredsTwinBrother.favoriteFood);
console.log(fredsTwinBrother.favoriteBeatle);
```
```
> Fred
  27
  5550123
  tacos
  Ringo
```

There is also an analog for arrays here, Array Spreading. This is just like Object Spreading, but for arrays. The syntax is the same: add the name of the array we want to spread with 3 dots before it into the list of values that make up the new array. This time, because arrays are ordered, the values will be inserted into the list at whatever position we place them.

```
const bears = ['Brown', 'Grizzly', 'Pooh', 'Polar', 'Black'];
const animals = ['Dog', ...bears, 'Cat', 'Wolf'];

console.log(animals);
```
```
> ["Dog", "Brown", "Grizzly", "Pooh", "Polar", "Black", "Cat", "Wolf"]
```

When we log out the array, we can see that it includes the bears and their new fuzzy friends.

##### Parameter Destructuring

The fun doesn't stop there. We can use object/array destructuring syntax in function parameters, so instead of writing functions like these:
```
function getForecast(weather) {
    if (weather.precipChance > 0.5) {
        if (weather.temperature < 32) {
            return 'snowy';
        } else {
            return 'rainy';
        }
    } else {
        if (weather.overcastPercent > 0.75) {
            return 'overcast'
        } else if (weather.overcastPercent > 0.5) {
            return 'cloudy'
        } else if (weather.overcastPercent > 0.25) {
            return 'partly cloudy';
        } else if (weather.sunrise < Date() && Date() < weather.sunset) {
            return 'sunny';
        } else {
            return 'moony';
        }
    }
}

function distanceFromOrigin(point) {
    return Math.sqrt(point[0] * point[0] + point[1] * point[1] + point[2] * point[2]);
}
```

You can write these:
```
function getForecast({ precipChance, temperature, overcastPercent, sunrise, sunset }) {
    if (precipChance > 0.5) {
        if (temperature < 32) {
            return 'snowy';
        } else {
            return 'rainy';
        }
    } else {
        if (overcastPercent > 0.75) {
            return 'overcast'
        } else if (overcastPercent > 0.5) {
            return 'cloudy'
        } else if (overcastPercent > 0.25) {
            return 'partly cloudy';
        } else if (sunrise < Date() && Date() < sunset) {
            return 'sunny';
        } else {
            return 'moony';
        }
    }
}

function distanceFromOrigin([x, y, z]) {
    return Math.sqrt(x * x + y * y + z * z);
}
```

This can essentially allow us to use named parameters, so that the user does not need to know the order of parameters and any combination of parameters can be made optional. It also increases readability of code since it is clear what each parameter is doing. For example, let's see what it would look like to use the previous getForecast function vs the same function, but using separate parameters:
```
function getWeather(precipChance, temperature, overcastPercent, sunrise, sunset) {
    ...
}

getWeather(0.4, 42, 0.2, fiveThirtyAm, eightPm);
```
```
function getWeather({ precipChance, temperature, overcastPercent, sunrise, sunset }) {
    ...
}

getWeather({
    precipChance: 0.4,
    temperature: 42,
    overcastPercent: 0.2,
    sunrise: fiveThirtyAm,
    sunset: eightPm
});
```

While it is more code to call the destructured object version, imagine finding a call to this function that you wrote 6 months ago. Are you going to immediately know that 0.4, 42, 0.2 means precipitation chance, temperature, overcast percentage in that order? Also, what if we know it's either sunny or moony, because the precipitation chance and overcast percentage are zero, so we don't want to provide the temperature? Here's what that looks like in each version:
```
function getWeather(precipChance, temperature, overcastPercent, sunrise, sunset) {
    ...
}

getWeather(0.4, undefined, 0.2, fiveThirtyAm, eightPm);
```
```
function getWeather({ precipChance, temperature, overcastPercent, sunrise, sunset }) {
    ...
}

getWeather({
    precipChance: 0.4,
    overcastPercent: 0.2,
    sunrise: fiveThirtyAm,
    sunset: eightPm
});
```
Using destructured object parameters allows us to make any parameter optional without requiring users to pass in `undefined` explicitly.

What if we want to provide a default value for each parameter, where any combination of parameters could be left out to use a default?
```
function createPost(user = loggedInUser, date = Date(),body = '', image = null) {
    ...
}

createPost(undefined, undefined, 'Having a fun vacation!', imageOfBeachHouse);
```
```
function createPost({ user = loggedInUser, date = Date(),body = '', image = null} ) {
    ...
}

createPost({ body: 'Having a fun vacation!', image: imageOfBeachHouse });
```

By using object destructuring for parameters, we can omit any combination of properties to use the default without providing all previous positional parameters, just like in a language with named parameters like [Swift](../../Swift/Swift-For-Developers/0-intro).

##### Rest Parameters
The `...` operator has a use in function parameters as well. At the end of a function's parameter list, you can put a name preceded by `...` to represent an array of the rest of the parameters. This is, fittingly, called the rest parameter.

Example:
```
function addFriendsTo(target, ...friends) {
    for (const friend of friends) {
        target.registerFriend(friend);
    }
}

addFriendsTo(bob, sam, carly, ace, lucy); // target = bob, friends = [sam, carly, ace, lucy]
addFriendsTo(sam, bob, ace); // target = sam, friends = [bob, ace]
addFriendsTo(mike); // target = mike, friends = []
```

Note that you can also use this as the only paramter:
```
function addToWishlist(...items) {
    wishlist.append(items);
}
```

##### Parameter spreading
There is also another use for the `...` parameter with functions. When _calling_ a function, you can spread an array into the parameter list for the function, so the following two examples are equivalent:
```
const myCats = ['fluffy', 'whiskers', 'oliver', 'tom'];
const newCats = ['henry', 'pumpkin', 'winston'];

myCats.push(newCats[0], newCats[1], newCats[2]);
```
```
const myCats = ['fluffy', 'whiskers', 'oliver', 'tom'];
const newCats = ['henry', 'pumpkin', 'winston'];

myCats.push(...newCats);
```

This is especially useful when calling functions with the rest parameter, as in the following example:
```
function addToWishlist(...items) {
    wishlist.append(items);
}

addToWishlist(...shoppingCart.items);
```

##### Object Shorthand Syntax
When assigning properties to an object in ES5, it was common to write the same word as the property name and the property value, especially when there is an existing variable that contains the property.

```
function registerUser(userId, displayName, hashedPassword) {
    this.databse.addUser({ userId: userId, displayName: displayName, hashedPassword: hashedPassword });
}
```

In this case, we have a function that takes information about a new user account and adds the user to a database. We assign each of the function parameters to a property with the same name. How repetitive.

ES2015 introduced a new object shorthand notation that allows us to omit the colon and the property name to assign a variable to a property with the same name as that variable.

```
function registerUser(userId, displayName, hashedPassword) {
    this.databse.addUser({ userId, displayName, hashedPassword });
}
```

Isn't that much nicer?

It also introduced a shorthand syntax for adding functions to an object, allowing us to omit the colon and the `function` keyword:

ES5:
```
var obj = {
    doSomething: function() {
        // do something
    }
};
```

ES2015:
```
var obj = {
    doSomething() {
        // do something
    }
};
```

[Next: Can't Function Without You](11-functions.md)s

[Table of Contents](0-intro.md)

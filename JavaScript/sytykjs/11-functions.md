---
title: Functions
parent: So You Think You Know JavaScript
nav_order: 11
---
[Previous: That's My Property](9-properties.md)

## Can't Function Without You
There are two types of function in JavaScript. First is the classic ES5 and earlier version (let's call these ES5 functions):
```
function average(a, b) {
    return (a + b) / 2
}

// or

const average = function(a, b) {
    return (a + b) / 2
}
```

The second way is using arrow functions, which were introduced in ES6:
```
const average = (a, b) => {
    return (a + b) / 2
}

// or

const average = (a, b) => (a + b) / 2
```

There are two main reasons arrow functions were introduced. One was to provide a shorter syntax for writing a function, which makes passing functions as parameters more readable. Take the following examples:

```
pets.forEach(function(pet, index) {
    setInterval(function() {
        console.log(`You hear a ${pet.noise} from behind door number ${index + 1}.`);
    }, 1000);
});

// versus

pets.forEach((pet, index) => {
    setInterval(() => {
        console.log(`You hear a ${pet.noise} from behind door number ${index + 1}.`);
    }, 1000);
})
```
```
scratchBehindEar(pets.find(function(pet) {
    return pet.type === 'dog';
}));

// versus

scratchBehindEar(pets.find(pet => pet.type === 'dog'));
```

The second reason was because of the confusing way the `this` keyword works with ES5 functions.
Take the following example from the Mozilla Developer Network JavaScript docs:
```
function Person() {
    this.age = 0;
    setInterval(function() {
        this.age++;
    }, 1000);
}
var p = new Person();
setTimeout(() => console.log(p.age), 5000);
```
```
> 0
```
The expected behavior is that it starts with the person's age at 0 and increments every second. After 5 seconds, the age should be 5, and we should see that 5 get printed.

Instead, after 5 seconds, `0` is printed. This is because ES5 functions use _execution context_. Since the function that increments the `age` is called at the global level, rather than in the context of the `Person` constructor, when it tries to access `this.age`, it is using the `this` of the global context, not the `this` of the `Person` function.

If _this_ is getting a bit confusing (_ba dum tsh_), you're not alone. It's bad enough with this simple context, but imagine debugging this issue in a large, complex web application.

#### Arrow Functions
The arrow functions handle `this` differently. They use the _lexical context_, which means they use the context where they were written, which is what _literally everybody_ expects, pretty much always.

That example becomes:
```
function Person() {
    this.age = 0;
    setInterval(() => {
        this.age++;
    }, 1000);
}
var p = new Person();
setTimeout(() => console.log(p.age), 5000);
```

And now after 5 seconds, it prints 5 as expected.

#### Honey, I Shrunk the Function
We can also shorten this down a bit as well. First of all, we can remove the braces from the `setInterval` callback. This will add the side effect that it returns the age, but we don't care what it returns, so that's fine. The `setInterval` call will become:

```
setInterval(() => this.age++, 1000);
```

Notice how we already made use of this shorthand in the `setTimeout` call. There we return the result of `console.log`. Since `console.log` doesn't return anything, it evaluates to undefined (not that it matters since we don't care about the return value in this case).

Another shorthand I like to do is to write `_` instead of `()` for functions that take no parameters. Technically, we're declaring a function that takes one unused parameter whose name is `_`, but I just find it quicker to read without all the extra parentheses. Plus, some IDEs ignore the unused parameter warning when it's called `_`. I also like to use `_` when there are multiple parameters and one is unused.  
(e.g. `pets.forEach((_, index) => console.log(index));`)  

> In TypeScript, the parameters for a function parameter have to match the expected input, so if it is expecting a function that takes no parameters, we have to write `()`, but if takes 1 optional parameter, we can write `_`.

This leaves us with a more concise but functionally identical version:
```
function Person() {
    this.age = 0;
    setInterval(_ => this.age++, 1000);
}
var p = new Person();
setTimeout(_ => console.log(p.age), 5000);
```

## I Need Closure
When an arrow function is declared, a _closure_ is created around the lexical context. This simply means that, along with the function itself, the lexical context is also stored so it can be referenced by the function.

In that last example, the context that the ES5 function incremented in wasn't within our code due to setInterval, so let's take a look at another example where the interval is another context we control:
```
function Pet(name) {
    this.name = name;
    this.identify = function identify() {
        console.log('I am a free agent');
    }
}

function Person(name) {
    this.name = name;
    this.adopt = function adopt(pet) {
        pet.identify = function () {
            console.log('I am the pet of', this.name);
        }
    }
}

let dog = new Pet('Mr. Tibbles');
let lindsay = new Person('Lindsay Jenkins');
lindsay.adopt(dog);
dog.identify();
```
```
> I am the pet of Mr. Tibbles
```
In the above example, we have two classes, `Person` and `Pet`. The class `Pet` has an `identify` function that prints out its adoption status. In the `Person.adopt` function, we assign an ES5 function to `pet.identify` that prints out who the pet belongs to. We create a dog, Mr. Tibbles, and a person, Lindsay Jenkins. When we run the code, the dog identifies itself as belonging to `Mr. Tibbles`.

This is because the `this.name` the function refers to uses its execution context, i.e. `Pet`. Let's try replacing this with an arrow function.

```
function Pet(name) {
    this.name = name;
    this.identify = function identify() {
        console.log('I am a free agent');
    }
}

function Person(name) {
    this.name = name;
    this.adopt = function adopt(pet) {
        pet.identify = () => {
            console.log('I am the pet of', this.name);
        }
    }
}

let dog = new Pet('Mr. Tibbles');
let lindsay = new Person('Lindsay Jenkins');
lindsay.adopt(dog);
dog.identify();
```
```
> I am the pet of Lindsay Jenkins
```
The only thing we changed here is assigning an arrow function to `Pet.identify` inside of `Person.adopt` instead of an ES5 function. When we call `dog.identify()`, the dog correctly identifies itself as belonging to `Lindsay Jenkins`.

Note that while in this case, we wanted an arrow function, and this is usually the case, had we instead tried to use the dog's name in the function, perhaps to print `` `I am ${this.name}!` ``, we would have wanted the ES5 function. Of course we could get both in the arrow function by saying `` `I am ${pet.name}, the pet of ${this.name}!` ``

#### Functions: Just Another Type
As we've seen many times already, JavaScript treats functions like any other value. This allows us to assign a function to a variable, pass a function as a parameter to another function, and return a function from a function.  
Example:
```
const thisVariableIsAFunction = () => console.log('hi');

const thisFunctionTakesAFunction = (fn) => {
    console.log('calling the callback');
    fn();
};

const thisFunctionReturnsAFunction = () => {
    console.log('returning a function');
    return () => {
        console.log('I was returned from a function');
        thisFunctionTakesAFunction(thisVariableIsAFunction);
    };
};

// Notice how we call the function,
// then call the value that was returned by the function
thisFunctionReturnsAFunction()();
```
```
> returning a function
  I was returned from a function
  calling the callback
  hi
```

This can be a really powerful feature, but it can also be very confusing to understand, especially when things start getting nested.

For example, suppose we want to be able to sort a string of objects by any property.

JavaScript arrays have a `sort` function thatan optional parameter of a compare function to use (by default it sorts using the `<` operator). This compare function takes two parameters, `lhs` and `rhs` and returns:  
* `-1` if `lhs` < `rhs`
* `0` if `lhs` = `rhs`
* `1` if `lhs` > `rhs`

We could define a function like this for each property we want to sort by, but what if we had hundreds of properties? What if we're getting a response back from a server and we don't know what the properties will be?.
```
const compareByProperty = property => {
    return (lhs, rhs) => {
        if (lhs[property] < rhs[property]) { 
            return -1;
        }

        if (lhs[property] > rhs[property]) {
            return 1;
        }

        return 0;
    };
};

const list = [{ a: 5, b: 1 }, { a: 8, b: 2 }, { a: 2, b: 7 }, { a: 9, b: 1 }];
console.log('Sort by a:', list.sort(compareByProperty('a')));
console.log('Sort by b:', list.sort(compareByProperty('b')));
```
```
> Sort by a: [{ a: 2, b: 7 }, { a: 5, b: 1 }, { a: 8, b: 2 }, { a: 9, b: 1 }]
  Sort by b: [{ a: 5, b: 1 }, { a: 9, b: 1 }, { a: 8, b: 2 }, { a: 2, b: 7 }]
```
We solve this by creating a function that returns a function. We create the function `compareByProperty`, which takes a single parameter: the property name. This returns another function, which compares by that property.

We take that resulting function and pass it as a parameter to `Array.sort()`, and we can see that the array is correctly sorted by each property.

## Properties of a Function
One interesting thing about a `function` in JavaScript is that it has a lot of the traits of an `object`, including having _properties_.
One such property is the `length` property. It contains the number of arguments the function expects (the number written between parentheses when the function was defined). For example, take this example, loosely based around Express's `Application.use` function:

```JavaScript
class Application {
    use(fn) {
        console.log(fn.length);

        const err = new Error('oh no!');
        const req = 'THIS IS REQ';
        const res = 'THIS IS RES';
        const next = 'THIS IS NEXT';

        if (fn.length > 3) {
            console.log('fn has at least four params');
            fn(err, req, res, next);
        } else {
            console.log('fn has three params or fewer');
            fn(req, res, next);
        }
    }
}

const app = new Application();

app.use((req, res, next) => {
    console.log(`the 2nd param is ${res}`);
    console.log(`the 3rd param is ${next}`);
});

console.log('---------------');

app.use((error, req, res, next) => {
    console.log(`the 2nd param is ${req}`);
    console.log(`the 3rd param is ${res}`);
});
```
```
> 3
  fn has three params or fewer
  the 2nd param is THIS IS RES
  the 3rd param is THIS IS NEXT
  ---------------
  4
  fn has at least four params
  the 2nd param is THIS IS REQ
  the 3rd param is THIS IS RES
```

We can see that using `fn.length`, we can see how many parameters `fn` takes. Even though JavaScript allows us to pass any number of parameters to the function (ignoring extras or using undefined for missing parameters), we are able to check how many the function is "supposed" to take

[Next: I Have Asynching Feeling](12-asynchronous.md)

[Table of Contents](0-intro.md)

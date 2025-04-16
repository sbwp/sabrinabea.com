---
title: Symbols And Protocols
parent: Advanced JavaScript
nav_order: 1
---
[Previous: Table of Contents](index)

## Purely Symbolic
Symbols were introduced in EcmaScript 2015, and despite being one of the few primitive types and being the exception to a number of rules, most JavaScript developers don't know what they're for, assuming they even know they exist. Symbols are created using the `Symbol()` function, which optionally takes a `string` parameter, and returns a new, unique `symbol`.

It is important to note that the `symbol` returned by `Symbol(someString)` is not `someString` coerced/converted into a `symbol`; it is a unique symbol that is given the _description_ `someString`.
```JavaScript
const mySymbol = Symbol();
const anotherSymbol = Symbol();
console.log(mySymbol === anotherSymbol); // false


const fooSymbol = Symbol('foo');
const anotherFooSymbol = Symbol('foo');
console.log(fooSymbol === anotherFooSymbol); // false
```

The primary use of symbols is for object keys. Using a `symbol` as a key ensures that nothing else could have possibly assigned a conflicting property to that object, since each `symbol` is guaranteed to be unique.

```JavaScript
const nameKey = Symbol();
const obj = {
    [nameKey]: 'foo'
}

// This uses the symbol to access the property
console.log(obj[nameKey]); // foo

// This is using a string "nameKey" as the property key
console.log(obj.nameKey); // undefined
console.log(obj['nameKey']) // undefined

// Creating a symbol with the same description using identical code
// will yield a different and unique symbol value
let obj = {};

{
    const myKey = Symbol('some description');
    obj[myKey] = 'jealousy';
    console.log(obj[myKey]); // jealousy
}

{
    const myKey = Symbol('some description');
    console.log(obj[myKey]); // undefined
}
```

Since this is a common misconception I will repeat one more time: the parameter passed to the function `Symbol()` is a description used to help users debug and identify which Symbol it is later on. It does not affect the uniqueness of the Symbol, and the only way to get access to an existing symbol is to hold on to a reference to it.

### Custom property on third-party library object
One case where this is useful is when we want to add a property to an object being used by a third-party library. If we use a `symbol` for the key instead of a `string`, we can guarantee that the library will not assign over or attempt to access that property, as it could not possibly have used _our_ `symbol`.

As an example, consider the following code, which tags an object managed by a third-party library (`graph-maker`) with a custom property (`customDescription`).
```JavaScript
import { GraphMaker } from 'graph-maker';

for (const datum of data) {
    // Adds an entry to the graph and returns the resulting entry object
    const graphEntry = GraphMaker.addEntry(datum.graphData);

    // Adds a custom property to the graph entry to reference later
    graphEntry.customDescription = datum.customDescription;
}

// Called whenever the user clicks on a particular entry within the graph
GraphMaker.onClick(graphEntry => {
    // Access the custom property we added earlier
    console.log(`User clicked on entry: ${graphEntry.customDescription}.`);
});
```

This looks like it would work, but what if the library's code includes this?:
```JavaScript
class GraphMaker {
    // ...

    render() {
        for (const entry of this.entries) {
            entry.customDescription = GraphMaker.describe(entry);
        }

        // ...
    }

    // ...
}
```

Now the user's customDescription would be overwritten by the library. Sure, you can choose a really unique-sounding property name or look through the library source code to make sure the property is not changed now, but what if the next patch version starts using that property name, since it was not considered to be part of the public API of the library? What if some other library you use hooks into that library and overwrites the property?

The only way to be sure that your property will never conflict with any property set anywhere else is to use a symbol as the property key:

```JavaScript
import { GraphMaker } from 'graph-maker';

const customDescriptionKey = Symbol('Custom graph description');

for (const datum of data) {
    // Adds an entry to the graph and returns the resulting entry object
    const graphEntry = GraphMaker.addEntry(datum.graphData);

    // Adds a custom property to the graph entry to reference later
    graphEntry[customDescriptionKey] = datum.customDescription;
}

// Called whenever the user clicks on a particular entry within the graph
GraphMaker.onClick(graphEntry => {
    // Access the custom property we added earlier
    console.log(`User clicked on entry: ${graphEntry[customDescriptionKey]}.`);
});
```

Now your property is safe from being overwritten. Since the symbol is created as a unique symbol in your own code, you know that the same key is not used anywhere else in any of the libraries you import, so you can safely use it to add your own custom properties that cannot possibly conflict with any properties anywhere else.

### Protocols
Another case where this is useful is for protocols. A protocol serves a role similar to that of an interface in some object-oriented langauges, such as Java or C#, and in fact, it goes by that name in a few languages, like Objective-C and Swift. Essentially, they are a way to define a certain piece of functionality that objects can support with whatever implementation they want, as long as they expose the functionality with the same interface.

For example, suppose we have two classes representing different modes of transportation, `Horse` and `Car`, and we want them both to support the functionality of carrying a `Person` from one point to another. Suppose we want there to be a function that lets us use this carrying functionality for any arbitrary mode of transportation, verifying that the mode of transportation supports this capability to allow consumers of the library to add in their own custom modes of transportation. We might define them like this:

```JavaScript
export class Horse {
    carry(person, startPos, destPos) {
        this.goTo(startPos);
        person.climbOnto(this);
        this.goTo(destPos);
        person.climbOffOf(this);
        return person;
    }
    // ...
}

export class Car {
    carry(person, startPos, destPos) {
        this.goTo(startPos);
        this.door.open();
        person.getIn(this);
        this.door.close();
        this.goTo(destPos);
        this.door.open();
        person.getOutOf(this);
        this.door.close();
        return person;
    }
    // ...
}

export class Person {
    travel(vehicle, destPos) {
        if (typeof vehicle?.carry === 'function') {
            return vehicle.carry(this, this.position, destPos);
        } else 
            throw new TransportationError('Tried to travel by an invalid mode of transportation')
        }
    }
}
```

This looks like it would work, and it totally would, except for one small issue: what if a class has an unrelated function called `carry`? Sure, we could take it a step further and count the number of parameters to make sure it supports at least 3, but what if it was this class from a similar but incompatible library:

```JavaScript
export class ClownCar {
    carry(numberOfClowns, circus, moveVector) {
        const clowns = circus.getClowns(numberOfClowns);
        for (const clown of clowns) {
            clown.move(moveVector);
        }
        return clowns;
    }
}
```

While we could kick the can a little further down the road with TypeScript typings (what if the parameters are the same type but a fundamentally different action is being performed), there is a better solution: a protocol!

By using a symbol as the property name for the function, we can ensure that any implementing class we accept definitely intentionally made their function to conform to this protocol:

```JavaScript
export const carry = Symbol('carry protocol key');

export class Horse {
    [carry](person, startPos, destPos) {
        this.goTo(startPos);
        person.climbOnto(this);
        this.goTo(destPos);
        person.climbOffOf(this);
    }
        return person;
    // ...
}

export class Car {
    [carry](person, startPos, destPos) {
        this.goTo(startPos);
        this.door.open();
        person.getIn(this);
        this.door.close();
        this.goTo(destPos);
        this.door.open();
        person.getOutOf(this);
        this.door.close();
        return person;
    }
    // ...
}

export class Person {
    travel(vehicle, destPos) {
        if (vehicle?.[carry]) {
            return vehicle.carry(this, this.position, destPos);
        } else 
            throw new TransportationError('Tried to travel by an invalid mode of transportation')
        }
    }
}
```

Now a consumer can implement the function in their own custom classes, but other libaries cannot accidentally implement classes that almost conform to our protocol but just barely don't. Then it will be clear to the user that they need to write a wrapper around the other library's code to be compatible with yours:

```JavaScript
export class ClownCarWrapper {
    constructor(clownCar, circus, clownCollege) {
        this.clownCar = clownCar;
        this.clownCollege = clownCollege;
    }

    [carry](person, startPos, destPos) {1
        const clown = this.clownCollege.enroll(person);
        const circus = Circus.openNewCircus(startPos);
        circus.hireClown(clown);

        const moveVector = VectorMath.difference(destPos, startPos);

        this.clownCar.carry(1, circus, moveVector);

        const movedPerson = circus.fireClown(clown);
        circus.close();
        return movedPerson;
    }
}
```

#### The Iterable Protocol
The most likely protocol for you to run into (in fact, you've already run into it multiple times on this page) is the Iterable protocol, which is what powers the `for ... of` loop.

The `for ... of` loop can be used to loop through any iterable object, not just an array. If we try to use it with an object that doesn't support it, we will get the error `<object> is not iterable`. How does it detect that, and how can we make our own object iterable?

The answer to both, as you may have guessed from the context, is a protocol supported by a `symbol` property key. There is a `symbol` (which we can access as `Symbol.iterator`), which is used as the key for a function that returns a new iterator for the object.

When we try to use `for ... of` with an object, it will check to see if the object contains a property whose key is the `symbol` stored at `Symbol.iterator`. If it does not, throws the error. If it does, then it will call that function and retrieve the iterator.

Here is an example of an iterable object:
```
class ColorsOfRainbowIterator {
    constructor(target) {
        this.target = target;
        this.previousKey = undefined;
    }

    next() {
        const nextKey = this.getNextKey();
        if (nextKey) {
            this.previousKey = nextKey;
            return {
                value: this.target[nextKey]
            };
        }
        else {
            return {
                done: true
            };
        }
    }

    getNextKey() {
        switch (this.previousKey) {
            case undefined:
                return 'red';
            case 'red':
                return 'orange';
            case 'orange':
                return 'yellow';
            case 'yellow':
                return 'green';
            case 'green':
                return 'blue';
            case 'blue':
                return 'indigo';
            case 'indigo':
                return 'violet';
            case 'violet':
                return undefined;
        }
    }
}

class ColorsOfRainbow {
    constructor() {
        this.red = '#ff0000';
        this.orange = '#ff8800';
        this.yellow = '#ffff00';
        this.green = '#00ff00';
        this.blue = '#0000ff';
        this.indigo = '#440088';
        this.violet = '#ff00ff';
    }

    [Symbol.iterator]() {
        return new ColorsOfRainbowIterator(this);
    }
}

let c = new ColorsOfRainbow();

for (const color of c) {
    console.log(color);
}
```

In `ColorsOfRainbow`, we define a function on the key `[Symbol.iterator]` which returns an iterator for the object. The iterator has a `next()` function that returns an object with a `value` property with the next value if there is another value, or an object with a `done` property set to true if there are no more values.

##### A more practical iterable
Of course the `ColorsOfRainbow` iterable is only really useful as an example, so I thought it would be useful to provide an example of a more realistic iterable: A singly-linked list. To keep the implementation focused on the iterable protocol, I've made this example only support two operations, which are prepending an item to the list and iterating over the list. Obviously additional operations would be required for a full implementation of the data structure.

```JavaScript
class LinkedList {
    constructor() {
        this.head = {
            value: null,
            next: null
        }
    }

    prepend(value) {
        const next = this.head.next;
        this.head.next = {
            value,
            next
        }
    }

    [Symbol.iterator]() {
        return new LinkedListIterator(this.head);
    }
}

class LinkedListIterator {
    constructor(head) {
        this.current = head;
    }

    next() {
        this.current = this.current.next;
        return {
            value: this.current?.value,
            done: !this.current?.value
        };
    }
}

const list = new LinkedList();
list.prepend(5);
list.prepend(4);
list.prepend(3);
list.prepend(2);
list.prepend(1);

for (const v of list) {
  console.log(v);
}
// Output:
// 1
// 2
// 3
// 4
// 5
```

[Next: Let's Play Tag](2-tagged-template-strings.md)

[Table of Contents](index)

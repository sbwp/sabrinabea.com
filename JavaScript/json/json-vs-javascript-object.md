---
title: JSON Vs JavaScript Objects
parent: JSON
---
# JSON vs JavaScript Objects

One confusing phrase I hear quite a bit is "JSON object". It is often used to describe a JavaScript object that is not an instance of a class, or an object in general. In reality, this name is inaccurate and misleading, on top of being redundant. In this article, I hope to clear up some of this confusion and explain clearly what these two (very different) concepts are.

## What is a JavaScript Object?
In the language JavaScript, one of the types defined in the language (there are currently nine) is `object`. Note that this section is **_not_** about JSON.


Unlike in a typical object-oriented language like Java, an object in JavaScript isn't limited to the property names defined in its class definition. It behaves more like a Dictionary (sometimes also known as a Map or HashMap) does in other languages.

The "entries" in this Dictionary are called "properties". Each property has a key and a value. Suppose we define an object in JavaScript as follows:

```JavaScript
const myDog = {
    name: 'Lucy',
    age: 5,
    favoriteToy: 'Disgusting Slobbery Bear'
};
```

We can see that this object has 3 properties. The first has the key `'name'` and the value `'Lucy'`. Notice that even though the key is a string, we didn't have to put quotes around the string. Since keys in JavaScript can only<sup>1</sup> be of type `string`. We can, however, choose to put the quotes in. The following example is identical to the first:

```JavaScript
const myDog = {
    'name': 'Lucy',
    'age': 5,
    'favoriteToy': 'Disgusting Slobbery Bear'
};
```

You can omit the quotes from a property name as long as the property name is a valid identifier in JavaScript (that means it would be allowed as a variable name). Here are some examples to demonstrate what is allowed:

```JavaScript
const myCat = {
    'name': 'Oliver',                     // This is correct
    'favorite-nap-spot': 'window sill'    // This is correct
};

const anotherCat = {
    name: 'Charles',                     // This is correct
    favorite-nap-spot: 'under couch'     // This is INCORRECT (not valid code)
};
```

You can also use the value of a variable or expression as a property name by surrounding the expression with square brackets, as in the following example:
```JavaScript
const key = 'name';
const toyType = 'favorite';

const myDog = {
    [key]: 'Lucy',
    ['age']: 5,
    [toyType + 'Toy']: 'Disgusting Slobbery Bear'
}
```

In the first property, we create the property with key `'name'` and value `'Lucy'`, just like in the first example, but this time, we get the key from a variable. The second property shows us that we can use string literals inside brackets, and the third is an example of a more complex expression (in this case a string concatenation) to get the key. The resulting object is identical to the one created in the first example.

To access the values of these properties, you can use a dot followed by the property key if the key is a valid identifier, or you can use square brackets with the key inside if it is not a valid identifier, or if the key name comes from a variable or expression:

```JavaScript
const myCat = {
    name: 'Oliver',
    'favorite-nap-spot': 'window sill'
};

const propKey = 'name';

const a = myCat.name;                 // This is correct
const b = myCat.favorite-nap-spot;    // This is INCORRECT (looks for proprty with key 'favorite' and subtracts from it the undefined variables nap and spot)
const c = myCat.'favorite-nap-spot';  // This is INCORRECT (not valid code)
const d = myCat.propKey;              // This is INCORRECT (will look for a property with the key 'propKey')

const e = myCat['name'];              // This is correct
const f = myCat['favorite-nap-spot']; // This is correct
const g = myCat[propKey];             // This is correct
```

**Footnotes**  
<sup>1</sup> Keys can also be of type `symbol`, but that is beyond the scope of this article. You can learn more about symbols [here](../advanced-javscript/1-symbols-and-protocols.md).


## What is JSON?
JSON stands for "JavaScript Object Notation". The key word here is "notation". That means it's just a way of representing data. As for the other two words, "JavaScript Object", that has more to do with the origins of JSON than what it is. 

The JavaScript Objects we discussed in the previous section (or objects/data in any language, really) exist within the memory of the running application. If one piece of code in an application wants to share that data with another piece of code in the same application, it is sufficient to provide the address of the object in memory, and the other piece of code can use that to look up the object. But what if we want to share that data with another application? What if we want to save the data, close the application, and access that data again when the application runs again later? 

A naïve approach might be to send/store the exact bits from memory. However, while it is possible that the memory could be in a contiguous block of memory (i.e. the data is all stored in one connected collection of bits with nothing in between), in reality, that is rarely the case<sup>1</sup>.

This means that we need a way to represent the data that is separate from the way it is represented in memory. We call this conversion process _serializing_ the data. The reverse process of converting our data format into the one represented in memory is called _deserializing_ the data.

One such format is JSON. Some benefits of JSON over other options are:
- Human readability - This makes it much easier to debug issues, since you can read data from in-flight requests without having to do any additional transformation on the data.
- Similarity to JavaScript - As we'll see next, the format of JSON is very similar (but not identical) to how we write objects in JavaScript.
- Simplicity - Unlike a format like XML, there is not very much "boilerplate text" around the data. Most of the text in the file is the data itself. There is a similar format to JSON, YAML<sup>2</sup> that takes this concept a bit further.
- JavaScript standard library support - The existence of the `JSON.stringify()` serializer and `JSON.parse()` deserializer as part of the JavaScript standard library make it very easy to use within JavaScript, and many other languages provide similar support for the format.

Now that we've covered why we use JSON, let's take a look at an example:

```JSON
{
    "name": "Lucy",
    "age": 5,
    "favoriteToy": "Disgusting Slobbery Bear"
}
```

It should be pretty apparent that this format is very similar to the format used in the JavaScript language for an object literal, but there are some key differences.

First, notice that all quotes are double quotes. Unlike JavaScript, in which single and double quotes can be used interchangably, in JSON, _only double quotes_ can be used.

Next, we can see that the property names are all wrapped in quotes. The JSON specification requires that _all_ property keys be contained within double quotes. The values, on the other hand, should only be in quotes if they are a string. If you put quotes around a value that is not a string, it will be treated as a string when deserialized, with potentially unintended side effects.

When we discussed JavaScript Objects, we covered using expressions within key names. This is not possible in JSON for key names OR values, because JSON is not a programming language. When we write an object literal in JavaScript, we are writing code to create an object. In JSON, we are directly writing a representation of the object.

There are also differences in what is allowed within a JavaScript object vs in JSON. All objects that can be specified by JSON can be deserialized/parsed into a JavaScript object, but not all JavaScript objects can be serialized into JSON. Let's take a look at a few example JavaScript objects and see whether they can become JSON:

```JavaScript
const user = {
    name: 'Bob Parker',
    address: '123 Fake St',
    city: 'Townsville',
    state: {
        name: 'North Dakota',
        abbreviation: 'ND'
    },
    zipCd: "12345"
};

const foodOrder = {
    restaurant: 'Pizza Palace',
    items: [
        {
            id: 78,
            name: 'Three or More Topping Pizza',
            options: {
                toppings: [
                    'Pepperoni',
                    'Mushroom',
                    'Meatball'
                ],
                extraCheese: true
            },
            size: 'large',
            price: 18.17
        },
        {
            id: 14,
            name: 'Clam Strips',
            options: null,
            price: 7.82
        }
    ],
    customer: user,
    subtotal: 25.99
};

console.log(JSON.stringify(foodOrder));
```

This object can become JSON. All of the keys are strings, the values are all types permitted in JSON, and there are no cyclic properties. Therefore, we say that the object is _serializable_. The following JSON would be output:

```JSON
{
    "restaurant": "Pizza Palace",
    "items": [
        {
            "id": 78,
            "name": "Three or More Topping Pizza",
            "options": {
                "toppings": [
                    "Pepperoni",
                    "Mushroom",
                    "Meatball"
                ],
                "extraCheese": true
            },
            "size": "large",
            "price": 18.17
        },
        {
            "id": 14,
            "name": "Clam Strips",
            "options": null,
            "price": 7.82
        }
    ],
    "customer": {
        "name": "Bob Parker",
        "address": "123 Fake St",
        "city": "Townsville",
        "state": {
            "name": "North Dakota",
            "abbreviation": "ND"
        },
        "zipCd": "12345"
    },
    "subtotal": 25.99
}
```

Here's another example:
```JavaScript
const sabrina = {
    name: 'Sabrina Bea',
    pets: []
};

const lucy = {
    name: 'Lucy',
    age: 5,
    favoriteToy: 'Disgusting Slobbery Bear',
    human: sabrina
};

const oliver = {
    name: 'Oliver',
    favoriteNapSpot: 'window sill'
    human: sabrina
};

sabrina.pets = [lucy, oliver];

console.log(JSON.stringify(sabrina)); // ERROR: Converting circular structure to JSON
```

This CANNOT be serialized. This is because the data is cycular/circular. This means that there is a cycle in the properties of an object. In this particular case, the object `sabrina` has a property `pets`, which contains the elements `lucy` and `oliver`. These each have a property `human`, which contains `sabrina`. This completes the cycle. If we tried to serialize this data, it would loop forever like this:

```JSON
{
    "name": "Sabrina Bea",
    "pets": [
        {
            "name": "Lucy",
            "age": 5,
            "favoriteToy": "Disgusting Slobbery Bear",
            "human": {
                "name": "Sabrina Bea",
                "pets": [
                    {
                        "name": "Lucy",
                        "age": 5,
                        "favoriteToy": "Disgusting Slobbery Bear",
                        "human": {
                            "name": "Sabrina Bea",
                            "pets": [
                                {
                                    "name": "Lucy",
                                    "age": 5,
                                    "favoriteToy": "Disgusting Slobbery Bear",
                                    "human": {
                                        "name": "Sabrina Bea",
                                        "pets": [
                                            {
                                                ...
```

Let's look at one more example:
```JavaScript
const sym = Symbol();

const robot = {
    name: 'Frank',
    speak: () => {
        console.log('beep boop');
    },
    bar: undefined,
    [sym]: 'fish'
}

console.log(JSON.stringify(robot));
```

The object `robot` in the above example is not serializable, because the property `'speak'` is a function, which is not serializable, the property `'bar'` is `undefined`, which is not serializable, and the final property's key is a symbol, rather than a string<sup>3</sup>. In this case, however, rather than throw an error, JSON.stringify will instead produce valid JSON by excluding the non-serializable properties. The output JSON will be:

```JSON
{
    "name": "Frank"
}
```

**Footnotes**  
<sup>1</sup> This is possible to control in lower-level languages with direct memory access, like C, but providing JavaScript with that kind of access would be a huge security issue for JavaScript in the web browser.  
<sup>2</sup> YAML is a superset of JSON, which means that all valid JSON is valid YAML, but not the other way around. YAML essentially takes some of the characters in JSON that can be implied based on position/context and makes them optional.
<sup>3</sup> JavaScript object property keys can only be a `string` or a `symbol`. If any other type is provided as a key, it will be coerced (converted) into a `string`. You can learn more about symbols [here](../So%20You%20Think%20You%20Know%20JavaScript/10-symbols-and-protocols) and about valid JavaScript properties [here](../So%20You%20Think%20You%20Know%20JavaScript/9-properties).

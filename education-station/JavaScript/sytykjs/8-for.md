---
title: What Do We Need Four `for`s For?
parent: So You Think You Know JavaScript
nav_order: 8
---
[Previous: Templated String Literals](7-templated-string-literals.md)

## What Do We Need Four `for`s For?
There are many ways to iterate over an array in JavaScript.
To demonstrate each, we will loop through and print this array:
```
const pets = ['fish', 'bird', 'dog', 'cat', 'hamster'];
```

#### 1. The Classic
Our first type of `for` is what I like to call, "The Classic". It's your standard, run-of-the-mill `for` loop, just like you'd see in any other C-like language:
```
for (let i = 0; i < pets.length; i++) {
    console.log(pets[i]);
}
```

This is my last choice for looping through an array because it is error prone, especially when dealing with more complex scenarios where math needs to be done with the index, and on top of that, it's just longer to write and requires thinking to put together. Who wants to _think_?

#### 2. Array.forEach
The second is using the `.forEach` property of the array. This is a function that takes a function that takes each item in the array as a parameter. 
```
pets.forEach(function(pet) {
    console.log(pet);
});
```
This is the type of `for` loop I see used most often in the wild, even when it's not the best choice.

One cool thing about this method is that we can also get the index as a second parameter, and even the whole array itself as a third parameter if we want.

```
pets.forEach(function(pet, index) {
    console.log(`pet at index ${index} is ${pet}`);
});

pets.forEach(function(pet, index, pets) {
    console.log(`${pet} is at index ${index} in ${pets}`);
});
```

Also, since it takes a function, we can pass in a function that was defined elsewhere rather than defining the behavior inline.
```
function handlePet(pet) {
    console.log(pet);
}

/* ... */

pets.forEach(handlePet);
```

A downside to this type of loop is that because the body is a function, if we use it within a function we cannot return from the outer function from inside of it.

```
function getFavoritePet() {
    const pets = ['fish', 'bird', 'dog', 'cat', 'hamster'];

    pets.forEach(function(pet) {
        console.log('checking:', pet);
        if (pet === 'dog') {
            console.log('favorite found:', pet);
            return pet;
        }
    });
}

console.log('my favorite pet is:', getFavoritePet());
```
```
> checking: fish
  checking: bird
  checking: dog
  favorite found: dog
  checking: cat
  checking: hamster
  my favorite pet is: undefined
```

#### 3. for ... of
The third method is my favorite: `for ... of`:
```
for (const pet of pets) {
    console.log(pet);
}
```
This allows us to access each item in the list as a variable like `.forEach`, but also to return since it is not a separate function.

We get a reference to each variable within the array, and we don't need to worry about the index or the length of the array. Unlike "The Classic", it is quick to write and requires little thinking.

One thing to note is that you should always use `const` for these. You _can_ use `var` or `let`, but you should pretty much never use `var` and there's no need to reassign the variable inside the loop. Remember that `const` only prevents _reassignment_. If you need to modify its properties, you can do that with a `const`.

This also works with objects other than arrays that implement the iterable protocol. We don't cover symbols in "So You Think You Know JavaScript", but they are covered in the [Purely Symbolic section of Advanced JavaScript](../Advanced%20Javascript/1-symbols-and-protocols.md).
#### 4. for ... in
The final method is `for ... in`, which works a lot like `for ... of`, but it uses the index rather than the element.
```
for (const index in pets) {
    console.log(pets[index]);
}
```
This means it is useful when we would have used `for ... of`, but we need the index.

What makes `for ... in` really useful is that we can iterate through the properties of any object (not just iterable ones). This is very useful when working with JSON data returned from a web service.
```
const myPets = {
    dog: "Lucy",
    cat: "Oliver",
    bird: "Tahani",
    fish: "Linda",
    hamster: "Smokey"
};

for (const key in myPets) {
    console.log(`I have a ${key} named ${myPets[key]}`);
}
```
```
> I have a dog named Lucy
  I have a cat named Oliver
  I have a bird named Tahani
  I have a fish named Linda
  I have a hamster named Smokey
```

If we were to try to iterate over the object using `for ... of`, we would get an error in the console: `Uncaught TypeError: myPets is not iterable`. We'll cover how to make an object iterable in the section "Purely Symbolic".

[Next: That's My Property!](9-properties.md)

[Table of Contents](0-intro.md)

---
title: Classes
parent: Intro to TypeScript
nav_order: 2
---
[Previous: Interfaces](1-interfaces.md)

## Classes
One of the features that already exists in JavaScript is the `class`. Naturally, this functionality carries over to TypeScript, but with some additional features. The most important of these is that just like an interface, a `class` name can be used as a type:

```TypeScript
class Animal {
    public legCount: number;
    private noise: string;

    public constructor(noise: string, legCount: number) {
        this.noise = noise;
        this.legCount = legCount;
    }

    public speak() {
        console.log(this.noise);
    }

    public walk() {
        for (let i = 0; i < legCount; i++) {
            console.log('clomp');
        }
    }
}

const takeForAWalk = (animal: Animal) => {
    animal.speak()
    animal.walk()
}

const dog = new Animal('woof', 4);
const ostirich: Animal = new Animal('#$*%E@($&*%^!!!', 2);

takeForAWalk(dog);
takeForAWalk(ostirich);
```

First of all, we can see that when we instantiate the class and assign it to `dog` and `ostirich`, we are able to pass the resulting value to the function `takeForAWalk` which expects the type `Animal`, regardless of whether we explicitly annotate the variable with the type.

Next, let's look at the declaration of the class properties `legCount` and `noise`. While there is currently a [stage 3 proposal](https://github.com/tc39/proposal-class-fields) for class fields to be defined outside of the constructor like this in JavaScript, it has been a feature in TypeScript for quite some time. Here, we only declare the field without initializing it, since it is later initialized in the constructor. We could also initialize the variable inline with the declaration, as we will see in later examples.

The next thing worth pointing out is the visibility modifiers (`public`, `private`) on the class fields. Since TypeScript is compiled to JavaScript prior to runtime, there is nothing preventing a `private` field from being accessed at runtime. Thus, putting the `private` modifier in front of a field does not prevent it from being accessed by other classes, it just discourages it and prevents accidental access through compile-time checks.

Therefore, in the example above, while accessing `dog.noise` would result in a compiler error, `(dog as any).noise` (this is type coersion, which we will cover later) would allow the `private` field to be accessed at runtime.

While the class fields [stage 3 proposal](https://github.com/tc39/proposal-class-fields) will add support for runtime-private fields in JavaScript (and there is [another stage 3 proposal](https://github.com/tc39/proposal-private-methods) to add support for private methods, getters, and setters), TypeScript's `private` keyword is a different feature, although support for JavaScript private fields has been added to TypeScript as well. We will discuss support for this [later](9-useful-stuff.md).

Note as well that the same visibility modifiers can be used on methods and constructors. The default for fields, methods, and constructors is `public`.

There are a few more features of classes that we didn't use above. This next example will showcase a few of them:
```TypeScript
interface Animal {
    numberOfLegs: number;
    readonly birthDate: Date;
    readonly age: number;
    readonly sound: string;
    speak(): void;
}

class Person implements Animal {
    public get lastFour(): string {
        return this.ssn.slice(-4);
    }

    public get sound(): string {
        return `Hello, my name is ${this.preferredName}`;
    }

    public get prefferedName(): string {
        return this.nickname || this.name;
    }

    public set prefferedName(name: string) {
        if (name === this.legalName) {
            this.nickname = '';
        } else {
            this.nickname = name;
        }
    }

    public numberOfLegs: number = 2;
    public readonly birthDate: Date = new Date();
    public age: number;

    private nickname: string = '';

    public constructor(public readonly legalName: string, private ssn: string) {}

    public speak(): void {
        console.log(this.sound);
    }
}

const bob = new Person('Robert Smith', '012-34-5678');
console.log(bob.lastFour);
console.log(bob.preferredName);

bob.preferredName = 'Bob';
console.log(bob.preferredName);
console.log(bob.legalName);
```

Output:
```
> 5678
  Robert Smith
  Bob
  Robert Smith
```

Once again, there's quite a bit to unpack in this example. We can see that there are some getters/setters. They are written like a class method, with parentheses and a return type/parameter type, just with the word `get` or `set` before the identifier. Note that getters _must_ take no parameters and return something, and setters _must_ take one parameter and return nothing. Also note that a matching getter and setter (same identifier) _must_ get/set the same type.

Getters and setters are used like a class field. We can see that we access the getter for `preferredName` near the bottom of the example as `bob.preferredName` with no parentheses. Similarly, we use the setter by assigning to `bob.preferredName`. If you're familiar with the terminology, when the identifier appears as an R-value, the getter will be used, and when it appears as an L-value, the setter will be used.

We can also see that a few of the getters do not have a matching setter. This is allowed, and the corresponding identifier will generate a compiler error if you try to assign to it. We call these properties `readonly`. You can make a regular property (not defined as a getter/setter) as `readonly` by adding the `readonly` keyword before the identifier in the declaration. We see this with `birthDate` in the above example.

Next, we can see an example of a class implementing an interface. To implement it, we just have to make sure the class has all the properties or functions defined on the interface. For `numberOfLegs` and `speak` in the above example, this is straightforward, but for `birthDate`, `age`, and `sound`, we can see that they are readonly. To match this, we must provide `get` access to those fields.

For `birthDate`, we define a `readonly` field, which satisfies the interface requirement. For `age`, however, we define a field with both read _and_ write access. This works because the interface only specifies that we must have a property that can be read from. It doesn't care about write access. Therefore providing a regular read/write field satisfies the interface. We satisfy the requirement for the `readonly sound` property with the getter `sound()`. Since a getter provides read access (but not write access), it satisfies the interface.

Finally, the constructor signature has what we call _Parameter Propreties_. You may have noticed in the previous example that just to define 2 properties and assign them through the constructor, we needed 4 additional lines of code, plus adding the properties to the constructor signature. This allows us to do the same thing as in the previous example, all within the constructor signature. All you do is put the property name in the constructor signature as you normally would, and then add a modifier like `public`, `private`, or `readonly`. That's it. Since this is a common pattern, here is an additional example showing this feature on its own. The two classes in the following example are identical:

```TypeScript
class AClass {
    public foo: string;
    private bar: number;

    public constructor(foo: string, bar: number) {
        this.foo = foo;
        this.bar = bar;
    }
}

class BClass {
    public constructor(public foo: string, private bar: number) {
}
```

### Abstract Classes
If you've used object oriented languages before, you may be wondering if TypeScript supports abstract classes, since it supports classes and interfaces. It does!

```TypeScript
abstract class Animal {
    public constructor(public numberOfLegs: number, private sound: string) {}

    public speak(): void {
        console.log(this.sound);
    }

    public abstract eat(): void;
}

class Cat extends Animal {
    public constructor() {
        super(4, 'meow');
    }

    public eat() {
        console.log('nom nom nom');
    }
}

const cat = new Cat();
cat.speak();
cat.eat();
```

Output:
```
> meow
  nom nom nom
```

Since this is also our first example of inheritance using the `extends` keyword (this can be used with non-abstract parent classes as well), let's take a moment to look at the `super()` constructor call. When extending a class, make sure to call the parent constructor with `super()`, providing any parameters the parent class takes. If you want to request the same parameters from the child class constructor, you will need to include them in the signature and pass them down the chain (but if you do not define a constructor, the parent class's constructor will be used automatically).

Notice that the `speak` function is passed along automatically to the child class, since it has a _concrete_ implementation in the parent class. The `eat` function, however is marked abstract in the parent class and not implemented, so it must be implemented by the child class. If we exclude the `eat` function from the class `Cat`, we get a compiler error.

Also note that if we tried to construct an `Animal` directly, via `new Animal(numLegs, sound)`, we would get a compiler error, because abstract classes cannot be constructed.

[Next: More Types of Types](3-types.md)

[Table of Contents](index)

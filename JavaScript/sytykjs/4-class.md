---
title: JavaScript Just Got Classier
parent: So You Think You Know JavaScript
nav_order: 4
---
[Previous: Strictly Speaking](3-strict-mode.md)

## JavaScript Just Got Classier
With ES6, JavaScript obtained a `class` keyword, but classes work a bit differently in JavaScript than in other languages. Let's look at an ES6 class as an example:

```
class Animal {
    constructor(name, numLegs, sound, isFurry) {
        this.name = name;
        this.numLegs = numLegs;
        this.sound = sound;
        this.isFurry = isFurry;
    }

    walk() {
        for (let i = 0; i < this.numLegs; i++) {
            console.log('fwoomp');
        }
    }

    speak() {
        console.log(this.sound);
    }
}

var animal = new Animal('frog', 4, 'ribbit', false);
```

We can see that all of the properties are defined in the constructor, and class properties are always referred to using `this.propertyName`. If we refer to a property using only its name, it will not work in JavaScript.

Class methods are defined after the constructor inside the class body. Notice that there is no function keyword on them, just the method name followed by parentheses.

Inheritance can be done using the `extends` keyword, as in the following example:

```
class Camera {
    constructor(body, lens) {
        this.body = body;
        this.lens = lens;
        this.photos = [];
    }

    takePhoto(subject) {
        const photo = this.body.process(this.lens.view(subject));
        this.photos.push(photo);
    }

    exportPhotos() {
        const photos = this.photos;
        this.photos = [];
        return photos;
    }
}

class CameraWithFlash extends Camera {
    constructor(body, lens, flash) {
        super(body, lens);
        this.flash = flash;
    }

    takePhoto(subject) {
        this.flash.raiseIfDown();
        this.flash.turnOn();

        super.takePhoto(subject);

        this.flash.turnOff();
    }
}

var myCamera = new Camera(myBody, myLens, myFlash);
```

We can see that the parent class's constructor is available in the child class as `super()` and when overriding the function `takePhoto()`, the parent's `takePhoto()` was accesible as `super.takePhoto()`. 

[Next: Not the Inheritance You Expected](5-prototype.md)

[Table of Contents](0-intro.md)

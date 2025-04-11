---
title: Prototype
parent: So You Think You Know JavaScript
nav_order: 5
---
[Previous: JavaScript Just Got Classier](4-class.md)

### Not the Inheritance You Expected

Despite appearances, in JavaScript, inheritance doesn't work like it does in other languages. JavaScript inhertiance is based around the idea of object prototypes. Each class has a prototype, defined by a special property on the class, `prototype` (available on an instance of the class as `__proto__`).

When looking up a property, if it is not found on the object, its prototype will also be searched for that property. To see how this works, let's take a look at how the Camera inheritance example would have been written in ES5:

```
function Camera(body, lens) {
    this.body = body;
    this.lens = lens;
    this.photos = [];
}

Camera.prototype.takePhoto = function(subject) {
    const photo = this.body.process(this.lens.view(subject));
    this.photos.push(photo);
}

Camera.prototype.exportPhotos = function() {
    const photos = this.photos;
    this.photos = [];
    return photos;
}

/**************************************************/

function CameraWithFlash(body, lens, flash) {
    Camera.call(this, body, lens);
    this.flash = flash;
}

CameraWithFlash.prototype = Object.create(Camera.prototype);
CameraWithFlash.prototype.constructor = CameraWithFlash;

CameraWithFlash.prototype.takePhoto = function(subject) {
    this.flash.raiseIfDown();
    this.flash.turnOn();

    Camera.prototype.takePhoto.call(this, subject);

    this.flash.turnOff();
}

var myCamera = new Camera(myBody, myLens, myFlash);
```

The first thing to notice is that the class is defined as a function (the constructor), and the methods are defined separately by assigning a function to the constructor's prototype.

The expression `Camera.prototype` may be a bit alarming at first, as we are calling a property on a function. "But it's a function, not an object!," I hear you cry in despair, "How can it have properties!?!"

In JavaScript, functions are sort of like a specialized type of object. They have a number of properties that you won't typically run into, but there are two that make them special. The first is the `prototype` property we just saw, and the second is `call()`, which we use in the child object.

As you would expect, `call()` will call the function, but in addition to the function's normal parameters, `call()` takes an extra parameter at the beginning, `this`, which is the object that the keyword `this` will refer to within the function when it runs. When we call a function normally, `this` is automatically determined based on several factors (including different behavior in strict mode vs sloppy mode).

Turning to the child class, you'll notice that the call to `super(...)` in the constructor is replaced with `Camera.call(this, ...)`, and the call to `super.takePhoto(...)` is replaced with `Camera.prototype.takePhoto.call(this, ...)`. This is because we want to call the Camera constructor (and the Camera version of takePhoto), but we want the `this` object to be the `this` of the child class.

Next, after the `CameraWithFlash` constructor, we see a usage of `Object.create()`. This creates a new object, whose prototype is the object passed into `Object.create()`. We use this to set `CameraWithFlash`'s prototype to be a new object whose prototype is `Camera`'s prototype.

By default when we declare a function, a new object is created to be its prototype, and among other things, that prototype has its `constructor` property set to the function itself. Here, we replace the default prototype with a new object that has `Camera` as its prototype.

Since the prototype of a derived class has a prototype whose prototype is the parent class's prototype, if we keep creating subclasses of subclasses of subclasses, it will create a chain. This is why it is referred to as the prototype chain. This is also why it is frowned upon to reassign the prototype (other than for setting up inheritance pre-ES2015): If we reassign the prototype to a new object, we will break the prototype chain and lose any inheritance we had previously set up.

The root of all inheritance in JavaScript is Object.prototype. If we create an inline object, like `{ a: 5, b: 7 }`, its protoype will be Object.prototype, and if we declare a class that does not extend another class, its prototype's prototype (grandprototype?) will be Object.prototype.

Because we assigned over the prototype to extend `Camera`, `CameraWithFlash`'s prototype no longer has `CameraWithFlash` as its `constructor` property, so we reassign it in the next line.

Finally, we create a new `CameraWithFlash` using the `new` keyword. This creates a new object, assigns `CameraWithFlash.prototype` as its prototype, and runs the constructor.

You can learn more about the prototype chain [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).

[Next: Hoist Yourself Up! Let's Scope This Out!](6-hoisting-and-scope.md)

[Table of Contents](0-intro.md)

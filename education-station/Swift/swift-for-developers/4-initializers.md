---
title: Initializers
parent: Swift For Developers
nav_order: 4
---
[Previous: Optionals](3-optionals.md)
## Initializers
Initializers are Swift's version of constructors. We have seen how to call them in previous examples:
```
let instance = MyObj()
```
Simply use the `class`/`struct` name like a function without any `new` keyword needed.

By default, a `class` or a `struct` gets a default initializer with no parameters. If we add properties, a `class` will require an initializer to be provided, whereas a `struct` will automatically get an initializer with each property name the order defined.

```
class MyClass {

}

let mc = MyClass()

struct MyStruct {

}

let ms = MyStruct()

class MyFancyClass { // (x) Class 'MyFancyClass' has no initializers
    name: String
    num: Int
}

let mfc = MyFancyClass(name: "Harold", num: 5) // (x) 'MyFancyClass' cannot be constructed because it has no accessible initializers

struct MyFancyStruct {
    name: String
    num: Int
}

let mfs = MyFancyStruct(name: "Harold", num: 5)
```

// TODO: Default values (mention setting with closure)

If a `class` has an optional property, it does not need to be set in the initializer, because it will be defaulted to `nil` automatically if not set. A `struct` with an optional property will have the optional property added to its default initializer as an optional parameter (has a default value of `nil`). The same rules apply for implicitly unwrapped optionals.
```
class MyClass {
    var name: String?
    var age: Int!
}

let c = MyClass()
let d = MyClass(name: "String", age: 5) // (x) Argument passed to a call that takes no arguments

struct MyStruct {
    var name: String?
    var age: Int!
}

let s = MyStruct()
let t = MyStruct(name: "String", age: 5)
```

##### Custom Initializers
To implement a custom initializer, write it like a function called `init` without the `func` keyword:
```
struct Person {
    var name: String
    let yearOfBirth: Int
    var age: Int
    var hobbies: [Hobby] = []

    init(_ name: String, age: Int) {
        let year = getCurrentYear()
        yearOfBirth = year - age
        self.name = name
        self.age = age
    }
}
```
In this example we have an initializer, defined as `init()`, which sets all of our struct's properties. Here we see a few features of custom initializers. First of all, we are able to perform custom initialization behavior, as we would expect. `name` and `age` are set from parameters directly, but `yearOfBirth` is derived based on the current year and the age.

We also see that we are able to assign to `yearOfBirth` event though it is a constant. This is because of Swift's 2-phased initialization approach, which first requires all properties to be initialized and then gives access to read from `self`. We will come back to this.

The final thing we can see in this example is that we do not need to assign to `hobbies` since it has a default value assigned with its declaration.

##### Initializer Delegation and Convenience Initializers
TODO: Structs do not support inheritance, so they delegate by calling one of their own initializers with certain values. Chain must always end with all values initialized

TODO: Classes are more complicated.
1. A designated initializer must call a designated initializer of a superclass
2. A convenience initializer must call an initializer (convenience or designated) of its own class
3. Convenience initializer chains must end in a designated initializer

Inheritance of initializers:
1. If subclass does not define any designated initializers, it inherits all of its parent's.
2. If subclass defines an implementation of or inherits all of its parent's designated initializers, it also inherits all of its parent's convenience initializers.

Convenience initializers are marked with `convenience`

Required initializers *must* be inherited or implemented by subclasses. Doesn't automatically apply to grand-subclasses. Child classes must specify `required` again to do so.

##### Two Phases of Initialization
1. Initializer sets all stored properties and calls its parent initializer, which does the same, and so on.
2. Initialization goes back down the chain and performs additional customization, now with access to `self`.

##### Failable Initializers
// init?
// can override in a subclass, and can even make that override non-failable
// can delegate to a non-failable initializer
// init! (also compatible between both init and init?)

[Next: Protocols](5-protocols.md)

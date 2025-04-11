---
title: Protocols
parent: Swift-For-Developers
nav_order: 5
---
[Previous: Initializers](4-initializers.md)
# Swift For Developers

## Protocols
Protocols are Swift's closest equivalent to interfaces in languages like Java and C#.

```Swift
protocol Huggable {
    func Hug();
}

struct Person: Huggable {
    func Hug() {
        // Implementation
    }
}

// Compile Error: Type 'TeddyBear' does not conform to protocol 'Huggable'
struct TeddyBear: Huggable {

}
```

The terminology difference stems from Swift's roots in Objective-C, which defined a class's interface in a header file, separate from the implementation. For this reason, the word "interface" would have been ambiguous, and so protocol was chosen. Additionally, the ambiguity of the name "interface" leads to some bad coding practices that are common in areas like enterprise Java, which the name "protocol" avoids. Consider the following code:

```Swift
struct Person {
    private var age: Int
    private var name: String

    init(age: Int, name: string) {
        self.age = age
        self.name = name
    }

    func greet() -> Void {
        print("Hello, my name is \(name)!")
    }
}

let person = Person(age: 72, name: "Betsy")
person.greet()
```

In some object-oriented languages, well-intentioned but no longer helpful conventions would ask you to write something like this:

_Note: This is bad code for demonstrating a problem. Do NOT code like this!_
```Swift
protocol IPerson {
    init(age: Int, name: String)
    func greet() -> Void
}

struct Person: IPerson {
    private var age: Int
    private var name: String

    init(age: Int, name: string) {
        self.age = age
        self.name = name
    }

    func greet() -> Void {
        print("Hello, my name is \(name)!")
    }
}

class PersonFactory {
    func createPerson(age: Int, name: String) -> IPerson {
        return Person(age: age, name: name)
    }
}

let personFactory = PersonFactory()
let person: IPerson = personFactory.createPerson(age: 72, name: "Betsy")
person.greet()
```

The argument for this style of coding is, "What if one day we modified the code so that now we need additional kinds of things that have the same interface and then we have to update all of the usages to say some new interface." The answer is, "then right click on the name in your IDE and choose the refactor option." It's a case of adding hours of coding time and negativaley impacting readability in every project you ever work on just in case one day you finally run into that ethereal example where you'll one day actually save a couple minutes of refactoring.

Swift makes it clear that the purpose of a protocol is to define _a set of actions that makes up a certain common functionality_. A class or struct doesn't _implement an interface_, it _conforms to a protocol_.


### Properties
Additionally, while some languages' interfaces only allow you to define methods/member functions, Swift protocols allow you to specify required properties/member variables, which is particularly important, since computed properties remove the need for the `getFoo()` and `setFoo()` functions you might see in outdated languages like Java.

```Swift
protocol LivingThing {
    var name: String { get set }
    var birthDate: Date { get }
    var age: Int { get }

    init(birthDate: Date, name: String)
}

struct Person: LivingThing {
    var name: String
    var birthDate: Date
    var age: Int {
        birthDate.yearsUntilNow
    }

    init(birthDate: Date, name: String) {
        self.birthDate = birthDate
        self.name = name
    }
}
```

In this example, we can see that for each property, we must specify which accessors are required for the protocol. For `name`, we require both `get` and `set` access, which `Person` provides by creating an actual variable called `name`. The variable `birthDate` only requires `get` access, but `Person` provides a `set` anyway. This is fine because the protocol only specifies what is _required_, not the entire interface for the type.

For the `age` property, however, we only provide `get` access by creating a computed property with a getter and no setter.

### Associated Types
Sometimes you might want to make a protocol generic. While Swift classes and structs are made generic 


[Next: ](6-.md)
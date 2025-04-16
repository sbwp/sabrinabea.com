---
title: Value vs Reference Types
parent: Swift For Developers
nav_order: 1
---
[Previous: The Basics](./#the-basics)
## Value Type vs Reference Type

In Swift, a type can be a _value type_ or a _reference type_. Value types are copied on assignment, whereas assigning a reference type assigns a reference to the original object. Value types are defined using the _struct_ keyword, and reference types are defined using the _class_ keyword.

Example:
```
struct PersonValueType {
    var name: String
    var age: Int
}

class PersonReferenceType {
    var name: String
    var age: Int
}

var val = PersonValueType(name: "Fred", age: 15)
var ref = PersonReferenceType(name: "Fred", age: 15)

var x = val
var y = ref

x.name = "Bill"
y.name = "Bill"

print(val.name)
print(ref.name)
```
```
> Fred
  Bill
```
Here we define two types that are identical other than the fact that one is a `struct` and one is a `class`.  We then instantiate one object of each type, and assign that value to another variable. We then modify the `name` property on these variables we have assigned to.

We then print out the `name` property on the original variables, and we can see that in the case of the value type, since a copy was made, the original `name` property remains unmodified as `"Fred"`. For the reference type, we can see that `y` referenced the same instance as `ref`, so `ref.name` was modified to `"Bill"`.

Reference types can have value type properties and vice versa, but beware of potential confusion when using a type defined in this way. For example:

```
class Image {
    ...
}

struct Profile {
    var name: String // Value type
    var headerImage: Image // Reference type
    var profilePicture: Image // Reference type
    ...
}

...

var newProfile = currentUser.profile

// Does not modify currentUser.profile because Profile and String are value types
newProfile.name.insert("T", at: 0)

// Does not modify currentUser.profile because Profile is a value type
newProfile.name = "Completely new string"

// Does not modify currentUser.profile because Profile is a value type
newProfile.headerImage = Image(name: "beach.jpg")

// Modifies currentUser.profile because Image is a reference type
newProfile.profilePicture.applyFilter(.sepiatone)
```

We have two types defined here. `Image` is a reference type, and `Profile` is a value type, but it contains members that are reference types.

Later on, we take an existing `Profile` and assign it to a new variable to clone it, since it is a value type. Since `String` is also a value type, it gets cloned too, but since `Image` is a reference type, the new `Profile` contains references to the same instances that the original `Profile` had.

We demonstrate this by mutating the `name` property on the new object with the `insert` function. This does not modify the original object. We also assign over the `name` property, which also does not mutate the original object.

Next, we assign over the `headerImage` property. Even though `Image` is a reference type, since we assign a new reference and `Profile` is a value type, this still does not affect the original object.

Finally, we mutate the `profilePicture` property by applying a filter to the image. Since this mutates the object using the reference that was copied from the original object, this _does_ change the original object.

// TODO: Say how to get around this issue if references are desired until mutation for performance.

// TODO: Mention `didSet` and its behavior with value/reference types

// TODO: Mention how structs do not support inheritance, but classes do. But that's not an issue because of protoclols, which we will see later

[Next: Named Parameters](2-named-parameters.md)

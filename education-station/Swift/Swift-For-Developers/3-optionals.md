[Previous: Named Parameters](2-named-parameters.md)
# Swift For Developers

## Optionals
In many languages, there is some default null value you can use to signify that a property has no value, such as `null` or `nullptr`. Swift does not allow any arbitrary variable to be set to a null value, but instead requires you to explicitly allow this by making the variable optional:
```
var str1 = "This is a string"
var str2: String = "This is a string"
var str3: String? = "This is a string"

str1 = nil // Will not compile
str2 = nil // Will not compile
str3 = nil // Valid
```
As you can see above, a variable is given an optional type by adding a question mark to the end of a type name. This is a very powerful and incredibly useful difference from other languages that allow any object instance to be null, because it eliminates the need for null-checking in any cases where null is not an expected value.

We can also see the the null value in Swift is called `nil`.

When you _do_ have an optional value, Swift provides a number of ways to handle `nil` values.

```
class MyClass {
    var title: String

    func setTitleUnsafe(_ newTitle: String?){
        title = newTitle!
    }

    func setTitle1(_ newTitle: String?) {
        title = newTitle ?? "Untitled"
    }

    func setTitle2(_ newTitle: String?) {
        if let newTitle = newTitle {
            print("A value was supplied")
            title = newTitle
        }
    }

    func setTitle3(_ newTitle: String?) {
        guard let newTitle = newTitle else {
            print("A value was not supplied, aborting")
            return
        }

        title = newTitle
    }

    func setTitle4(_ newTitle: String?) {
        if (newTitle != nil) {
            print("A value was supplied")
            title = newTitle!
        }
    }

    func setTitle5(_ newTitle: String?) {
        if (newTitle == nil) {
            print("A value was not supplied, aborting")
            return
        }

        title = newTitle!
    }
}

```
To forcably unwrap an optional, simply add an exclamation mark after the value (`newTitle!`). This will treat the value as non-optional and allow you to use the value if it is present. If it is not present, however, your application will try to access `nil`, and your application will crash with `Fatal error: Unexpectedly found nil while unwrapping an Optional value`. This means you should only use this method when you are absolutely sure that execution will never reach that line while the value is `nil`.

If you want to substitute a default value if the value is `nil`, you can use the `??` operator. In `setTitle1()` above, we set `title` to `newTitle`, or `"Untitled"` if the value is `nil`.

When you have a bit of behavior in a function that you would like to execute if a value is not `nil` and just skip it if the value is `nil`, you can use `if let`. It defines a new variable with the unwrapped value within its associated block of code, and executes the code if the value is not `nil`. This can also be used when you don't care about the value of the optional (other than that it isn't `nil`) by writing `if let _ = myOptional {`.

Next we see `guard let`. This is great for when the rest of your function relies on an optional not being `nil`. It works a lot like `if let`, but instead of defining the variable within its own code block, it defines the variable outside of its own code block and executes its code block only when the optional is `nil`. The compiler requires execution of the function to end within this code block, so you must `return`, `throw`, or `exit` from within the block.

In our final two examples, we simply check if the value is equal to `nil`. This is valid and useful, but less common than the convenience options previously mentioned.

##### Implicitly Unwrapped Optionals
There are some cases (especially in frameworks from the Objective-C days like UIKit), where an object has a property that will be set shortly after initialization, but the initializer (constructor) must leave the value uninitialized, so an optional is needed. For these cases, we have implicitly unwrapped optionals.

Example:
```
class MyClass {
    var favoriteNumber: Int!

    func someLifecycleInitFunction(favoriteNumber: Int) {
        self.favoriteNumber = favoriteNumber
    }

    func getTwiceFavorite() -> Int {
        return 2 * favoriteNumber
    }
}
```

Here, we set the type of the `favoriteNumber` property to `Int!`, using an exclamation point instead of a question mark. This allows the value to be `nil` at construction time, but saves us from typing `!` when using the value later on, since we know it will be set by a lifecycle function shortly after construction.

[Next: Initializers](4-initializers.md)
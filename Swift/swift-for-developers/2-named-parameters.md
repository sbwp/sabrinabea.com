---
title: Named Parameters
parent: Swift For Developers
nav_order: 2
---
[Previous: Value Type vs Reference Type](1-struct-class.md)
## Named Parameters
One thing you may have noticed in the last section was how Swift has named parameters. At first this can be annoying if you're not used to it. I certainly felt that way, but now, they're one of my favorite features in Swift and I miss it when I use other languages.

When calling a function, you must specify the parameter names.
```
func add(x: Int, y: Int) {
    return x + y
}

let sum = add(x: 3, y: 4)
```

You might think that this means you can specify the parameters in any order, but that is not true:
```
let sum2 = add(y: 4, x: 3) // Not allowed
```

This is often used in API design to make function calls readable as English, like the following example:
```
board.move(task: myTask, from: .inProgress, to: .done)
```

In cases like the above example, you may want to use a different name to refer to your variables inside the function body than what the caller provides. This is also possible by specifying first the _argument label_ (what the caller types), and then the _parameter name_ (variable name within the function).
```
func move(task: Task, from sourceList: ListType, to destList) {
    ...
}
```

In some cases, like the `add(x,y)` example above, an argument label doesn't provide any additional context or value. In that case, you can make a parameter unnamed by providing `_` as the argument label:
```
func add(_ x: Int, _ y: Int) {
    return x + y
}
```

In addition to providing additional context when making a function call, argument labels also allow you to omit any parameters that you are leaving at their default values, while still providing values that appear after them:
```
func addTask(_ description: String, to board: Board, completed: Bool = false, category: TaskCategory = .misc, size: Int = 3) {
    ...
}

addTask("Take out trash", to: myBoard)
addTask("Do dishes", to: myBoard, size: 2)
addTask("Write code", to: myBoard, completed: true, size: 4)
addTask("Do homework", to: myBoard, category: .school)
```

[Next: Optionals](3-optionals.md)

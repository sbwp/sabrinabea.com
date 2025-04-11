[Previous: Working With Types](6-return-of-the-types.md)

## Type Predicates and Assert Signatures
Two somewhat recent additions to TypeScript are very useful when checking the type of a value.

### Type Predicates
Suppose you have a function that can take as its first parameter either of two types and needs to run two different branches of logic for each possibility:

```TypeScript
interface Student {
    name: string;
    courses: Course[];
}

interface Course {
    name: string;
    id: string;
    textbookISBNs: number[];
}

function getTextbooks(target: Student | Course): Textbook {
    if (isStudent(target)) {
        return target.courses // ERROR
            .map(course => getTextbooks(course))
            .reduce((prev, curr) => [...prev, ...curr])
    } else {
        return target.textbookISBNs // ERROR
            .map(isbn => getTextbookByISBN(isbn))
            .reduce((books, book) => [...books, book], [])
    }
}

function isStudent(candidate: any): boolean {
    return typeof candidate?.name === 'string' && Array.isArray(candidate?.courses);
}

function getTextbookByISBN(isbn: number): Textbook {
    // Already implemented
}
```

Here, we get compilation errors, when trying to access the properties specific to `Student` or `Course`, even though we know we're in a branch where `target` is guaranteed to be of that type. We could use a type assertion to cast `target` to `Student` or `Course` depending on the context, but that's not ideal. What we need is a way to tell the type system that when `isStudent` returns `true`, the input is a `Student` and otherwise, it is not a `Student`. This is where Type Predicates come in:

```TypeScript
function isStudent(candidate: any): candidate is Student {
    return typeof candidate?.name === 'string' && Array.isArray(candidate?.courses);
}
```

Just by making that one change to the `isStudent` function, TypeScript now knows that in the branch where `isStudent` returned `true`, `target` is a `Student`, and in the branch where it returned `false`, it is not a `Student`, which means that by process of elimintation, it is a `Course`. We call this a `Type Predicate`. Note that the predicate replaces the return type. It's like we're saying, "this function returns whether or not `candidate` is a `Student`."

### Using `typeof` and `instanceof` Guards
Note that for simple checks of `typeof` (to check primitive types like `string`) or `instanceof` (to check if an object is an instance of a class), we don't need to add a function such as `isString()` just to get the benefits of type predicates for type checking purposes, because TypeScript will automagically know that the variable conforms to the type after using `typeof` or `instanceof`.

Example:
```TypeScript
class Chef extends Person {
    public favoriteCookingUtensil: Item;
}

function giveGift(target: Person) {
    if (target instanceof Chef) {
        target.giveGift(target.favoriteCookingUtensil); // We know target is a Chef, so we can access favoriteCookingUtensil
    } else {
        target.giveGift(BadGifts.coal);
    }
}

function toUpperCaseString(input: string | number): string {
    if (typeof input === 'string') {
        return input.toUpperCase(); // We know input is a string, so we can call toUpperCase()
    } else {
        return input.toString();
    }
}
```

### Assert Signatures
Let's look at a slightly different scenario. Suppose we are receiving a JSON response from a web request, and we want to validate that the JSON is of the expected response type. If not, we will throw an error. Our code might look something like this:

```TypeScript
interface ServiceResponse {
    numberOfCats: number;
    internetFrenzyIndex: number;
}

async function getResponse() {
    // Suppose httpClient.get(url) returns a promise of a parsed JSON response as type any.
    const response = await httpClient.get(serviceUrl);
    validateResponse(response);
    console.log(`Panic Level ${response.internetFrenzyIndex} due to ${response.numberOfCats} cats!`);
    // Properties are not type-checked because response is type any
}

function validateResponse(canidate: any): void {
    if (
        typeof candidate?.numberOfCats !=== 'number' ||
        typeof candidate?.internetFrenzyIndex !== 'number
    ) {
        throw new Error('Service Response Invalid')
    }
}
```

Once again, we're performing type-checking, but we are not telling the type system about it. Here, we aren't returning a boolean, though, so Type Predicates will not help. Instead, we can use Assert Signatures:


```TypeScript
function validateResponse(canidate: any): asserts candidate is ServiceResponse {
    if (
        typeof candidate?.numberOfCats !=== 'number' ||
        typeof candidate?.internetFrenzyIndex !== 'number'
    ) {
        throw new Error('Service Response Invalid')
    }
}
```

Once again, a simple change of the function signature solves our issue. By using the `asserts` keyword, the type system knows that by simply continuing execution passed a call to this function, it is guaranteed that the type assertion is true. Therefore, as long as we don't exit a `try` block, the rest of the function will assume that `response` is of type `ServiceResponse`.

[Next: Strict Null Checks](8-strict-null-checks.md)

[Table of Contents](0-intro.md)

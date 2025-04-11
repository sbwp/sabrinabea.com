[Previous: Classes](2-classes.md)

## More Types of Types
When working with web frameworks and data serialized as JSON, it is common to represent some sort of data as a string, but to only use some limited set of possible string values. For example, suppose you want to represent a bank account as being `'checking'` or `'savings'`.

TypeScript provides a way of constructing a type that only allows those two values and does not allow any other string. It uses two very common features: _String Literal Types_ and _Union Types_.

### Literal Types
A Literal Type_ is exactly what it sounds like (literally). It's a type defined by a literal value.

Example:
```TypeScript
type Apple = 'apple';

let apple: Apple = 'apple';
apple = 'apple';
apple = 'pear'; // ERROR: Type '"pear"' is not assignable to type '"apple"'.
```

We have defined a type that only accepts one single value (in this case `'apple'`. Note that while we use them almost exclusively with `string` literals in these examples, Literal Types work for other types as well, so `5`, `3.4`, and `false` are valid types as well, just less common.

On its own, Literal Types can seem like a pretty useless feature, but this combines with other features to enable a lot of the coolest parts of the TypeScript type system. 

### Union Types
To show the first of these, let's introduce another type feature: Union Types.

Example:
```TypeScript
type StringOrNumber = string | number;
let a: StringOrNumber = 5;
a = 'foo';
a = 7.6;
a = false; // ERROR: Type 'boolean' is not assignable to type 'StringOrNumber'.
```

Here, we use the `|` symbol to represent a logical or between the two types, meaning that the resulting type will allow values of either of the two types. Above we can see that the values `5`, `'foo'`, and `7.6` can legally be assigned to `StringOrNumber` because they match one of the two types in the Union Type, but `false` cannot, because it is of a different type.

You can also chain more than 2 types together to get more complex Union types, like `string | number | boolean | null`.

Now let's combine these two features together and take a look at that Bank Account example:
```TypeScript
type AccountType = 'checking' | 'savings';

interface BankAccount {
    accountType: AccountType;
    balance: number;
    accountHolderName: string;
    accountNumber: number;
}

const acc1: BankAccount = {
    accountType: 'checking',
    balance: 4032.78,
    accountHolderName: 'Thomas Riddle',
    accountNumber: 12345
}

const acc2: BankAccount = {
    accountType: 'savings',
    balance: 32456.37,
    accountHolderName: 'Harrison Potter',
    accountNumber: 23451
}

console.log(acc1.accountType);
```

Output:
```
> checking
```

We can see that the `accountType` field on `BankAccount` is allowed to be either `'checking'` or `'savings'`. If we tried to assign another type, like `'brokerage'`, it would be a compiler error, and if we made a typo, like `'checkings'`, it would be a compiler error. This means when using the property in our application, we can safely do checks like `if (account.accountType === 'checking')` without worrying about typos or unhandled additional values.

If you've used other languages before, you may be wondering why we don't use an enumeration (`enum` in TypeScript) for this. They should be more efficient, since the string comparison would be replaced with a numeric comparison. Purely on an efficiency level, you're right, but there are a few benefits to String Union Types in the context of web development:

1. Enumerations must be serialized when they are sent as JSON. This usually means either converting it to a string representation or as a number. Using a number loses semantic meaning when peaking at the JSON in flight for debugging, and increases the chance of a misunderstanding between client and server (e.g. listing one item in the enumeration out of order results in numbers being off by one). If a string representation is used, then you must convert between the two on both ends.
2. Some contexts, like Angular templates, make it difficult to access _enum_ values. Strings can be freely entered in these contexts and have the same type-checking benefits.
3. When printing values for debugging, strings make the meaning immediately clear, even when looking at the value in memory rather than a mapped value for serialization. Imagine the case of logging the above accounts. With a String Union Type, you would sees `'checking'` or `'savings'` logged. With an `enum`, you would see `0` or `1` and have to remember which was listed first in the `enum` definition to know which was which.

Still, in case a use case for enumerations does come up, here is the same example using an `enum`:

```TypeScript
enum AccountType {
    checking, savings
}

interface BankAccount {
    accountType: AccountType;
    balance: number;
    accountHolderName: string;
    accountNumber: number;
}

const acc1: BankAccount = {
    accountType: AccountType.checking,
    balance: 4032.78,
    accountHolderName: 'Thomas Riddle',
    accountNumber: 12345
}

const acc2: BankAccount = {
    accountType: AccountType.savings,
    balance: 32456.37,
    accountHolderName: 'Harrison Potter',
    accountNumber: 23451
}

console.log(acc1.accountType);
```

Output:
```
> 0
```

Note how we need a reference to the `enum` itself (`AccountType`) in order to access a particular value of it. We could theoretically pass `0` or `1` manually, but that will cause problems in the future if the mapping between those values ever changes (and good luck to anyone trying to maintain the code who sees some arbitrary number being passed into a field like `accountType`).

### Intersection Types
Just like we have Union Types, which allows either of two types to be used, we have Intersection Types, which do effectively the opposite, requiring all values passed in to conform to _both_ of the types.

Example:
```TypeScript
type LightPrimaryColor = 'red' | 'blue' | 'green';
type PigmentPrimaryColor = 'red' | 'blue' | 'yellow';
type AlwaysPrimaryColor = LightPrimaryColor & PigmentPrimaryColor;

let color: AlwaysPrimaryColor = 'red';
color = 'blue';
color = 'yellow'; // ERROR: Type '"yellow"' is not assignable to type '"red" | "blue"'.
color = 'green';  // ERROR: Type '"green"' is not assignable to type '"red" | "blue"'.
color = 'pink';   // ERROR: Type '"pink"' is not assignable to type '"red" | "blue"'.
```

Here the Intersection Type is `AlwaysPrimaryColor`. We take the intersection of `LightPrimaryColor` and `PigmentPrimaryColor` using the `&` operator. This gives us possible values of just `'red'` and `'blue'`. We can see that when we try assigning any value that conforms to one but not both of the types, we get an error, as well as when we try assigning a value that conforms to neither.

Here's another example, taking the intersection of two interfaces:
```TypeScript
interface University {
    numStudents: number;
    tuitionPrice: number;
    avgGpa: number;
    name: string;
    president: string;
}

interface Business {
    numEmployees: number;
    revenue: number;
    expenses: number;
    name: string;
    president: string; 
}

type PrivateUniversity = University & Business;

const dmu: PrivateUniversity = {
    numStudents: 7800000,
    tuitionPrice: 1000,
    avgGpa: 4.0,
    revenue: 7890474930,
    expenses: 4500,
    name: 'D.G.R.E. Mill University',
    president: 'Nota Skam'
}
```

Here we can see that the variable conforming to the intersection type of two interfaces requires all the properties of both interfaces, including any that overlap between the two, such as `name` and `president` in the examples above.

This brings up the question of what happens if you take the intersection type of two types with a property of the same name, with different types. The answer is that the property must be of the _intersection_ of the two types.

```TypeScript
interface Thief {
    name: string;
    status: 'retired' | 'active' | 'on the lam'| 'imprisoned' | 'parole' | 'probation';
    specialty: string;
}

interface Prisoner {
    id: number;
    status: 'awaiting sentence' | 'imprisoned' | 'parole' | 'probation' | 'free';
}

type ThiefPrisoner = Thief & Prisoner;

const jimmy: ThiefPrisoner = {
    name: 'James D. Stineworth',
    id: 5674838,
    status: 'imprisoned',
    specialty: 'banks'
};

jimmy.status = 'parole';
jimmy.status = 'probation';

jimmy.status = 'free';
// ERROR: Type '"free"' is not assignable to type '"imprisoned" | "parole" | "probation"'

jimmy.status = 'on the lam';
// ERROR: Type '"on the lam"' is not assignable to type '"imprisoned" | "parole" | "probation"'
```

Here, the `status` property of the Intersection Type `ThiefPrisoner` is the intersection of the types of the property `status` on `Thief` and `Prisoner`. But what about types with no overlap like `string` and `number`? Their intersection is the special type `never`, which basically means "this value can never be set to anything". This is usually used to assert that in a certain condition, no value can legally be provided somewhere (one example is as the return type of a function that always throws an exception). Therefore, we end up with a valid Intersection type, but a value can never legally be assigned to that type:

```TypeScript
interface NonPrisoner {
    name: string
}

interface Prisoner {
    name: number
}

type JeanValjean = NonPrisoner & Prisoner;

const monsieurLeMaire: JeanValjean = {
    name: 24601 // ERROR: Type 'number' is not assignable to type 'never'.
}
```

A note for people who are familiar with Set Theory but are confused by the usage of the words "Union" and "Intersection" to describe these types. If this is not useful to you, you can safely ignore it:
> &nbsp;  
When looking at examples of Union and Intersection Types such as the previous example, it can feel like the names are arbitrary, or even backwards (if you don't feel this way, then I succeeded in introducing the topic so as to avoid this common confusion). The key to understanding why they are named this way is to think of a type as _the set of all values that are assignable to a variable of that type_. For example, by this definition, the type `string` would be the set of all strings, the type `'foo'` would be the set containing only the string `'foo'`, and the type `never` would be the empty set (`any` would be the entire universe of JavaScript values).  
&nbsp;  
Then the type `'foo' | 'bar'` would be the set containing both `'foo'` and `'bar'`, or the union of the sets corresponding to the types `'foo'` and `'bar'`. The first example of Intersection Types above is a good example for understanding this way of thinking. The String Union Types explicity lay out the list of elements in the set corresponding to each of the types ({`'red'`, `'blue'`, `'green'`} and {`'red'`, `'blue'`, `'yellow'`}), and the intersection of those two types is the type corresponding to the intersection of the two sets ({`'red'`, `'blue'`}).  
&nbsp;  
When we apply this to classes and interfaces, the corresponding set becomes the set of all objects that have correctly named properties that belong to the set matching the type specified for that property name in the interface/class and have at least read/write access specified. This includes objects with additional properties.  
&nbsp;

[Next: Generics and Type Parameters](4-generics.md)

[Table of Contents](0-intro.md)

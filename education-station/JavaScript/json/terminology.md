---
title: terminology
parent: JSON
---
# JSON Terminology
This is intended to provide a high level overview of terminology used when talking about JSON and JSON-like formats. For the formal specification, see [json.org](https://www.json.org/json-en.html).

### Object
An object is a collection of key-value pairs called "properties", sort of like a Dictionary/Map/HashMap. In JSON, an object's keys are always strings, and its properties can be a string, number, boolean, null, array, or another object. Objects must be surrounded by curly braces `{}` and contain a comma-separated list of 0 or more properties.

Example:
```JSON
{
    "foo": "bar",
    "bar": 5,
    "baz": [
        "hey",
        {
            "id": 78,
            "name": "Bob"
        }
    ],
    "bat": {
        "favoriteColor": "blue",
        "active": false,
        "options": null
    }
}
```

#### Property
A property is a key-value pair inside an "object". They consist of a quoted string key, followed by a colon `:`, and then a value, which can be a string, number, boolean, null, array, or object.
See "object" above for examples.

### Array
An array is a list of items. Theyt are defined by surrounding a comma-separated list of 0 or more values (can be mixed types) with a pair of square brackets `[]`.

Example:
```JSON
[
    "foo",
    null,
    5,
    {
        "id": 988,
        "phoneNumber": "01189998819991197253"
        "name": "John Johnson"
    },
    3.47
    [
        "i",
        "am",
        "nested!!!1!!1!!"
    ],
    false,
    true
]
```

#### Element/Item
An element (sometimes called item) in an array is one of the individual comma-separated items within the array. In the example above, `"foo"` is an element, `null` is an element, `5` is an element, the object with properties `id`, `phoneNumber`, and `name` is an element, and so on.

### Number
A number in JSON comes from the JavaScript type `number`, which is used for any numeric value, which includes integer and non-integer values.

One thing to be aware of with numbers is that they are only considered a number if there are no quotes around the number. Any value inside quotes is a string.

Example:

```JSON
{
    "thisIsANumber": 24,
    "alsoANumber": 3.14,
    "notANumber": "7"
}
```

### Boolean
A boolean in JSON refers to the values `true` and `false`.

As with numbers, a boolean must **NOT** be quoted. If there are quotes, it will be treated as a string. (Note that when parsing an incorrectly quoted boolean into JavaScript, `"false"` is a non-empty string, so it will be considered "truthy" if used as a boolean).

Example:

```JSON
{
    "thisisABoolean": true,
    "alsoABoolean": false,
    "notABoolean": "false"
}
```
---
title: mongodb
parent: JSON
---
# MongoDB
If you've queried data from a Mongo database, you've probably seen that its data looks a lot like JSON. This is because it stores objects internally in a format very similar to JSON called _BSON_.

### BSON
BSON stands for "Binary JSON". This refers to the fact that it stores data in a binary format that mirrors JSON, but because it is a binary rather than text format, it is able to store additional types that JSON doesn't support, such as `Date` and `ObjectId` (the unique identifier assigned to each object in a Mongo Collection).

Beyond this, most users of MongoDB don't really need to know anything else about BSON itself, since the binary data will be transformed into the appropriate types or output format by whatever connector or client you're using.

### Mongo Queries from JavaScript
When querying MongoDB from JavaScript, including when using IntelliShell in Robo3T, data is provided using JavaScript objects, which maps well with the JSON-like BSON format the data is stored in.

Let's take a look at the following query:
```JavaScript
db.characters.find({ name: 'Sherlock Holmes' })
```
Response:
```JSON
/* 1 */
{
    "name": "Sherlock Holmes",
    "occupation": "Detective",
    "address": "221B Baker St"
}
```

When we query the `characters` collection, we ask to get back only the entries with the name `Sherlock Holmes`. It doesn't care about the values of any of the other fields. Let's try searching instead by a property whose value would be the same for multiple documents.

Query:
```JavaScript
db.characters.find({ address: '221B Baker St' })
```
Response:
```JSON
/* 1 */
{
    "name": "Sherlock Holmes",
    "occupation": "Detective",
    "address": "221B Baker St"
}

/* 2 */
{
    "name": "John Watson",
    "occupation": "Doctor",
    "address": "221B Baker St"
}
```
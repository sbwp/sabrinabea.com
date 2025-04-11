[Previous: Purely Symbolic](1-symbols-and-protocols.md)

## Let's Play Tag
The tagged template literal feature was one of those things I learned at a point where I thought my knowledge of the language was pretty comprehensive, and it just completely blew me away that the syntax was valid, but before we get into how they work, let's briefly review untagged template literals to make sure everybody is on the same page.

### Review: Template Literal Strings
In most modern languages, there is some sort of feature where you can write out a string literal, injecting variable values into the string using some syntax or another. In JavaScript, it looks like this:

```JavaScript
const x = 5
const z = 7
console.log(`My teacher says ${x} + ${z} equals ${x + z}.`);
// My teacher says 5 + 7 equals 12.
```

By using backticks `` ` `` instead of single `'` or double `"` quotes around a string, we create a "Template Literal". Within this string, if we put a dollar sign `$` followed by a pair of curly braces `{}`, we can put any expression inside the curly braces, and the result will be coerced into a string and inserted into the rest of the string content.

### Tagged Template Literal Strings
This is useful in a bunch of different places, but sometimes it can be a dangerous feature, such as when creating a SQL query. It would be very tempting, especially for a novice developer unfamiliar with SQL injection attacks to do something like this:
```JavaScript
const userProvidedValue = getInputFromUser();
const result = await runQuery(`SELECT * FROM my_table WHERE Field = '${userProvidedValue}'`);
```

Since the user's input is now allowed to be run directly as an actual SQL query, the application is vulnerable to SQL injection.

To get around this, many different SQL libraries have affordances that allow you to create prepared statements, where you define what the actual query is and then provide the user input, which then will not be interpreted as part of the query, but separately as a raw value.

However, JavaScript has a really nice feature to support this called Tagged Template Literals. I first came across it when looking at the documentation for the `mssql` Node library, and I thought it was a typo. Here's how their library uses the feature:

```JavaScript
const userProvidedValue = getInputFromUser();
const result = await sql.query`SELECT * FROM my_table WHERE Field = ${userProvidedValue}`;
```

When I first saw that, I thought they forgot the parentheses, but that's actually the syntax. By using it like this, the function actually receives the original string and the injected values separately, allowing it to handle the creation of a prepared statements behind the scenes without you needing to worry about it.

### How it works
Of course the next thing I wanted to know was, "How did they do it?" The answer to this, like most questions in JavaScript, was a function.

As an example of the format, let's create a tag that works like an untagged template literal, except that it uses JSON.stringify to convert everything to a string instead. We'll do a slightly suboptimally written example to favor tracability:

```JavaScript
const stringify = (strings, ...expressions) => {
    let res = strings[0];

    for (let i = 0; i < expressions.length; i++) {
        res += JSON.stringify(expressions[i]) + strings[i + 1];
    }

    return res;
}

const obj = { foo: 'bar', bar: 5 };
const result = stringify`The object ${obj} has property foo set to ${obj.foo}, and that's good.`;

console.log(result);
// The object {"foo":"bar","bar":5} has property foo set to "bar", and that's good.
```

Of course, as we can see with the `mssql` example, tagged template literals can do a lot more than return a concatenated string.

As an intermediate example, what if we wanted to use the inputs to find information and then return a string asynchronously?

```JavaScript
const greet = async (strings, profileUrl) => {
    const profile = await getProfile(profileUrl);
    const weatherQuestion = makeWeatherQuestion(profile.address.city, profile.language);
    return `${strings[0]}${profile.preferredName}${strings[1]}${weatherQuestion}`;
}

const result = await greet`Hello, ${'https://example.com/jsmith'}!`;
console.log(result);
// Hello, John! How is the weather in Denver?

const result2 = await greet`こんにちは, ${'https://example.com/yamamotos'}。`;
console.log(result);
// こんにちは, さくらさん。京都にはお天気はどうですか?
```

But let's take it that step further and return something other than a string, asynchrnously or not. Of course, we could go too far and create something that would work better as a function:

```JavaScript
const add = (strings, arg1, arg2) {
    return arg1 + arg2;
}

const result = add`${6}${8}`;
console.log(result); // 14
console.log(typeof result); // number
```

But it only makes sense to use this feature when there is a logical meaning of the operation as the construction of a string. Here is a more plausible example of posting to a social media site with a tagged user, using Markdown to add a hyperlink to the user's profile and returning a void Promise to track the success and completion of the post. We'll use the same technique as the `stringify` example.

```JavaScript
const post = async (strings, ...userIds) {
    let postText = strings[0];

    for (let i = 0; i < expressions.length; i++) {
        const profile = await getProfile(userIds[i]);
        postText += `[${profile.preferredName}](${profile.url})` + strings[i + 1];
    }

    await makePost(postText);
}

await post`I had a lot fun at the zoo with ${'mmorstan'} today. It was quite unexpected that we ran into ${'sholmes'} there`;

// The promise will reject if the posting request fails.
```

<!-- [Next: TBD](3-tbd.md) -->

[Table of Contents](0-intro.md)
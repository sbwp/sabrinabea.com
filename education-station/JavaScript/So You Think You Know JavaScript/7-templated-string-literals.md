[Previous: Hoist Yourself Up! Let's Scope This Out!](6-hoisting-and-scope.md)

### Templated String Literals
JavaScript also supports templated string literals, which is where we insert a variable or expression into a string. We just use backticks instead of single or double quotes, and surround the variable name or expression with `${}`.
Example:
```
const a = 57;
const myStr = `The variable a is set to ${a}.`;
const myStr2 = `If we add ${a} and 73, we get ${a + 73}!`;

console.log(myStr);
console.log(myStr2);
```
```
> The variable a is set to 57.
  If we add 57 and 73, we get 130!
```

This didn't feel like it needed its own section, but I included this since many people don't know that JavaScript supports them, and I use them in later examples.

[Next: What Do We Need Four Fors For?](8-for.md)

[Table of Contents](0-intro.md)

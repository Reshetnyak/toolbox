# How to safely get nested property?

## Using && operators

```javascript
var name = response
           && response.users
           && response.users[0]
           && response.users[0].name
```

This checking may grow with nesting levels

## Using try{}catch(){}

```javascript
var name;

try {
    name = response.users[0].name;
} catch(e){ /* ignore */ }
```

But this approach will have influence on error handling in your application.
If you have global error hanlers or decorators you will have to handle this type of errors also.

## Using getProp

```javascript
var name = getProp(response, 'users[0].name');
```

Just one line of code. Write query string like in native javascript.

Let's see examle with more nested properties:

```javascript
var serverResponse = {
  users: [
    {name: 'John', age: 20, messages: []},
    {
      name: 'Bob',
      age: 30,
      messages: [
        'Hello',
        [
            'How',
            'are',
            'you',
            {
              to: [
                {name: 'John'}
              ]
            }
        ]
      ]
    },
  ]
}
// returns 'John'
var name = getProp(serverResponse, 'users[1].messages[1][3].to[0].name');
```

And it will also work with object properties which contains spaces, dashes, underscores and numbers

```javascript
var serverResponse = {
  '12_hello - there 00': {
    '  first  ': ['found']
  }
}
var str = getProp(serverResponse, '12_hello - there 00.  first  [0]');
```

## For logging parsing errors use third param of the function

```javascript
// expecting array in c and trying to get third element
var str = getProp({a: {b: {c: 10}}}, 'a.b.c[2]', true)
```

With logging enabled, there will be helpfull information, that `10 is not an Array`. It could be helpful with deep nested properties.
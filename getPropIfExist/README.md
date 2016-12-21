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

## Using getPropIfExist

```javascript
var name = getPropIfExist('users[0].name', response);
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
var name = getPropIfExist('users[1].messages[1][3].to[0].name', serverResponse);
```

And it will also work with object properties which contains spaces, dashes, underscores and numbers
```javascript
var serverResponse = {
  '12_hello - there 00': {
    '  first  ': ['found']
  }
}
var str = getPropIfExist('12_hello - there 00.  first  [0]', serverResponse);
```

## What if I need to look for undefined property or element?

There is third boolean parameter for this purposes. It's falsy by default.
To differentiate found `undefined` value there is function property `notFound`.
You can compare it with result of the function to understand if it found needed property.
```javascript
var users = [{name: undefined}];

// returns undefined
var name = getPropIfExist('[0].name', users, true);

if (name === getPropIfExist.notFound){
    console.log('There is no such property in users');
}

// or use comparison with undefined
if (typeof name === 'undefined'){
    console.log('Property was found');
}
```
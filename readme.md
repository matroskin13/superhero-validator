## Install

```console
$ npm install --save superhero-validator
```

## Usage


```js

import {validation, validators} from 'superhero-validator';

const validator = validation({
    email: validators.email(), // required param
    name: [validators.empty(), validators.string(3, 15)], // param can be is empty, or string (length > 3 && < 16)
    age: validators.number(21, 100) // required param, and param type is number (age > 21 && age < 101),
    digits: validators.arrayOf(validators.numbers), // array of numbers,
    tasks: validators.arrayOf(validators.object({
        id: validators.number(),
        title: validators.string()
    })),
    param123: validators.custom(param => param.value === 123),
    param311or999: validators.is([311, 999]),
    count: validators.not([30])
});

const result = validator({
    email: 'superman@superhero-team.com',
    name: 'Superman',
    age: 45,
    digits: [1, 2, 3],
    tasks: [
        {id: 1, title: 'first task'},
        {id: 2, title: 'second task'}
    ],
    param123: 123,
    param311or999: 311,
    count: 20
});

console.log(result.success); // true

```

```js
import {use, validators} from 'superhero-validator';

let result = use(validators.email(), 'test@gmail.com'); // true
```

more validators in [api page](api.md)
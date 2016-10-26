## Usage

```js

import {validation, validators} from 'superhero-validator';

const validator = validation({
    email: validators.email(),
    name: [validators.required(), validators.string(2, 15)],
    age: validators.number(21, 100)
});

const result = validator({
    email: 'superman@superhero-team.com',
    name: 'Superman',
    age: 45
});

console.log(result.success); // true

```
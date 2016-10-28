## Usage

```js

import {validation, validators} from 'superhero-validator';

const validator = validation({
    email: validators.email(), // required param
    name: [validators.empty(), validators.string(3, 15)], // param can be is empty, or string (length > 3 && < 16)
    age: validators.number(21, 100) // required param, and param type is number (age > 21 && age < 101)
});

const result = validator({
    email: 'superman@superhero-team.com',
    name: 'Superman',
    age: 45
});

console.log(result.success); // true

more validators in [api page](docs/more_words.md)

```
import test from 'ava';

import validation from '../src/validation';
import {email} from '../src/validators';

test('validation return validator', t => {
    let validator = validation({});
    
    t.is(typeof validator, 'function');
});

test('validation validator return valid object', t => {
    let validator = validation({
        email: email()
    });
    let result = validator({email: 'test@gmail.com'});
    
    t.is(result.success, true);
});
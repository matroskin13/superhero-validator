import test from 'ava';

import {oneOf, email, number} from '../../src/validators';
import {getParam} from '../../src/utils';

test('return validator object', t => {
    let validator = oneOf();

    t.is(validator.name, 'oneOf');
    t.is(typeof validator.handler, 'function');
});

test('return success if one of validation is true, then main validation success', t => {
    let validator = oneOf([
        email(),
        number(5, 10)
    ]);
    
    t.is(validator.handler(getParam('test', 5)).success, true);
    t.is(validator.handler(getParam('test', 'superman@superhero-team.com')).success, true);
});

test('return failed if every of validators return error', t => {
    let validator = oneOf([
        email(),
        number(5, 10)
    ]);

    t.is(validator.handler(getParam('test', 'spbclan@')).success, false);
    t.is(validator.handler(getParam('test', NaN)).success, false);
    t.is(validator.handler(getParam('test', undefined)).success, false);
});
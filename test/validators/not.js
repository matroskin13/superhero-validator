import test from 'ava';

import {not} from '../../src/validators';
import {getParam} from '../../src/utils';

let validator;

test.beforeEach(() => {
    validator = not([1, 3]);
});

test('return validator object', t => {
    t.is(validator.name, 'not');
    t.is(typeof validator.handler, 'function');
});

test('check success value', t => {
    t.is(validator.handler(getParam('test', 3)).success, false);
    t.is(validator.handler(getParam('test', 1)).success, false);
});

test('check invalid value', t => {
    t.is(validator.handler(getParam('test', 2)).success, true);
    t.is(validator.handler(getParam('test', true)).success, true);
});
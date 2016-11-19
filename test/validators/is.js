import test from 'ava';

import {is} from '../../src/validators';
import {getParam} from '../../src/utils';

let validator;

test.beforeEach(() => {
    validator = is([1, 3]);
});

test('return validator object', t => {
    t.is(validator.name, 'is');
    t.is(typeof validator.handler, 'function');
});

test('check success value', t => {
    t.is(validator.handler(getParam('test', 3)).success, true);
    t.is(validator.handler(getParam('test', 1)).success, true);
});

test('check invalid value', t => {
    t.is(validator.handler(getParam('test', 2)).success, false);
    t.is(validator.handler(getParam('test', true)).success, false);
});
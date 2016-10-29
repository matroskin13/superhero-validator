import test from 'ava';

import {arrayOf, number} from '../../src/validators';
import {getParam} from '../../src/utils';

test('check array of numbers', t => {
    let validator = arrayOf(number(3, 10));
    let param = getParam('test', [4, 5, 6, 7]);
    
    t.is(validator.handler(param).success, true);
});

test('check invalid array of numbers', t => {
    let validator = arrayOf(number(3, 10));
    let param = getParam('test', [4, 5, 6, '123asdasd']);
    
    t.is(validator.handler(param).success, false);
});
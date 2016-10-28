import test from 'ava';

import {empty} from '../../src/validators';
import {getParam} from '../../src/utils';

function checkEmptyValue(value) {
    let validator = empty();
    
    return validator.handler(getParam('test', value));
}

test('return validator object', t => {
    let validator = empty();
    
    t.is(validator.name, 'empty');
    t.is(typeof validator.handler, 'function');
});

test('return success by valid params', t => {
    t.is(checkEmptyValue('').success, true);
    t.is(checkEmptyValue(null).success, true);
});

test('return failed by invalid params', t => {
    t.is(checkEmptyValue(0).success, false);
    t.is(checkEmptyValue(false).success, false);
    t.is(checkEmptyValue(NaN).success, false);
});
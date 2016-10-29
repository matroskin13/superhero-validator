import test from 'ava';

import {custom} from '../../src/validators';
import {getParam} from '../../src/utils';

test('return success result', t => {
    let validator = custom(param => param.value === 123, 'validator123');
    let validationParam = getParam('test', 123);
    
    t.is(validator.name, 'custom-validator123');
    t.is(validator.handler(validationParam).success, true);
});

test('return failed result', t => {
    let validator = custom(param => param.value === 123);
    let validationParam = getParam('test', 321);

    t.is(validator.handler(validationParam).success, false);
});
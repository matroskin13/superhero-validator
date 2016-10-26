import test from 'ava';

import {number} from '../../src/validators';
import {getParam, getValidationSuccess} from '../../src/utils';

function validationNumber(value) {
    let validator = number();
    
    return validator.handler(getParam('age', value));
}

function getRangeValidationNumber(min, max, value) {
    let validator = number(min, max);
    
    return validator.handler(getParam('age', value));
}

test('return validator object', t => {
    let validator = number();

    t.is(validator.name, 'number');
    t.is(typeof validator.handler, 'function');
});

test('check success number', t => {
    let param = getParam('age', 20);
    let expectedResult = getValidationSuccess();
    
    t.deepEqual(number().handler(param), expectedResult);
});

test('check error numbers', t => {
    t.is(validationNumber('asdasd').success, false);
    t.is(validationNumber(NaN).success, false);
    t.is(validationNumber({}).success, false);
    t.is(validationNumber('123asdds').success, false);
});

test('check number ranges', t => {
    let validationMethod = getRangeValidationNumber.bind(null, 10, 20);
    
    t.is(validationMethod(9).success, false);
    t.is(validationMethod(10).success, true);
    t.is(validationMethod(12).success, true);
    t.is(validationMethod(20).success, true);
    t.is(validationMethod(21).success, false);
});
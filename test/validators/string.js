import test from 'ava';

import {string} from '../../src/validators';
import {getParam, getValidationSuccess} from '../../src/utils';

function validationString(value) {
    const validator = string();
    
    return validator.handler(getParam('name', value));
}

function getRangeValidationString(min, max, value) {
    const validator = string(min, max);
    
    return validator.handler(getParam('name', value));
}

test('return validator object', t => {
    const validator = string();

    t.is(validator.name, 'string');
    t.is(typeof validator.handler, 'function');
});

test('check success string', t => {
    const param = getParam('name', 'ivan');
    const expectedResult = getValidationSuccess();
    
    t.deepEqual(string().handler(param), expectedResult);
});

test('check error string', t => {
    t.is(validationString('asdasd').success, true);
    t.is(validationString(0).success, false);
    t.is(validationString(1).success, false);
    t.is(validationString(NaN).success, false);
    t.is(validationString({}).success, false);
    t.is(validationString(/asd/).success, false);
});

test('check string ranges', t => {
    let validationMethod = getRangeValidationString.bind(null, 2, 5);
    
    t.is(validationMethod('1').success, false);
    t.is(validationMethod('22').success, true);
    t.is(validationMethod('333').success, true);
    t.is(validationMethod('55555').success, true);
    t.is(validationMethod('666666').success, false);
});

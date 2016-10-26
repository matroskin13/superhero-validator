import test from 'ava';

import {getParam, getValidationError, getValidationSuccess, getValidator} from '../src/utils';

test('return error object', t => {
    const error = 'TEST_ERROR';
    const message =  'test message';
    const key = 'test';
    const expectedObject = {success: false, error, message, key};

    t.deepEqual(getValidationError(error, message, key), expectedObject);
});

test('return success object', t => {
    t.deepEqual(getValidationSuccess(), {success: true});
});

test('return param object', t => {
    const paramValue = {name: 'Tester!'};
    const expectedKey = 'test';
    
    t.deepEqual(getParam(expectedKey, paramValue), {key: expectedKey, value: paramValue});
});

test('return validator object', t => {
    const validatorName = 'test';
    const handler = () => true;
    const expectedObject = {name: validatorName, handler};
    
    t.deepEqual(getValidator(validatorName, handler), expectedObject);
});
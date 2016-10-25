const test = require('ava');

const utils = require('../src/utils');

test('return error object', t => {
    const error = 'TEST_ERROR';
    const message =  'test message';
    const key = 'test';
    const expectedObject = {success: false, error, message, key};

    t.deepEqual(utils.getValidationError(error, message, key), expectedObject);
});

test('return success object', t => {
    t.deepEqual(utils.getValidationSuccess(), {success: true});
});

test('return param object', t => {
    const paramValue = {name: 'Tester!'};
    const expectedKey = 'test';
    
    t.deepEqual(utils.getParam(expectedKey, paramValue), {key: expectedKey, value: paramValue});
});
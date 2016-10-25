const test = require('ava');

const validators = require('../../src/validators');
const utils = require('../../src/utils');
const errors = require('../../src/errors');

let validator;

test.beforeEach(() => {
    validator = validators.email();
});

test('check success email', t => {
    let param = utils.getParam('email', 'spbclan@gmail.com');
    let expectedResult = {success: true};
    
    t.deepEqual(validator(param), expectedResult);
});

test('check failed emails', t => {
    let paramMethod = utils.getParam.bind(utils, 'email');
    let expectedResult = {success: false, key: 'email', error: errors.PARAM_IS_NOT_EMAIL, message: 'param email is not email'};
    
    t.deepEqual(validator(paramMethod('ttt@mm')), expectedResult);
    t.deepEqual(validator(paramMethod('ttt')), expectedResult);
    t.deepEqual(validator(paramMethod('test@gmail.')), expectedResult);
    t.deepEqual(validator(paramMethod('@gmail.com')), expectedResult);
});
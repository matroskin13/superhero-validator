import test from 'ava';

import {email} from '../../src/validators';
import {getParam} from '../../src/utils';
import {PARAM_IS_NOT_EMAIL} from '../../src/errors';

let validator;

test.beforeEach(() => {
    validator = email();
});

test('check success email', t => {
    let param = getParam('email', 'spbclan@gmail.com');
    let expectedResult = {success: true};
    
    t.deepEqual(validator.handler(param), expectedResult);
});

test('check failed emails', t => {
    let paramMethod = getParam.bind(null, 'email');
    let expectedResult = {success: false, key: 'email', error: PARAM_IS_NOT_EMAIL, message: 'param email is not email'};
    
    t.deepEqual(validator.handler(paramMethod('ttt@mm')), expectedResult);
    t.deepEqual(validator.handler(paramMethod('ttt')), expectedResult);
    t.deepEqual(validator.handler(paramMethod('test@gmail.')), expectedResult);
    t.deepEqual(validator.handler(paramMethod('@gmail.com')), expectedResult);
});
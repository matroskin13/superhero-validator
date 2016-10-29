import test from 'ava';

import {regExp} from '../../src/validators';
import {getParam} from '../../src/utils';

test('return success result', t => {
    let validator = regExp(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/);
    let validationParam = getParam('test', '127.0.0.1');
    
    t.is(validator.handler(validationParam).success, true);
});

test('return failed result', t => {
    let validator = regExp(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/);
    let validationParam = getParam('test', '127.0');

    t.is(validator.handler(validationParam).success, false);
});
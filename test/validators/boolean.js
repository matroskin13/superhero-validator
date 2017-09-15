import test from 'ava';

import {boolean} from '../../src/validators';
import {getParam} from '../../src/utils';

function validationBoolean(value) {
    const validator = boolean();
    
    return validator.handler(getParam('isSelected', value));
}

test('returns validator object', t => {
    const validator = boolean();

    t.is(validator.name, 'boolean');
    t.is(typeof validator.handler, 'function');
});


test('validates correctly', t => {
    t.is(validationBoolean(true).success, true);
    t.is(validationBoolean(false).success, true);
    t.is(validationBoolean(0).success, false);
    t.is(validationBoolean(1).success, false);
    t.is(validationBoolean('').success, false);
    t.is(validationBoolean(Boolean).success, false);
    t.is(validationBoolean(NaN).success, false);
    t.is(validationBoolean().success, false);
    t.is(validationBoolean(null).success, false);
    t.is(validationBoolean(undefined).success, false);
    t.is(validationBoolean({}).success, false);
    t.is(validationBoolean([]).success, false);
    t.is(validationBoolean(/asd/).success, false);
});

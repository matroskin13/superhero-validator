import test from 'ava';

import use from '../src/use';
import {email} from '../src/validators';

test('method return true', t => {
    t.is(use(email(), 'test@gmail.com'), true);
});

test('method return false', t => {
    t.is(use(email(), 'test@'), false);
});
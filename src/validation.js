import {object} from './validators';

export default function(options) {
    let validator = object(options);

    return params => validator.handler({value: params});
}
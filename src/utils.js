import _ from 'lodash';

import {PARAM_IS_REQUIRED} from './errors';

export function getValidationError(error, message, key) {
    return {
        success: false,
        error,
        key, 
        message
    };
}

export function getValidationSuccess() {
    return {
        success: true
    };
}

export function getParam(key, value) {
    return {
        key,
        value
    };
}

export function getValidator(validatorName, handler, checkRequired = true) {
    return {
        name: validatorName,
        handler: (param, validators = []) => {
            let emptyValidator = _.find(validators, {name: 'empty'});
            
            if (checkRequired && (isEmptyValue(param.value) && !emptyValidator)) {
                return getValidationError(PARAM_IS_REQUIRED, `param ${param.key} is required`, param.key);
            } else if (emptyValidator) {
                return getValidationSuccess();
            }
            
            return handler(param, validators);
        }
    };
}

export function isEmptyValue(value) {
    return value === '' || value === null || value === undefined;
}
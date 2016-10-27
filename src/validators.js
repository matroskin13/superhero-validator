import _ from 'lodash';

import {getValidationError, getValidationSuccess, getParam, getValidator, isEmptyValue} from './utils';
import * as errors from './errors';

function getRequiredError(key) {
    return getValidationError(errors.PARAM_IS_REQUIRED, `param ${key} is required`, key);
}

export function object(propertyList) {
    return getValidator('object', param => {
        if (!_.isObject(param.value)) {
            return getValidationError(errors.PARAM_IS_NOT_OBJECT, `param ${param.key} is not object`, param.key);
        }

        for (let i in propertyList) {
            if (propertyList.hasOwnProperty(i)) {
                let paramName = param.key ? `${param.key}.${i}` : i;
                let property = propertyList[i];
                let validationParam = getParam(`${paramName}`, param.value[i]);
                let result;

                if (_.isArray(property)) {
                    for (let propertyItem of property) {
                        result = propertyItem.handler(validationParam, property);

                        if (!result.success) {
                            break;
                        }
                    }
                } else {
                    result = property.handler(validationParam);
                }

                if (!result.success) {
                    return result;
                }
            }
        }

        return getValidationSuccess();
    });
}

export function string(min, max) {
    return getValidator('string', param => {
        let value = String(param.value);

        if (max && value.length > max) {
            return getValidationError(errors.PARAM_IS_ABOVE, `param length is above than ${max}`, param.key);
        }

        if (min && value.length < min) {
            return getValidationError(errors.PARAM_IS_BELOW, `param length is below than ${min}`, param.key);
        }

        return getValidationSuccess();
    });
}

export function number(min, max) {
    return getValidator('number', param => {
        let value = Number(param.value);

        if (!(typeof value === 'number' && !Number.isNaN(value))) {
            return getValidationError(errors.PARAM_IS_NOT_NUMBER, `param ${param.key} is not number`, param.key);
        }

        if (max && value > max) {
            return getValidationError(errors.PARAM_IS_ABOVE, `param ${param.key} is above than ${max}`, param.key);
        }

        if (min && value < min) {
            return getValidationError(errors.PARAM_IS_BELOW, `param ${param.key} is below than ${min}`, param.key)
        }

        return getValidationSuccess();
    });
}

export function email() {
    return getValidator('email', param => {
        let reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

        if (reg.test(param.value)) {
            return getValidationSuccess();
        } else {
            return getValidationError(errors.PARAM_IS_NOT_EMAIL, `param ${param.key} is not email`, param.key);
        }
    });
}

export function empty() {
    return getValidator('empty', param => {
        if (isEmptyValue(param.value)) {
            return getValidationSuccess();
        }

        return getValidationError(errors.PARAM_IS_NOT_EMPTY, `param ${param.key} is not empty`, param.key);
    }, false);
}

export function oneOf(validators) {
    return getValidator('oneOf', (param, _validators) => {
        for (let validator of validators) {
            if (validator.handler(param, _validators).success) {
                return getValidationSuccess();
            }
        }

        return getValidationError(`oneOf failed for ${param.key}`, errors.PARAM_IS_NOT_ONE_OF, param.key);
    }, false);
}
/** @module src/validators */

import _ from 'lodash';

import {getValidationError, getValidationSuccess, getParam, getValidator, isEmptyValue} from './utils';
import * as errors from './errors';

/**
 * Validator of object type
 * @param {Object} propertyList
 * @returns {ValidatorObject}
 *
 * @example
 * let validator = validation({
 *      user: validator.object({
 *          name: validator.string(2, 15),
 *          email: validator.email(),
 *          lastName: [validator.empty(), validator.string(2, 25)]
 *      })
 * });
 *
 * validator({
 *      user: {
 *          name: 'Klark',
 *          email: 'superman@superhero-team.com',
 *          lastName: 'Kent'
 *      }
 * }); // {success: true}
 */
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

/**
 * validator of string type
 * @param {Number} min - minimum length of string
 * @param {Number} max - maximum length of string
 * @returns {ValidatorObject}
 *
 * @example
 * let validator = validation({
 *      name: validator.string(2, 15)
 * });
 *
 * validator({
 *      name: 'Klark'
 * }); // {success: true}
 */
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

/**
 * validator of number type
 * @param {Number} min - minimum of number
 * @param {Number} max - maximum of number
 * @returns {ValidatorObject}
 *
 * @example
 * let validator = validation({
 *      age: validator.number(2, 15)
 * });
 *
 * validator({
 *      age: 18
 * }); // {success: false}
 */
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

/**
 * validator of email
 * @returns {ValidatorObject}
 *
 * @example
 * let validator = validation({
 *      email: validator.email()
 * });
 *
 * validator({
 *      email: 'test'
 * }); // {success: false}
 */
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

/**
 * if the validator declared for item, then is item has empty value, return success. Empty values: '', null, undefined
 * @returns {ValidatorObject}
 *
 * @example
 * let validator = validation({
 *      email: [validator.empty(), validator.email()]
 * });
 *
 * validator({
 *      email: 'test'
 * }); // {success: false}
 *
 * validator({
 *      email: ''
 * }); // {success: true}
 */
export function empty() {
    return getValidator('empty', param => {
        if (isEmptyValue(param.value)) {
            return getValidationSuccess();
        }

        return getValidationError(errors.PARAM_IS_NOT_EMPTY, `param ${param.key} is not empty`, param.key);
    }, false);
}

/**
 * @param {ValidatorObject[]} validators
 * @returns {ValidatorObject}
 *
 * @example
 * let validator = validation({
 *      email: validator.oneOf([validator.number(), validator.email()])
 * });
 *
 * validator({
 *      email: 'test@test.com'
 * }); // {success: true}
 */
export function oneOf(validators) {
    return getValidator('oneOf', (param, _validators) => {
        for (let validator of validators) {
            if (validator.handler(param, _validators).success) {
                return getValidationSuccess();
            }
        }

        return getValidationError(errors.PARAM_IS_NOT_ONE_OF, `oneOf failed for ${param.key}`, param.key);
    }, false);
}

/**
 * check items of array
 * @param {ValidatorObject} validator
 * @returns {ValidatorObject}
 *
 * @example
 * let validator = validation({
 *      digits: validator.arrayOf(validator.number())
 * });
 *
 * validator({
 *      digits: [1, 2, 3]
 * }); // {success: true}
 */
export function arrayOf(validator) {
    return getValidator('arrayOf', param => {
        if (!Array.isArray(param.value)) {
            return getValidationError(errors.PARAM_IS_NOT_ARRAY, `param ${param.key} is not array`, param.key);
        }

        for (let i = 0; i < param.value.length; i++) {
            let _param = param.value[i];
            let validationParam = getParam(`${_param.key}[${i}]`, _param);
            let result = validator.handler(validationParam);
            
            if (!result.success) {
                return result;
            }
        }

        return getValidationSuccess();
    }, false);
}
const _ = require('lodash');

const utils = require('./utils');
const errors = require('./errors');

exports.object = (propertyList) => param => {
    if (!_.isObject(param.value)) {
        return utils.getValidationError(errors.PARAM_IS_NOT_OBJECT, `param ${param.key} is not object`, param.key);
    }
    
    for (let i in propertyList) {
        if (propertyList.hasOwnProperty(i)) {
            let paramName = param.key ? `${param.key}.${i}` : i;
            let property = propertyList[i];
            let validationParam = utils.getParam(`${paramName}`, param.value[i]);
            let result;
            
            if (_.isArray(property)) {
                for (let propertyItem of property) {
                    result = propertyItem(validationParam);

                    if (!result.success) {
                        break;
                    }
                }
            } else {
                result = property(validationParam);
            }
            
            if (!result.success) {
                return result;
            }
        }
    }
    
    return utils.getValidationSuccess();
};

exports.required = () => param => {
    let value = Boolean(param.value);

    if (value) {
        return utils.getValidationSuccess();
    } else {
        return utils.getValidationError(errors.PARAM_IS_REQUIRED, `param ${param.key} is required`, param.key);
    }
};

exports.string = (min, max) => param => {
    let value = String(param.value);
    
    if (max && value.length > max) {
        return utils.getValidationError(errors.PARAM_IS_ABOVE, `param length is above than ${max}`, param.key);
    }
    
    if (min && value.length < min) {
        return utils.getValidationError(errors.PARAM_IS_BELOW, `param length is below than ${min}`, param.key);
    }
    
    return utils.getValidationSuccess();
};

exports.number = (min, max) => param => {
    let value = Number(param.value);

    if (!(typeof value === 'number' && !Number.isNaN(value))) {
        return utils.getValidationError(errors.PARAM_IS_NOT_NUMBER, `param ${param.key} is not number`, param.key);
    }

    if (max && value > max) {
        return utils.getValidationError(errors.PARAM_IS_ABOVE, `param ${param.key} is above than ${max}`, param.key);
    }

    if (min && value < min) {
        return utils.getValidationError(errors.PARAM_IS_BELOW, `param ${param.key} is below than ${min}`, param.key)
    }

    return utils.getValidationSuccess();
};

exports.email = () => param => {
    let reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

    if (reg.test(param.value)) {
        return utils.getValidationSuccess();
    } else {
        return utils.getValidationError(errors.PARAM_IS_NOT_EMAIL, `param ${param.key} is not email`, param.key);
    }
};
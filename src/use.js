/** @module src/use */

import validation from './validation';

/**
 * @param {ValidatorObject} validator
 * @param value
 * @returns {Boolean}
 */
export default (validator, value) => {
    return validation({value: validator})({value}).success;
};
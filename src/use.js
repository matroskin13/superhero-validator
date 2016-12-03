import validation from './validation';

export default (validator, value) => {
    return validation({value: validator})({value}).success;
};
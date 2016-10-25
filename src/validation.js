const validators = require('./validators');

module.exports = options => {
    let validator = validators.object(options);

    return params => validator({value: params});
};
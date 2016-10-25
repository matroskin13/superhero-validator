exports.getValidationError = (error, message, key) => {
    return {
        success: false,
        error,
        key, 
        message
    };
};

exports.getValidationSuccess = () => {
    return {
        success: true
    };
};

exports.getParam = (key, value) => {
    return {
        key,
        value
    };
};
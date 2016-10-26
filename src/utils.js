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

export function getValidator(validatorName, handler) {
    return {
        name: validatorName,
        handler
    };
}
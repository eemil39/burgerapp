export const updateObject = (oldOject, updatedProperties) => {
    return {
        ...oldOject,
        ...updatedProperties
    };
};

export const checkValiditation = (value, rules) => {
    let isValid = true;
    if( !rules ) {
        return true;
    }
    
    if (rules.rquired) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}
type ValidatorFunction = (val: any, param?: any) => boolean;
type Validators = Record<string, ValidatorFunction>;


function validateField(value: any, rules: any): { isValid: boolean, error?: string } {
    const validators: Validators = {
        minLen: (val, len) => val.length >= len,
        maxLen: (val, len) => val.length <= len,
        required: (val) => val !== undefined && val !== null && val !== '',
        max: (val, maxVal) => parseFloat(val) <= maxVal,
        min: (val, maxVal) => parseFloat(val) >= maxVal,
        number: (val) => !isNaN(parseFloat(val)) && isFinite(val),
        boolean: (val) => typeof val === 'boolean',
        enum: (val, allowedValues) => allowedValues.includes(val),
        string: (val) => typeof val === 'string',
    };

    if (typeof rules === 'function') {
        return { isValid: rules(value) };
    }

    if (!(typeof rules === 'string')) throw new Error('Rules must be a string or a function that returns true or false.');

    const regexToDetectEnum = /enum:[^|]*[^|]*(\|)+|(\|)+enum:[^|]*[^|]*/g;
    const enumString = rules.match(regexToDetectEnum);
    if (enumString) {
        const allowedValues = enumString[0].split(':')[1].split(',');

        const isValid = validators.enum(value, allowedValues);
        if (!isValid) {
            return {
                isValid: false,
                error: `Invalid value: ${value}. This field must be one of these values: ${allowedValues.join(', ')}.`,
            };
        }
    }

    const rulesWithOutEnums = rules.replace(regexToDetectEnum, '');

    const rulesArray = rulesWithOutEnums ? rulesWithOutEnums.split('|') : [];
    for (let i = 0; i < rulesArray.length; i++) {
        const [ruleName, ruleValue] = rulesArray[i].split(':');
        const validator = validators[ruleName];
        if (!validator) {
            throw new Error(`Invalid rule: ${ruleName}`);
        }
        const isValid = validator(value, ruleValue);
        if (!isValid) {
            return {
                isValid: false,
                error: `Invalid value: ${value}. Rule ${ruleName}:${ruleValue} was not satisfied.`,
            };
        }
    }
    return {
        isValid: true,
    };
}

export default validateField;

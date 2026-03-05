
export function getSignalFormErrorMessage(
    kind: string,
    fieldLabel?: string | null,
    errorData?: any
): string {
    const label = fieldLabel ?? 'This field';

    const messages: Record<string, (label: string, data?: any) => string> = {
        required: (label) => `${label} is required`,
        email: () => 'Please enter a valid email address',
        minLength: (label, data) => {
            const length = data?.requiredLength ?? data?.minLength;
            return length
                ? `${label} must be at least ${length} characters`
                : `${label} is too short`;
        },
        maxLength: (label, data) => {
            const length = data?.requiredLength ?? data?.maxLength;
            return length
                ? `${label} cannot exceed ${length} characters`
                : `${label} is too long`;
        },
        min: (label, data) => {
            const minValue = data?.min;
            return minValue !== undefined
                ? `${label} must be at least ${minValue}`
                : 'Value is too low';
        },
        max: (label, data) => {
            const maxValue = data?.max;
            return maxValue !== undefined
                ? `${label} cannot exceed ${maxValue}`
                : 'Value is too high';
        },
        pattern: () => 'Invalid format',
        url: () => 'Please enter a valid URL',
        tel: () => 'Please enter a valid phone number',
        number: () => 'Please enter a valid number',
        date: () => 'Please enter a valid date',
        time: () => 'Please enter a valid time',
    };

    const messageFunction = messages[kind];
    if (messageFunction) {
        return messageFunction(label, errorData);
    }

    return 'Invalid value';
}

export function getSignalFormErrorFromObject(
    error: { kind: string; message?: string;[key: string]: any },
    fieldLabel?: string | null
): string {
    if (error.message) {
        return error.message;
    }
    return getSignalFormErrorMessage(error.kind, fieldLabel, error);
}

export function getFirstSignalFormError(
    errors: Array<{ kind: string; message?: string;[key: string]: any }>,
    fieldLabel?: string | null
): string {
    if (!errors || errors.length === 0) {
        return '';
    }

    return getSignalFormErrorFromObject(errors[0], fieldLabel);
}

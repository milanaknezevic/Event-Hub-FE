// useFormattedBackendErrors.js
import {useEffect} from 'react';

const useFormattedBackendErrors = (backendErrors, setErrors) => {
    useEffect(() => {
        setErrors({})
        if (backendErrors.errors && backendErrors.errors?.length > 0) {
            const formattedErrors = {};
            backendErrors.errors.forEach(error => {
                formattedErrors[error.field] = error.message;
            });
            setErrors(formattedErrors);
        }
    }, [backendErrors, setErrors]);
};

export default useFormattedBackendErrors;

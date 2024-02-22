// useFormattedBackendErrors.js
import { useEffect } from 'react';

const useFormattedBackendErrors = (backendErrors, setErrors) => {
    useEffect(() => {
        if (backendErrors.errors && backendErrors.errors.length > 0) {
            console.log("uslo")
            const formattedErrors = {};
            backendErrors.errors.forEach(error => {
                formattedErrors[error.field] = error.message;
            });
            console.log("formattedErrors ",formattedErrors)
            setErrors(formattedErrors);
        }
    }, [backendErrors, setErrors]);
};

export default useFormattedBackendErrors;

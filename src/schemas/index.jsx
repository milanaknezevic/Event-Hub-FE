import * as yup from "yup";

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
export const loginSchema = yup.object().shape({
    username: yup
        .string()
        .required("Username is required"),
    password: yup
        .string()
        .min(2, "Password must be at least 2 characters")
        .required("Password is required"),
});
export const registrationSchema = yup.object().shape({
    name: yup.string().required('Required'),
    lastname: yup.string().required('Required'),
    email: yup.string().email('Enter a valid email address').required('Email is required'),
    username: yup.string().required('Required'),
    password: yup.string().required('Required').min(8, 'Password must be at least 8 characters'),
    phoneNumber: yup.string().required('Required'),
    role: yup.string().required('Required'),
    status: yup.string().required('Required'),
    // avatar: yup.mixed().required('Avatar image is required').test('fileFormat', 'Allowed formats: JPG, JPEG, PNG', (value) => {
    //     if (!value) return true; // Skip format validation if no image is selected
    //     const acceptedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
    //     return acceptedFormats.includes(value.type);
    // }).test('fileSize', 'Maximum file size is 5MB', (value) => {
    //     if (!value) return true; // Skip size validation if no image is selected
    //     return value.size <= 5 * 1024 * 1024; // 5MB in bytes
    // }),
});

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
export const addUserSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    lastname: yup.string().required('Last name is required'),
    email: yup.string().email('Enter a valid email address').required('Email is required'),
    username: yup.string().required('Username is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    role: yup.string().required('Role is required'),
    status: yup.string().required('Status is required'),
});
export const registrationSchema = yup.object().shape({
    name: yup.string().required('Required'),
    lastname: yup.string().required('Required'),
    email: yup.string().email('Enter a valid email address').required('Email is required'),
    username: yup.string().required('Required'),
    password: yup.string().required('Required').min(2, 'Password must be at least 2 characters'),
    confirmPassword: yup.string().required('Required').min(2, 'Password must be at least 2 characters')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    phoneNumber: yup.string().required('Required'),
    role: yup.string().required('Required'),
});
export const replyToTicketSchema = yup.object().shape({
    answer: yup.string().required('Required'),
});
export const addGeneralEvent = yup.object().shape({
    name: yup.string().required('Name is required'),
    description: yup.string().required('Description is required'),
    startTime: yup.string().required('Start time is required'),
    endTime: yup.string().required('End time is required'),
    eventType_id: yup.string().required('Event is required'),
    location_id: yup.string().required('Location is required'),
});

export const editUserSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    lastname: yup.string().required('Last name is required'),
    email: yup.string().email('Enter a valid email address').required('Email is required'),
    username: yup.string().required('Username is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    role: yup.string().required('Role is required'),
    status: yup.string().required('Status is required'),
});



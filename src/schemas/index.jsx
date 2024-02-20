import * as yup from "yup";

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;


export const loginSchema = yup.object().shape({
    username: yup
        .string()
        .required("Required"),
    password: yup
        .string()
        .min(2)
        .required("Required"),
});
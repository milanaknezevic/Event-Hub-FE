import {useFormik} from "formik";
import CustomInput from "../FormComponents/CustomInput.jsx";
import {Button} from "antd";
import {NavLink} from "react-router-dom";
import CustomSelect from "../FormComponents/CustomSelect.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getUserRoles} from "../../redux/user.jsx";
import useFormattedBackendErrors from "../../CustomHooks/UseFormattedBackendErrors.jsx";
import {uploadAvatar, userRegister} from "../../redux/auth.jsx";
import {registrationSchema} from "../../schemas/index.jsx";
import {auth, user} from "../../redux/selectors.jsx";

const Register = () => {
    const dispatch = useDispatch()
    const {backendErrors} = useSelector(auth)
    const {userRoles} = useSelector(user);
    const [avatarValue, setAvatarValue] = useState("");

    useEffect(() => {
        dispatch(getUserRoles({}))
    }, []);

    const onSubmit = async (values) => {
        let updatedValues = {...values}
        if (avatarValue) {
            const formData = new FormData();
            formData.append("file", avatarValue)
            const {payload} = await dispatch(uploadAvatar(formData));

            if (payload && payload.imageName && payload.buffer) {
                updatedValues = {...values, avatar: payload.imageName,buffer:payload.buffer};
            }
        }
        await dispatch(userRegister(updatedValues));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAvatarValue(file)

    };

    const formik = useFormik({
        initialValues: {
            name: "",
            lastname: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            role: "",
            avatar: ""
        },
        validationSchema: registrationSchema,
        onSubmit: onSubmit,
    });

    useFormattedBackendErrors(backendErrors, formik.setErrors)

    return (
        <div className="container-fluid flex-grow-1 d-flex align-items-center justify-content-center">
            <div className={"row justify-content-center w-100"}>
                <div className={"col-10 col-md-6 register-container"}>
                    <div className={"row"}>
                        <div className={"col-12 d-flex justify-content-center title"}>
                            <h1>Register</h1>
                        </div>
                        <form onSubmit={formik.handleSubmit} className={"row justify-content-center register"}>
                            <div className={"col-12 col-md-6"}>
                                <CustomInput
                                    label="Name"
                                    name="name"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    errorMessage={
                                        formik.errors.name && formik.touched.name
                                            ? formik.errors.name
                                            : ""
                                    }
                                />
                            </div>
                            <div className={"col-12 col-md-6"}>

                                <CustomInput
                                    label="Password"
                                    name="password"
                                    type="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    errorMessage={
                                        formik.errors.password && formik.touched.password
                                            ? formik.errors.password
                                            : ""
                                    }
                                />
                            </div>
                            <div className={"col-12 col-md-6"}>
                                <CustomInput
                                    label="Lastname"
                                    name="lastname"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.lastname}
                                    errorMessage={
                                        formik.errors.lastname && formik.touched.lastname
                                            ? formik.errors.lastname
                                            : ""
                                    }
                                />
                            </div>
                            <div className={"col-12 col-md-6"}>
                                <CustomInput
                                    label="Confirm password"
                                    name="confirmPassword"
                                    type="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.confirmPassword}
                                    errorMessage={
                                        formik.errors.confirmPassword && formik.touched.confirmPassword
                                            ? formik.errors.confirmPassword
                                            : ""
                                    }
                                />
                            </div>
                            <div className={"col-12 col-md-6"}>
                                <CustomInput
                                    label="Email"
                                    name="email"
                                    type="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    errorMessage={
                                        formik.errors.email && formik.touched.email
                                            ? formik.errors.email
                                            : ""
                                    }
                                />
                            </div>
                            <div className={"col-12 col-md-6"}>
                                <CustomInput
                                    label="Phone number"
                                    name="phoneNumber"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.phoneNumber}
                                    errorMessage={
                                        formik.errors.phoneNumber && formik.touched.phoneNumber
                                            ? formik.errors.phoneNumber
                                            : ""
                                    }
                                />
                            </div>
                            <div className={"col-12 col-md-6"}>
                                <CustomInput
                                    label="Username"
                                    name="username"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                    errorMessage={
                                        formik.errors.username && formik.touched.username
                                            ? formik.errors.username
                                            : ""
                                    }
                                />
                            </div>
                            <div className={"col-12 col-md-6"}>
                                <CustomSelect
                                    label="Role"
                                    name="role"
                                    options={userRoles}
                                    onChange={(fieldName, value) => formik.setFieldValue(fieldName, value)}
                                    errorMessage={formik.errors.role && formik.touched.role ? formik.errors.role : ""}
                                />
                            </div>
                            <div className={"col-12 "}>
                                <CustomInput label="Avatar" name="avatar" type="file" value={formik.values.avatar}
                                             onChange={handleFileChange}/>

                            </div>


                            <div className={"col-12 p-2 d-flex justify-content-center pb-3"}>
                                <Button className="register-btn btn col-6" htmlType="submit" type="submit">Sign up
                                </Button>
                            </div>
                            <div className={"col-12 d-flex justify-content-center pb-3"}>
                                <div>
                                    Already have an account?
                                    <NavLink className={"login-link"} to="/login">
                                        {" "}
                                        Login here.
                                    </NavLink>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

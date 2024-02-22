import {Form, Formik} from "formik";
import {loginSchema} from "../../schemas/index.jsx";
import {NavLink} from "react-router-dom";
import {Button} from "antd";
import CustomInput from "../FormComponents/CustomInput.jsx";
import {useDispatch} from "react-redux";
import {userLogin} from "../../redux/auth.jsx";
import { useSelector } from "react-redux";
const Login = () => {

    const dispatch = useDispatch()
    const backendErrors = useSelector(state => state.auth.backendErrors);
    console.log("backendErrors ",backendErrors)

    const onSubmit = async (values, { setErrors }) => {
        try {
            const response = await dispatch(userLogin(values));
            console.log("Response", response);

            // Clear existing errors
            setErrors({});

            // Handle backend errors
            if (backendErrors.errors.length > 0) {
                const formattedErrors = {};
                backendErrors.errors.forEach(error => {
                    formattedErrors[error.field] = error.message;
                });
                setErrors(formattedErrors);
            }
        } catch (error) {
            console.error("Error during login", error);
        }
    };
    return (
        <div className="container-fluid flex-grow-1 d-flex align-items-center justify-content-center">
            <div className={"row justify-content-center w-100"}>
                <div className={"col-10 col-md-3 login-container"}>
                    <div className={"row"}>
                        <div className={"col-12 d-flex justify-content-center title"}>
                            <h1>Login</h1>
                        </div>
                        <Formik
                            initialValues={{username: "", password: ""}}
                            validationSchema={loginSchema}
                            onSubmit={onSubmit}
                        >
                            {({errors, touched, handleBlur}) => (
                                <Form>
                                    <CustomInput
                                        label="Username"
                                        name="username"
                                        errors={errors}
                                        touched={touched}
                                        onBlur={handleBlur}
                                    />
                                    <CustomInput
                                        label="Password"
                                        name="password"
                                        type="password"
                                        errors={errors}
                                        touched={touched}
                                        onBlur={handleBlur}
                                    />
                                    <div className={"col-12 p-2 d-flex justify-content-center pb-3"}>
                                        <Button className="login-btn btn col-6" htmlType="submit" type="submit">Login
                                        </Button>
                                    </div>
                                    <div className={"col-12 d-flex justify-content-center pb-3"}>
                                        <div>
                                            No account?
                                            <NavLink className={"register-link"} to="/register">
                                                {" "}
                                                Register here.
                                            </NavLink>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

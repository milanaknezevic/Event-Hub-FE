import {useEffect, useRef} from 'react';
import {Form, Formik} from 'formik';
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../../redux/selectors.jsx";
import useFormattedBackendErrors from "../../CustomHooks/UseFormattedBackendErrors.jsx";
import {userLogin} from "../../redux/auth.jsx";
import CustomInput from "../FormComponents/CustomInput.jsx";
import {loginSchema} from "../../schemas/index.jsx";
import CustomButton from "../FormComponents/CustomButton.jsx";

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {backendErrors, isAuthenticated, loggedUser} = useSelector(auth);
    const formikRef = useRef();
    const onSubmit = async (values) => {
        await dispatch(userLogin(values));

    };

    useEffect(() => {
        if (isAuthenticated && loggedUser !== null) {
            if (loggedUser?.role === 1) {

                navigate("/users")
            } else if (loggedUser?.role === 0) {
                navigate("/events")
            }
        }
    }, [loggedUser, isAuthenticated])

    useFormattedBackendErrors(backendErrors, formikRef.current?.setErrors)

    return (
        <div className="container-fluid flex-grow-1 d-flex align-items-center justify-content-center">
            <div className={"row justify-content-center w-100"}>

                <div className={"col-10 col-md-3 login-container"}>
                    <div className={"row"}>
                        <div className={"col-12 d-flex justify-content-center title"}>
                            <h1>Login</h1>
                        </div>


                        <Formik
                            innerRef={formikRef}
                            initialValues={{
                                username: '',
                                password: '',
                            }}
                            validationSchema={loginSchema}
                            onSubmit={onSubmit}
                        >
                            {({handleSubmit}) => (
                                <Form onSubmit={handleSubmit}>
                                    <CustomInput label="Username" name="username" type="text"/>
                                    <CustomInput label="Password" name="password" type="password"/>

                                    <div className={"col-12 p-2 d-flex justify-content-center pb-3"}>
                                        {/*<Button className="login-btn btn col-12 col-md-6" htmlType="submit"*/}
                                        {/*        type="submit">Login*/}
                                        {/*</Button>*/}

                                        <CustomButton className={"login-btn btn col-12 col-md-6"}
                                                      htmlType="submit"
                                                      type="submit"
                                                      text={"Login"}/>


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
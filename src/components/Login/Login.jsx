import {useFormik} from "formik";
import {loginSchema} from "../../schemas/index.jsx";
import CustomInput from "../FormComponents/CustomInput.jsx";
import {Button} from "antd";
import {NavLink, useNavigate} from "react-router-dom";
import {userLogin} from "../../redux/auth.jsx";
import {useDispatch, useSelector} from "react-redux";
import useFormattedBackendErrors from "../../CustomHooks/UseFormattedBackendErrors.jsx";
import {useEffect} from "react";
import {auth} from "../../redux/selectors.jsx";


const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {backendErrors, isAuthenticated,loggedUser} = useSelector(auth);

    const onSubmit = async (values) => {
        await dispatch(userLogin(values));

    };
    useEffect(() => {
        if (isAuthenticated && loggedUser !== null) {
            if(loggedUser?.role === 'SUPPORT')
            {
            navigate("/users")
            }
            else if(loggedUser?.role === 'ORGANIZER'){
                navigate("/events")
            }
        }
    }, [loggedUser,isAuthenticated])

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: onSubmit,
    });

    useFormattedBackendErrors(backendErrors, formik.setErrors)

    return (
        <div className="container-fluid flex-grow-1 d-flex align-items-center justify-content-center">
            <div className={"row justify-content-center w-100"}>
                <div className={"col-10 col-md-3 login-container"}>
                    <div className={"row"}>
                        <div className={"col-12 d-flex justify-content-center title"}>
                            <h1>Login</h1>
                        </div>
                        <form onSubmit={formik.handleSubmit} className={"row justify-content-center login"}>

                            <div className={"col-12"}>
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
                            <div className={"col-12"}>
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


                            <div className={"col-12 p-2 d-flex justify-content-center pb-3"}>
                                <Button className="login-btn btn col-12 col-md-6" htmlType="submit" type="submit">Login
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
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

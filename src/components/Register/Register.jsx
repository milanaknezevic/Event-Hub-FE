import {Form, Formik} from "formik";
import {registrationSchema} from "../../schemas/index.jsx";
import {NavLink} from "react-router-dom";
import {Button} from "antd";
import CustomInput from "../FormComponents/CustomInput.jsx";
import CustomSelect from "../FormComponents/CustomSelect.jsx";

const Register = () => {
    const onSubmit = async (values, actions) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        actions.resetForm();
    };
    const roleOptions = [
        {id: 'admin', name: 'Administrator'},
        {id: 'user', name: 'Regular User'},
    ];
//name, lastname, email, username, password, phoneNumber, role, status, avatar
    return (
        <div className="container-fluid flex-grow-1 d-flex align-items-center justify-content-center">
            <div className={"row justify-content-center w-100"}>
                <div className={"col-10 col-md-6 login-container"}>
                    <div className={"row"}>
                        <div className={"col-12 d-flex justify-content-center title"}>
                            <h1>Register</h1>
                        </div>
                        <Formik
                            initialValues={{
                                name: "",
                                lastname: "",
                                email: "",
                                username: "",
                                password: "",
                                confirmPassword: "",
                                phoneNumber: "",
                                role: "",
                                avatar: ""
                            }}
                            validationSchema={registrationSchema}
                            onSubmit={onSubmit}
                        >
                            {({errors, touched, handleBlur}) => (
                                <Form className={"row justify-content-center"}>
                                    <div className={"col-12 col-md-6"}>
                                        <CustomInput
                                            label="Name"
                                            name="name"
                                            errors={errors}
                                            touched={touched}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                    <div className={"col-12 col-md-6"}>
                                        <CustomInput
                                            label="Password"
                                            name="password"
                                            type="password"
                                            errors={errors}
                                            touched={touched}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                    <div className={"col-12 col-md-6"}>
                                        <CustomInput
                                            label="Lastname"
                                            name="lastname"
                                            errors={errors}
                                            touched={touched}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                    <div className={"col-12 col-md-6"}>
                                        <CustomInput
                                            label="Confirm password"
                                            name="confirmPassword"
                                            type="password"
                                            errors={errors}
                                            touched={touched}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                    <div className={"col-12 col-md-6"}>

                                        <CustomInput
                                            label="Email"
                                            name="email"
                                            type="email"
                                            errors={errors}
                                            touched={touched}
                                            onBlur={handleBlur}
                                        />
                                    </div>

                                    <div className={"col-12 col-md-6"}>
                                        <CustomInput
                                            label="Phone Number"
                                            name="phoneNumber"
                                            errors={errors}
                                            touched={touched}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                    <div className={"col-12 col-md-6"}>
                                        <CustomInput
                                            label="Username"
                                            name="username"
                                            errors={errors}
                                            touched={touched}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                    <div className={"col-12 col-md-6"}>
                                        <CustomSelect label="Role" name="role" options={roleOptions}/>
                                    </div>


                                    <div className={"col-12 p-2 d-flex justify-content-center pb-3"}>
                                        <Button className="login-btn btn col-6" htmlType="submit" type="submit">Sign up
                                        </Button>
                                    </div>
                                    <div className={"col-12 d-flex justify-content-center pb-3"}>
                                        <div>
                                            Already have an account?
                                            <NavLink className={"register-link"} to="/login">
                                                {" "}
                                                Login here.
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

export default Register;

import {useEffect, useRef} from 'react';
import {Form, Formik} from 'formik';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../../redux/selectors.jsx";
import useFormattedBackendErrors from "../../CustomHooks/UseFormattedBackendErrors.jsx";
import CustomInput from "../FormComponents/CustomInput.jsx";
import CustomButton from "../FormComponents/CustomButton.jsx";
import {changePassword} from "../../redux/auth.jsx";

const ChangePassword = () => {
    const dispatch = useDispatch()
    const {backendErrors} = useSelector(auth);
    const formikRef = useRef();


    const onSubmit = async (values) => {
        await dispatch(changePassword({data: values}));

    };

    useFormattedBackendErrors(backendErrors, formikRef.current?.setErrors)


    return (
        <div className="container-fluid flex-grow-1 d-flex align-items-center justify-content-center">
            <div className={"row justify-content-center w-100"}>

                <div className={"col-10 col-md-5 col-lg-4 login-container"}>
                    <div className={"row"}>
                        <div className={"col-12 d-flex justify-content-center title my-4"}>
                            <h1>Change password</h1>
                        </div>
                        <Formik
                            innerRef={formikRef}
                            initialValues={{
                                old_password: '',
                                new_password: '',
                                confirm_password: ''
                            }}
                            //validationSchema={changePasswordSchema}
                            onSubmit={onSubmit}
                        >
                            {({handleSubmit}) => (
                                <Form onSubmit={handleSubmit}>
                                    <CustomInput label="Old password" name="old_password" type="password"/>
                                    <CustomInput label="New password" name="new_password" type="password"/>
                                    <CustomInput label="Confirm password" name="confirm_password" type="password"/>

                                    <div className={"col-12 p-2 d-flex justify-content-center pb-3"}>
                                        <CustomButton className={"login-btn btn col-12 col-md-6 mt-2"}
                                                      htmlType="submit"
                                                      type="submit"
                                                      text={"Submit"}/>
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


export default ChangePassword;

import {Form, Formik} from "formik";
import CustomInput from "../FormComponents/CustomInput.jsx";
import {NavLink} from "react-router-dom";
import CustomSelect from "../FormComponents/CustomSelect.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {getUserRoles} from "../../redux/user.jsx";
import useFormattedBackendErrors from "../../customHooks/UseFormattedBackendErrors.jsx";
import {uploadAvatar, userRegister} from "../../redux/auth.jsx";
import {registrationSchema} from "../../schemas/index.jsx";
import {auth, user} from "../../redux/selectors.jsx";
import CustomUpload from "../FormComponents/CustomUpload.jsx";
import CustomButton from "../FormComponents/CustomButton.jsx";
import {Modal} from "antd";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const Register = () => {
    const formikRef = useRef();
    const dispatch = useDispatch()
    const {backendErrors} = useSelector(auth)
    const {userRoles} = useSelector(user);
    const [avatarValue, setAvatarValue] = useState("");
    const [images, setImages] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const handleCancel = () => setPreviewOpen(false);


    useEffect(() => {
        dispatch(getUserRoles({}))
    }, []);

    const onSubmit = async (values) => {
        let updatedValues = {...values}
        let formData;
        let uid;
        if (avatarValue) {
            formData = new FormData();
            formData.append("file", avatarValue.originFileObj)
            uid = avatarValue.uid
            updatedValues = {...values, avatar: avatarValue.uid};
        }
        let res = await dispatch(userRegister(updatedValues));
        if (res && avatarValue && !res.error) {
            await dispatch(uploadAvatar({formData, uid}));
        }
    };
    const handleChangeImage = ({fileList: newFileList}) => {
        if (newFileList.length === 0) {
            formikRef.current?.setFieldValue("avatar", "")
        } else {
            formikRef.current?.setFieldValue("avatar", newFileList[0])
        }
        setImages(newFileList);
        setAvatarValue(newFileList[0]);
    };

    // const formik = useFormik({
    //     initialValues: {
    //         name: "",
    //         lastname: "",
    //         email: "",
    //         username: "",
    //         password: "",
    //         confirmPassword: "",
    //         phoneNumber: "",
    //         role: "",
    //         avatar: ""
    //     },
    //     validationSchema: registrationSchema,
    //     onSubmit: onSubmit,
    // });

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    useFormattedBackendErrors(backendErrors, formikRef.current?.setErrors)


    return (
        <div className="container-fluid flex-grow-1 d-flex align-items-center justify-content-center">
            <div className={"row justify-content-center w-100"}>
                <div className={"col-10 col-md-6 register-container"}>
                    <div className={"row"}>
                        <div className={"col-12 d-flex justify-content-center title"}>
                            <h1>Register</h1>
                        </div>
                        <Formik
                            innerRef={formikRef}
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
                            {({handleSubmit}) => (
                                <Form onSubmit={handleSubmit} className={"row"}>
                                    <div className={"col-12 col-md-6"}>
                                        <CustomInput label="Name"
                                                     name="name"
                                                     type="text"/>
                                    </div>
                                    <div className={"col-12 col-md-6"}>
                                        <CustomInput label="Password"
                                                     name="password"
                                                     type="password"/>
                                    </div>


                                    <div className={"col-12 col-md-6"}>
                                        <CustomInput label="Lastname"
                                                     name="lastname"
                                                     type="text"/>
                                    </div>
                                    <div className={"col-12 col-md-6"}>
                                        <CustomInput label="Confirm password"
                                                     name="confirmPassword"
                                                     type="password"/>
                                    </div>


                                    <div className={"col-12 col-md-6"}>
                                        <CustomInput label="Email"
                                                     name="email"
                                                     type="email"/>
                                    </div>
                                    <div className={"col-12 col-md-6"}>
                                        <CustomInput label="Phone number"
                                                     name="phoneNumber"
                                                     type="text"/>
                                    </div>

                                    <div className={"col-12 col-md-6"}>
                                        <CustomInput label="Username"
                                                     name="username"
                                                     type="text"/>
                                    </div>
                                    <div className={"col-12 col-md-6"}>
                                        <CustomSelect
                                            label="Role"
                                            name="role"
                                            options={userRoles}
                                        />
                                    </div>
                                    <div className={"col-12 "}>
                                        <CustomUpload name={"avatar"}
                                                      fileList={images}
                                                      handleChangeImage={handleChangeImage}
                                                      onPreview={handlePreview}
                                                      maxCount={1}
                                                      buttonText={"Upload Avatar"}/>

                                    </div>
                                    <Modal open={previewOpen} title={previewTitle} footer={null}
                                           onCancel={handleCancel}>
                                        <img
                                            alt="example"
                                            className={"w-100"}
                                            src={previewImage}
                                        />
                                    </Modal>

                                    <div className={"col-12 d-flex justify-content-center pb-3"}>
                                        {/*<Button className="register-btn btn col-12 col-md-6" htmlType="submit"*/}
                                        {/*        type="submit">Sign up*/}
                                        {/*</Button>*/}

                                        <CustomButton className={"register-btn btn col-12 col-md-6"}
                                                      htmlType="submit"
                                                      type="submit"
                                                      text={"Sign up"}/>
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

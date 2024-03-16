import {Modal} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {user} from "../../redux/selectors.jsx";
import {addUser, editUser, getAdminUserRoles, getUserStatus, setUserModalState} from "../../redux/user.jsx";
import CustomInput from "../FormComponents/CustomInput.jsx";
import {Form, Formik} from "formik";

import CustomSelect from "../FormComponents/CustomSelect.jsx";
import {useEffect, useRef, useState} from "react";
import {uploadAvatar} from "../../redux/auth.jsx";
import useFormattedBackendErrors from "../../CustomHooks/UseFormattedBackendErrors.jsx";
import CustomUpload from "../FormComponents/CustomUpload.jsx";
import {editUserSchema, registrationSchema} from "../../schemas/index.jsx";


const UsersModal = () => {
    const formikRef = useRef();
    const dispatch = useDispatch()
    const {userAdminRoles, userStatus, pagination, form} = useSelector(user);
    const [avatarValue, setAvatarValue] = useState("");
    const [images, setImages] = useState([]);

    useEffect(() => {
        dispatch(getAdminUserRoles({}))
        dispatch(getUserStatus({}))
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
        let res;
        if (form.mode === 'edit') {
            res = await dispatch(editUser({data: updatedValues, pagination: pagination}));
        } else if (form.mode === 'create') {
            res = await dispatch(addUser({data: updatedValues, pagination: pagination}));
        }
        if (res && avatarValue && !res.error) {
            await dispatch(uploadAvatar({formData, uid}));
        }
    };

    const handleCancel = () => {
        dispatch(setUserModalState({modalOpen: false, mode: ''}));
        formikRef.current?.resetForm(formikRef.current?.initialValues)
        setImages([])
    };
    useEffect(() => {
        if (form.mode === 'edit') {
            const statusKey = userStatus.find(item => item.value === form.userObj.status)?.key;
            const roleKey = userAdminRoles.find(item => item.value === form.userObj.role)?.key;

            const updatedValues = {
                ...form.userObj,
                status: statusKey !== undefined ? statusKey : form.userObj.status,
                role: roleKey !== undefined ? roleKey : form.userObj.role,
            };

            if (form.userObj.avatar) {
                const img = new URL(`../../assets/users/${form.userObj.avatar}.png`, import.meta.url).href
                setImages([
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: img

                    },
                ])
            }

            formikRef.current?.setValues(updatedValues);
        }
        if (form.mode === 'create') {
            formikRef.current?.resetForm(formikRef.current?.initialValues);
            setImages([])
        }
    }, [form.mode, form.userObj]);
    useFormattedBackendErrors(form.backendErrors, formikRef.current?.setErrors)

    const handleChangeImage = ({fileList: newFileList}) => {
        if (newFileList.length === 0) {
            formikRef.current?.setFieldValue("avatar", "")
        } else {
            formikRef.current?.setFieldValue("avatar", newFileList[0])
        }
        setImages(newFileList);
        setAvatarValue(newFileList[0]);
    };

    return (
        <>
            <Modal className={"user-modal"} size={"lg"} title={form.mode === "create" ? 'Create a user' : 'Edit user'}
                   open={form.modalOpen && (form.mode === 'create' || form.mode === 'edit')}
                   onOk={formikRef.current?.handleSubmit} onCancel={handleCancel}>
                <Formik
                    innerRef={formikRef}
                    initialValues={{
                        name: '',
                        lastname: '',
                        email: '',
                        username: '',
                        phoneNumber: '',
                        role: '',
                        password: "",
                        confirmPassword: "",
                        status: '',
                        avatar: '',
                    }}
                    validationSchema={form.mode === 'create' ? registrationSchema : editUserSchema}
                    onSubmit={onSubmit}
                >
                    {({handleSubmit}) => (
                        <Form onSubmit={handleSubmit} className={"row"}>
                            <div className={"col-12 col-md-6"}>
                                <CustomInput label="Name"
                                             name="name"
                                             type="text"/>
                            </div>
                            {form.mode !== 'edit' && <div className={"col-12 col-md-6"}>
                                <CustomInput label="Password"
                                             name="password"
                                             type="password"/>
                            </div>}


                            <div className={"col-12 col-md-6"}>
                                <CustomInput label="Lastname"
                                             name="lastname"
                                             type="text"/>
                            </div>
                            {form.mode !== 'edit' && <div className={"col-12 col-md-6"}>
                                <CustomInput label="Confirm password"
                                             name="confirmPassword"
                                             type="password"/>
                            </div>}


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
                                    options={userAdminRoles}
                                    // onChange={(fieldName, value) => formikRef.current?.setFieldValue(fieldName, value)}
                                    // errorMessage={formikRef.current?.errors.role && formikRef.current?.touched.role ? formikRef.current?.errors.role : ""}
                                    // value={formikRef.current?.values.role}
                                />
                            </div>
                            {form.mode !== 'create' && <div className={"col-12 col-md-6"}>
                                <CustomSelect
                                label="Status"
                                name="status"
                                options={userStatus}
                            />
                            </div>}
                            <div className={"col-12 "}>
                                <CustomUpload name={"avatar"} fileList={images}
                                              handleChangeImage={handleChangeImage}
                                              maxCount={1} buttonText={"Upload Avatar"}/>

                            </div>

                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    );
};
export default UsersModal;
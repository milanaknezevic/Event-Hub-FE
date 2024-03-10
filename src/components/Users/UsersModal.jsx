import {Modal} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {user} from "../../redux/selectors.jsx";
import {addUser, editUser, getAdminUserRoles, getUserStatus, setUserModalState} from "../../redux/user.jsx";
import CustomInput from "../FormComponents/CustomInput.jsx";
import {useFormik} from "formik";

import CustomSelect from "../FormComponents/CustomSelect.jsx";
import {useEffect, useState} from "react";
import {uploadAvatar} from "../../redux/auth.jsx";
import useFormattedBackendErrors from "../../CustomHooks/UseFormattedBackendErrors.jsx";
import CustomUpload from "../FormComponents/CustomUpload.jsx";
import {editUserSchema, registrationSchema} from "../../schemas/index.jsx";


const UsersModal = () => {
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
        formik.resetForm(formik.initialValues)
        setImages([])
    };
    const formik = useFormik({
        initialValues: {
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
        },
        validationSchema: form.mode === 'create' ? registrationSchema : editUserSchema,
        onSubmit: onSubmit,
    });

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
                console.log("img ", img)
                setImages([
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: img

                    },
                ])
            }

            formik.setValues(updatedValues);
        }
        if (form.mode === 'create') {
            formik.resetForm(formik.initialValues);
            setImages([])
        }
    }, [form.mode, form.userObj]);
    useFormattedBackendErrors(form.backendErrors, formik.setErrors)

    const handleChangeImage = ({fileList: newFileList}) => {
        if (newFileList.length === 0) {
            formik.setFieldValue("avatar", "")
        } else {
            formik.setFieldValue("avatar ", newFileList[0])
        }
        setImages(newFileList);
        setAvatarValue(newFileList[0]);
    };

    return (
        <>
            <Modal className={"user-modal"} size={"lg"} title={form.mode === "create" ? 'Create a user' : 'Edit user'}
                   open={form.modalOpen && (form.mode === 'create' || form.mode === 'edit')}
                   onOk={formik.handleSubmit} onCancel={handleCancel}>
                <form className={"row justify-content-center register"}>
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
                    {form.mode !== 'edit' && <div className={"col-12 col-md-6"}>
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
                    </div>}
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
                    {form.mode !== 'edit' &&
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
                        </div>}
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
                            options={userAdminRoles}
                            onChange={(fieldName, value) => formik.setFieldValue(fieldName, value)}
                            errorMessage={formik.errors.role && formik.touched.role ? formik.errors.role : ""}
                            value={formik.values.role}
                        />
                    </div>
                    <div className={`col-12 ${form.mode === 'create' ? '' : 'col-md-6'}`}>
                        <CustomUpload name={"avatar"} fileList={images} handleChangeImage={handleChangeImage}
                                      maxCount={1} buttonText={"Upload Avatar"}/>
                    </div>
                    {form.mode !== 'create' &&
                        <div className={"col-12 col-md-6"}>
                            <CustomSelect
                                label="Status"
                                name="status"
                                options={userStatus}
                                onChange={(fieldName, value) => formik.setFieldValue(fieldName, value)}
                                errorMessage={formik.errors.status && formik.touched.status ? formik.errors.status : ""}
                                value={formik.values.status}
                            />
                        </div>}
                </form>
            </Modal>
        </>
    );
};
export default UsersModal;
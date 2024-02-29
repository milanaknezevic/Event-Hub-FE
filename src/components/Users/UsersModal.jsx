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
import {editUserSchema, registrationSchema} from "../../schemas/index.jsx";

const UsersModal = () => {
    const dispatch = useDispatch()
    const {form} = useSelector(user);
    const {userAdminRoles, userStatus} = useSelector(user);
    const [avatarValue, setAvatarValue] = useState("");

    useEffect(() => {
        dispatch(getAdminUserRoles({}))
        dispatch(getUserStatus({}))
    }, []);

    const onSubmit = async (values) => {
        let updatedValues = {...values}
        if (avatarValue) {
            const formData = new FormData();
            formData.append("file", avatarValue)
            const {payload} = await dispatch(uploadAvatar(formData));

            if (payload && payload.imageName && payload.buffer) {
                updatedValues = {...values, avatar: payload.imageName, buffer: payload.buffer};
            }
        }

        if (form.mode === 'edit') {
            await dispatch(editUser(updatedValues));
        } else if (form.mode === 'create') {
            await dispatch(addUser(updatedValues));
        }
        formik.resetForm(formik.initialValues)
    };
    const handleCancel = () => {
        dispatch(setUserModalState({modalOpen: false, mode: ''}));
        formik.resetForm(formik.initialValues)
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAvatarValue(file)
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

            formik.setValues(updatedValues);
        }
    }, [form.mode, form.userObj]);
    useFormattedBackendErrors(form.backendErrors, formik.setErrors)

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
                        <CustomInput label="Avatar" name="avatar" type="file" value={formik.values.avatar}
                                     onChange={handleFileChange}/>
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
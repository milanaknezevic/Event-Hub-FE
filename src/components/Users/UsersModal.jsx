import {Modal} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {user} from "../../redux/selectors.jsx";
import {getAdminUserRoles, setUserModalState} from "../../redux/user.jsx";
import CustomInput from "../FormComponents/CustomInput.jsx";
import {useFormik} from "formik";
import {generateValidationSchema} from "../../schemas/index.jsx";
import CustomSelect from "../FormComponents/CustomSelect.jsx";
import {useEffect, useState} from "react";

const UsersModal = () => {
    const dispatch = useDispatch()
    const {form} = useSelector(user);
    const {userAdminRoles} = useSelector(user);
    const [avatarValue, setAvatarValue] = useState("");

    useEffect(() => {
        dispatch(getAdminUserRoles({}))
    }, []);

    const onSubmit = async (values) => {
        console.log("on Submit ", values)

    };
    const handleCancel = () => {
        dispatch(setUserModalState({ modalOpen: false, mode: '' }));
    };

    const formik = useFormik({
        initialValues: {
            id: '',
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
        validationSchema: generateValidationSchema(form.mode),
        onSubmit: onSubmit,
    });
    useEffect(() => {
        if (form.mode === 'edit') {
            formik.setValues(form.userObj);
        }
    }, [form.mode, form.userObj]);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAvatarValue(file)
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
                            value={form.mode === 'edit' ? formik.values.role || form.userObj.role : formik.values.role}
                        />
                    </div>
                    <div className={"col-12 "}>
                        <CustomInput label="Avatar" name="avatar" type="file" value={formik.values.avatar}
                                     onChange={handleFileChange}/>
                    </div>
                </form>
                {/*<div className={"row d-flex justify-content-center justify-content-md-end modal-footer"}>*/}
                {/*       <Button className="cancel-btn btn col-12 col-md-3 d-flex justify-content-center align-items-center" htmlType="submit" type="submit" onClick={handleCancel}>Cancel*/}
                {/*       </Button>*/}
                {/*       <Button className="submit-btn btn col-12 col-md-3 d-flex justify-content-center align-items-center" htmlType="submit" type="submit" onClick={formik.handleSubmit}>Submit*/}
                {/*       </Button>*/}
                {/*</div>*/}

            </Modal>
        </>
    );
};
export default UsersModal;
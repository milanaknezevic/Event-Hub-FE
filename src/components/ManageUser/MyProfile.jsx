import {Form, Formik} from "formik";
import {updateUserSchema} from "../../schemas/index.jsx";
import CustomInput from "../FormComponents/CustomInput.jsx";
import CustomButton from "../FormComponents/CustomButton.jsx";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../../redux/selectors.jsx";
import defImg from "../../assets/noImage.png";
import {Tooltip} from "antd";
import {FaEdit} from "react-icons/fa";
import {useEffect, useRef, useState} from "react";
import CustomUpload from "../FormComponents/CustomUpload.jsx";
import {updateUser, uploadAvatar} from "../../redux/auth.jsx";

const MyProfile = () => {
    const dispatch = useDispatch()
    const formikRef = useRef();
    const {loggedUser} = useSelector(auth);
    const [avatarValue, setAvatarValue] = useState("");
    const [images, setImages] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        const updatedValues = {
            ...loggedUser,
        };
        if (loggedUser?.avatar) {
            const img = new URL(`../../assets/users/${loggedUser?.avatar}.png`, import.meta.url).href
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
        let res = await dispatch(updateUser({data: updatedValues}));
        if (res && avatarValue && !res.error) {
            await dispatch(uploadAvatar({formData, uid}));
        }

        setIsDisabled(true) //da ;o otsaviti ili ne ovo???
    };

    const handleEdit = async () => {
        setIsDisabled(false)
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

    return (
        <div className="container-fluid flex-grow-1 d-flex align-items-center  flex-column justify-content-center">
            <div className="row justify-content-center align-items-center my-profile">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="rounded-circle avatarImg"
                             src={loggedUser?.avatar ? new URL(`../../assets/users/${loggedUser?.avatar}.png`, import.meta.url).href : defImg}
                             alt="a"/>
                        <span className="font-weight-bold">{loggedUser?.name} {loggedUser?.lastname}</span>
                        <span className="text-black-50">{loggedUser?.email}</span><span>
                    </span>
                    </div>
                </div>
                <div className="col-md-4 mb-3 border-right">
                    {isDisabled && (<div className={"col-12 d-flex justify-content-end"}>
                        <Tooltip placement={"top"} title={"Edit user"}>
                            <FaEdit
                                // className={'accept-icon'}
                                onClick={() => handleEdit()}
                            />
                        </Tooltip>

                    </div>)}

                    <Formik
                        innerRef={formikRef}
                        initialValues={{
                            name: "",
                            lastname: "",
                            email: "",
                            username: "",
                            phoneNumber: "",
                            avatar: ""
                        }}
                        validationSchema={updateUserSchema}
                        onSubmit={onSubmit}
                    >
                        {({handleSubmit}) => (
                            <Form onSubmit={handleSubmit} className={"row"}>
                                <div className={"col-12"}>
                                    <CustomInput label="Name"
                                                 name="name"
                                                 type="text"
                                                 disabled={isDisabled}
                                    />
                                </div>

                                <div className={"col-12"}>
                                    <CustomInput label="Lastname"
                                                 name="lastname"
                                                 type="text"
                                                 disabled={isDisabled}
                                    />
                                </div>
                                <div className={"col-12"}>
                                    <CustomInput label="Username"
                                                 name="username"
                                                 type="text"
                                                 disabled={isDisabled}
                                    />
                                </div>

                                <div className={"col-12"}>
                                    <CustomInput label="Email"
                                                 name="email"
                                                 type="email"
                                                 disabled={isDisabled}
                                    />
                                </div>
                                <div className={"col-12"}>
                                    <CustomInput label="Phone number"
                                                 name="phoneNumber"
                                                 type="text"
                                                 disabled={isDisabled}
                                    />
                                </div>
                                {
                                    isDisabled ? null : (
                                        <div className="col-12">
                                            <CustomUpload
                                                name="avatar"
                                                fileList={images}
                                                handleChangeImage={handleChangeImage}
                                                maxCount={1}
                                                buttonText="Upload Avatar"
                                            />
                                        </div>
                                    )
                                }
                                {
                                    isDisabled ? null : (
                                        <div className={"col-12 d-flex justify-content-center pb-3"}>

                                            <CustomButton className={"save-btn btn col-12 col-md-6"}
                                                          htmlType="submit"
                                                          type="submit"
                                                          text={"Save"}/>
                                        </div>
                                    )
                                }


                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;

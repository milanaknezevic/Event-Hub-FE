import defImg from "../../assets/noImage.png";
import {useSelector} from "react-redux";
import {auth} from "../../redux/selectors.jsx";
import {useRef} from "react";
import {commentSchema} from "../../schemas/index.jsx";
import {Form, Formik} from "formik";
import CustomTextArea from "../FormComponents/CustomTextArea.jsx";
import {Button} from "antd";

const CommentSection = ({comment, setIsReply, onSubmit}) => {

    const formikRef = useRef();
    const {loggedUser} = useSelector(auth);

    const handleCancel = () => {
        formikRef.current?.resetForm(formikRef.current?.initialValues)
        setIsReply(false);
    }
    return (
        <div className="bg-light p-2">
            <div className="d-flex flex-row">
                <img
                    className="rounded-circle shadow-1-strong me-3"
                    src={loggedUser?.avatar ? new URL(`../../assets/users/${loggedUser?.avatar}.png`, import.meta.url).href : defImg}
                    alt="avatar"
                    width="50"
                    height="50"
                />
                <Formik
                    innerRef={formikRef}
                    initialValues={{
                        answer: comment?.answer ? comment?.answer : "",
                    }}
                    validationSchema={commentSchema}
                    onSubmit={onSubmit}
                >
                    {({handleSubmit}) => (
                        <Form onSubmit={handleSubmit} className="w-100">
                            <div className="col-12">
                                <CustomTextArea
                                    name="answer"
                                    rows={2}
                                    disabled={!!comment?.answer}
                                />
                            </div>
                            {!comment?.answer && (
                                <div className="row m-2 gap-2 d-flex justify-content-end">
                                    <Button
                                        className="cancel-btn col-12 col-md-3 d-flex justify-content-center align-items-center"
                                        onClick={handleCancel}
                                        type="button"
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        className="submit-btn col-12 col-md-3 d-flex justify-content-center align-items-center"
                                        htmlType="submit"
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>)}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default CommentSection;

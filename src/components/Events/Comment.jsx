import defImg from "../../assets/noImage.png";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../../redux/selectors.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReply} from "@fortawesome/free-solid-svg-icons";
import {useRef, useState} from "react";
import dayjs from "dayjs";
import {commentSchema} from "../../schemas/index.jsx";
import {Form, Formik} from "formik";
import CustomTextArea from "../FormComponents/CustomTextArea.jsx";
import {Button} from "antd";
import {addCommentOnEvent} from "../../redux/events.jsx";

const Comment = ({comment}) => {


    const formikRef = useRef();
    const {loggedUser} = useSelector(auth);
    const [isReply, setIsReply] = useState(false);
    const dispatch=useDispatch()

    const toggleReply = () => {
        setIsReply(!isReply);
    };
    const onSubmit = async (values) => {
        const commentData = {
            answer:values?.answer,
            event_id: comment?.event_id,
        };
       dispatch(addCommentOnEvent({id:comment?.id, data: commentData }));
    };

    const handleCancel = () => {
        formikRef.current?.resetForm(formikRef.current?.initialValues)
        setIsReply(false);
    }
    return (
        <div className="container mt-5 comment-container">
            <div className="d-flex justify-content-center row">
                <div className="col-md-12">
                    <div className="d-flex flex-column comment-section">
                        <div className="bg-white p-2">
                            <div className="d-flex flex-row user-info">
                                <img
                                    className="rounded-circle shadow-1-strong me-3"
                                    src={comment?.userComments?.avatar ? new URL(`../../assets/users/${loggedUser?.avatar}.png`, import.meta.url).href : defImg}
                                    alt="avatar"
                                    width="50"
                                    height="50"
                                />
                                <div className="d-flex flex-column justify-content-start ml-2">
                                    <span
                                        className="d-block font-weight-bold name">{comment?.userComments?.name} {comment?.userComments?.lastname}</span>
                                    <span
                                        className="date text-black-50">{dayjs(comment?.creationDate).format('DD.MM.YYYY. HH:mm')}</span>
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="comment-text">{comment?.question}</p>
                            </div>
                        </div>
                        <div className="bg-white mb-2">
                            <div className="row w-100">

                                <a className="link-muted d-flex align-items-end justify-content-end"
                                   onClick={toggleReply}>
                                    <FontAwesomeIcon icon={faReply} className="me-1"
                                                     style={{transform: isReply ? "rotate(120deg)" : "rotate(-50deg)"}}/>
                                    {isReply ? "Hide" : "Reply"}
                                </a>
                            </div>
                        </div>
                        {isReply && (
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
                                                            Post comment
                                                        </Button>
                                                    </div>)}
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;

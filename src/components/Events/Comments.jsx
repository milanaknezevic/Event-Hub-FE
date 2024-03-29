import defImg from "../../assets/noImage.png";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../../redux/selectors.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReply} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import dayjs from "dayjs";
import {replyOnComment} from "../../redux/events.jsx";
import CommentSection from "./CommentSection.jsx";

const Comments = ({comment}) => {


    const {loggedUser} = useSelector(auth);
    const [isReply, setIsReply] = useState(false);
    const dispatch = useDispatch()

    const toggleReply = () => {
        setIsReply(!isReply);
    };
    const onSubmit = async (values) => {
        const commentData = {
            answer: values?.answer,
            event_id: comment?.event_id,
        };
        dispatch(replyOnComment({id: comment?.id, data: commentData}));
    };


    return (
        <div className="container mt-5 comment-container">
            <div className="d-flex justify-content-center row">
                <div className="col-md-12">
                    <div className="d-flex flex-column comment-section">
                        <div className="bg-white p-2 mb-2">
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

                        {loggedUser?.role === 0 &&
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
                        }

                        {((loggedUser?.role === 2 && comment?.answer) || isReply) &&
                            <CommentSection comment={comment} setIsReply={setIsReply} onSubmit={onSubmit}/>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comments;

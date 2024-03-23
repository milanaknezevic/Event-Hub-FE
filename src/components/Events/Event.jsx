import {useParams} from "react-router-dom";
import {Button, Carousel, Flex, Layout} from "antd";
import {replyOnComment, getEventById, setEventModalState, addComment} from "../../redux/events.jsx";
import {useDispatch, useSelector} from "react-redux";
import AddEventModal from "./AddEventModal.jsx";
import {auth, event} from "../../redux/selectors.jsx";
import {useEffect, useRef} from "react";
import CustomButton from "../FormComponents/CustomButton.jsx";
import defImg from "../../assets/noImage.png"
import {FaClock} from "react-icons/fa";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import Comments from "./Comments.jsx";
import CommentSection from "./CommentSection.jsx";
import {Form, Formik} from "formik";
import {commentSchema, leaveCommentSchema} from "../../schemas/index.jsx";
import CustomTextArea from "../FormComponents/CustomTextArea.jsx";

const {Header, Sider, Content} = Layout;

const Event = () => {
    const formikRef = useRef();
    const {form} = useSelector(event)
    const {loggedUser} = useSelector(auth);
    const {id} = useParams();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getEventById(id))
    }, []);
    const handleEditEvent = () => {
        dispatch(getEventById(id))
        dispatch(setEventModalState({modalOpen: true, mode: 'edit'}));
    };

    const onSubmit = async (values) => {
        const commentData = {
            question: values?.question,
            event_id: id,
        };
        dispatch(addComment({data: commentData}));
        formikRef.current?.resetForm(formikRef.current?.initialValues)
    };
    const handleCancel = () => {
        formikRef.current?.resetForm(formikRef.current?.initialValues)
    }

    return (
        <Flex className={"flex-grow-1 event-container"}>
            <Layout>
                <Layout>
                    <Header>
                        <div className={"row p-md-4"}>
                            <div className={"col-12 col-md-10"}>
                                <h1>{form?.eventObj?.name}</h1>
                            </div>
                            {loggedUser?.role === 0 &&
                                <div className={"col-12 col-md-2 d-flex justify-content-end align-items-center"}>
                                    <CustomButton className={"add-btn btn col-12"} onCLick={handleEditEvent}
                                                  text={"Edit event"}
                                                  htmlType="submit" type="submit"/>
                                </div>
                            }
                        </div>

                    </Header>
                    <Content>
                        <div className="row justify-content-center p-3">
                            <div className={"col-9 pt-3 pb-3 event-carousel"}>
                                <Carousel>
                                    {form?.eventObj?.eventImages?.length > 0 ? (
                                        form?.eventObj?.eventImages?.map((image, index) => (
                                            <img
                                                className={"carousel-img"}
                                                key={index}
                                                alt="example"
                                                src={new URL(`../../assets/events/${image?.image}.png`, import.meta.url).href}
                                            />
                                        ))
                                    ) : (
                                        <img
                                            className="carousel-img"
                                            alt="default example"
                                            src={defImg}
                                        />
                                    )}
                                </Carousel>
                            </div>
                            <div className={"col-9 mt-3 event-card"}>
                                <h2>Description</h2>
                                <hr/>
                                <br/>
                                <p>{form?.eventObj?.description}</p>
                                <br/>
                                <br/>
                                <h2>Details</h2>
                                <hr/>
                                <br/>
                                <div className={"row justify-content-between"}>
                                    <div className={"my-2 m-md-2 details col-12 col-md-3"}>
                                        <FaClock style={{marginRight: "5px"}}/>
                                        {`Start time: ${form?.eventObj?.startTime}`}
                                    </div>
                                    <div className={"my-2 m-md-2 details col-12 col-md-3"}>
                                        <FaClock style={{marginRight: "5px"}}/>
                                        {`End time: ${form?.eventObj?.endTime}`}
                                    </div>

                                    <div className={"my-2 m-md-2 details col-12 col-md-3"}>
                                        <FontAwesomeIcon style={{marginRight: "5px"}} icon={faMapMarkerAlt}/>
                                        {`Location: ${form?.eventObj?.Location?.name}`}
                                    </div>
                                    <div className={"my-2 m-md-2 details col-12 col-md-3"}>
                                        {`Type: ${form?.eventObj?.EventType?.name}`}
                                    </div>
                                </div>
                            </div>

                            <div className={"col-9 mt-3 event-card comment-container"}>
                                <h2>Comments</h2>
                                <hr/>
                                <br/>
                                {loggedUser?.role === 2  &&
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
                                                    question: "",
                                                }}
                                                validationSchema={leaveCommentSchema}
                                                onSubmit={onSubmit}
                                            >
                                                {({handleSubmit}) => (
                                                    <Form onSubmit={handleSubmit} className="w-100">
                                                        <div className="col-12">
                                                            <CustomTextArea
                                                                name="question"
                                                                rows={2}
                                                                disabled={false}
                                                            />
                                                        </div>

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
                                                            </div>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>
                                    </div>
                                }
                                <hr/>
                                {form?.eventObj?.eventComments && form.eventObj.eventComments.length > 0 ? (
                                    form.eventObj.eventComments.map((comment, index) => (
                                        <Comments key={index} comment={comment}/>
                                    ))
                                ) : (
                                    <p>No comments available.</p>
                                )}
                            </div>

                        </div>
                    </Content>
                </Layout>
            </Layout>
            <AddEventModal eventId={id}/>
        </Flex>
    );
};

export default Event;

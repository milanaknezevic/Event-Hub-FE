import {useParams} from "react-router-dom";
import {Carousel, Flex, Layout} from "antd";
import {getEventById, setEventModalState} from "../../redux/events.jsx";
import {useDispatch, useSelector} from "react-redux";
import AddEventModal from "./AddEventModal.jsx";
import {event} from "../../redux/selectors.jsx";
import {useEffect} from "react";
import CustomButton from "../FormComponents/CustomButton.jsx";
import defImg from "../../assets/noImage.png"
import {FaClock} from "react-icons/fa";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";

const {Header, Sider, Content} = Layout;

const Event = () => {
    const {form} = useSelector(event)
    const {id} = useParams();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getEventById(id))
    }, []);
    const handleEditEvent = () => {
        dispatch(getEventById(id))
        dispatch(setEventModalState({modalOpen: true, mode: 'edit'}));
    };
    return (
        <Flex className={"flex-grow-1 event-container"}>
            <Layout>
                <Sider breakpoint="lg" width='25%' collapsedWidth="0">
                    aaaa
                </Sider>
                <Layout>
                    <Header>
                        <div className={"row p-md-4"}>
                            <div className={"col-12 col-md-10"}>
                                <h1>{form?.eventObj?.name}</h1>
                            </div>
                            <div className={"col-12 col-md-2 d-flex justify-content-end align-items-center"}>
                                <CustomButton className={"add-btn btn col-12"} onCLick={handleEditEvent}
                                              text={"Edit event"}
                                              htmlType="submit" type="submit"/>
                            </div>
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
                                <h2>Description</h2>
                                <hr/>
                                <br/>
                                <div className={"row justify-content-between"}>
                                    <div className={"m-2 details"}>
                                        <FaClock style={{marginRight: "5px"}}/>
                                        {`Start time: ${form?.eventObj?.startTime}`}
                                    </div>
                                    <div className={"m-2 details"}>
                                        <FaClock style={{marginRight: "5px"}}/>
                                        {`End time: ${form?.eventObj?.endTime}`}
                                    </div>

                                    <div className={"m-2 details"}>
                                        <FontAwesomeIcon style={{marginRight: "5px"}} icon={faMapMarkerAlt}/>
                                        {`Location: ${form?.eventObj?.Location?.name}`}
                                    </div>
                                    <div className={"m-2 details"}>
                                        {/*<FontAwesomeIcon style={{marginRight: "5px"}} icon={faTag}/>*/}
                                        {`Type: ${form?.eventObj?.EventType?.name}`}
                                    </div>
                                </div>
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

import {useParams} from "react-router-dom";
import {Button, Carousel} from "antd";
import {getEventById, setEventModalState} from "../../redux/events.jsx";
import {useDispatch, useSelector} from "react-redux";
import AddEventModal from "./AddEventModal.jsx";
import {event} from "../../redux/selectors.jsx";
import {useEffect} from "react";

const Event = () => {
    const {form} = useSelector(event)
    const {id} = useParams();
    const dispatch = useDispatch()
    useEffect(() => {
        console.log("use effect")
        dispatch(getEventById(id))
    }, []);
    const handleEditEvent = () => {
        dispatch(getEventById(id))
        dispatch(setEventModalState({modalOpen: true, mode: 'edit'}));
    };
    return (
        <div className={"flex-grow-1 container-fluid event-container"}>
            <div className="row justify-content-center align-items-center">
                <div className={"col-11"}>
                    <div className={"row"}>
                        <div className="col-12 d-flex justify-content-start">
                            <h1>EVENT {id} - Naziv_događaja</h1>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className="col-12 d-flex justify-content-end pt-2 pt-md-0">
                            <Button onClick={handleEditEvent}
                                    className="add-btn btn col-12 col-md-3 d-flex justify-content-center align-items-center"
                                    htmlType="submit" type="submit">Edit event
                            </Button>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-12 p-3"}>

                            <Carousel>
                                {form?.eventObj?.eventImages?.map((image, index) => {
                                    return (
                                        <img
                                            className="carousel-img"
                                            key={index}
                                            alt="example"
                                            src={new URL(`../../assets/events/${image?.image}.png`, import.meta.url).href}
                                        />
                                    );
                                })}
                            </Carousel>
                        </div>

                    </div>
                </div>


            </div>
            <AddEventModal eventId={id}/>
        </div>
    );
};

export default Event;

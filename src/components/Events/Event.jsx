import {useParams} from "react-router-dom";
import {Button} from "antd";
import {setEventModalState} from "../../redux/events.jsx";
import {useDispatch} from "react-redux";

const Event = () => {
    const {id} = useParams();
    const dispatch = useDispatch()
    const handleEditEvent = () => {
        dispatch(setEventModalState({modalOpen: true, mode: 'edit'}));
    };
    return (
        <div className={"flex-grow-1 event-container"}>
            EVENT {id}

            <Button onClick={handleEditEvent}
                    className="add-btn btn col-12 col-md-5 d-flex justify-content-center align-items-center"
                    htmlType="submit" type="submit">Edit event
            </Button>
        </div>
    );
};

export default Event;

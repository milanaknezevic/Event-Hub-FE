import {Modal} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {event} from "../../redux/selectors.jsx";
import {setEventModalState} from "../../redux/events.jsx";

const DeleteEventModal = ({handleOk}) => {
    const dispatch = useDispatch()
    const {form} = useSelector(event)

    const handleCancel = () => {
        dispatch(setEventModalState({modalOpen: false, mode: ''}));
    };

    return (
        <>
            <Modal className={"user-modal"} size={"lg"} title={'Delete event'}
                   open={form.modalOpen && form.mode === 'delete'}
                   onOk={handleOk} onCancel={handleCancel}>
                <div>
                    Are you sure you want to delete event?
                </div>
            </Modal>
        </>
    );
};
export default DeleteEventModal;
import {Modal} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {event} from "../../redux/selectors.jsx";
import {setEventModalState} from "../../redux/events.jsx";

const EventActionModal = ({handleOk}) => {
    const dispatch = useDispatch()
    const {form} = useSelector(event)

    const handleCancel = () => {
        dispatch(setEventModalState({modalOpen: false, mode: ''}));
    };

    return (
        <>
            <Modal className={"user-modal"} size={"lg"}
                   title={form.mode === "delete" ? 'Delete event' : 'Send invitation'}
                   open={form.modalOpen && (form.mode === 'delete' || form.mode === 'sendInvitation')}
                   onOk={handleOk} onCancel={handleCancel}>
                {form.mode === 'delete' ? (<div>

                    Are you sure you want to delete event?
                </div>) : (<div>Are you sure you want to send the invitation?</div>)
                }
            </Modal>
        </>
    );
};
export default EventActionModal;
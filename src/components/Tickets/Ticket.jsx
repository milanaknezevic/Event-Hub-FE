import {Input, Modal, Tooltip} from 'antd';
import CustomInput from "../FormComponents/CustomInput.jsx";
import {useDispatch, useSelector} from "react-redux";
import {ticket} from "../../redux/selectors.jsx";
import {setTicketModalState} from "../../redux/tickets.jsx";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserCheck} from '@fortawesome/free-solid-svg-icons'
import {useEffect, useState} from "react";

const {TextArea} = Input;

const Ticket = () => {
    const {form} = useSelector(ticket);
    const dispatch = useDispatch()
    const handleCancel = () => {
        dispatch(setTicketModalState({modalOpen: false}));

    };
    const handleSubmit = () => {
        console.log("submit")
    };
    const [iconClicked, setIconClicked] = useState(false);

    const handleIconClick = () => {
        setIconClicked(true);
    }
    useEffect(() => {
        if(iconClicked)
        {
            console.log("kliknuta je ")
        }
    }, [iconClicked]);
    return (
        <>
            <Modal className={"ticket-modal"} size={"lg"} title={`Ticket #${form.ticketObj.id}`} open={form.modalOpen}
                   onOk={handleSubmit} onCancel={handleCancel}>
                <div className={"col-12 d-flex justify-content-end"}>
                    <Tooltip placement={"top"} title={iconClicked ? "Assigned to me" : "Assign to me"}>
                        <FontAwesomeIcon
                            icon={faUserCheck}
                            onClick={handleIconClick}
                            className={iconClicked ? 'clicked' : ''}
                        />
                    </Tooltip>
                </div>

                {/*Creation Date: {new Date(form.ticketObj.creationDate).toLocaleString()}*/}
                <div className={"row"}>
                    <div className={"col-12"}>
                        Question:
                    </div>
                    <div className={"col-12"}>
                        <TextArea value={form.ticketObj?.question} rows={4} maxLength={6} disabled/>
                    </div>
                    <div className={"col-12 d-flex justify-content-end username"}>
                        User: {form.ticketObj?.createdTicket?.username}
                    </div>

                </div>
                <br/>
                <div className={"row"}>
                    <div className={"col-6"}>
                        <CustomInput
                            label="Priority"
                            name="priority"
                            type="text"
                            value={form.ticketObj?.priority}
                            disabled={true}
                        />
                    </div>
                    <div className={"col-6"}>
                        <CustomInput
                            label="Status"
                            name="status"
                            type="text"
                            value={iconClicked? "In progress":form.ticketObj?.status}
                            disabled={true}
                        />
                    </div>
                </div>
                <form className={"row justify-content-center register"}>
                    <div className={"col-12"}>
                        Question:
                    </div>
                    <div className={"col-12"}>
                        <TextArea rows={4} maxLength={6}/>
                    </div>
                </form>
            </Modal>
        </>
    );
};
export default Ticket;
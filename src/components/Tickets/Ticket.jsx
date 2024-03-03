import {Modal, Tooltip} from 'antd';
import CustomInput from "../FormComponents/CustomInput.jsx";
import {useDispatch, useSelector} from "react-redux";
import {ticket} from "../../redux/selectors.jsx";
import {assignToTicket, replyToTicket, setTicketModalState} from "../../redux/tickets.jsx";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserCheck} from '@fortawesome/free-solid-svg-icons'
import {useFormik} from "formik";
import {replyToTicketSchema} from "../../schemas/index.jsx";
import CustomTextArea from "../FormComponents/CustomTextArea.jsx";
import {useEffect} from "react";


const Ticket = () => {
    const {pagination, filters} = useSelector(ticket);
    const {form} = useSelector(ticket);
    const dispatch = useDispatch()

    const handleIconClick = () => {
        dispatch(assignToTicket({id: form.ticketObj.id, pagination: pagination, filters: filters}));
    }

    const onSubmit = (value) => {
        console.log("pozvace se ?")
        if (value !== "") {
            dispatch(replyToTicket({id: form.ticketObj.id, data: value, pagination: pagination, filters: filters}));
        }
        formik.resetForm(formik.initialValues)
    };


    const formik = useFormik({
        initialValues: {
            answer: '',
        },
        validationSchema: form.ticketObj.status !== "IN_PROGRESS" ? "" : replyToTicketSchema,
        onSubmit: onSubmit,
    });
    const handleCancel = () => {
        dispatch(setTicketModalState({modalOpen: false}));
        formik.resetForm(formik.initialValues)

    };
    useEffect(() => {


        const updatedValues = {
            ...form.ticketObj,

        };

        formik.setValues(updatedValues);


    }, [form.ticketObj]);
    return (
        <>
            <Modal className={"ticket-modal register"} size={"lg"} title={`Ticket #${form.ticketObj.id}`}
                   open={form.modalOpen}
                   onOk={formik.handleSubmit}
                   onCancel={handleCancel}
                   okButtonProps={{disabled: form.ticketObj.status !== "IN_PROGRESS"}}
            >
                <div className={"col-12 d-flex justify-content-end"}>
                    <Tooltip placement={"top"}
                             title={form.ticketObj.status !== "OPENED" ? "Assigned to me" : "Assign to me"}>
                        <FontAwesomeIcon
                            icon={faUserCheck}
                            onClick={form.ticketObj.status === "OPENED" ? handleIconClick : null}
                            className={form.ticketObj.status !== "OPENED" ? 'clicked' : ''}
                        />
                    </Tooltip>
                </div>

                {/*Creation Date: {new Date(form.ticketObj.creationDate).toLocaleString()}*/}
                <div className={"row"}>
                    <div className={"col-12"}>
                        <CustomTextArea label="Question" name="question" value={form.ticketObj?.question} rows={4}
                                        disabled={true}/>
                    </div>
                    <div className={"col-12 d-flex justify-content-end username"}>
                        User: {form.ticketObj?.createdTicket?.username}
                    </div>

                </div>
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
                            value={form.ticketObj?.status}
                            disabled={true}
                        />
                    </div>
                </div>
                <form className={"row justify-content-center"}>
                    <div className={"col-12"}>
                        <CustomTextArea
                            label="Answer"
                            name="answer"
                            errorMessage={
                                formik.errors.answer && formik.touched.answer
                                    ? formik.errors.answer
                                    : ""
                            }
                            rows={4}
                            disabled={form.ticketObj.status !== "IN_PROGRESS"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={form.ticketObj.status === "CLOSED" ? form.ticketObj.answer : undefined}
                        />
                    </div>
                </form>
            </Modal>
        </>
    );
};
export default Ticket;
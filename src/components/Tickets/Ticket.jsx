import {Modal, Tooltip} from 'antd';
import CustomInput from "../FormComponents/CustomInput.jsx";
import {useDispatch, useSelector} from "react-redux";
import {auth, ticket} from "../../redux/selectors.jsx";
import {assignToTicket, replyToTicket, setTicketModalState} from "../../redux/tickets.jsx";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserCheck} from '@fortawesome/free-solid-svg-icons'
import {Form, Formik} from "formik";
import {replyToTicketSchema} from "../../schemas/index.jsx";
import CustomTextArea from "../FormComponents/CustomTextArea.jsx";
import {useEffect, useRef} from "react";
import CustomButton from "../FormComponents/CustomButton.jsx";


const Ticket = () => {
    const formikRef = useRef();
    const {pagination, filters} = useSelector(ticket);
    const {form} = useSelector(ticket);
    const dispatch = useDispatch()
    const {loggedUser} = useSelector(auth);
    const handleIconClick = () => {
        dispatch(assignToTicket({
            id: form.ticketObj.id,
            pagination: pagination,
            filters: filters,
            role: loggedUser?.role
        }));
    }

    const onSubmit = (value) => {
        if (value !== "") {
            dispatch(replyToTicket({id: form.ticketObj.id, data: value, pagination: pagination, filters: filters,role:loggedUser?.role}));
        }
        formikRef.current?.resetForm(formikRef.current?.initialValues)
    };


    // const formik = useFormik({
    //     initialValues: {
    //         answer: '',
    //         priority: form.ticketObj?.priority,
    //         status: form.ticketObj?.status
    //     },
    //     validationSchema: form.ticketObj.status !== "IN_PROGRESS" ? "" : replyToTicketSchema,
    //     onSubmit: onSubmit,
    // });
    const handleCancel = () => {
        dispatch(setTicketModalState({modalOpen: false, mode: "", ticketObj: {}}));
        formikRef.current?.resetForm(formikRef.current?.initialValues)

    };
    useEffect(() => {
        const updatedValues = {
            ...form.ticketObj,

        };
        formikRef.current?.setValues(updatedValues);
    }, [form.ticketObj]);

    const handleClose = () => {
        dispatch(setTicketModalState({modalOpen: false, mode: "", ticketObj: {}}));
        formikRef.current?.resetForm(formikRef.current?.initialValues)

    };
    return (
        <>
            <Modal className={"ticket-modal register"} size={"lg"} title={`Ticket #${form.ticketObj.id}`}
                   open={form.modalOpen && form.mode === 'edit'}
                   onOk={formikRef.current?.handleSubmit}
                   onCancel={handleCancel}
                   okButtonProps={{disabled: form.ticketObj.status !== "IN_PROGRESS"}}
                   footer={loggedUser?.role !== 1 ? (
                       <>
                           <div className="modal-footer event-container">
                               <CustomButton className={"add-btn btn col-12 col-md-5"} onCLick={handleClose}
                                             text={"Close"}
                                             htmlType="submit" type="submit"/>
                           </div>
                       </>
                   ) : undefined}
            >
                {
                    loggedUser?.role === 1 &&
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
                }
                <Formik
                    innerRef={formikRef}
                    initialValues={{
                        answer: '',
                        priority: form.ticketObj?.priority,
                        status: form.ticketObj?.status,
                        question: form.ticketObj?.question,
                    }}
                    validationSchema={form.ticketObj.status !== "IN_PROGRESS" ? "" : replyToTicketSchema}
                    onSubmit={onSubmit}
                >
                    {({handleSubmit}) => (
                        <Form onSubmit={handleSubmit} className={"row"}>
                            <div className={"col-12"}>
                                <CustomTextArea
                                    label="Question" name="question" rows={4} disabled={true}
                                />

                            </div>
                            {loggedUser?.role === 1 && <div className={"col-12 d-flex justify-content-end username"}>
                                User: {form.ticketObj?.createdTicket?.username}
                            </div>
                            }
                            <div className={"col-6"}>
                                <CustomInput label="Priority"
                                             name="priority"
                                             type="text"
                                             disabled={true}
                                />
                            </div>
                            <div className={"col-6"}>
                                <CustomInput label="Status"
                                             name="status"
                                             type="text"
                                             disabled={true}
                                />
                            </div>

                            <div className={"col-12"}>
                                <CustomTextArea
                                    label="Answer"
                                    name="answer"
                                    rows={4}
                                    disabled={form.ticketObj.status !== "IN_PROGRESS"}
                                />
                            </div>

                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    );
};
export default Ticket;
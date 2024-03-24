import {Modal} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {auth, ticket} from "../../redux/selectors.jsx";
import {createTicket, getTicketPriority, setTicketModalState} from "../../redux/tickets.jsx";
import {Form, Formik} from "formik";
import CustomTextArea from "../FormComponents/CustomTextArea.jsx";
import {useEffect, useRef} from "react";
import CustomSelect from "../FormComponents/CustomSelect.jsx";
import {createTicketSchema} from "../../schemas/index.jsx";

const TicketModal = () => {
    const dispatch = useDispatch();
    const formikRef = useRef();
    const {pagination, filters, form, ticketPriority} = useSelector(ticket);
    const {loggedUser} = useSelector(auth);

    useEffect(() => {
        dispatch(getTicketPriority({}))
    }, [])

    const onSubmit = (values) => {
        dispatch(createTicket({data: values, pagination: pagination, filters: filters, role: loggedUser?.role}))
        formikRef.current?.resetForm(formikRef.current?.initialValues)

    };

    const handleCancel = () => {
        dispatch(setTicketModalState({modalOpen: false, mode: '', ticketObj: {}}));
        formikRef.current?.resetForm(formikRef.current?.initialValues)

    };

    return (
        <Modal className={"user-modal"} size={"lg"} title={'Create ticket'}
               open={form.modalOpen && form.mode === 'open'}
               onOk={() => formikRef.current?.submitForm()} onCancel={handleCancel}>
            <Formik
                innerRef={formikRef}
                initialValues={{
                    question: "",
                    priority: "",
                }}
                validationSchema={createTicketSchema}
                onSubmit={onSubmit}
            >
                {({handleSubmit}) => (
                    <Form onSubmit={handleSubmit} className={"row"}>
                        <div className={"col-12"}>
                            <CustomTextArea
                                label="Question"
                                name="question"
                                rows={4}
                            />
                        </div>
                        <CustomSelect
                            label="Priority"
                            name="priority"
                            options={ticketPriority}
                        />

                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default TicketModal;

import CustomInput from "../FormComponents/CustomInput.jsx";
import {Form} from "antd";
import CustomSelect from "../FormComponents/CustomSelect.jsx";
import {useSelector} from "react-redux";
import {event} from "../../redux/selectors.jsx";
import {Formik} from "formik";
import CustomDatePicker from "../FormComponents/CustomDatePicker.jsx";
import dayjs from "dayjs";
import CustomButton from "../FormComponents/CustomButton.jsx";
import {useEffect} from "react";
import {addGeneralEvent} from "../../schemas/index.jsx";
import CustomTextArea from "../FormComponents/CustomTextArea.jsx";

const FirstStepForm = ({handleSubmit, formikRef, values}) => {
    const {eventTypes, locations} = useSelector(event)
    useEffect(() => {

        if (formikRef?.current) {
            formikRef?.current?.setValues(values);
        }
    }, [values]);

    return (
        <Formik
            innerRef={formikRef}
            initialValues={{
                name: '',
                description: '',
                startTime: '',
                endTime: '',
                eventType_id: '',
                location_id: ''
            }}
            validationSchema={addGeneralEvent}
            onSubmit={(values) => {
                handleSubmit(values)
            }}
        >
            {({handleSubmit, values, setFieldValue}) => (
                <Form onSubmit={handleSubmit} className={"row"}>
                    <div className={"col-12 col-md-6"}>
                        <CustomInput
                            label="Name"
                            name="name"
                            type="text"
                        />
                    </div>
                    <div className={"col-12 col-md-6"}>
                        <CustomTextArea
                            label="Description"
                            name="description"
                            rows={2}
                        />
                        {/*<CustomInput*/}
                        {/*    label="Description"*/}
                        {/*    name="description"*/}
                        {/*    type="text"*/}
                        {/*/>*/}
                    </div>

                    <div className={"col-12 col-md-6"}>
                        <CustomDatePicker
                            label="Start time"
                            name="startTime"
                            value={values.startTime ? dayjs(values.startTime, 'DD.MM.YYYY. HH:mm') : null}
                            showTime={true}
                            onChange={(fieldName, value) => {
                                setFieldValue("startTime", value)
                            }}
                        />
                    </div>
                    <div className={"col-12 col-md-6"}>
                        <CustomDatePicker
                            label="End time"
                            name="endTime"
                            value={values.endTime ? dayjs(values.endTime, 'DD.MM.YYYY. HH:mm') : null}
                            disableDate={values.startTime ? dayjs(values.startTime, 'DD.MM.YYYY. HH:mm') : null}
                            showTime={true}
                            onChange={(fieldName, value) => {
                                setFieldValue("endTime", value)
                            }}
                        />
                    </div>

                    <div className={"col-12 col-md-6"}>
                        <CustomSelect
                            label="Event type"
                            name="eventType_id"
                            options={eventTypes}
                        />
                    </div>
                    <div className={"col-12 col-md-6"}>
                        <CustomSelect
                            label="Location"
                            name="location_id"
                            options={locations}
                        />
                    </div>
                    <div className={"col-12 pt-3 d-flex justify-content-md-end "}>
                        <CustomButton className={"event-btn btn col-12 col-md-4"} onCLick={handleSubmit}
                                      text={"Continue"}
                                      type="submit"/>

                        {/*<Button*/}
                        {/*    className="event-btn btn col-12 col-md-4 d-flex justify-content-center align-items-center"*/}
                        {/*    type="submit" onClick={handleSubmit}>Continue*/}
                        {/*</Button>*/}
                    </div>
                </Form>
            )}
        </Formik>

    );
};


export default FirstStepForm;
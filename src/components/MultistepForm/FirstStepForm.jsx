import CustomInput from "../FormComponents/CustomInput.jsx";
import {Button} from "antd";
import CustomDatePicker from "../FormComponents/CustomDatePicker.jsx";
import CustomSelect from "../FormComponents/CustomSelect.jsx";
import {useSelector} from "react-redux";
import {event} from "../../redux/selectors.jsx";
import PropTypes from 'prop-types';

const FirstStepForm = ({formik}) => {
    const {eventTypes, locations} = useSelector(event)


    return (
        <form className={"row justify-content-center login"}>
            <div className={"col-12 col-md-6"}>
                <CustomInput
                    label="Name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    errorMessage={
                        formik.errors.name && formik.touched.name
                            ? formik.errors.name
                            : ""
                    }
                />
            </div>
            <div className={"col-12 col-md-6"}>
                <CustomInput
                    label="Description"
                    name="description"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    errorMessage={
                        formik.errors.description && formik.touched.description
                            ? formik.errors.description
                            : ""
                    }
                />
            </div>
            <div className={"col-12 col-md-6"}>
                <CustomDatePicker
                    label="Start time"
                    name="startTime"
                    onChange={(fieldName, value) =>
                        formik.setFieldValue("startTime", value)}
                    errorMessage={
                        formik.errors.startTime && formik.touched.startTime
                            ? formik.errors.startTime
                            : ""
                    }
                />
            </div>
            <div className={"col-12 col-md-6"}>
                <CustomDatePicker
                    label="End time"
                    name="endTime"
                    onChange={(fieldName, value) =>
                        formik.setFieldValue("endTime", value)}
                    errorMessage={
                        formik.errors.endTime && formik.touched.endTime
                            ? formik.errors.endTime
                            : ""
                    }
                />
            </div>
            <div className={"col-12 col-md-6"}>
                <CustomSelect
                    label="Event type"
                    name="eventType_id"
                    options={eventTypes}
                    onChange={(fieldName, value) => formik.setFieldValue(fieldName, value)}
                    errorMessage={formik.errors.eventType_id && formik.touched.eventType_id ? formik.errors.eventType_id : ""}
                    value={formik.values.eventType_id}
                />
            </div>
            <div className={"col-12 col-md-6"}>
                <CustomSelect
                    label="Location"
                    name="location_id"
                    options={locations}
                    onChange={(fieldName, value) => formik.setFieldValue(fieldName, value)}
                    errorMessage={formik.errors.location_id && formik.touched.location_id ? formik.errors.location_id : ""}
                    value={formik.values.location_id}
                />
            </div>
            <div className={"col-12 d-flex justify-content-md-end "}>
                <Button
                    className="event-btn btn col-12 col-md-4 d-flex justify-content-center align-items-center"
                    type="submit" onClick={formik.handleSubmit}>Continue
                </Button>
            </div>
        </form>

    );
};
FirstStepForm.propTypes = {
    handleNextPage: PropTypes.func.isRequired,
    formik: PropTypes.object.isRequired,
};

export default FirstStepForm;
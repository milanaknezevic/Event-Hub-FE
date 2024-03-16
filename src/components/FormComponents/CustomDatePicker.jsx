import { DatePicker } from "antd";
import dayjs from "dayjs";
import { ErrorMessage, Field } from "formik";

const CustomDatePicker = ({ label, name, onChange, showTime, value, disableDate = null }) => {
    const dateFormat = 'DD.MM.YYYY';
    const timeFormat = 'HH:mm';
    const dateTimeFormat = `${dateFormat} ${timeFormat}`;

    const tomorrow = dayjs().add(1, 'day').startOf('day');
    const disabledDate = current => {
        if (disableDate) {
            return current && dayjs(current).isBefore(disableDate, 'day');
        }
        return current && dayjs(current).isBefore(tomorrow, 'day');
    };

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <Field name={name}>
                {({ field }) => (
                    <DatePicker
                        name={name}
                        value={value}
                        onChange={onChange}
                        format={dateTimeFormat}
                        disabledDate={disabledDate}
                        showTime={showTime}
                    />
                )}
            </Field>
            <ErrorMessage name={name} component="div" className="error" />
        </div>
    );
};

export default CustomDatePicker;

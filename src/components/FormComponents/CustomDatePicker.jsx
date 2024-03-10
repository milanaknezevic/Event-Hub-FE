import {DatePicker, Form} from "antd";
import dayjs from "dayjs";
import PropTypes from 'prop-types';

const CustomDatePicker = ({label, name, onChange, errorMessage, showTime, value, disableDate = null}) => {
    const dateFormat = 'DD.MM.YYYY.';
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
        <Form.Item
            label={label}
            validateStatus={errorMessage ? "error" : ""}
            help={errorMessage}
        >
            <DatePicker
                name={name}
                defaultValue={value}
                onChange={onChange}
                format={dateTimeFormat}
                disabledDate={disabledDate}
                showTime={showTime}
            />
        </Form.Item>
    );
};

CustomDatePicker.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    showTime: PropTypes.bool.isRequired,
    value: PropTypes.object,
    disableDate: PropTypes.object
};

export default CustomDatePicker;

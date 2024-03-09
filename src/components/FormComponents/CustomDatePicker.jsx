import { DatePicker, Form } from "antd";
import dayjs from "dayjs";

const CustomDatePicker = ({ label,name, onChange, errorMessage }) => {
    const dateFormat = 'DD.MM.YYYY.';
    const disabledDate = current => {
        return current && dayjs(current).isBefore(dayjs(), 'day');
    };

    return (
        <Form.Item
            label={label}
            validateStatus={errorMessage ? "error" : ""}
            help={errorMessage}
        >
            <DatePicker name={name} onChange={onChange} format={dateFormat} disabledDate={disabledDate} />
        </Form.Item>
    );
};

export default CustomDatePicker;

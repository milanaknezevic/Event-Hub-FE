import { Form, Input } from "antd";

const { TextArea } = Input;

const CustomTextArea = ({ label, name, errorMessage, ...rest }) => {
    return (
        <Form.Item
            label={label}
            validateStatus={errorMessage ? "error" : ""}
            help={errorMessage}
        >
            <TextArea name={name} {...rest} />
        </Form.Item>
    );
};

export default CustomTextArea;

import {Form, Input} from "antd";

const CustomInput = ({label, name, type, onChange, value, errorMessage}) => {
    const inputComponent = type === "password" ? (
        <Input.Password
            id={name}
            name={name}
            onChange={onChange}
            value={value}
        />
    ) : (
        <Input
            id={name}
            name={name}
            type={type}
            onChange={onChange}
            value={value}
        />
    );

    return (
        <Form.Item
            label={label}
            validateStatus={errorMessage ? "error" : ""}
            help={errorMessage}
        >
            {inputComponent}
        </Form.Item>
    );
};

export default CustomInput;

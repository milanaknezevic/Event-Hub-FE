import React from "react";
import { Form, Select } from "antd";

const CustomSelect = ({ label, name, options, onChange, errorMessage, value="" }) => {
    return (
        <Form.Item label={label} validateStatus={errorMessage ? 'error' : ''} help={errorMessage}>
            <Select
                id={name}
                name={name}
                onChange={(value) => onChange(name, value)}
                value={options.find(option => option.id === value)?.name || ''}
            >
                {options?.map((option) => (
                    <Select.Option key={option.id} value={option.id}>
                        {option.name}
                    </Select.Option>
                ))}
            </Select>
        </Form.Item>
    );
};

export default CustomSelect;

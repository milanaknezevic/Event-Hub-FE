import {Form, Select} from "antd";


const CustomSelect = ({label, name, type, onChange, value, errorMessage, options}) => {

    return (

        <Form.Item
            label={label}>

            <Select
                id={name}
                name={name}
                type={type}
                defaultValue="Milana"
            >
                {options.map(option => (
                    <Select.Option key={option.id} value={option.id}>
                        {option.name}
                    </Select.Option>
                ))}
            </Select>
        </Form.Item>


    );
};

export default CustomSelect;

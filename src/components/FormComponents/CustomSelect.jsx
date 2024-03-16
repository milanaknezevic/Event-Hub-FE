import { Field, ErrorMessage } from "formik";
import { Select } from "antd";

const CustomSelect = ({ label, name, options }) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <Field name={name}>
                {({ field, form }) => (
                    <Select
                        {...field}
                        onChange={(value) => form.setFieldValue(name, value)}
                        onBlur={() => form.setFieldTouched(name, true)}
                    >
                        {options.map((option) => (
                            <Select.Option key={option.id} value={option.id}>
                                {option.name}
                            </Select.Option>
                        ))}
                    </Select>
                )}
            </Field>
            <ErrorMessage name={name} component="div" className="error" />
        </div>
    );
};

export default CustomSelect;

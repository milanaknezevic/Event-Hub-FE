import { Field, ErrorMessage } from 'formik';
import { Input } from 'antd';

const { TextArea } = Input;

const CustomTextArea = ({ label, name, ...rest }) => {
    return (
        <div className="form-item">
            <label htmlFor={name}>{label}</label>
            <Field
                as={TextArea}
                id={name}
                name={name}
                {...rest}
            />
            <ErrorMessage name={name} component="div" className="error" />
        </div>
    );
};

export default CustomTextArea;

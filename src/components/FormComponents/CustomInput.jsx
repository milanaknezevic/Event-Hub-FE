import {ErrorMessage, Field} from "formik";
import { Input } from "antd";
const CustomInput = ({ disabled=false,label, type, ...props }) => (
    <div className="form-group">
        <label htmlFor={props.name}>{label}</label>
        {type === "password" ? (
            <Field name={props.name}>
                {({ field }) => (
                    <Input.Password {...field} id={props.name}  disabled={disabled}/>
                    )}
            </Field>
        ) : (
            <Field name={props.name}>
                {({ field }) => (
                    <Input {...field} id={props.name}  disabled={disabled}/>
                )}
            </Field>
        )}
        <ErrorMessage name={props.name} component="div" className="error" />
    </div>
);

export default CustomInput;
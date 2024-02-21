import { ErrorMessage, Field } from "formik";
import { Input } from "antd";


const CustomInput = ({ label, name, errors, touched, type = "text", ...rest }) => {
    const isPasswordField = type === "password";
    return (
        <div className={"row p-2 d-flex justify-content-center"}>
            <label htmlFor={name}>{label}:</label>
            <Field
                name={name}
                render={({ field }) => (
                    <>
                        {isPasswordField ? (
                            <Input.Password
                                {...field}
                                {...rest}
                                className={errors[name] && touched[name] ? "input-error" : "stil"}
                            />
                        ) : (
                            <Input
                                {...field}
                                {...rest}
                                className={errors[name] && touched[name] ? "input-error" : "stil"}
                            />
                        )}
                    </>
                )}
            />
            <ErrorMessage name={name} component="div" className="error" />
        </div>
    );
};

export default CustomInput;

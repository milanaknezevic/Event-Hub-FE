import {ErrorMessage, Field} from "formik";
import {Select} from "antd";


const CustomSelect = ({label, name, options, errors, touched, ...rest}) => {
    const handleCategoryChange = (categoryId) => {
        console.log("id kategorije " + categoryId)
        // if (categoryId !== null) {
        //     dispatch(getCategory({id: categoryId}));
        // }
    };

    return (
        <div className={"row p-2 d-flex justify-content-center"}>
            <label htmlFor={name}>{label}:</label>
            <Field
                name={name}>
                {({field, form}) => (
                    <Select className={"p-0"} onChange={handleCategoryChange}
                            defaultValue="Milana"
                    >
                        {options.map(option => (
                            <Select.Option key={option.id} value={option.id}>
                                {option.name}
                            </Select.Option>
                        ))}
                    </Select>
                )}
            </Field>
            <ErrorMessage name={name} component="div" className="error"/>
        </div>
    );
};

export default CustomSelect;

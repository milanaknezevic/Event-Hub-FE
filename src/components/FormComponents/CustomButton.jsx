import {Button} from "antd";

const CustomButton = ({onCLick, text, className, htmlType, type}) => {


    return (
        <Button
            className={` ${className} d-flex justify-content-center align-items-center`}
            type={type} onClick={onCLick} htmlType={htmlType}>{text}
        </Button>
    );
};

export default CustomButton;

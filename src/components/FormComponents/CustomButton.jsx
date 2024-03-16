import {Button} from "antd";

const CustomButton = ({onCLick, text}) => {


    return (
        <Button
            className="custom_button btn col-12 col-md-4 d-flex justify-content-center align-items-center"
            type="submit" onClick={onCLick}>{text}
        </Button>
    );
};

export default CustomButton;

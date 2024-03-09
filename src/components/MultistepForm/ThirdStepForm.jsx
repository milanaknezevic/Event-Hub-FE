import {Button} from "antd";
import {uploadAvatar} from "../../redux/auth.jsx";
import {addUser, editUser} from "../../redux/user.jsx";

const ThirdStepForm = ({onSubmit}) => {


    return (
        <>
            Treci korak
            <div className={"col-12 d-flex justify-content-md-end "}>
                <Button
                    className="event-btn btn col-12 col-md-4 d-flex justify-content-center align-items-center"
                    type="submit" onClick={onSubmit}>Potvrdi
                </Button>
            </div>
        </>
    );
};

export default ThirdStepForm;
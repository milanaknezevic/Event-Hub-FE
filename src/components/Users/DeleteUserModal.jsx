import {Modal} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {user} from "../../redux/selectors.jsx";
import {setUserModalState} from "../../redux/user.jsx";

const DeleteUserModal = () => {
    const dispatch = useDispatch()
    const {form} = useSelector(user);


    const handleOk = async (values) => {
        console.log("on Submit ", values)

    };
    const handleCancel = () => {
        dispatch(setUserModalState({modalOpen: false, mode: ''}));
    };

    return (
        <>
            <Modal className={"user-modal"} size={"lg"} title={'Delete user'}
                   open={form.modalOpen && form.mode === 'delete'}
                   onOk={handleOk} onCancel={handleCancel}>
                <div>
                    Are you sure you want to delete user?
                </div>

            </Modal>
        </>
    );
};
export default DeleteUserModal;
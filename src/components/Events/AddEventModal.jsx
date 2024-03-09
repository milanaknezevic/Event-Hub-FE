import {Modal, Steps} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {event} from "../../redux/selectors.jsx";
import {setEventModalState} from "../../redux/events.jsx";
import {useState} from "react";
import FirstStepForm from "../MultistepForm/FirstStepForm.jsx";
import SecondStepForm from "../MultistepForm/SecondStepForm.jsx";
import {useFormik} from "formik";
import ThirdStepForm from "../MultistepForm/ThirdStepForm.jsx";
import {uploadAvatar} from "../../redux/auth.jsx";

const AddEventModal = () => {
    const dispatch = useDispatch()
    const {form} = useSelector(event)
    const [currentPage, setCurrentPage] = useState(0);
    const [images, setImages] = useState([]);
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    const handleImagesChange = (newImages) => {
        setImages(newImages);
    };
    const handleCancel = () => {
        dispatch(setEventModalState({modalOpen: false, mode: ''}));
    };

    const formik1 = useFormik({
        initialValues: {
            name: '',
            description: '',
            startTime: '',
            endTime: '',
            eventType_id: '',
            location_id: ''
        },
        //validationSchema: addGeneralEvent,
        onSubmit: () => handleNextPage(),
    });
    console.log("slike ", images)
    const onSubmit = async () => {
       if(images)
       {
           const formData = new FormData();
           images.forEach((image, index) => {
               console.log("image ", image)
               console.log("index ", index)
               formData.append(`image${index}`, image.originFileObj);
           });
       }
    };
    const forms = [
        <FirstStepForm key="firstStep" handleNextPage={handleNextPage} formik={formik1}/>,
        <SecondStepForm key="secondStep" handleNextPage={handleNextPage} images={images}
                        handleSubmit={formik1.handleSubmit} onImagesChange={handleImagesChange}/>,
        <ThirdStepForm key="thirdStep" handleNextPage={handleNextPage} onSubmit={onSubmit}/>,
    ];

    // console.log("!formik1.dirty ", !formik1.dirty)
    // console.log("!formik1.isValid ", !formik1.isValid)
    return (
        <>
            <Modal maskClosable={false} size={"large"} className={"event-form-container"}
                   title={<div style={{textAlign: 'center', fontSize: '20px'}}>Add new product</div>} footer={[]}
                   open={form.modalOpen && form.mode === 'create'} onCancel={handleCancel}>
                <Steps onChange={setCurrentPage} current={currentPage}>
                    <Steps.Step title='General'></Steps.Step>
                    <Steps.Step title='Images'></Steps.Step>
                    {/*disabled={!formik1.dirty || !formik1.isValid}*/}
                    <Steps.Step title='Invitations'></Steps.Step>
                    <Steps.Step title='Final'></Steps.Step>
                </Steps>
                {forms[currentPage]}
            </Modal>
        </>
    );
};
export default AddEventModal;

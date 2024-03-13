import {Modal, Steps} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {event} from "../../redux/selectors.jsx";
import {
    addEvent,
    getEventLocations,
    getEventTypes,
    setEventModalState,
    uploadEventImages
} from "../../redux/events.jsx";
import {useEffect, useState} from "react";
import FirstStepForm from "../MultistepForm/FirstStepForm.jsx";
import SecondStepForm from "../MultistepForm/SecondStepForm.jsx";
import {useFormik} from "formik";
import ThirdStepForm from "../MultistepForm/ThirdStepForm.jsx";
import {addGeneralEvent} from "../../schemas/index.jsx";

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
        formik1.resetForm(formik1.initialValues)
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
        validationSchema: addGeneralEvent,
        onSubmit: () => handleNextPage(),
    });
    useEffect(() => {
        dispatch(getEventTypes({}))
        dispatch(getEventLocations({}))
        if (form.mode === 'edit') {
            const {EventType,Location,creator_id,eventComments,eventImages,status, ...rest } = form?.eventObj;
            const updatedValues = {
                ...rest,
                eventType_id: form?.eventObj?.EventType?.id,
                location_id: form?.eventObj?.EventType?.id,
            };

            formik1.setValues(updatedValues)
            if (form?.eventObj?.eventImages) {

                const imagesWithUid = form.eventObj.eventImages.map((image, index) => {
                const img = new URL(`../../assets/events/${form?.eventObj?.eventImages[index].image}.png`, import.meta.url).href
                    const imageNameWithoutExtension = image.image.replace('.png', '');
                    return {
                        uid: `${imageNameWithoutExtension}`,
                        name: `${image.image}`,
                        status: 'done',
                        url: img
                    };
                });

                setImages(imagesWithUid);
            }
        }
        if (form.mode === 'create') {
            formik1.resetForm(formik1.initialValues);
            setImages([])
        }
    }, [form.mode, form.eventObj]);
    const onSubmit = async (invitations) => {

        let data = formik1.values;
        let formData;
        let eventImagesName = [];
        if (images) {
            formData = new FormData();
            images.forEach((image, index) => {
                formData.append("images", image.originFileObj);
                formData.append(`uids[${index}]`, image.uid);
                eventImagesName[index] = image.uid;
            });
        }

        data = {
            ...data,
            eventImagesName: eventImagesName,
            invitations
        };

        const res = await dispatch(addEvent(data));

        if (res && images && !res.error) {
            await dispatch(uploadEventImages(formData));
        }
    };
    const forms = [
        <FirstStepForm key="firstStep" formik={formik1}/>,
        <SecondStepForm key="secondStep" images={images} handleSubmit={formik1.handleSubmit}
                        onImagesChange={handleImagesChange}/>,
        <ThirdStepForm key="thirdStep" onSubmit={onSubmit}/>,
    ];


    return (
        <>
            <Modal maskClosable={false} size={"large"} className={"event-form-container"}
                   title={form.mode === "create" ? 'Add new event' : 'Edit event'} footer={[]}
                   open={form.modalOpen && (form.mode === 'create' || form.mode === 'edit')} onCancel={handleCancel}>
                <Steps onChange={setCurrentPage} current={currentPage}>
                    <Steps.Step title='General'></Steps.Step>
                    <Steps.Step disabled={!formik1.dirty || !formik1.isValid} title='Images'></Steps.Step>
                    <Steps.Step disabled={!formik1.dirty || !formik1.isValid} title='Invitations'></Steps.Step>
                </Steps>
                {forms[currentPage]}
            </Modal>
        </>
    );
};
export default AddEventModal;

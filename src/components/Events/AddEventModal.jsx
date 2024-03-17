import {Modal, Steps} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {event} from "../../redux/selectors.jsx";
import {
    addEvent,
    editEvent,
    getEventById,
    getEventLocations,
    getEventTypes,
    setEventModalState,
    uploadEventImages
} from "../../redux/events.jsx";
import {useEffect, useRef, useState} from "react";
import FirstStepForm from "../MultistepForm/FirstStepForm.jsx";
import SecondStepForm from "../MultistepForm/SecondStepForm.jsx";
import ThirdStepForm from "../MultistepForm/ThirdStepForm.jsx";

const AddEventModal = ({eventId}) => {
    const formikRef = useRef();
    const dispatch = useDispatch()
    const {pagination, form, filters} = useSelector(event);
    const [currentPage, setCurrentPage] = useState(0);
    const [images, setImages] = useState([]);
    const [invitations, setInvitations] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [values, setValues] = useState([{
        name: '',
        description: '',
        startTime: '',
        endTime: '',
        eventType_id: '',
        location_id: ''
    }]);
    const [newAdded, setNewAdded] = useState([]);
    const [removedInvitations, setRemovedInvitations] = useState([]);
    const handleNextPageFirst = (values) => {
        if (values) {
            // formikRef.current = formikRefData;
            setValues(values)
        }

        setCurrentPage(currentPage + 1);
    };


    const handleNextPage = () => {

        setCurrentPage(currentPage + 1);
    };
    const handleImagesChange = ({file, fileList}) => {
        if (form.mode === 'edit') {
            if (file.status === 'removed') {
                if (!newImages.some(value => value.uid === file.uid)) {
                    setRemovedImages(prevNewImages => [...prevNewImages, file]);
                }
            } else {
                setNewImages(prevNewImages => [...prevNewImages, file]);
            }
        }
        setImages(fileList);
    };
    const handleCancel = () => {
        dispatch(setEventModalState({modalOpen: false, mode: ''}));
        if (form.mode === 'edit') {
            dispatch(getEventById(eventId))
        }
        formikRef.current?.resetForm(formikRef.current?.initialValues)
    };

    // const formik1 = useFormik({
    //     initialValues: {
    //         name: '',
    //         description: '',
    //         startTime: '',
    //         endTime: '',
    //         eventType_id: '',
    //         location_id: ''
    //     },
    //     validationSchema: addGeneralEvent,
    //     onSubmit: () => handleNextPage(),
    // });
    useEffect(() => {
        dispatch(getEventTypes({}))
        dispatch(getEventLocations({}))
        if (form.mode === 'edit') {
            const {EventType, Location, creator_id, eventComments, eventImages, status, ...rest} = form?.eventObj;
            const updatedValues = {
                ...rest,
                eventType_id: form?.eventObj?.EventType?.id,
                location_id: form?.eventObj?.EventType?.id,
            };
            setValues(updatedValues)
            // formikRef.current?.setValues(updatedValues)
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
            if (form?.eventObj?.attendingUsers) {
                setInvitations(form?.eventObj?.attendingUsers)
            }
        }
        if (form.mode === 'create') {
            formikRef.current?.resetForm(formikRef.current?.initialValues);
            setImages([])
        }
    }, [form.mode, form.eventObj]);
    const onSubmit = async () => {
        // let data = formikRef.current?.values;
        let data = values
        let formData;
        let eventImagesName = [];

        if (form.mode === 'edit') {
            let addedImages = images.filter(value => newImages.some(value2 => value.uid === value2.uid))
            let addedInvitations = invitations.filter(value => newAdded.some(value2 => value.id === value2.id))
            if (addedImages) {
                formData = new FormData();
                addedImages.forEach((image, index) => {
                    formData.append("images", image.originFileObj);
                    formData.append(`uids[${index}]`, image.uid);
                    eventImagesName[index] = image.uid;
                });
            }
            data = {
                ...data,
                addedImages: eventImagesName,
                removedImages: removedImages,
                addedInvitations: addedInvitations,
                removedInvitations: removedInvitations,
            };

            const res = await dispatch(editEvent(data));
            if (res && addedImages && !res.error) {
                await dispatch(uploadEventImages(formData));
            }
        }

        if (form.mode === 'create') {
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

            const res = await dispatch(addEvent({data: data, pagination: pagination, filters: filters}));

            if (res && images && !res.error) {
                await dispatch(uploadEventImages(formData));
            }
        }
    };
    const forms = [
        <FirstStepForm key="firstStep" handleSubmit={handleNextPageFirst} formikRef={formikRef} values={values}/>,
        <SecondStepForm key="secondStep" images={images} handleSubmit={handleNextPage} formikRef={formikRef}
                        onImagesChange={handleImagesChange}/>,
        <ThirdStepForm key="thirdStep" onSubmit={onSubmit} invitations={invitations} setInvitations={setInvitations}
                       newAdded={newAdded} setNewAdded={setNewAdded} removedInvitations={removedInvitations}
                       setRemovedInvitations={setRemovedInvitations}/>,
    ];


    return (
        <>
            <Modal size={"large"} className={"form-container"}
                   title={form.mode === "create" ? 'Add new event' : 'Edit event'} footer={[]}
                   open={form.modalOpen && (form.mode === 'create' || form.mode === 'edit')} onCancel={handleCancel}>
                <Steps onChange={setCurrentPage} current={currentPage} className={"pb-3"}>
                    <Steps.Step title='General'></Steps.Step>
                    <Steps.Step
                        disabled={!formikRef?.current?.dirty || !formikRef?.current?.isValid}
                        title='Images'></Steps.Step>
                    <Steps.Step
                        disabled={!formikRef?.current?.dirty || !formikRef?.current?.isValid}
                        title='Invitations'></Steps.Step>
                </Steps>
                {forms[currentPage]}
            </Modal>
        </>
    );
};
export default AddEventModal;

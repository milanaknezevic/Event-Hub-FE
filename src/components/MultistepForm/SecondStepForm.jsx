import {useState} from 'react';
import {Modal} from 'antd';
import CustomUpload from "../FormComponents/CustomUpload.jsx";
import CustomButton from "../FormComponents/CustomButton.jsx";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const SecondStepForm = ({onImagesChange, handleSubmit, images,formikRef}) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({file, fileList}) => {
        onImagesChange({file, fileList});
    };

    return (
        <>
            <CustomUpload
                name={"eventImages"}
                fileList={images}
                handleChangeImage={handleChange}
                onPreview={handlePreview}
                maxCount={10}
                buttonText={"Upload"}
            />
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    className={"w-100"}
                    src={previewImage}
                />
            </Modal>
            <div className={"col-12 d-flex justify-content-md-end "}>
                {/*<CustomButton onCLick={handleSubmit} text={"Continue"}/>*/}
                <CustomButton className={"event-btn btn col-12 col-md-4"} onCLick={handleSubmit}
                              text={"Continue"}
                              type="submit"/>

                {/*<Button*/}
                {/*    className="event-btn pt-3 btn col-12 col-md-4 d-flex justify-content-center align-items-center"*/}
                {/*    type="submit" onClick={handleSubmit}>Continue*/}
                {/*</Button>*/}
            </div>
        </>
    );
};

export default SecondStepForm;
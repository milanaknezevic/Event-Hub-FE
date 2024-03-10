import {useState} from 'react';
import {Button, Modal} from 'antd';
import PropTypes from 'prop-types';
import CustomUpload from "../FormComponents/CustomUpload.jsx";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const SecondStepForm = ({onImagesChange, handleSubmit, images}) => {
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

    const handleChange = ({fileList: newFileList}) => {
        onImagesChange(newFileList);
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
                <Button
                    className="event-btn btn col-12 col-md-4 d-flex justify-content-center align-items-center"
                    type="submit" onClick={handleSubmit}>Continue
                </Button>
            </div>
        </>
    );
};
SecondStepForm.propTypes = {
    onImagesChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default SecondStepForm;
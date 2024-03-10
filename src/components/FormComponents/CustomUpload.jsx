import {Upload} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import PropTypes from 'prop-types';

const CustomUpload = ({name, fileList, handleChangeImage, maxCount, buttonText = "Upload", onPreview}) => {
    return (
        <Upload
            name={name}
            className="m-2 custom-upload"
            beforeUpload={() => false}
            listType="picture-card"
            fileList={fileList}
            onChange={handleChangeImage}
            maxCount={maxCount}
            onPreview={onPreview ? onPreview : undefined}
        >
            <button type="button">
                <PlusOutlined/>
                <div>
                    {buttonText}
                </div>
            </button>
        </Upload>
    );
};

CustomUpload.propTypes = {
    name: PropTypes.string.isRequired,
    fileList: PropTypes.array.isRequired,
    handleChangeImage: PropTypes.func.isRequired,
    maxCount: PropTypes.number.isRequired,
    buttonText: PropTypes.string,
    onPreview: PropTypes.func
};

export default CustomUpload;

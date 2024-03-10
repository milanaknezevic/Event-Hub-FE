import {Upload} from "antd";
import {PlusOutlined} from "@ant-design/icons";

const CustomUpload = ({name, fileList, handleChangeImage, maxCount, buttonText = "Upload"}) => {
    return (
        <Upload
            name={name}
            className={"m-2"}
            beforeUpload={() => false}
            listType="picture-card"
            fileList={fileList}
            onChange={handleChangeImage}
            maxCount={maxCount}
        >
            <button
                style={{
                    border: 0,
                    background: 'none',
                }}
                type="button"
            >
                <PlusOutlined/>
                <div
                    style={{
                        marginTop: 8,
                    }}
                >
                    {buttonText}
                </div>
            </button>
        </Upload>
    );
};

export default CustomUpload;

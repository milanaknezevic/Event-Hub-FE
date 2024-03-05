import {Button, Input, Tree} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {useState} from "react";
import {useSelector} from "react-redux";
import {event} from "../../redux/selectors.jsx";
const {Search} = Input;

const CustomSidebar = ({collapsed,onSearch,setCollapsed,eventTypes,locations,handleSelect,selectedKeys}) => {
    const {filters} = useSelector(event);
    const treeData = [
        {
            title: 'Event types',
            key: 'event',
            children: eventTypes.map((eventType) => ({
                title: eventType.name,
                key: "eventTypeId"+"#"+eventType.id,
            })),
        },
        {
            title: 'Locations',
            key: 'loc',
            children: locations.map((location) => ({
                title: location.address,
                key: "locationId"+"#"+location.id,
            })),
        },
    ];

    const [expandedKeys, setExpandedKeys] = useState([]);


    const onExpand = (newExpandedKeys) => {
        setExpandedKeys(newExpandedKeys);
    };
    return (
        <div>
            <div className={"row justify-content-end px-4"}>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                />
            </div>
            {collapsed? <></>:<div className={"row justify-content-center"}>
                <div className={"col-11  search-container"}>
                    <Search
                        placeholder="Search..."
                        allowClear
                        onSearch={onSearch}
                    />
                </div>
                <div className={"col-11 pt-4"}>
                    <Tree
                        className="draggable-tree"
                        onExpand={onExpand}
                        expandedKeys={expandedKeys}
                        onSelect={handleSelect}
                        selectedKeys={selectedKeys}
                        treeData={treeData}
                    />
                </div>
            </div>}

        </div>
    );
};

export default CustomSidebar;

import {Button, Input, Tree} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {useState} from "react";
import {useSelector} from "react-redux";
import {event} from "../../redux/selectors.jsx";
import CustomTree from "./CustomTree.jsx";

const {Search} = Input;

const CustomSidebar = ({collapsed, onSearch, setCollapsed, eventTypes, locations, handleSelectEvent, selectedKeysEvents,handleSelectLocation,selectedKeysLocation}) => {

    const eventTypesData = [
        {
            title:<b>Event types</b>,
            key: 'event',
            selectable: false,
            children: eventTypes.map((eventType) => ({
                title: eventType.name,
                key:eventType.id,
            })),
        },
    ];
    const locationsData = [
        {
            title: <b>Locations</b>,
            key: 'location',
            selectable: false,
            children: locations.map((location) => ({
                title: location.address,
                key:location.id,
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
                    icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    onClick={() => setCollapsed(!collapsed)}
                />
            </div>
            {collapsed ? <></> : <div className={"row justify-content-center"}>
                <div className={"col-11  search-container"}>
                    <Search
                        placeholder="Search..."
                        allowClear
                        onSearch={onSearch}
                    />
                </div>
                <div className={"col-11 pt-4"}>
                    <CustomTree onExpand={onExpand} expandedKeys={expandedKeys} handleSelect={handleSelectEvent}
                                selectedKeys={selectedKeysEvents} treeData={eventTypesData}/>

                    <CustomTree onExpand={onExpand} expandedKeys={expandedKeys} handleSelect={handleSelectLocation}
                                selectedKeys={selectedKeysLocation} treeData={locationsData}/>
                </div>
            </div>}

        </div>
    );
};

export default CustomSidebar;

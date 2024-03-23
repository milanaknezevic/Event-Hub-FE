import {Button, Input} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {useState} from "react";
import CustomTree from "./CustomTree.jsx";

const {Search} = Input;

const CustomSidebar = ({
                           collapsed,
                           onSearch,
                           setCollapsed,
                           eventTypes,
                           locations,
                           handleSelectEvent,
                           selectedKeysEvents,
                           handleSelectLocation,
                           selectedKeysLocation,
                           selectedKeysStatus,
                           handleSelectStatus
                       }) => {

    const eventTypesData = [
        {
            title: <b>Event types</b>,
            key: 'event',
            selectable: false,
            children: eventTypes.map((eventType) => ({
                title: eventType.name,
                key: eventType.id,
            })),
        },
    ];
    const locationsData = [
        {
            title: <b>Locations</b>,
            key: 'location',
            selectable: false,
            children: locations.map((location) => ({
                title: location.name,
                key: location.id,
            })),
        },
    ];
    const statusData = [
        {
            title: <b>Events status</b>,
            key: 'status',
            selectable: false,
            children: [
                {
                    title: 'Upcoming',
                    key: 2,
                },
                {
                    title: 'In progress',
                    key: 1,
                },
                {
                    title: 'Finished',
                    key: 0,
                },
            ],
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

                    <CustomTree onExpand={onExpand} expandedKeys={expandedKeys} handleSelect={handleSelectStatus}
                                selectedKeys={selectedKeysStatus} treeData={statusData}/>
                </div>
            </div>}

        </div>
    );
};

export default CustomSidebar;

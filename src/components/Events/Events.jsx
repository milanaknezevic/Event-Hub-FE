import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {event} from "../../redux/selectors.jsx";
import {getAllEvents, getEventLocations, getEventTypes} from "../../redux/events.jsx";
import {Button, Card, Flex, Layout, Pagination, Tooltip} from 'antd';
import def from "../../assets/noImage.png"
import {FaEdit, FaEye, FaTrash} from 'react-icons/fa';
import CustomSidebar from "../FormComponents/CustomSidebar.jsx";
import {getAllUsers} from "../../redux/user.jsx";

const {Header, Footer, Sider, Content} = Layout;


const {Meta} = Card;
const Events = () => {
    const dispatch = useDispatch()
    const {events, eventTypes, locations, pagination, filters} = useSelector(event);
    const [collapsed, setCollapsed] = useState(true);
    const [selectedKeys, setSelectedKeys] = useState([]);
    useEffect(() => {
        dispatch(getAllEvents({page: pagination.current, size: pagination.pageSize}))
        dispatch(getEventTypes({}))
        dispatch(getEventLocations({}))
    }, [])
    const handleChange = (page, pageSize) => {
        dispatch(getAllEvents({page: page, size: pageSize, search: filters.search}))
    };
    const handleAddEvent = () => {
        console.log("add")
    };
    const onSearch = (value) => {
        dispatch(getAllEvents({page: pagination.current, size: pagination.pageSize, search: value}))
    }
    const handleSelect = (selectedKeys) => {
        setSelectedKeys(selectedKeys);
        const [name, id] = selectedKeys[0].split('#');
        if (name === 'locationId') {
            dispatch(getAllEvents({page: pagination.current, size: pagination.pageSize, search: filters.search, locationId:id,eventTypeId:filters.selectedEvent}))
        }else if (name === 'eventTypeId'){
            dispatch(getAllEvents({page: pagination.current, size: pagination.pageSize, search: filters.search, locationId:filters.selectedLocation,eventTypeId:id}))

        }
    };
    const handleWatchEvent = (eventId) => {
        console.log("Watching event with ID:", eventId);
    };

    const handleEditEvent = (eventId) => {
        console.log("Editing event with ID:", eventId);
    };

    const handleDeleteEvent = (eventId) => {
        console.log("Deleting event with ID:", eventId);
    };


    return (
        <Flex className={"flex-grow-1 event-container"}>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={50}>
                    <CustomSidebar collapsed={collapsed} setCollapsed={setCollapsed} onSearch={onSearch}
                                   eventTypes={eventTypes} locations={locations} handleSelect={handleSelect} selectedKeys={selectedKeys}/>
                </Sider>
                <Layout>
                    <Header>
                        <div className={"row p-md-4"}>
                            <div className={"col-12 col-md-6"}>
                                <h1>Events</h1>
                            </div>
                            <div className={"col-12 col-md-6 d-flex justify-content-end align-items-center"}>
                                <Button onClick={handleAddEvent}
                                        className="add-btn btn col-12 col-md-5 d-flex justify-content-center align-items-center"
                                        htmlType="submit" type="submit">Add event
                                </Button>
                            </div>
                        </div>

                    </Header>
                    <Content>
                        <div className="row justify-content-center justify-content-md-start p-2">
                            {events.map(event => (
                                <div key={event.id} className=" col-12 col-md-3 col-xl-2 pt-2">
                                    <Card
                                        cover={<img className={"cover_img"} alt="example"
                                                    src={event.eventImages.length > 0 ? event.eventImages[0].image : def}/>}
                                        actions={[
                                            <Tooltip key="watch" placement="top" title="Watch">
                                                <FaEye className="cursor-button"
                                                       onClick={() => handleWatchEvent(event.id)}/>
                                            </Tooltip>,
                                            <Tooltip key="edit" placement="top" title="Edit">
                                                <FaEdit className="cursor-button"
                                                        onClick={() => handleEditEvent(event.id)}/>
                                            </Tooltip>,
                                            <Tooltip key="delete" placement="top" title="Delete">
                                                <FaTrash color="red" className="cursor-button"
                                                         onClick={() => handleDeleteEvent(event.id)}/>
                                            </Tooltip>,
                                        ]}
                                    >
                                        <Meta
                                            title={event.name}
                                            description={
                                                <div>
                                                    <Tooltip placement={"top"} title={event.description}>
                                                        <div className={"event-description"}>{event.description}</div>
                                                    </Tooltip>
                                                    <div>Start: {new Date(event.startTime).toLocaleString()}</div>
                                                    <div>End: {new Date(event.endTime).toLocaleString()}</div>
                                                </div>
                                            }
                                        />
                                    </Card>
                                </div>
                            ))
                            }
                        </div>
                    </Content>
                    <Footer>
                        <div className={"row justify-content-end"}>
                            <Pagination
                                onChange={handleChange}
                                current={pagination.current}
                                pageSize={pagination.pageSize}
                                total={pagination.total}
                                showSizeChanger={true}
                                pageSizeOptions={['10', '20', '50']}
                                locale={{items_per_page: ''}}
                            />
                        </div>
                    </Footer>
                </Layout>
            </Layout>

        </Flex>
    );
};

export default Events;

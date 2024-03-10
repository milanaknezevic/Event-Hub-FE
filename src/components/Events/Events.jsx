import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {event} from "../../redux/selectors.jsx";
import {deleteEvent, getAllEvents, getEventLocations, getEventTypes, setEventModalState} from "../../redux/events.jsx";
import {Button, Card, Flex, Layout, Pagination, Tooltip} from 'antd';
import defImg from "../../assets/noImage.png"
import {FaEye, FaTrash} from 'react-icons/fa';
import CustomSidebar from "../FormComponents/CustomSidebar.jsx";
import {MailOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import DeleteEventModal from "./DeleteEventModal.jsx";
import AddEventModal from "./AddEventModal.jsx";


const {Header, Footer, Sider, Content} = Layout;


const {Meta} = Card;
const Events = () => {
    const dispatch = useDispatch()
    const {events, eventTypes, locations, pagination, filters} = useSelector(event);
    const [collapsed, setCollapsed] = useState(true);
    const initialEvent = filters.selectedEvent ? [filters.selectedEvent] : [];
    const [selectedKeysEvents, setSelectedKeysEvents] = useState(initialEvent);

    const initialLocation = filters.selectedLocation ? [filters.selectedLocation] : [];
    const [selectedKeysLocation, setSelectedKeysLocation] = useState(initialLocation);
    // const [selectedKeysEvents, setSelectedKeysEvents] = useState([]);
    // const [selectedKeysLocation, setSelectedKeysLocation] = useState([]);
    const [eventId, setEventId] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllEvents({
            page: pagination.current,
            size: pagination.pageSize,
            search: filters.search,
            locationId: filters.selectedLocation,
            eventTypeId: filters.selectedEvent
        }))
        dispatch(getEventTypes({}))
        dispatch(getEventLocations({}))
    }, [])
    const handleChange = (page, pageSize) => {
        dispatch(getAllEvents({
            page: page,
            size: pageSize,
            search: filters.search,
            locationId: filters.selectedLocation,
            eventTypeId: filters.selectedEvent
        }))
    };
    const handleAddEvent = () => {
        dispatch(setEventModalState({modalOpen: true, mode: 'create'}));
    };
    const onSearch = (value) => {
        dispatch(getAllEvents({
            page: pagination.current,
            size: pagination.pageSize,
            search: value,
            locationId: filters.selectedLocation,
            eventTypeId: filters.selectedEvent
        }))
    }
    const handleSelectEvent = (selectedKeys) => {
        setSelectedKeysEvents(selectedKeys);
        dispatch(getAllEvents({
            page: pagination.current,
            size: pagination.pageSize,
            search: filters.search,
            locationId: filters.selectedLocation,
            eventTypeId: selectedKeys[0]
        }))
    };
    const handleSelectLocation = (selectedKeys) => {
        setSelectedKeysLocation(selectedKeys);
        dispatch(getAllEvents({
            page: pagination.current,
            size: pagination.pageSize,
            search: filters.search,
            locationId: selectedKeys[0],
            eventTypeId: filters.selectedEvent
        }))

    };
    const handleWatchEvent = (eventId) => {
        console.log("Watching event with ID:", eventId);
    };

    const handleInvitations = (id) => {
        navigate(`/events/event/${id}/invitations`);
    };

    const confirmEventDelete = () => {
        dispatch(deleteEvent({id: eventId, pagination: pagination, filters: filters}));
    }
    const handleDeleteEvent = (id) => {
        setEventId(id)
        dispatch(setEventModalState({modalOpen: true, mode: 'delete'}));
    };


    return (
        <Flex className={"flex-grow-1 event-container"}>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={50}>
                    <CustomSidebar collapsed={collapsed} setCollapsed={setCollapsed} onSearch={onSearch}
                                   eventTypes={eventTypes} locations={locations}
                                   handleSelectLocation={handleSelectLocation} handleSelectEvent={handleSelectEvent}
                                   selectedKeysLocation={selectedKeysLocation} selectedKeysEvents={selectedKeysEvents}/>
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
                                <div key={event.id} className="col-12 col-md-3 col-xl-2 pt-2">
                                    <Card
                                        cover={

                                        <img alt="example" src={event?.eventImages?.length > 0 ? new URL(`../../assets/events/${event.eventImages[0].image}.png`, import.meta.url).href : defImg} />

                                    }
                                        actions={[
                                            <Tooltip key="watch" placement="top" title="Watch">
                                                <FaEye className="cursor-button" onClick={() => handleWatchEvent(event.id)} />
                                            </Tooltip>,
                                            <Tooltip key="invitations" placement="top" title="Invitations">
                                                <MailOutlined className="cursor-button" onClick={() => handleInvitations(event.id)} />
                                            </Tooltip>,
                                            <Tooltip key="delete" placement="top" title="Delete">
                                                <FaTrash color="red" className="cursor-button" onClick={() => handleDeleteEvent(event.id)} />
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
                            ))}
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
            <DeleteEventModal handleOk={confirmEventDelete}/>
            <AddEventModal/>
        </Flex>
    );
};

export default Events;

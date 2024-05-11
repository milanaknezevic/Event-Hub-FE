import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {auth, event} from "../../redux/selectors.jsx";
import {
    deleteEvent,
    getAllEvents,
    getAllEventsForCLients,
    getEventLocations,
    getEventTypes,
    setEventModalState
} from "../../redux/events.jsx";
import {Card, Flex, Layout, Pagination, Tooltip} from 'antd';
import defImg from "../../assets/noImage.png"
import {FaBell, FaEye, FaTrash} from 'react-icons/fa';
import CustomSidebar from "../FormComponents/CustomSidebar.jsx";
import {MailOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import EventActionModal from "./EventActionModal.jsx";
import AddEventModal from "./AddEventModal.jsx";
import CustomButton from "../FormComponents/CustomButton.jsx";
import {createInvitation} from "../../redux/invitation.jsx";


const {Header, Footer, Sider, Content} = Layout;


const {Meta} = Card;
const Events = ({myEvents}) => {
    const dispatch = useDispatch()
    const {loggedUser} = useSelector(auth);
    const {events, eventTypes, locations, pagination, filters, form} = useSelector(event);
    const [collapsed, setCollapsed] = useState(true);
    const initialEvent = filters.selectedEvent ? [filters.selectedEvent] : [];
    const [selectedKeysEvents, setSelectedKeysEvents] = useState(initialEvent);

    const initialLocation = filters.selectedLocation ? [filters.selectedLocation] : [];
    const [selectedKeysLocation, setSelectedKeysLocation] = useState(initialLocation);
    const [selectedKeysStatus, setSelectedKeysStatus] = useState(initialLocation);
    const [eventId, setEventId] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        if (loggedUser?.role === 2) {
            dispatch(getAllEventsForCLients({
                page: pagination.current,
                size: pagination.pageSize,
                search: filters.search,
                locationId: filters.selectedLocation,
                eventTypeId: filters.selectedEvent,
                status: filters.status,
                myEvents: myEvents
            }))
        } else if (loggedUser?.role === 0) {
            dispatch(getAllEvents({
                page: pagination.current,
                size: pagination.pageSize,
                search: filters.search,
                locationId: filters.selectedLocation,
                eventTypeId: filters.selectedEvent,
                status: filters.status
            }))
        }
        dispatch(getEventTypes({}))
        dispatch(getEventLocations({}))
    }, [myEvents])
    const handleChange = (page, pageSize) => {
        if (loggedUser?.role === 2) {
            dispatch(getAllEventsForCLients({
                page: page,
                size: pageSize,
                search: filters.search,
                locationId: filters.selectedLocation,
                eventTypeId: filters.selectedEvent,
                status: filters.status,
                myEvents: myEvents
            }))
        } else if (loggedUser?.role === 0) {
            dispatch(getAllEvents({
                page: page,
                size: pageSize,
                search: filters.search,
                locationId: filters.selectedLocation,
                eventTypeId: filters.selectedEvent,
                status: filters.status
            }))
        }
    };
    const handleAddEvent = () => {
        dispatch(setEventModalState({modalOpen: true, mode: 'create'}));
    };
    const onSearch = (value) => {
        if (loggedUser?.role === 2) {
            dispatch(getAllEventsForCLients({
                page: pagination.current,
                size: pagination.pageSize,
                search: value,
                locationId: filters.selectedLocation,
                eventTypeId: filters.selectedEvent,
                status: filters.status,
                myEvents: myEvents
            }))
        } else if (loggedUser?.role === 0) {
            dispatch(getAllEvents({
                page: pagination.current,
                size: pagination.pageSize,
                search: value,
                locationId: filters.selectedLocation,
                eventTypeId: filters.selectedEvent,
                status: filters.status
            }))
        }
    }
    const handleSelectEvent = (selectedKeys) => {
        setSelectedKeysEvents(selectedKeys);
        if (loggedUser?.role === 2) {
            dispatch(getAllEventsForCLients({
                page: pagination.current,
                size: pagination.pageSize,
                search: filters.search,
                locationId: filters.selectedLocation,
                eventTypeId: selectedKeys[0],
                status: filters.status,
                myEvents: myEvents
            }))
        } else if (loggedUser?.role === 0) {
            dispatch(getAllEvents({
                page: pagination.current,
                size: pagination.pageSize,
                search: filters.search,
                locationId: filters.selectedLocation,
                eventTypeId: selectedKeys[0],
                status: filters.status
            }))
        }
    };
    const handleSelectStatus = (selectedKeys) => {
        setSelectedKeysStatus(selectedKeys);
        if (loggedUser?.role === 2) {
            dispatch(getAllEventsForCLients({
                page: pagination.current,
                size: pagination.pageSize,
                search: filters.search,
                locationId: filters.selectedLocation,
                eventTypeId: filters.selectedEvent,
                status: selectedKeys[0],
                myEvents: myEvents
            }))
        } else if (loggedUser?.role === 0) {
            dispatch(getAllEvents({
                page: pagination.current,
                size: pagination.pageSize,
                search: filters.search,
                locationId: filters.selectedLocation,
                eventTypeId: filters.selectedEvent,
                status: selectedKeys[0]

            }))
        }
    };
    const handleSelectLocation = (selectedKeys) => {
        setSelectedKeysLocation(selectedKeys);
        if (loggedUser?.role === 2) {
            dispatch(getAllEventsForCLients({
                page: pagination.current,
                size: pagination.pageSize,
                search: filters.search,
                locationId: selectedKeys[0],
                eventTypeId: filters.selectedEvent,
                status: filters.status,
                myEvents: myEvents
            }))
        } else if (loggedUser?.role === 0) {
            dispatch(getAllEvents({
                page: pagination.current,
                size: pagination.pageSize,
                search: filters.search,
                locationId: selectedKeys[0],
                eventTypeId: filters.selectedEvent,
                status: filters.status
            }))

        }
    };
    const handleWatchEvent = (id) => {
        navigate(`/events/event/${id}`);
    };

    const handleInvitations = (id) => {
        navigate(`/events/event/${id}/invitations`);
    };
    const handleSendInvitations = (id) => {
        setEventId(id)
        dispatch(setEventModalState({modalOpen: true, mode: 'sendInvitation'}));
    }

    const confirmEventAction = () => {
        if (loggedUser?.role === 0 && form?.mode === 'delete') {
            dispatch(deleteEvent({id: eventId, pagination: pagination, filters: filters}));
        } else if (loggedUser?.role === 2 && form?.mode === 'sendInvitation') {
            dispatch(createInvitation({
                id: eventId,
                userId: loggedUser?.id,
                pagination: pagination,
                loggedUser: loggedUser,
                filters: filters
            }));

        }
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
                                   handleSelectStatus={handleSelectStatus}
                                   selectedKeysLocation={selectedKeysLocation} selectedKeysEvents={selectedKeysEvents}
                                   selectedKeysStatus={selectedKeysStatus}/>
                </Sider>
                <Layout>
                    <Header>
                        <div className={"row p-md-4"}>
                            <div className={"col-12 col-md-6"}>
                                <h1>Events</h1>
                            </div>
                            {loggedUser?.role === 0 &&
                                <div className={"col-12 col-md-6 d-flex justify-content-end align-items-center"}>
                                    <CustomButton className={"add-btn btn col-12 col-md-5"} onCLick={handleAddEvent}
                                                  text={"Add event"}
                                                  htmlType="submit" type="submit"/>
                                </div>}
                        </div>

                    </Header>
                    <Content>
                        <div className="row justify-content-center justify-content-md-start p-2">
                            {events.map(event => (
                                <div key={event.id} className="col-12 col-md-3 col-xl-2 pt-2">
                                    <Card
                                        cover={

                                            <img alt="example"
                                                 src={event?.eventImages?.length > 0 ? new URL(`../../assets/events/${event.eventImages[0].image}.png`, import.meta.url).href : defImg}/>

                                        }
                                        actions={
                                            loggedUser?.role === 0
                                                ? [
                                                    <Tooltip key="watch" placement="top" title="View">
                                                        <FaEye className="cursor-button"
                                                               onClick={() => handleWatchEvent(event.id)}/>
                                                    </Tooltip>,
                                                    <Tooltip onClick={() => handleInvitations(event.id)} key="invitations" placement="top" title="Invitations">
                                                        <MailOutlined className="cursor-button"/>
                                                        {event?.invitations?.length > 0 && <FaBell className="notification-icon mx-1" />}

                                                    </Tooltip>,
                                                    <Tooltip key="delete" placement="top" title="Delete">
                                                        <FaTrash color="red" className="cursor-button"
                                                                 onClick={() => handleDeleteEvent(event.id)}/>
                                                    </Tooltip>
                                                ]
                                                : [
                                                    <Tooltip key="watch" placement="top" title="View">
                                                        <FaEye className="cursor-button"
                                                               onClick={() => handleWatchEvent(event.id)}/>
                                                    </Tooltip>,
                                                    event?.invitationStatus === false && (
                                                        <Tooltip key="invitations" placement="top" title="Send invitation">
                                                            <MailOutlined className="cursor-button"
                                                                          onClick={() => handleSendInvitations(event.id)}/>
                                                        </Tooltip>
                                                    )
                                                ].filter(Boolean)
                                        }


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
            <EventActionModal handleOk={confirmEventAction}/>
            <AddEventModal/>
        </Flex>
    );
};

export default Events;

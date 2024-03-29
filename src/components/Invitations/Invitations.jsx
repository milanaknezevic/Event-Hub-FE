import {Avatar, Flex, Layout, List, Pagination, Radio, Skeleton, Tooltip} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {auth, event} from "../../redux/selectors.jsx";
import {useEffect, useState} from "react";
import {
    getAllGuestsForEvent,
    getAllNotInvitedClients,
    getEventById,
    getInvitationsByEventId,
    replyToInvitation
} from "../../redux/events.jsx";
import {useParams} from "react-router-dom";
import {FaCheck, FaTimes} from 'react-icons/fa';
import {createInvitation, organizerUnsendInvitation} from "../../redux/invitation.jsx";

const {Header, Footer, Content} = Layout;


const Invitations = () => {
    const {id} = useParams();
    const {loggedUser} = useSelector(auth);
    const dispatch = useDispatch()
    const {pagination, eventData, form, notInvitedUsers, filters} = useSelector(event);
    const [selectedRadio, setSelectedRadio] = useState(0);

    useEffect(() => {
        dispatch(getEventById(id))
    }, []);


    const onChange = (e) => {
        if (e.target.value === 0) {
            setSelectedRadio(0)
            dispatch(getAllGuestsForEvent({page: pagination.current, size: pagination.pageSize, id: id, status: true}))
        } else if (e.target.value === 1) {
            setSelectedRadio(1)
            dispatch(getAllGuestsForEvent({page: pagination.current, size: pagination.pageSize, id: id, status: false}))
        } else if (e.target.value === 2) {
            setSelectedRadio(2)
            dispatch(getInvitationsByEventId({page: pagination.current, size: pagination.pageSize, id: id}))
        } else if (e.target.value === 3) {
            setSelectedRadio(3)
            dispatch(getAllNotInvitedClients({page: pagination.current, size: pagination.pageSize, id}))
        }

    };
    const handleAccept = (eventId, userId) => {
        dispatch(replyToInvitation({eventId: eventId, userId: userId, accept: true, pagination: pagination}));
    };

    const handleUnsend = (eventId, userId) => {
        if (selectedRadio === 1 || selectedRadio === 2) {
            dispatch(organizerUnsendInvitation({eventId: eventId, userId: userId, pagination: pagination}));
        } else {
            dispatch(replyToInvitation({eventId: eventId, userId: userId, accept: false, pagination: pagination}));
        }
    };

    useEffect(() => {
        dispatch(getAllGuestsForEvent({
            page: pagination.current,
            size: pagination.pageSize,
            id: id,
            status: true
        }))
    }, []);

    const handleChange = (page, pageSize) => {
        if (selectedRadio === 0) {
            dispatch(getAllGuestsForEvent({page: page, size: pageSize, id: id, status: true}))
        } else if (selectedRadio === 1) {
            dispatch(getAllGuestsForEvent({page: page, size: pageSize, id: id, status: false}))
        } else if (selectedRadio === 2) {
            dispatch(getInvitationsByEventId({page: page, size: pageSize, id: id}))
        } else if (selectedRadio === 3) {
            dispatch(getAllNotInvitedClients({page: page, size: pageSize, id}))
        }
    };

    const handleSendInvitation = (userId) => {
        dispatch(createInvitation({id, userId, pagination: pagination, loggedUser: loggedUser, filters: filters}));
    };

    return (
        <Flex className={"flex-grow-1 invitations-container"}>
            <Layout>
                <Layout>
                    <Header>
                        <div className={"row justify-content-center p-md-4"}>
                            <div className={"col-11"}>
                                <h1>{`Invitations for '${form.eventObj.name}'`}</h1>
                            </div>
                        </div>
                    </Header>
                    <Content>

                        <Radio.Group className={"d-flex justify-content-center"} onChange={onChange} defaultValue={0}>
                            <Radio.Button value={0}>Guests</Radio.Button>
                            <Radio.Button value={1}>Invited Guests</Radio.Button>
                            <Radio.Button value={3}>Send invitations</Radio.Button>
                            <Radio.Button value={2}>Attendance Requests</Radio.Button>
                        </Radio.Group>

                        <div className={"row justify-content-center pt-2"}>
                            <div className={"col-7"}>
                                {selectedRadio === 3 ?
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={notInvitedUsers}
                                        renderItem={(item) => (
                                            <List.Item
                                                actions={[
                                                    <Tooltip key={'accept'} placement={'top'} title={'Send invitation'}>
                                                        <FaCheck
                                                            className={'accept-icon'}
                                                            onClick={() => handleSendInvitation(item.id)}
                                                        />
                                                    </Tooltip>,
                                                ]}
                                            >
                                                <Skeleton avatar title={false} loading={item?.loading} active>
                                                    <List.Item.Meta
                                                        avatar={<Avatar
                                                            src={new URL(`../../assets/users/${item?.avatar}.png`, import.meta.url).href}/>}
                                                        title={`${item?.name} ${item?.lastname}`}
                                                    />
                                                </Skeleton>
                                            </List.Item>
                                        )}
                                    /> :
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={eventData.invitations}
                                        renderItem={(item) =>
                                            (
                                                <List.Item
                                                    actions={
                                                        (!item?.statusCreator && item?.statusGuest && selectedRadio === 2) ? (
                                                            [
                                                                <Tooltip key={'accept'} placement={'top'}
                                                                         title={'Accept'}>
                                                                    <FaCheck
                                                                        className={'accept-icon'}
                                                                        onClick={() => handleAccept(item.event_id, item.user_id)}
                                                                    />
                                                                </Tooltip>,
                                                                <Tooltip key={'decline'} placement={'top'}
                                                                         title={'Decline'}>
                                                                    <FaTimes
                                                                        className={'decline-icon'}
                                                                        onClick={() => handleUnsend(item.event_id, item.user_id)}
                                                                    />
                                                                </Tooltip>
                                                            ]
                                                        ) : (
                                                            (!item?.statusCreator && item?.statusGuest && new Date(item?.event?.startTime) > new Date()) || selectedRadio === 1 ? (
                                                                [
                                                                    <Tooltip key={'decline'} placement={'top'}
                                                                             title={'Unsend invitations'}>
                                                                        <FaTimes
                                                                            className={'decline-icon'}
                                                                            onClick={() => handleUnsend(item.event_id, item.user_id)}
                                                                        />
                                                                    </Tooltip>
                                                                ]
                                                            ) : null
                                                        )}>
                                                    <Skeleton avatar title={false} loading={item?.loading} active>
                                                        <List.Item.Meta
                                                            avatar={<Avatar
                                                                src={new URL(`../../assets/users/${item?.invitedUser?.avatar}.png`, import.meta.url).href}/>}
                                                            title={`${item?.invitedUser?.name} ${item?.invitedUser?.lastname}`}
                                                        />
                                                    </Skeleton>
                                                </List.Item>
                                            )
                                        }
                                    />}

                            </div>

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

export default Invitations;

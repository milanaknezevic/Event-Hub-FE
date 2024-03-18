import {Avatar, Flex, Layout, List, Pagination, Radio, Skeleton, Tooltip} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {event, user} from "../../redux/selectors.jsx";
import {useEffect, useState} from "react";
import {getAllGuestsForEvent, getEventById, getInvitationsByEventId, replyToInvitation} from "../../redux/events.jsx";
import {useParams} from "react-router-dom";
import {FaCheck, FaTimes} from 'react-icons/fa';
import {getAllNotInvitedClients} from "../../redux/user.jsx";
import {createInvitation} from "../../redux/invitation.jsx";

const {Header, Footer, Content} = Layout;


const Invitations = () => {
    const {id} = useParams();
    const dispatch = useDispatch()
    const {pagination, eventData, form} = useSelector(event);
    const {users} = useSelector(user);
    const [selectedRadio, setSelectedRadio] = useState(0);

    useEffect(() => {
        dispatch(getEventById(id))
    }, []);

    console.log("users ", users)
    const onChange = (e) => {
        if (e.target.value === 0) {
            setSelectedRadio(0)
            dispatch(getAllGuestsForEvent({id: id, status: true}))
        } else if (e.target.value === 1) {
            setSelectedRadio(1)
            dispatch(getAllGuestsForEvent({id: id, status: false}))
        } else if (e.target.value === 2) {
            setSelectedRadio(2)
            dispatch(getInvitationsByEventId(id))
        } else if (e.target.value === 3) {
            setSelectedRadio(3)
            dispatch(getAllNotInvitedClients(id))
        }

    };
    const handleAccept = (eventId, userId) => {
        dispatch(replyToInvitation({eventId: eventId, userId: userId, accept: true}))
    };

    const handleDecline = (eventId, userId) => {
        dispatch(replyToInvitation({eventId: eventId, userId: userId, accept: false}))
    };

    useEffect(() => {
        dispatch(getAllGuestsForEvent({id: id, status: eventData.status}))
    }, []);

    const handleChange = (page, pageSize) => {
        //TODO
        console.log("paginacija ", page, " pageSize ", pageSize)
    };

    const handleSendInvitation = (userId) => {
        console.log("send invitation ", userId)
        dispatch(createInvitation({id, userId}))
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
                            <Radio.Button value={2}>Received Invitations</Radio.Button>
                            <Radio.Button value={3}>Send invitations</Radio.Button>
                        </Radio.Group>

                        <div className={"row justify-content-center pt-2"}>
                            <div className={"col-7"}>
                                {selectedRadio === 3 ?
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={users}
                                        renderItem={(item) => (
                                            <List.Item
                                                actions={[
                                                    <Tooltip key={'accept'} placement={'top'}
                                                             title={'Send invitation'}>
                                                            <FaCheck
                                                                className={'accept-icon'}
                                                                onClick={() => handleSendInvitation(item.id)}
                                                            />
                                                    </Tooltip>,
                                                ]}
                                            >
                                                <Skeleton avatar title={false} loading={item?.loading} active>
                                                    <List.Item.Meta
                                                        avatar={<Avatar src={item?.avatar}/>}
                                                        title={`${item?.name} ${item?.lastname}`}
                                                    />
                                                </Skeleton>
                                            </List.Item>
                                        )}
                                    /> :
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={eventData.invitations}
                                        renderItem={(item) => (
                                            <List.Item
                                                actions={
                                                    !item?.statusCreator &&
                                                    item?.statusGuest &&
                                                    new Date(item?.event?.startTime) > new Date() ? (
                                                        [
                                                            <Tooltip key={'accept'} placement={'top'} title={'Accept'}>
                                                                <FaCheck
                                                                    className={'accept-icon'}
                                                                    onClick={() => handleAccept(item.event_id, item.user_id)}
                                                                />
                                                            </Tooltip>,
                                                            <Tooltip
                                                                key={'decline'}
                                                                placement={'top'}
                                                                title={'Decline'}
                                                            >
                                                                <FaTimes
                                                                    className={'decline-icon'}
                                                                    onClick={() => handleDecline(item.event_id, item.user_id)}
                                                                />
                                                            </Tooltip>
                                                        ]
                                                    ) : null
                                                }
                                            >
                                                <Skeleton avatar title={false} loading={item?.loading} active>
                                                    <List.Item.Meta
                                                        avatar={<Avatar src={item?.invitedUser?.avatar}/>}
                                                        title={`${item?.invitedUser?.name} ${item?.invitedUser?.lastname}`}
                                                    />
                                                </Skeleton>
                                            </List.Item>
                                        )}
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

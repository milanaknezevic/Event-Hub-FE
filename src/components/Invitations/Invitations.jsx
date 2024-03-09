import {Avatar, Flex, Layout, List, Pagination, Radio, Skeleton, Tooltip} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {event} from "../../redux/selectors.jsx";
import {useEffect} from "react";
import {getAllGuestsForEvent, getEventById, getInvitationsByEventId, replyToInvitation} from "../../redux/events.jsx";
import {useParams} from "react-router-dom";
import {FaCheck, FaTimes} from 'react-icons/fa';

const {Header, Footer, Content} = Layout;


const Invitations = () => {
    const {id} = useParams();
    const dispatch = useDispatch()
    const {pagination, eventData, form} = useSelector(event);

    useEffect(() => {
        dispatch(getEventById(id))
    }, []);


    const onChange = (e) => {
        if (e.target.value === 0) {
            dispatch(getAllGuestsForEvent({id: id, status: true}))
        } else if (e.target.value === 1) {
            dispatch(getAllGuestsForEvent({id: id, status: false}))
        } else if (e.target.value === 2) {
            dispatch(getInvitationsByEventId(id))
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
                        </Radio.Group>

                        <div className={"row justify-content-center pt-2"}>
                            <div className={"col-7"}>
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
                                />
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

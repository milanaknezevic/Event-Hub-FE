import {Card, Flex, Layout, Pagination, Radio, Tooltip} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {invitation} from "../../redux/selectors.jsx";
import {useEffect, useState} from "react";
import defImg from "../../assets/noImage.png";
import {FaCheck, FaEye, FaTimes} from "react-icons/fa";
import {clientUnsendInvitation, getAllInvitationsForCLient} from "../../redux/invitation.jsx";
import {useNavigate} from "react-router-dom";
import {clientReplyToInvitation} from "../../redux/events.jsx";

const {Header, Footer, Content} = Layout;
const {Meta} = Card;

const ClientInvitations = () => {

    const dispatch = useDispatch()
    const {pagination, status, invitations} = useSelector(invitation)
    const [selectedRadio, setSelectedRadio] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getAllInvitationsForCLient({page: pagination.current, size: pagination.pageSize, status: 0}))
    }, []);

    const onChange = (e) => {
        if (e.target.value === 0) {
            setSelectedRadio(0)
            dispatch(getAllInvitationsForCLient({page: pagination.current, size: pagination.pageSize, status: 0}))

        } else if (e.target.value === 1) {
            setSelectedRadio(1)
            dispatch(getAllInvitationsForCLient({page: pagination.current, size: pagination.pageSize, status: 1}))
        }
    };
    const handleChange = (page, pageSize) => {
        dispatch(getAllInvitationsForCLient({page: page, size: pageSize, status: selectedRadio}))
    };
    const handleWatchEvent = (id) => {
        navigate(`/events/event/${id}`);
    };
    const handleAcceptInvitation = (id) => {
        dispatch(clientReplyToInvitation({eventId: id, accept: true, pagination: pagination, status: status}));
    };
    const handleDeclineInvitation = (id) => {
        dispatch(clientReplyToInvitation({eventId: id, accept: false, pagination: pagination, status: status}));
    };
    const handleUnsendInvitation = (id) => {
        dispatch(clientUnsendInvitation({eventId: id, pagination: pagination, status: status}));

    };

    return (
        <Flex className={"flex-grow-1 invitations-container"}>
            <Layout>
                <Layout>
                    <Header>
                        <div className={"row justify-content-center p-md-4"}>
                            <div className={"col-11"}>
                                <h1>Invitations</h1>
                            </div>
                        </div>
                    </Header>
                    <Content className={"event-container"}>

                        <Radio.Group className={"d-flex justify-content-center"} onChange={onChange}
                                     defaultValue={0}>
                            <Radio.Button value={0}>Received Invitations</Radio.Button>
                            <Radio.Button value={1}>Sent invitations</Radio.Button>
                        </Radio.Group>

                        <div className="row justify-content-center justify-content-md-start p-2">
                            {invitations.map(invitation => (
                                <div key={invitation?.event?.id} className="col-12 col-md-3 col-xl-2 pt-2">
                                    <Card
                                        key={invitation?.event?.id}
                                        cover={
                                            <img alt="example"
                                                 src={invitation?.event?.eventImages?.length > 0 ? new URL(`../../assets/events/${invitation?.event?.eventImages[0].image}.png`, import.meta.url).href : defImg}/>
                                        }
                                        actions={
                                            invitation?.statusCreator === true && invitation.statusGuest === false ?
                                                [
                                                    <Tooltip key="watch" placement="top" title="Watch">
                                                        <FaEye className="cursor-button"
                                                               onClick={() => handleWatchEvent(invitation?.event?.id)}/>
                                                    </Tooltip>,
                                                    <Tooltip key={'accept'} placement={'top'} title={'Accept'}>
                                                        <FaCheck
                                                            className={'accept-icon'}
                                                            onClick={() => handleAcceptInvitation(invitation?.event?.id)}/>
                                                    </Tooltip>,
                                                    <Tooltip key={'decline'} placement={'top'}
                                                             title={'Decline'}>
                                                        <FaTimes
                                                            className={'decline-icon'}
                                                            onClick={() => handleDeclineInvitation(invitation?.event?.id)}/>
                                                    </Tooltip>
                                                ] : invitation?.statusCreator === false && invitation.statusGuest === true ?
                                                    [
                                                        <Tooltip key="watch" placement="top" title="Watch">
                                                            <FaEye className="cursor-button"
                                                                   onClick={() => handleWatchEvent(invitation?.event?.id)}/>
                                                        </Tooltip>,
                                                        <Tooltip key={'decline'} placement={'top'}
                                                                 title={'Unsend invitation'}>
                                                            <FaTimes
                                                                className={'decline-icon'}
                                                                onClick={() => handleUnsendInvitation(invitation?.event?.id)}/>
                                                        </Tooltip>
                                                    ] :
                                                    []
                                        }
                                    >
                                        <Meta
                                            title={invitation?.event?.name}
                                            description={
                                                <div>
                                                    <Tooltip placement={"top"} title={invitation?.event?.description}>
                                                        <div
                                                            className={"event-description"}>{invitation?.event?.description}</div>
                                                    </Tooltip>
                                                    <div>Start: {new Date(invitation?.event?.startTime).toLocaleString()}</div>
                                                    <div>End: {new Date(invitation?.event?.endTime).toLocaleString()}</div>
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

        </Flex>
    );
};

export default ClientInvitations;

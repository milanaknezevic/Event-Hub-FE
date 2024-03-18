import {Avatar, Button, Input, List, Skeleton, Tooltip} from "antd";
import {useEffect, useState} from "react";
import {getAllClients, getAllClientsForInvitation} from "../../redux/user.jsx";
import {useDispatch, useSelector} from "react-redux";
import {event, user} from "../../redux/selectors.jsx";
import {FaCheck} from "react-icons/fa";
import CustomButton from "../FormComponents/CustomButton.jsx";

const {Search} = Input;

const ThirdStepForm = ({onSubmit, invitations, setInvitations,newAdded, setNewAdded,removedInvitations,setRemovedInvitations}) => {
    const dispatch = useDispatch();
    const {clients} = useSelector(user);
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const {form} = useSelector(event)
    // const [removedInvitations, setRemovedInvitations] = useState([]);
    // const [newAdded, setNewAdded] = useState([]);



    const pageSize = 5;

    useEffect(() => {
        if (form.mode === 'edit') {
            dispatch(getAllClientsForInvitation(form.eventObj.id))
        }
        if (form.mode === 'create') {
            dispatch(getAllClients({}))
        }
    }, []);

    useEffect(() => {
        setList(clients.slice(0, currentPage * pageSize));
    }, [clients, currentPage]);

    const onLoadMore = () => {
        setCurrentPage(currentPage + 1);
    };

    const onSearch = (value) => {
        setSearchValue(value);
        const filteredClients = clients.filter(client =>
            `${client.name} ${client.lastname}`.toLowerCase().includes(value.toLowerCase())
        );
        setList(filteredClients.slice(0, pageSize));
        setCurrentPage(1);
    };

    const handleSendInvitation = (id) => {
        const invitedClient = clients.find(client => client.id === id);
        const isSelected = invitations?.some(client => client.id === id);

        if (isSelected) {
            const updatedClients = invitations?.filter(client => client.id !== id);
            setInvitations(updatedClients)
            if (!newAdded.some(client => client.id === id)) {
                setRemovedInvitations([...removedInvitations, invitedClient]);
            }

        } else {
            setInvitations([...invitations, invitedClient]);
            setNewAdded([...newAdded, invitedClient]);
        }
    };

    const loadMore =
        clients.length > list.length && searchValue === "" ? (
            <div className={"row justify-content-center mt-3"}>
                <Button
                    className="load-btn btn col-4 d-flex justify-content-center align-items-center"
                    type="submit" onClick={onLoadMore}>Load more
                </Button>
            </div>
        ) : null;

    const handleSubmit = () => {
        onSubmit();
    };

    return (
        <div className={"row mt-3 third-step"}>
            <div className={"row justify-content-center search-container"}>
                <div className={"col-6"}>
                    <Search
                        placeholder="Search..."
                        allowClear
                        onSearch={onSearch}
                    />
                </div>
            </div>


               <List
                   className="demo-loadmore-list mt-3"
                   itemLayout="horizontal"
                   loadMore={loadMore}
                   dataSource={list}
                   renderItem={(item) => {
                       const isSelected = invitations?.some(client => client.id === item.id);
                       return (
                           <List.Item
                               actions={[
                                   <Tooltip key={'accept'} placement={'top'}
                                            title={isSelected ? 'Remove invitation' : 'Send invitation'}>
                                       {isSelected ? (
                                           <FaCheck
                                               className={'accepted-icon'}
                                               onClick={() => handleSendInvitation(item.id)}
                                           />
                                       ) : (
                                           <FaCheck
                                               className={'accept-icon'}
                                               onClick={() => handleSendInvitation(item.id)}
                                           />
                                       )}
                                   </Tooltip>,
                               ]}>
                               <Skeleton avatar title={false} loading={item.loading} active>
                                   <List.Item.Meta
                                       avatar={<Avatar src={item?.avatar}/>}
                                       title={`${item?.name} ${item?.lastname}`}
                                   />
                               </Skeleton>
                           </List.Item>
                       );
                   }}
               />
            <div className={"col-12 d-flex justify-content-md-end mt-3"}>
                <CustomButton className={"event-btn btn col-12 col-md-4"} onCLick={handleSubmit}
                              text={"Submit"}
                              type="submit"/>

                {/*<Button*/}
                {/*    className="event-btn btn col-12 col-md-4 d-flex justify-content-center align-items-center"*/}
                {/*    type="submit" onClick={handleSubmit}>Submit*/}
                {/*</Button>*/}
            </div>
        </div>
    );
};

export default ThirdStepForm;

import {Avatar, Button, Input, List, Skeleton, Tooltip} from "antd";
import {useEffect, useState} from "react";
import {getAllClients} from "../../redux/user.jsx";
import {useDispatch, useSelector} from "react-redux";
import {user} from "../../redux/selectors.jsx";
import {FaCheck} from "react-icons/fa";

const {Search} = Input;

const ThirdStepForm = ({onSubmit}) => {
    const dispatch = useDispatch();
    const {clients} = useSelector(user);
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [selectedClients, setSelectedClients] = useState([]);

    const pageSize = 5;

    useEffect(() => {
        dispatch(getAllClients({}))
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
        const isSelected = selectedClients.some(client => client.id === id);

        if (isSelected) {
            const updatedClients = selectedClients.filter(client => client.id !== id);
            setSelectedClients(updatedClients);
        } else {
            setSelectedClients([...selectedClients, invitedClient]);
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
        onSubmit(selectedClients);
    };

    return (
        <div className={"row mt-3"}>
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
                    const isSelected = selectedClients.some(client => client.id === item.id);
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
                <Button
                    className="event-btn btn col-12 col-md-4 d-flex justify-content-center align-items-center"
                    type="submit" onClick={handleSubmit}>Submit
                </Button>
            </div>
        </div>
    );
};

export default ThirdStepForm;

import {Table, Tooltip} from "antd";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserById} from "../../redux/user.jsx";
import {FaCircle, FaEye} from 'react-icons/fa';
import {getAllTickets, getTicketById, getTicketPriority, getTicketStatus} from "../../redux/tickets.jsx";
import Ticket from "./Ticket.jsx";
import {ticket} from '../../redux/selectors.jsx'


const Tickets = () => {
    const dispatch = useDispatch()
    const {tickets, loading, pagination, filters, ticketStatus, ticketPriority} = useSelector(ticket);

    useEffect(() => {
        dispatch(getTicketStatus({}))
        dispatch(getTicketPriority({}))
        dispatch(getAllTickets({
            page: pagination.current,
            size: pagination.pageSize,
            status: filters.status,
            priority: filters.priority
        }))
    }, [])

    const handleWatchTicket = (id) => {
        console.log("ticket id ", id)
        dispatch(getTicketById(id))
    }


    function CheckTicketStatus(checkStatus) {
        switch (checkStatus) {
            case "CLOSED":
                return <Tooltip placement={"top"} title={"Closed"}>
                    <FaCircle color="green" size="1em"/>
                </Tooltip>;
            case "IN_PROGRESS":
                return <Tooltip placement={"top"} title={"In progress"}>
                    <FaCircle color="#000080" size="1em"/>
                </Tooltip>;
            case "OPENED":
                return <Tooltip placement={"top"} title={"Opened"}>
                    <FaCircle color="red" size="1em"/>
                </Tooltip>;
            default:
                return
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',

        },
        {
            title: 'Creation date',
            key: 'creationDate',
            dataIndex: 'creationDate',
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            filters: ticketPriority.map(option => ({text: option.value, value: option.key})),
            filterMultiple: false,
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (cell) => {
                return CheckTicketStatus(cell)
            },
            filters: ticketStatus.map(option => ({text: option.value, value: option.key})),
            filterMultiple: false,
        },
        {
            title: 'Action',
            key: 'action',
            render: (cell, row) => (

                <Tooltip placement={"top"} title={"Watch"}>
                    <FaEye onClick={handleWatchTicket.bind(this, row.id)} className={"cursor-button"}/>
                </Tooltip>

            ),
        },
    ];
    const handleChange = (newPagination, newFilters) => {
        console.log("filters ", newFilters)
        dispatch(getAllTickets({
            page: newPagination.current,
            size: newPagination.pageSize,
            status: newFilters.status,
            priority: newFilters.priority
        }))
    }

    return (

        <div className="flex-grow-1 container-fluid users-container mt-4">
            <div className="row justify-content-center align-items-center">
                <div className="col-11 d-flex justify-content-start">
                    <h1>Tickets</h1>
                </div>
                <div className="col-11">
                    <Table columns={columns} dataSource={tickets.map(user => ({...user, key: user.id}))}
                           loading={loading}
                           scroll={{y: 800, x: 1000}}
                           onChange={handleChange}
                           pagination={{
                               current: pagination.current,
                               pageSize: pagination.pageSize,
                               total: pagination.total,
                               showSizeChanger: true,
                               pageSizeOptions: ['10', '20', '50'],
                               locale: {items_per_page: ''}
                           }}/>
                </div>
            </div>
            <Ticket/>
        </div>
    );
};

export default Tickets;

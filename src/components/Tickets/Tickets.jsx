import {Table, Tooltip} from "antd";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FaCircle, FaEye} from 'react-icons/fa';
import {
    getAllTickets,
    getTicketById,
    getTicketPriority,
    getTicketStatus,
    setTicketModalState
} from "../../redux/tickets.jsx";
import Ticket from "./Ticket.jsx";
import {auth, ticket} from '../../redux/selectors.jsx'


const Tickets = () => {
    const dispatch = useDispatch()
    const {tickets, loading, pagination, filters, ticketStatus, ticketPriority} = useSelector(ticket);
    const {loggedUser} = useSelector(auth);

    useEffect(() => {
        dispatch(getTicketStatus({}))
        dispatch(getTicketPriority({}))
        dispatch(getAllTickets({
            page: pagination.current,
            size: pagination.pageSize,
            status: filters.status,
            priority: filters.priority,
            role: loggedUser?.role
        }))
    }, [])

    const handleWatchTicket = (row) => {
        if (loggedUser?.role === 1) {
            dispatch(getTicketById(row.id))
        }
        else{
            dispatch(setTicketModalState({modalOpen: true, mode: "edit",ticketObj:row}));
        }
    }

    function checkTicketPriority(priority) {
        switch (priority) {
            case "LOW":
                return <Tooltip placement={"top"} title={"Low"}>
                    <FaCircle color="green" size="1em"/>
                </Tooltip>;
            case "MEDIUM":
                return <Tooltip placement={"top"} title={"Medium"}>
                    <FaCircle color="#000080" size="1em"/>
                </Tooltip>;
            case "HIGH":
                return <Tooltip placement={"top"} title={"High"}>
                    <FaCircle color="red" size="1em"/>
                </Tooltip>;
            default:
                return
        }
    }


    const columns = [
        {
            title: 'Creation date',
            key: 'creationDate',
            dataIndex: 'creationDate',
            render: (cell) => {
                return new Date(cell).toLocaleString()
            }
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            render: (cell) => {
                return checkTicketPriority(cell)
            },
            filters: ticketPriority.map(option => ({text: option.name, value: option.id})),
            filterMultiple: false,
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (cell) => {
                return cell.replace(/_/g, ' ')
            },
            filters: ticketStatus.map(option => ({text: option.value, value: option.key})),
            filterMultiple: false,
        },
        {
            title: 'Action',
            key: 'action',
            render: (cell, row) => (

                <Tooltip placement={"top"} title={"Watch"}>
                    <FaEye onClick={handleWatchTicket.bind(this, row)} className={"cursor-button"}/>
                </Tooltip>

            ),
        },
    ];
    const handleChange = (newPagination, newFilters) => {
        dispatch(getAllTickets({
            page: newPagination.current,
            size: newPagination.pageSize,
            status: newFilters.status ?? "",
            priority: newFilters.priority ?? "",
            role: loggedUser?.role
        }))
    }

    return (

        <div className="flex-grow-1 container-fluid users-container mt-4">
            <div className="row justify-content-center align-items-center">
                <div className="col-11 d-flex justify-content-start">
                    <h1>Tickets</h1>
                </div>
                <div className="col-11">
                    <Table columns={columns} dataSource={tickets.map(ticket => ({...ticket, key: ticket.id}))}
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

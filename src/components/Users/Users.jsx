import {Space, Table, Tooltip} from "antd";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "../../redux/user.jsx";
import {user} from "../../redux/selectors.jsx";
import {FaCircle, FaEdit, FaTrash} from 'react-icons/fa';

const Users = () => {
    const dispatch = useDispatch()
    const {users, loading, pagination} = useSelector(user);


    useEffect(() => {
        dispatch(getAllUsers({page: 1, size: 10}))
    }, [])

    function CheckUserStatus(checkStatus) {

        switch (checkStatus) {
            case "ACTIVE":
                return <Tooltip placement={"top"} title={"Active"}>
                    <FaCircle color="green" size="1em"/>
                </Tooltip>;
            case "REQUESTED":
                return <Tooltip placement={"top"} title={"Requested"}>
                    <FaCircle color="#000080" size="1em"/>
                </Tooltip>;
            case "BLOCKED":
                return <Tooltip placement={"top"} title={"Blocked"}>
                    <FaCircle color="red" size="1em"/>
                </Tooltip>;
            default:
                return
        }
    }


    const columns = [
        {
            title: 'Full name',
            dataIndex: 'full_name',
            key: 'full_name',
            render: (cell, row) => {
                return `${row.name} ${row.lastname}`
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Phone number',
            key: 'phoneNumber',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Role',
            key: 'role',
            dataIndex: 'role',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (cell) => {
                return CheckUserStatus(cell)
            },
            align: 'center',
        },
        {
            title: 'Action',
            key: 'action',

            render: () => (
                <Space size="middle"><>
                    <Tooltip placement={"top"} title={"Edit"}>
                        <FaEdit className={"cursor-button"}/>
                    </Tooltip>
                    <Tooltip placement={"top"} title={"Delete"}>
                        <FaTrash color="red" className={"cursor-button"}/>
                    </Tooltip>
                </>
                </Space>
            ),
        },
    ];
    const handleChange = (newPagination) => {
        dispatch(getAllUsers({page: newPagination.current, size: newPagination.pageSize}))
    }


    return (

        <div className="flex-grow-1 container-fluid  users-container mt-4">
            <div className="row justify-content-center align-items-center">
                <div className="col-11 d-flex justify-content-start">
                    <h1>Users</h1>
                </div>
                <div className="col-11">
                    <Table columns={columns} dataSource={users.map(user => ({ ...user, key: user.id }))}
                           loading={loading}
                           scroll={{y: 800, x: 1000}}
                           onChange={handleChange}
                           pagination={{
                               current: pagination.current,
                               pageSize: pagination.pageSize,
                               total: pagination.total,
                               showSizeChanger: true,
                               pageSizeOptions: ['10', '50', '100'],
                               locale: {items_per_page: ''}
                           }}/>


                </div>
            </div>
        </div>
    );
};

export default Users;

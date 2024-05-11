import {Button, Input, Space, Table, Tooltip} from "antd";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, getAllUsers, getUserById, setUserModalState} from "../../redux/user.jsx";
import {user} from "../../redux/selectors.jsx";
import {FaCircle, FaEdit, FaTrash} from 'react-icons/fa';
import UsersModal from "./UsersModal.jsx";
import DeleteUserModal from "./DeleteUserModal.jsx";
import CustomButton from "../FormComponents/CustomButton.jsx";

const {Search} = Input;

const Users = () => {
    const dispatch = useDispatch()
    const {users, loading, pagination} = useSelector(user);
    const [userId, setUserId] = useState(null)


    useEffect(() => {
        dispatch(getAllUsers({page: pagination.current, size: pagination.pageSize, search: ""}))
    }, [])

    const handleEdit = (user) => {
        dispatch(getUserById(user.id))
    }
    const confirmUserDelete = () => {
        dispatch(deleteUser({id: userId, pagination: pagination}));
    }
    const handleDelete = (id) => {
        setUserId(id)
        dispatch(setUserModalState({modalOpen: true, mode: 'delete'}));
    }
    const handleAddUser = () => {
        dispatch(setUserModalState({modalOpen: true, mode: 'create'}));
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
        },
        {
            title: 'Action',
            key: 'action',
            render: (cell, row) => (
                <Space size="middle"><>
                    <Tooltip placement={"top"} title={"Edit"}>
                        <FaEdit onClick={handleEdit.bind(this, row)} className={"cursor-button"}/>
                    </Tooltip>
                    <Tooltip placement={"top"} title={"Delete"}>
                        <FaTrash onClick={handleDelete.bind(this, row.id)} color="red" className={"cursor-button"}/>
                    </Tooltip>
                </>
                </Space>
            ),
        },
    ];
    const handleChange = (newPagination) => {
        dispatch(getAllUsers({page: newPagination.current, size: newPagination.pageSize, search: ""}))
    }

    const onSearch = (data) => {
        dispatch(getAllUsers({page: pagination.current, size: pagination.pageSize, search: data}))
    }

    return (

        <div className="flex-grow-1 container-fluid users-container mt-4">
            <div className="row justify-content-center align-items-center">
                <div className={"col-11"}>
                    <div className={"row"}>
                        <div className="col-12 d-flex justify-content-start">
                            <h1>Users</h1>
                        </div>
                    </div>
                    <div className={"row justify-content-between pt-2 pb-2 "}>
                        <div className="col-12 col-md-2 d-flex justify-content-start search-container ">
                            <Search
                                placeholder="Search..."
                                allowClear
                                onSearch={onSearch}
                            />
                        </div>
                        <div className="col-12 col-md-2 d-flex justify-content-end pt-2 pt-md-0">
                            <CustomButton className={"login-btn btn col-12"} onCLick={handleAddUser} text={"Add user"}
                                          htmlType="submit" type="submit"/>


                        </div>
                    </div>
                    <div className={"row"}>
                        <div className="col-12">
                            <Table columns={columns} dataSource={users.map(user => ({...user, key: user.id}))}
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
                </div>
            </div>
            <UsersModal/>
            <DeleteUserModal handleOk={confirmUserDelete}/>
        </div>
    );
};

export default Users;

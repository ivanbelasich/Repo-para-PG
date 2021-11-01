import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import './Users.css'
import { LOCALHOST_URL } from '../../redux/constants'
import AlertPopup from '../AlertPopups/AlertPopups';
import {deleteUser, makeAdmin} from '../../redux/actions/index'
import { MdDeleteForever } from 'react-icons/md';
import {GrUserAdmin} from 'react-icons/gr';
import "./Users.css";

export const Users = () => {

    const [users, setUsers] = useState([])
    const dispatch = useDispatch()
    const columns = [
        {
            name: "Username",
            selector: "username",
            sortable: true
        },
        {
            name: "Email",
            selector: "email",
            sortable: true
        },
        {
            name: "Role",
            selector: "role",
            sortable: true
        },
        {
            name: "Actions",
            cell: row => (
                <div className="actions">
                    <button type="button" onClick={() => {
                        handleDeleteUser(row._id);
                        handeOpenAlertDelete();
                    }
                    }
                    >
                        <MdDeleteForever />
                    </button>
                    <button className='GrUserAdmin'type="button" onClick={() => {
                        handleEditUser(row._id);
                        handeOpenAlertEdit();
                    }
                    }
                    >
                        <span><GrUserAdmin /></span>
                    </button>
                </div>
            )
        }
    ]

    // ---------------------- DELETE USER STUFF starts here ----------------------

    const [activeAlertDelete, setactiveAlertDelete] = useState(false);
    const [successDelete, setSuccessDelete] = useState(false);
    const handeOpenAlertDelete = () => {
        setactiveAlertDelete(!activeAlertDelete)
    }
    const [idDelete, setidDelete] = useState(null)
    const handleDeleteUser = (id) => {
        setidDelete(id)
    }
    const handleDeleteSuccess = () => {
        setSuccessDelete(!successDelete)
    }

    useEffect(() => {
        if (successDelete) {
            dispatch(deleteUser(idDelete))
            handleDeleteSuccess();
        }
    }, [successDelete])

    // ---------------------- DELETE USER STUFF ends here ----------------------

    // ---------------------- EDIT USER STUFF starts here ----------------------

    const [activeAlertEdit, setactiveAlertEdit] = useState(false);
    const [successEdit, setSuccessEdit] = useState(false);
    const handeOpenAlertEdit = () => {
        setactiveAlertEdit(!activeAlertEdit)
    }
    const [idEdit, setidEdit] = useState(null)
    const handleEditUser = (id) => {
        setidEdit(id)
    }
    const handleEditSuccess = () => {
        setSuccessEdit(!successEdit)
    }

    useEffect(() => {
        if (successEdit) {
            console.log(idEdit, "idEdit")
            dispatch(makeAdmin(idEdit))
            handleEditSuccess()
            window.location.reload()
        }
    }, [successEdit])

    // ---------------------- EDIT USER STUFF ends here ----------------------
    
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`${LOCALHOST_URL}/users`)
            setUsers(request.data.map(el => el))
            console.log(request.data.map(el => el), "este es mi request")
            return request
        }
        fetchData();
    }, []);

    return (
        <div className="admin-users-dashboard">
            {
                users.length > 0 ?
                    <div className="userTableContainer">
                        <DataTable
                            columns={columns}
                            data={users}
                            title="Users"
                            striped
                            highlightOnHover
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5, 8]}
                            pagination
                        />
                        <div className="alert-delete">
                            <AlertPopup
                                activeAlert={activeAlertDelete}
                                actionAlert='delete'
                                handleOpenAlert={handeOpenAlertDelete}
                                handleSuccess={handleDeleteSuccess}
                            />
                        </div>
                        <div className="alert-make-admin">
                            <AlertPopup
                                activeAlert={activeAlertEdit}
                                actionAlert='make admin'
                                handleOpenAlert={handeOpenAlertEdit}
                                handleSuccess={handleEditSuccess}
                            />
                        </div>
                    </div>

                    :
                    <div>
                        <h1>No users</h1>
                    </div>

            }
        </div>
    )
}

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../Componants/DefauldLayout/DefaultLayout';
import cogoToast from 'cogo-toast';
import { Link,useNavigate } from 'react-router-dom';
import Spinner from './../../Componants/Spinner';
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const AllMembers = () => {
const nagivate = useNavigate()
    const [member, setMember] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const token = localStorage.getItem("Token")
        axios.get('https://vast-journey-49790.herokuapp.com/api/v1/readMember', {
            headers: {
                'token-key': `${token}`
            }
        })
            .then(function (response) {
                setMember(response.data.data)
            
                setLoading(false)
            })
            .catch(function (error) {
                cogoToast.error(`${error.message}`);
            });
    }, [])

    const showDeleteConfirm = (id) => {
        confirm({
            title: 'Are you sure delete this task?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
        const token = localStorage.getItem("Token")

        axios.post('https://vast-journey-49790.herokuapp.com/api/v1/deleteMember', 
            {
                id:id
            }
        , {
            headers: {
                'token-key': `${token}`
            }
        })
            .then(function (response) {
                cogoToast.success(`${response.data.status}`);
                nagivate(0)
                setLoading(false)
            })
            .catch(function (error) {
                cogoToast.error(`${error.message}`);
                setLoading(false)
            });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    return (
        <DefaultLayout>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Sr No.</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        loading ? <Spinner /> : member.map((mr, index) =>
                            <tr key={mr._id} >
                                <th scope="row">{index}</th>
                                <td>{mr.firstName}</td>
                                <td>{mr.lastName}</td>
                                <td>{mr.email}</td>
                                <td>{mr.address}</td>
                                <td>{mr.gender}</td>
                                <td>
                                    <Button type="primary" >
                                        <Link to={`/editMember/${mr._id}`} >Edit</Link>
                                    </Button>
    
                                    <Button style={{marginLeft:'7px'}} onClick={()=>showDeleteConfirm(mr._id)} type="primary" danger  >
                                        Delete
                                    </Button>
                                </td>

                            </tr>
                        )
                    }


                </tbody>
            </table>
        </DefaultLayout>
    );
};

export default AllMembers;
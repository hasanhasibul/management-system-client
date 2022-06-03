import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../Componants/DefauldLayout/DefaultLayout';
import cogoToast from 'cogo-toast';
import { Link,useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { Button,Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const AllTrainers = () => {
    const nagivate = useNavigate()
    const [member, setMember] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        const token = localStorage.getItem("Token")
        axios.get('https://vast-journey-49790.herokuapp.com/api/v1/readTrainers', {
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
    // const handleDelete =(id)=>{
    //     setLoading(true)
    //     const token = localStorage.getItem("Token")

    //     axios.post('https://vast-journey-49790.herokuapp.com/api/v1/deleteTrainer', 
    //         {
    //             id:id
    //         }
    //     , {
    //         headers: {
    //             'token-key': `${token}`
    //         }
    //     })
    //         .then(function (response) {
    //             cogoToast.success(`${response.data.status}`);
    //         })
    //         .catch(function (error) {
    //             cogoToast.error(`${error.message}`);
    //             setLoading(false)
    //         });
    // }


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

        axios.post('https://vast-journey-49790.herokuapp.com/api/v1/deleteTrainer', 
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
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Rate</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                      loading ? <Spinner/> :  member.map((mr,index)=>
                            <tr key={mr._id} >
                            <th scope="row">{index}</th>
                            <td>{mr.name}</td>
                            <td>{mr.email}</td>
                            <td>{mr.contact}</td>
                            <td>{mr.rate}</td>
                            <td>{mr.gender}</td>
                            <td> 

                            <Button type="primary" >
                                        <Link to={`/editTrainer/${mr._id}`} >Edit</Link>
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

export default AllTrainers;
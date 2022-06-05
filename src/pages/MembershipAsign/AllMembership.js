import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../Componants/DefauldLayout/DefaultLayout';
import cogoToast from 'cogo-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Spinner from './../../Componants/Spinner';

const { confirm } = Modal;

const AllMembership = () => {
    const nagivate = useNavigate()
    const [member, setMember] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const token = localStorage.getItem("Token")
        axios.get('https://vast-journey-49790.herokuapp.com/api/v1/readMembership', {
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

                axios.post('https://vast-journey-49790.herokuapp.com/api/v1/deleteMembership',
                    {
                        id: id
                    }
                    , {
                        headers: {
                            'token-key': `${token}`
                        }
                    })
                    .then(function (response) {
                        cogoToast.loading("Deleting...").then(() => {
                            cogoToast.success(` Deleting Success`);
                            nagivate(0)
                        })
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
             {
                 loading ? <Spinner/> : 
                 member.length ? <table class="table table-bordered">
                 <thead>
                     <tr>
                         <th scope="col">Sr No.</th>
                         <th scope="col">Member Name</th>
                         <th scope="col">Plan Type</th>
                         <th scope="col">Package</th>
                         <th scope="col">Trainer</th>
                         <th scope="col">Start Date</th>
                         <th scope="col">End Date</th>
                         <th scope="col">Status</th>
                         <th scope="col">Action</th>
                     </tr>
                 </thead>
                 <tbody>

                     {
                         member.map((mr, index) =>
                             <tr key={mr._id} >
                                 <th scope="row">{index}</th>
                                 <td>{mr.memberName}</td>
                                 <td>{mr.planType}</td>
                                 <td>{mr.package}</td>
                                 <td>{mr.trainer}</td>
                                 <td>{new Date(mr.startDate).toLocaleDateString()}</td>
                                 <td>{new Date(mr.endDate).toLocaleDateString()}</td>
                                 <td>{mr.status}</td>
                                 <td>

                                     <Button type="primary" >
                                         <Link to={`/editMembership/${mr._id}`} >Edit</Link>
                                     </Button>

                                     <Button style={{ marginLeft: '7px' }} onClick={() => showDeleteConfirm(mr._id)} type="primary" danger  >
                                         Delete
                                     </Button>
                                 </td>

                             </tr>
                         )
                     }


                 </tbody>
             </table> : <div className="spinner"><h4>Member Not Found</h4></div>
             }

        </DefaultLayout>
    );
};

export default AllMembership;
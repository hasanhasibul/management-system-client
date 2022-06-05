import React, { useEffect, useState } from 'react';
import {
    Form,
    Select,
    Button,
    DatePicker
} from 'antd';
import DefaultLayout from '../../Componants/DefauldLayout/DefaultLayout';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Componants/Spinner';
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const CreateMembership = () => {
    const [form] = Form.useForm();
    const [packageName, setPackageName] = useState([]);
    const [memberName, setMemberName] = useState([]);
    const [trainerName, setTrainerName] = useState([]);
    const [plan, setPlan] = useState([]);
    const [Loading, setLoading] = useState(true);
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("Token")
        axios.get('https://vast-journey-49790.herokuapp.com/api/v1/readPackageName', {
            headers: {
                'token-key': `${token}`
            }

        })

            .then(function (response) {
                setPackageName(response.data.data)
            })
            .catch(function (error) {
                cogoToast.error(`${error.message}`);
            })

        axios.get('https://vast-journey-49790.herokuapp.com/api/v1/readMemberName', {
            headers: { 'token-key': `${token}` }
        }).then(function (response) {
            setMemberName(response.data.data)
        })
            .catch(function (error) {
                cogoToast.error(`${error.message}`);
            })
        axios.get('https://vast-journey-49790.herokuapp.com/api/v1/readPlanType', {
            headers: { 'token-key': `${token}` }
        }).then(function (response) {
            setPlan(response.data.data)
        })
            .catch(function (error) {
                cogoToast.error(`${error.message}`);
            })
        axios.get('https://vast-journey-49790.herokuapp.com/api/v1/readTrainersName', {
            headers: { 'token-key': `${token}` }
        }).then(function (response) {
            setTrainerName(response.data.data)
            
        })
            .catch(function (error) {
                cogoToast.error(`${error.message}`);
            })
        setLoading(false)
    }, [])

    const onFinish = (values) => {
        const token = localStorage.getItem("Token")
        axios.post('https://vast-journey-49790.herokuapp.com/api/v1/createMembership',
            values
            , {
                headers: {
                    'token-key': `${token}`
                }
            })
            .then(function (response) {
                cogoToast.loading("Loading...").then(() => {
                    cogoToast.success(` added Success`);
                    navigate('/allMembership')
                })
            })
            .catch(function (error) {
                cogoToast.error(`${error.message}`);
            });



    };

    return (
        <DefaultLayout >
            {
                Loading ? <Spinner /> :

                    <Form
                        {...formItemLayout}
                        form={form}
                        layout="vertical"
                        name="register"

                        onFinish={onFinish}
                        initialValues={{
                            residence: ['zhejiang', 'hangzhou', 'xihu'],
                            prefix: '86',
                        }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="memberName"
                            label="Member Name"
                            rules={[{ required: true, message: 'Please select status!' }]}
                        >
                            <Select placeholder="select your Member name">
                                {
                                    memberName.length && memberName.map(pk => {
                                        return (
                                            <Option value={pk.firstName}>
                                                {pk.firstName + " " + pk.lastName}
                                            </Option>
                                        );
                                    })
                                }
                            </Select>
                        </Form.Item>


                        <Form.Item
                            name="planType"
                            label="Plan Type"
                            rules={[{ required: true, message: 'Please select status!' }]}
                        >
                            <Select placeholder="select your package">
                                {
                                    plan.length && plan.map(pk => {
                                        console.log(pk.packageName);
                                        return (
                                            <Option value={pk.planType}>
                                                {pk.planType}
                                            </Option>
                                        );
                                    })
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="package"
                            label="package"
                            rules={[{ required: true, message: 'Please select status!' }]}
                        >
                            <Select placeholder="select your package">
                                {
                                    packageName.length && packageName.map(pk => {
                                        console.log(pk.packageName);
                                        return (
                                            <Option value={pk.packageName}>
                                                {pk.packageName}
                                            </Option>
                                        );
                                    })
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="trainer"
                            label="Trainer"
                            rules={[{ required: true, message: 'Please select status!' }]}
                        >
                            <Select placeholder="select your trainer">
                                {
                                    trainerName.length && trainerName.map(pk => {
                                        return (
                                            <Option value={pk.name}>
                                                {pk.name}
                                            </Option>
                                        );
                                    })
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="startDate" label="startDate"
                        >
                            <DatePicker style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item
                            name="endDate" label="endDate"
                        >
                            <DatePicker style={{ width: "100%" }} />
                        </Form.Item>

                        <Form.Item
                            name="status"
                            label="Status"
                            rules={[{ required: true, message: 'Please select status!' }]}
                        >
                            <Select placeholder="select your Status">

                                <Option value="active">Active</Option>
                                <Option value="inactive">Inactive</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Add Membership
                            </Button>
                        </Form.Item>
                    </Form>
            }
        </DefaultLayout>
    );
};

export default CreateMembership;
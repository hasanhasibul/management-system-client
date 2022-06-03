import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    InputNumber,
    Select,
    Button,
    DatePicker
} from 'antd';
import DefaultLayout from '../../Componants/DefauldLayout/DefaultLayout';
import axios from 'axios';
import cogoToast from 'cogo-toast';
const { Option } = Select;

const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

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

    useEffect(() => {
        const token = localStorage.getItem("Token")
        axios.get('http://localhost:5000/api/v1/readPackageName', {

            headers: {
                'token-key': `${token}`
            }

        })

            .then(function (response) {
                console.log(response.data.data);
                setPackageName(response.data.data)
            })
            .catch(function (error) {
                cogoToast.error(`${error.message}`);
            })

        axios.get('http://localhost:5000/api/v1/readMemberName', {
            headers: {'token-key': `${token}`}
        }).then(function (response) {
                setMemberName(response.data.data)
            })
            .catch(function (error) {
                cogoToast.error(`${error.message}`);
            })
        axios.get('http://localhost:5000/api/v1/readTrainersName', {
            headers: {'token-key': `${token}`}
        }).then(function (response) {
                setTrainerName(response.data.data)
            })
            .catch(function (error) {
                cogoToast.error(`${error.message}`);
            })
    }, [])

    const onFinish = (values) => {
        console.log(values);
        console.log(values.startDate._d);
        const token = localStorage.getItem("Token")
        axios.post('http://localhost:5000/api/v1/createMembership',
            values
            , {
                headers: {
                    'token-key': `${token}`
                }
            })
            .then(function (response) {
                cogoToast.success(`${response.data.status}`);
            })
            .catch(function (error) {
                cogoToast.error(`${error.message}`);
            });



    };

    return (
        <DefaultLayout >
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
                                console.log(pk.firstName);
                                return (
                                    <Option value={pk.firstName}>
                                        {pk.firstName+" "+pk.lastName}
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
        </DefaultLayout>
    );
};

export default CreateMembership;
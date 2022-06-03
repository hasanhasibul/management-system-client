import React, { useState } from 'react';
import {
    Form,
    Input,
    InputNumber,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd';
import DefaultLayout from './../../Componants/DefauldLayout/DefaultLayout';
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

const AddMember = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const token = localStorage.getItem("Token")

        axios.post('https://vast-journey-49790.herokuapp.com/api/v1/createMember', 
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
                    name="firstName"
                    label="First Name"
                    rules={[{ required: true, message: 'Please input your First name!', whitespace: false }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[{ required: true, message: 'Please input your last name!', whitespace: false }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Address"
                    rules={[{ required: true, message: 'Please input your address!', whitespace: false }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ type: 'email', required: true, message: 'Please input your email!', whitespace: false }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[{ required: true, message: 'Please select Gender!' }]}
                >
                    <Select placeholder="select your Gender">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Add Member
                    </Button>
                </Form.Item>
            </Form>
        </DefaultLayout>
    );
};

export default AddMember;
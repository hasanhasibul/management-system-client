import React, { useState } from 'react';
import {
    Form,
    Input,
    InputNumber,
    Button
} from 'antd';
import DefaultLayout from './../../Componants/DefauldLayout/DefaultLayout';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { useNavigate } from 'react-router-dom';


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

const AddPackages = () => {
    const [form] = Form.useForm();
    const navigate =  useNavigate()
    const onFinish = (values) => {
        const token = localStorage.getItem("Token")
        axios.post('https://vast-journey-49790.herokuapp.com/api/v1/createPackage', 
            values
        , {
            headers: {
                'token-key': `${token}`
            }
        })
            .then(function (response) {
                cogoToast.loading("Loading...").then(()=>{
                    cogoToast.success(`Package added Success`);
                    navigate('/allPackage')
                })
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
                    name="packageName"
                    label="Package Name"
                    rules={[{ required: true, message: 'Please input your First name!', whitespace: false }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="amount"
                    label="Amount"
                    rules={[{  type: 'number', required: true, message: 'Please input  Amount!', whitespace: false }]}
                >
                     <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please input Description!', whitespace: false }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Add Package
                    </Button>
                </Form.Item>
            </Form>
        </DefaultLayout>
    );
};

export default AddPackages;
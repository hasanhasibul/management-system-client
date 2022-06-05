import React, { useEffect, useState } from 'react';
import {
    Form,
    Select,
    Button,
    TimePicker
} from 'antd';
import DefaultLayout from '../../Componants/DefauldLayout/DefaultLayout';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import Spinner from './../../Componants/Spinner';
import { useNavigate } from 'react-router-dom';

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

const AddSchedule = () => {
    const [form] = Form.useForm();
    const [memberName, setMemberName] = useState([]);
    const [Loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("Token")
        axios.get('https://vast-journey-49790.herokuapp.com/api/v1/readMemberName', {
            headers: { 'token-key': `${token}` }
        }).then(function (response) {
            setMemberName(response.data.data)
            setLoading(false)
        })
            .catch(function (error) {
                cogoToast.error(`${error.message}`);
            })
    }, [])

    const onFinish = (values) => {
        const token = localStorage.getItem("Token")
        axios.post('https://vast-journey-49790.herokuapp.com/api/v1/createSchedule',
            values
            , {
                headers: {
                    'token-key': `${token}`
                }
            })
            .then(function (response) {
                cogoToast.loading("Loading...").then(() => {
                    cogoToast.success(` added Success`);
                    navigate('/allSchedule')
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
                                            <Option value={pk.firstName + " " + pk.lastName}>
                                                {pk.firstName + " " + pk.lastName}
                                            </Option>
                                        );
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="mf"
                            label="Month From"
                            rules={[{ required: true, message: 'Please select status!' }]}
                        >
                            <Select placeholder="select your Status">

                                <Option value="January">January</Option>
                                <Option value="February">February</Option>
                                <Option value="March">March</Option>
                                <Option value="April">April</Option>
                                <Option value="May">May</Option>
                                <Option value="June">June</Option>
                                <Option value="July">July</Option>
                                <Option value="August">August</Option>
                                <Option value="September">September</Option>
                                <Option value="October">October</Option>
                                <Option value="November">November</Option>
                                <Option value="December">December</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="mt"
                            label="Month To"
                            rules={[{ required: true, message: 'Please select status!' }]}
                        >
                            <Select placeholder="select your Status">

                                <Option value="January">January</Option>
                                <Option value="February">February</Option>
                                <Option value="March">March</Option>
                                <Option value="April">April</Option>
                                <Option value="May">May</Option>
                                <Option value="June">June</Option>
                                <Option value="July">July</Option>
                                <Option value="August">August</Option>
                                <Option value="September">September</Option>
                                <Option value="October">October</Option>
                                <Option value="November">November</Option>
                                <Option value="December">December</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="dow"
                            label="Day of week"
                            rules={[{ required: true, message: 'Please select status!' }]}
                        >
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="select one country"
                                defaultValue={['Saturday']}
                                optionLabelProp="label"
                            >
                                <Option value="Saturday">Saturday</Option>
                                <Option value="Sunday">Sunday</Option>
                                <Option value="Monday">Monday</Option>
                                <Option value="Tuesday">Tuesday</Option>
                                <Option value="Wednesday">Wednesday</Option>
                                <Option value="Thursday">Thursday</Option>
                                <Option value="Friday">Friday</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="tf" label="Time From"
                        >
                            <TimePicker style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item
                            name="tt" label="Time To"
                        >
                            <TimePicker style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Add Schedule
                            </Button>
                        </Form.Item>
                    </Form>
            }
        </DefaultLayout>
    );
};

export default AddSchedule;
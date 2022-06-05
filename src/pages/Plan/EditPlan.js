import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    InputNumber,
    Button,
} from 'antd';
import DefaultLayout from './../../Componants/DefauldLayout/DefaultLayout';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { useParams } from 'react-router-dom';
import Spinner from '../../Componants/Spinner';
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

const EditPlan = () => {
    const [form] = Form.useForm();
    let { id } = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("Token")
        axios.post('https://vast-journey-49790.herokuapp.com/api/v1/readPlanById',
            {
                id: id
            }
            , {
                headers: {
                    'token-key': `${token}`
                }
            })
            .then(function (response) {
                form.setFieldsValue({
                    planType: response.data.data[0].planType,
                    amount: response.data.data[0].amount
                });
                setLoading(false)
            })
            .catch(function (error) {
                cogoToast.error(`${error.message}`);
            });
    }, [])
    const onFinish = (values) => {
        const token = localStorage.getItem("Token")

        const newValues = {
            ...values,
            id: id
        }
        axios.post('https://vast-journey-49790.herokuapp.com/api/v1/updatePlan',
            newValues
            , {
                headers: {
                    'token-key': `${token}`
                }
            })
            .then(function (response) {

                cogoToast.loading("Updating...").then(() => {
                    cogoToast.success(`Updated Success`);
                    navigate('/allTrainer')
                })
            })
            .catch(function (error) {
                cogoToast.error(`${error.message}`);
            });



    };

    return (
        <DefaultLayout >
            {
                loading ? <Spinner /> :

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
                            name="planType"
                            label="PlanType"
                            rules={[{ required: true, message: 'Please input your First name!', whitespace: false }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="amount"
                            label="amount"
                            rules={[{ type: 'number', required: true, message: 'Please input your amount!', whitespace: false }]}
                        >
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Update Package
                            </Button>
                        </Form.Item>
                    </Form>
            }
        </DefaultLayout>
    );
};

export default EditPlan;
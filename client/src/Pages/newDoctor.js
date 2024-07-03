import React from "react";
import axios from "axios";
import { useState } from "react";
import { Form, Button, Input, message, Row, Col, Card, Select } from 'antd';
import Design from "../Components/design";
import { useNavigate } from "react-router-dom";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
const { Option } = Select

const NewDoctor = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
            const response = await axios.post("http://localhost:8000/api/admin/adddoctor", values);
            if (response.data.success) {
                message.success("Doctor Added Successfully")
                navigate('/view-doctor')
            }
        } catch (error) {
            setError(error.response.data.message);
            if(error.response.data.field){
                message.error(`${error.response.data.field} is already exist`)
            }
        }
    }
    return (
        <Design>
            <Card title="New Doctor">
                <Form
                    name="new-doctor"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Row>
                        <Col span={11}>
                            <Form.Item
                                name='Userid'
                                label='Username'
                                rules={[{ required: true, message: "please enter your username" }]}
                                validateStatus={error && error.field === 'Userid' ? 'error' : ''}
                                help={error && error.field === 'Userid' ? error.message : ''}
                            >
                                <Input prefix={<PersonOutlineOutlinedIcon />} placeholder='Enter your username' />
                            </Form.Item>
                        </Col>
                        <Col span={11} offset={1}>
                            <Form.Item
                                name='Password'
                                label='Password'
                                rules={[{ required: true, message: 'please enter your password' }, { min: 6 }]}
                            >
                                <Input.Password prefix={<KeyOutlinedIcon />} placeholder='Enter your password' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item
                                name='Name'
                                label='Name'
                                rules={[{ required: true, message: 'please enter your Name' }]}
                            >
                                <Input prefix={<AccountCircleOutlinedIcon />} placeholder='Enter your Name' />
                            </Form.Item>
                        </Col>
                        <Col span={11} offset={1}>
                            <Form.Item
                                name='Email'
                                label='Email ID'
                                rules={[{ required: true, message: 'please enter your Email ID' }]}
                                validateStatus={error && error.field === 'Email' ? 'error' : ''}
                                help={error && error.field === 'Email' ? error.message : ''}
                            >
                                <Input prefix={<AccountCircleOutlinedIcon />} placeholder='please enter your email' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        name='Gender'
                        label='Gender'
                        rules={[{ required: true, message: 'please select your Gender' }]}
                    >
                        <Select placeholder='Select the Designation'>
                            <Option value='Male'>Male</Option>
                            <Option value='Female'>Female</Option>
                            <Option value='Other'>Other</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="Aadhar"
                        label="Aadhar Number"
                        rules={[{ required: true, message: 'please enter your Aadhar' }, { len: 12, message: "Enter a valid Aadhar number" }]}
                        validateStatus={error && error.field === 'Aadhar' ? 'error' : ''}
                        help={error && error.field === 'Aadhar' ? error.message : ''}
                    >
                        <Input prefix={<VerifiedUserOutlinedIcon />} placeholder='Enter your Aadhar' />
                    </Form.Item>
                    <Form.Item
                        name="Phone"
                        label="Phone Number"
                        rules={[{ required: true, message: 'please enter your Phone' }, { len: 10, message: "Enter a valid Phone number" }]}
                        validateStatus={error && error.field === 'Phone' ? 'error' : ''}
                        help={error && error.field === 'Phone' ? error.message : ''}
                    >
                        <Input prefix={<PhoneEnabledOutlinedIcon />} placeholder='Enter your Phone' />
                    </Form.Item>
                    <Form.Item
                        name="Address"
                        label="Address"
                        rules={[{ required: true, message: 'please enter your Address' }]}
                    >
                        <Input prefix={<BusinessOutlinedIcon />} placeholder='Enter your Address' />
                    </Form.Item>
                    <Form.Item
                        name="Pincode"
                        label="Pincode"
                        rules={[{ required: true, message: 'please enter your Pincode' }, { len: 6, message: "Enter a valid Pincode" }]}
                    >
                        <Input prefix={<PlaceOutlinedIcon />} placeholder='Enter your Pincode' />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" block>Submit</Button>
                    </Form.Item>
                </Form>
            </Card>
        </Design>
    );
}

export default NewDoctor;
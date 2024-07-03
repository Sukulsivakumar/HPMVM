import React, { useState } from "react";
import axios from "axios";
import Design from "../Components/design";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, DatePicker, Card, Select } from 'antd';
import moment from 'moment';
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const tabletOptions = [
    "Paracetamol", "Ibuprofen", "Aspirin", "Amoxicillin", "Ciprofloxacin",
    "Metformin", "Atenolol", "Losartan", "Simvastatin", "Omeprazole",
    "Levothyroxine", "Gabapentin", "Prednisone", "Clindamycin", "Azithromycin",
    "Warfarin", "Lisinopril", "Metoprolol", "Citalopram", "Furosemide"
];

const NewPrescription = () => {
    const navigate = useNavigate();
    const doctorId = localStorage.getItem('Userid');
    const patientId = localStorage.getItem('patientid');
    const patientName = localStorage.getItem('patientname');

    const [form] = Form.useForm();
    const [selectedTablets, setSelectedTablets] = useState([]);

    const onFinish = async (values) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/doctor/newprescrition`, values);
            console.log(response.data);
            
            navigate('/print-prescription', { state: { prescription: response.data.prescription } });
        } catch (error) {
            console.log(error);
        }
        console.log('Received values of form:', values);
        localStorage.removeItem('patientid');
    };

    const handleTabletChange = (value, index) => {
        setSelectedTablets((prevSelectedTablets) => {
            const newSelectedTablets = [...prevSelectedTablets];
            newSelectedTablets[index] = value;
            return newSelectedTablets;
        });
    };

    const availableTablets = (index) => {
        const selectedValues = selectedTablets.filter((_, i) => i !== index);
        return tabletOptions.filter((tablet) => !selectedValues.includes(tablet));
    };

    return (
        <div>
            <Design>
                <Card>
                    <Form
                        form={form}
                        name="dynamic_form_nest_item"
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                        autoComplete="off"
                    >
                        <Form.Item name="patientId" label="Patient ID" initialValue={patientId} rules={[{ required: true, message: 'Please input patient ID' }]}>
                            <Input disabled />
                        </Form.Item>
                        <Form.Item name="doctorId" label="Doctor ID" initialValue={doctorId} rules={[{ required: true, message: 'Please input doctor ID' }]}>
                            <Input disabled />
                        </Form.Item>
                        <Form.Item name="name" label="Name" initialValue={patientName} rules={[{ required: true, message: 'Please input patient name' }]}>
                            <Input disabled />
                        </Form.Item>
                        <Form.Item name="disease" label="Diseases" rules={[{ required: true, message: 'Please enter the disease' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="date" label="Date" initialValue={moment()} rules={[{ required: true, message: 'Please select a date' }]}>
                            <DatePicker disabled defaultValue={moment()} />
                        </Form.Item>

                        <Form.List name="tablets">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Space
                                            key={field.key}
                                            style={{ display: 'flex', marginBottom: 8 }}
                                            align="baseline"
                                        >
                                            <Form.Item
                                                {...field}
                                                name={[field.name, 'tabletName']}
                                                fieldKey={[field.fieldKey, 'tabletName']}
                                                rules={[{ required: true, message: 'Missing tablet name' }]}
                                            >
                                                <Select
                                                    placeholder="Select Tablet"
                                                    onChange={(value) => handleTabletChange(value, index)}
                                                >
                                                    {availableTablets(index).map((tablet) => (
                                                        <Option key={tablet} value={tablet}>
                                                            {tablet}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                name={[field.name, 'count']}
                                                fieldKey={[field.fieldKey, 'count']}
                                                rules={[{ required: true, message: 'Missing count' }]}
                                            >
                                                <Input placeholder="Count" type="number" />
                                            </Form.Item>
                                            <MinusCircleOutlined
                                                onClick={() => {
                                                    remove(field.name);
                                                    setSelectedTablets((prevSelectedTablets) => prevSelectedTablets.filter((_, i) => i !== index));
                                                }}
                                            />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add Tablet
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Design>
        </div>
    );
};

export default NewPrescription;

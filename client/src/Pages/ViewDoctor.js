import React, { useState, useEffect } from "react";
import axios from "axios";
import { message, Table, Space, Button, Modal, Descriptions, Form, Input, Popconfirm } from "antd";
import Design from "../Components/design";
import { useNavigate } from "react-router-dom";

const ViewDoctor = () => {
    const [doctor, setDoctor] = useState([]);
    const [visible, setVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [recordToUpdate, setRecordToUpdate] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const auth = localStorage.getItem('auth');
            const userId = localStorage.getItem('Userid');
            if (!auth || !userId) {
                message.error('Please login to continue');
                navigate('/');
            }
            const response = await axios.get(`http://localhost:8000/api/admin/viewdoctor`);
            setDoctor(response.data.doctor);
        } catch (error) {
            message.error("Failed to fetch user data");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            title: "Serial No",
            align: "center",
            render: (text, record, index) => <div style={{ textAlign: 'center' }} >{index + 1}</div>
        },
        {
            title: "Doctor Id",
            dataIndex: "Userid",
            key: "Userid",
            align: "center",
        },
        {
            title: "Doctor Name",
            dataIndex: "Name",
            key: "Name",
            align: "center",
        },
        {
            title: "Email Id",
            dataIndex: "Email",
            key: "Email",
            align: "center",
        },
        {
            title: "Actions",
            key: "actions",
            align: "center",
            width: '150px',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleView(record)}>View</Button>
                    <Button type="primary" onClick={() => handleUpdate(record)}>Update</Button>
                    <Popconfirm
                        title="Are you sure to delete this record?"
                        onConfirm={() => handleDelete(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger>Delete</Button>
                    </Popconfirm>

                </Space>
            )
        }
    ];

    const handleView = (record) => {
        setSelectedDoctor(record);
        setVisible(true);
    };

    const handleUpdate = (record) => {
        setRecordToUpdate(record)
        setSelectedDoctor(record);
        setUpdateModalVisible(true);
        form.setFieldsValue({
            Userid: record.Userid,
            Name: record.Name,
            Email: record.Email,
            Gender: record.Gender,
            Aadhar: record.Aadhar,
            Phone: record.Phone,
            Address: record.Address,
            Pincode: record.Pincode
        });
    };

    const handleDelete = async (record) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/admin/deletedoctor/${record.Userid}`);
            if (response.data.success) {
                message.success(response.data.message)
                fetchData();
            }
        } catch (error) {
            message.error(error.response.data.message)
        }
    };

    const handleModalClose = () => {
        setVisible(false);
    };
    const handleUpdateModalClose = () => {
        setUpdateModalVisible(false);
    };

    const handleUpdateSubmit = async () => {
        const updateValues = form.getFieldsValue()
        try {
            const response = await axios.put(`http://localhost:8000/api/admin/updatedoctor/${recordToUpdate.Userid}`, updateValues);
            if (response.data.success) {
                message.success(response.data.message);
            }
        } catch (error) {
            message.error(error.response.data.message)
        }
        setUpdateModalVisible(false);
        fetchData()
    };

    return (
        <Design>
            <Table dataSource={doctor} columns={columns} rowKey="_id" />
            <Modal
                title="Doctor Details"
                visible={visible}
                onCancel={handleModalClose}
                footer={null}
                width='500px'
            >
                {selectedDoctor && (
                    <div>
                        <Descriptions bordered column={1} >
                            <Descriptions.Item label="Doctor Id">{selectedDoctor.Userid}</Descriptions.Item>
                            <Descriptions.Item label="Name">{selectedDoctor.Name}</Descriptions.Item>
                            <Descriptions.Item label="Email Id">{selectedDoctor.Email}</Descriptions.Item>
                            <Descriptions.Item label="Gender">{selectedDoctor.Gender}</Descriptions.Item>
                            <Descriptions.Item label="Aadhar Number">{selectedDoctor.Aadhar}</Descriptions.Item>
                            <Descriptions.Item label="Phone Number">{selectedDoctor.Phone}</Descriptions.Item>
                            <Descriptions.Item label="Address">{selectedDoctor.Address}</Descriptions.Item>
                            <Descriptions.Item label="Pincode">{selectedDoctor.Pincode}</Descriptions.Item>
                        </Descriptions>
                    </div>
                )}
            </Modal>
            <Modal
                title="Update Doctor"
                visible={updateModalVisible}
                onCancel={handleUpdateModalClose}
                onOk={handleUpdateSubmit}
                width='500px'
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Doctor Id" name="Userid" >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Name" name="Name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="Email">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Gender" name="Gender">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Aadhar Number" name="Aadhar">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Phone Number" name="Phone">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Address" name="Address">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Pincode" name="Pincode">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </Design>
    );
}

export default ViewDoctor;

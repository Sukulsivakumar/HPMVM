import React, { useState, useEffect } from "react";
import axios from "axios";
import { message, Table, Space, Button, Modal, Descriptions, Form, Popconfirm, Input } from "antd";
import Design from "../Components/design";
import { useNavigate } from "react-router-dom";

const ViewPatient = () => {
    const [patient, setPatient] = useState([]);
    const [visible, setVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [recordToUpdate, setRecordToUpdate] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const role = localStorage.getItem('Role');

    const fetchData = async () => {
        try {
            const auth = localStorage.getItem('auth');
            const userId = localStorage.getItem('Userid');
            const role = localStorage.getItem('Role');
            if (!auth || !userId || !role) {
                message.error('Please login to continue');
                navigate('/');
            }
            if (role === 'doctor') {
                const response = await axios.get(`http://localhost:8000/api/${role}/viewpatient/${userId}`);
                setPatient(response.data.patient);
            } else {
                const response = await axios.get(`http://localhost:8000/api/${role}/viewpatient`);
                setPatient(response.data.patient);
            }
        } catch (error) {
            console.log("Error fetching user data:", error);
            message.error("Failed to fetch user data");
        }
    };

    useEffect(() => {
        fetchData();
    });

    const columns = [
        {
            title: "Serial No",
            align: "center",
            render: (text, record, index) => <div style={{ textAlign: "center" }}>{index + 1}</div>,
        },
        {
            title: "Patient Id",
            dataIndex: "Userid",
            key: "Userid",
            align: "center"
        },
        {
            title: "Name",
            dataIndex: "Name",
            key: "Name",
            align: "center"
        },
        {
            title: "Gender",
            dataIndex: "Gender",
            key: "Gender",
            align: "center"
        },
        {
            title: "Doctor Id",
            dataIndex: "Doctorid",
            key: "Doctorid",
            align: "center",
        },
        {
            title: "Actions",
            key: "actions",
            align: "center",
            width: '150px',
            render: (text, record) => (
                <Space size="middle">
                    {role === 'doctor' && <Button type="primary" onClick={() => handleNew(record)}>New</Button>}
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
            ),
        },
    ];

    const handleNew = (record) => {
        localStorage.setItem('patientid', record.Userid);
        localStorage.setItem('patientname', record.Name);
        navigate('/newprescription');
    };

    const handleView = (record) => {
        setSelectedPatient(record);
        setVisible(true);
    };

    const handleUpdate = (record) => {
        setRecordToUpdate(record);
        setSelectedPatient(record);
        setUpdateModalVisible(true);
        form.setFieldsValue({
            Userid: record.Userid,
            Name: record.Name,
            Gender: record.Gender,
            Doctorid: record.Doctorid,
            Aadhar: record.Aadhar,
            Phone: record.Phone,
            Address: record.Address,
            Pincode: record.Pincode
        });
    };

    const handleDelete = async (record) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/${role}/deletepatient/${record.Userid}`);
            if (response.data.success) {
                message.success(response.data.message);
                fetchData();
            }
        } catch (error) {
            message.error(error.response.data.message);
        }
    };

    const handleModalClose = () => {
        setVisible(false);
    };

    const handleUpdateModalClose = () => {
        setUpdateModalVisible(false);
    };

    const handleUpdateSubmit = async () => {
        const values = form.getFieldsValue();
        try {
            const response = await axios.put(`http://localhost:8000/api/${role}/updatepatient/${recordToUpdate.Userid}`, values);
            if (response.data.success) {
                message.success(response.data.message);
                fetchData();
            }
        } catch (error) {
            message.error(error.response.data.message);
        }
        setUpdateModalVisible(false);
    };

    return (
        <div>
            <Design>
                <Table dataSource={patient} columns={columns} rowKey="_id" />
                <Modal
                    title="Patient Details"
                    visible={visible}
                    onCancel={handleModalClose}
                    footer={null}
                    width='500px'
                >
                    {selectedPatient && (
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Patient Id">{selectedPatient.Userid}</Descriptions.Item>
                            <Descriptions.Item label="Name">{selectedPatient.Name}</Descriptions.Item>
                            <Descriptions.Item label="Gender">{selectedPatient.Gender}</Descriptions.Item>
                            <Descriptions.Item label="Doctor Id">{selectedPatient.Doctorid}</Descriptions.Item>
                            <Descriptions.Item label="Aadhar">{selectedPatient.Aadhar}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{selectedPatient.Phone}</Descriptions.Item>
                            <Descriptions.Item label="Address">{selectedPatient.Address}</Descriptions.Item>
                            <Descriptions.Item label="Pincode">{selectedPatient.Pincode}</Descriptions.Item>
                        </Descriptions>
                    )}
                </Modal>
                <Modal
                    title="Update Patient"
                    visible={updateModalVisible}
                    onOk={handleUpdateSubmit}
                    onCancel={handleUpdateModalClose}
                    width='500px'
                >
                    <Form form={form} layout="vertical">
                        <Form.Item label="Patient Id" name="Userid">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Name" name="Name">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Gender" name="Gender">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Doctor ID" name="Doctorid">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label="Aadhar" name="Aadhar">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Phone" name="Phone">
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
        </div>
    );
}

export default ViewPatient;

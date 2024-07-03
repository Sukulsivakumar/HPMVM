import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, message, Row, Col, Card, Space, Modal, Form, Input, DatePicker, Descriptions, Popconfirm } from "antd";
import Design from "../Components/design";
import moment from "moment";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const Viewprescription = () => {
    const role = localStorage.getItem('Role');
    const userId = localStorage.getItem('Userid');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isViewModalVisible, setIsViewModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const fetchPrescriptions = async () => {
        setLoading(true);
        try {
            if (role === 'admin') {
                const response = await axios.get("http://localhost:8000/api/prescription/admin/viewprescription");
                console.log(response);
                setData(response.data.AdminPrescription);
            } else if( role === 'doctor') {
                const response = await axios.get(`http://localhost:8000/api/prescription/doctor/viewprescription/${userId}`);
                console.log(response);
                setData(response.data.DoctorPrescription);
            }else{
                const response = await axios.get(`http://localhost:8000/api/prescription/patient/viewprescription/${userId}`);
                console.log(response);
                setData(response.data.PatientPrescription);
            }

        } catch (error) {
            console.log(error);
            message.error("Failed to fetch prescriptions");
        } finally {
            setLoading(false);
        }
    };

    const handleView = (record) => {
        setSelectedRecord(record);
        setIsViewModalVisible(true);
    };

    const handleDelete = async (record) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/prescription/${role}/deleteprescription/${record.patientId}`);
            console.log(response);
            if (response.data.success) {
                message.success(response.data.message);
                fetchPrescriptions();
            }
        } catch (error) {
            message.error(error.response.data.message);
        }
    };

    const columns = [
        {
            title: 'Patient ID',
            dataIndex: 'patientId',
            key: 'patientId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => moment(text).format('YYYY-MM-DD'),
        },
        {
            title: 'Action',
            key: 'action',
            width: '200px',
            render: (text, record) => (
                <Space>
                    <Button type="primary" onClick={() => handleView(record)}>View</Button>
                    <Popconfirm
                        title="Are you sure to delete this prescription?"
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

    return (
        <div>
            <Design>
                <Row>
                    <Col span={24}>
                        <Card title="Prescriptions">
                            <Table
                                columns={columns}
                                dataSource={data}
                                rowKey="_id"
                                loading={loading}
                            />
                        </Card>
                    </Col>
                </Row>
                <Modal
                    title="View Prescription"
                    visible={isViewModalVisible}
                    onCancel={() => setIsViewModalVisible(false)}
                    footer={null}
                >
                    {selectedRecord && (
                        <div >
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Patient ID">{selectedRecord.patientId}</Descriptions.Item>
                            <Descriptions.Item label="Doctor ID">{selectedRecord.doctorId}</Descriptions.Item>
                            <Descriptions.Item label="Prescription ID">{selectedRecord.PrescriptionId}</Descriptions.Item>
                            <Descriptions.Item label="Name">{selectedRecord.name}</Descriptions.Item>
                            <Descriptions.Item label="Disease">{selectedRecord.disease}</Descriptions.Item>
                            <Descriptions.Item label="Date">{moment(selectedRecord.date).format('YYYY-MM-DD')}</Descriptions.Item>
                            <Descriptions.Item label="Tablets">
                                {selectedRecord.tablets.map((tablet, index) => (
                                    <div key={index}>{tablet.tabletName} - {tablet.count}</div>
                                ))}
                            </Descriptions.Item>
                        </Descriptions>
                        <br />
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button type="primary" onClick={()=>{navigate('/print-prescription',{state: {prescription: selectedRecord}})}}>Print</Button>
                            </div>
                            </div>
                    )}
                </Modal>
            </Design>
        </div>
    );
}

export default Viewprescription;

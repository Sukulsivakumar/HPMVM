import React from "react";
import { useLocation } from "react-router-dom";
import { Card, Typography, Row, Col, Button,Space} from "antd";
import moment from "moment";

const { Title, Text } = Typography;

const PrintPrescription = () => {
    const location = useLocation();
    const { prescription } = location.state || {}; 
    const handlePrint = () => {
        window.print();
    };
    const handleBack =()=>{
        window.history.back();
    }
    const styles = {
        container: {
            padding: '20px',
        },
        header: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '20px',
        },
        card: {
            padding: '20px',
            border: '1px solid #f0f0f0',
            borderRadius: '10px',
            maxWidth: '800px',
            margin: '0 auto',
            fontSize: '16px',
            lineHeight: '1.5',
        },
        centerText: {
            textAlign: 'center',
        },
        section: {
            marginTop: '20px',
        },
        fieldLabel: {
            fontSize: '18px',
            fontWeight: 'bold',
        },
        tabletItem: {
            marginBottom: '8px',
        },
        '@media print': {
            header: {
                display: 'none',
            },
            body: {
                margin: '0',
                padding: '0',
                WebkitPrintColorAdjust: 'exact',
            },
            container: {
                padding: '0',
            },
            card: {
                border: 'none',
                padding: '0',
                width: '100%',
            },
            section: {
                marginTop: '20px',
            },
            fieldLabel: {
                fontSize: '18px',
            },
            tabletItem: {
                marginBottom: '4px',
            },
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <Space>
                <Button type="primary" onClick={handlePrint}>Print</Button>
                <Button type="primary" onClick={handleBack}>Back</Button>
                </Space>
            </div>
            <Card bordered={false} style={styles.card}>
                <Title level={2} style={styles.centerText}>Prescription</Title>
                <Row style={styles.section}>
                    <Col span={12}>
                        <Title level={4}>Doctor's Details</Title>
                        <Text strong style={styles.fieldLabel}>Doctor ID:</Text> {prescription?.doctorId}<br />
                    </Col>
                    <Col span={12}>
                        <Title level={4}>Patient's Details</Title>
                        <Text strong style={styles.fieldLabel}>Patient ID:</Text> {prescription?.patientId}<br />
                        <Text strong style={styles.fieldLabel}>Name:</Text> {prescription?.name}<br />
                    </Col>
                </Row>
                <Row style={styles.section}>
                    <Col span={24}>
                        <Title level={4}>Prescription Details</Title>
                        <Text strong style={styles.fieldLabel}>Prescription ID:</Text> {prescription?.PrescriptionId}<br />
                        <Text strong style={styles.fieldLabel}>Disease:</Text> {prescription?.disease}<br />
                        <Text strong style={styles.fieldLabel}>Date:</Text> {moment(prescription.date).format('MMMM Do YYYY')}<br />
                    </Col>
                </Row>
                <Row style={styles.section}>
                    <Col span={24}>
                        <Title level={4}>Medications</Title>
                        {prescription?.tablets?.map((tablet, index) => (
                            <div key={index} style={styles.tabletItem}>
                                <Text strong style={styles.fieldLabel}>{tablet.tabletName}</Text> - {tablet.count}
                            </div>
                        ))}
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default PrintPrescription;

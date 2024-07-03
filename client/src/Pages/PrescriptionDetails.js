import moment from "moment";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card,Descriptions, message, Button,Space} from "antd";
const PrescriptionDetails = () => {
    const location = useLocation();
    const { prescription } = location.state || {};
    const navigate = useNavigate()
    return ( 
        <div>
            <Card title="Prescription Details">
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Prescription Id">{prescription.PrescriptionId}</Descriptions.Item>
                    <Descriptions.Item label="Name">{prescription.name}</Descriptions.Item>
                    <Descriptions.Item label="Prescription Date">{moment(prescription.prescriptionDate).format("DD-MM-YYYY")}</Descriptions.Item>
                    <Descriptions.Item label="Patient Id">{prescription.patientId}</Descriptions.Item>
                    <Descriptions.Item label="Doctor Id">{prescription.doctorId}</Descriptions.Item>
                    <Descriptions.Item label="Disease">{prescription.disease}</Descriptions.Item>
                    <Descriptions.Item label="Tablets">
                                {prescription.tablets.map((tablet, index) => (
                                    <div key={index}>{tablet.tabletName} - {tablet.count}</div>
                                ))}
                            </Descriptions.Item>
                </Descriptions>
                <br />
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Space>
                    <Button type="primary" onClick={() => navigate('/patient')}>Back</Button>
                    <Button type="primary" onClick={() => message.success("Payment Successfull")}>Pay</Button>
                    </Space>
                </div>
            </Card>
        </div>
     );
}
 
export default PrescriptionDetails;
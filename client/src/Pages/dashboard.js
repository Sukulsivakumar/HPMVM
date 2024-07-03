import React, { useState, useEffect } from "react";
import axios from "axios";
import { message, Row, Col, Card } from "antd";
import Design from "../Components/design";

const Dashboard = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth = localStorage.getItem('auth');
                const userId = localStorage.getItem('Userid');
                const role = localStorage.getItem('Role');
                if (!auth || !userId || !role) {
                    throw new Error('User not authenticated or missing data');
                }
                const response = await axios.get(`http://localhost:8000/api/${role}/dashboard/${userId}`);
                console.log(response)
                setUserData(response.data.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
                message.error("Failed to fetch user data");
            }
        };

        fetchData();
    }, []);

    return (
        <Design>
            <Row style={{ margin: '20px' }}>
                <Col span={10} offset={6} style={{ textAlign: 'center' }}>
                    <Card>
                        Welcome to HPMVM Dashboard
                    </Card>
                </Col>
            </Row>
            <Row style={{ margin: '20px' }}>
                <Col span={7} offset={1} style={{ textAlign: 'center' }}>
                    <Card>
                        User Id <br /> {userData?.Userid}
                    </Card>
                </Col>
                <Col span={7} offset={1} style={{ textAlign: 'center' }}>
                    <Card>
                        Name <br /> {userData?.Name}
                    </Card>
                </Col>
                <Col span={7} offset={1} style={{ textAlign: 'center' }}>
                    <Card>
                        Designation <br /> {userData?.Role && userData.Role.charAt(0).toUpperCase() + userData.Role.slice(1)}
                    </Card>
                </Col>
            </Row>
        </Design>
    );
}

export default Dashboard;

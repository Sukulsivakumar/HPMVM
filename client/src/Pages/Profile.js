import React, { useState, useEffect } from "react";
import axios from "axios";
import { message, Descriptions } from "antd";
import Design from "../Components/design";

const Profile = () => {
    const role = localStorage.getItem('Role')
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
        <div>
            <Design>
                <Descriptions bordered column={1}> 
                    <Descriptions.Item label="User Id">{userData && userData.Userid}</Descriptions.Item>
                    <Descriptions.Item label="Name">{userData && userData.Name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{userData && userData.Email}</Descriptions.Item>
                    <Descriptions.Item label="Gender">{userData && userData.Gender}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{userData && userData.Phone}</Descriptions.Item>
                    <Descriptions.Item label="Aadhar">{userData && userData.Aadhar}</Descriptions.Item>
                    <Descriptions.Item label="Address">{userData && userData.Address}</Descriptions.Item>
                    <Descriptions.Item label="Pincode">{userData && userData.Pincode}</Descriptions.Item>
                </Descriptions>
            </Design>
        </div>
     );
}
 
export default Profile;
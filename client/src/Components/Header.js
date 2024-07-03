// Header.js
import React from "react";
import { Layout, Button, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const HeaderBar = ({collapsed, toggleCollapsed }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        message.success('Logged out');
        navigate('/');
    }

    return (
        <Header style={{
            display: 'flex',
            padding: '0',
            height: 70,
            backgroundColor: '#E8E8E9',
            borderRadius: '0px 10px 10px 0px',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: '16px'
        }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggleCollapsed}
                style={{
                    fontSize: '0px',
                    width: 59,
                    height: 20
                }}
            />
            <Button onClick={handleLogout} type="primary" style={{ backgroundColor: 'red', borderColor: 'red' }}>Logout</Button>
        </Header>
    );
}

export default HeaderBar;
import React, { useState } from "react";
import { Layout } from "antd";
import HeaderBar from "../Components/Header";
import SiderBar from "../Components/Sider";

const { Content } = Layout;

const Design = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [selected, setSelected] = useState([1])
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout>
            <SiderBar selected={selected} setSelected={setSelected} collapsed={collapsed} onCollapse={toggleCollapsed} />
            <Layout>
                <HeaderBar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
                <Content style={{ margin: '20px' }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default Design;
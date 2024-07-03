import React from "react";
import { Layout, Menu } from "antd";
import { EditOutlined} from '@ant-design/icons';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import { useNavigate } from "react-router-dom";
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
const { Sider } = Layout;

const SiderBar = ({ selected, setSelected, collapsed, onCollapse }) => {
    const role = localStorage.getItem('Role') 
    const navigate = useNavigate();

    const handleMenuItemClick = (key) => {
        navigate(`/${key}`);
        setSelected(key);
    }

    // Define menu items based on the user's role
    const getMenuItems = () => {
        switch (role) {
            case 'admin':
                return [
                    {
                        key: 'dashboard',
                        icon: <DashboardIcon />,
                        label: 'Dashboard',
                    }, {
                        key: 'profile',
                        icon: <Person2OutlinedIcon />,
                        label: 'Profile',
                    },
                    {
                        key: 'doctor',
                        icon: <MedicationOutlinedIcon />,
                        label: 'Doctor',
                        children: [
                            {
                                key: 'new-doctor',
                                icon: <PersonAddTwoToneIcon />,
                                label: 'New Doctor',
                            },
                            {
                                key: 'view-doctor',
                                icon: <EditOutlined />,
                                label: 'View Doctor',
                            }
                        ]
                    },
                    {
                        key: 'patient',
                        icon: <PortraitOutlinedIcon />,
                        label: 'Patient',
                        children: [
                            {
                                key: 'view-patient',
                                icon: <EditOutlined />,
                                label: 'View Patient',
                            },{
                                key: 'view-prescription',
                                icon: <WysiwygIcon/>,
                                label: 'View Prescrition'
                            }
                        ]
                    },
                ];
            case 'doctor':
                return [
                    {
                        key: 'dashboard',
                        icon: <DashboardIcon />,
                        label: 'Dashboard',
                    },
                    {
                        key: 'profile',
                        icon: <Person2OutlinedIcon />,
                        label: 'Profile',
                    },
                    {
                        key: 'patient',
                        icon: <PortraitOutlinedIcon />,
                        label: 'Patient',
                        children: [
                            {
                                key: 'new-patient',
                                icon: <PersonAddTwoToneIcon />,
                                label: 'New Patient',
                            },
                            {
                                key: 'view-patient',
                                icon: <EditOutlined />,
                                label: 'View Patient',
                            },
                            {
                                key: 'view-prescription',
                                icon: <WysiwygIcon/>,
                                label: 'View Prescrition'
                            }
                        ]
                    },
                ];
            case 'patient':
                return [
                    {
                        key: 'dashboard',
                        icon: <DashboardIcon />,
                        label: 'Dashboard',
                    },
                    {
                        key: 'profile',
                        icon: <Person2OutlinedIcon />,
                        label: 'Profile',
                    },
                    {
                        key: 'view-prescription',
                        icon: <MedicationOutlinedIcon />,
                        label: 'Prescriptions',
                    }
                ];
            default:
                return [];
        }
    };

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            width={250}
            style={{
                backgroundColor: '#001529',
                minHeight: '100vh'
            }}
        >
            <div className="logo" /> {/* Add your logo component here */}
            <Menu
                theme="dark"
                mode="inline"
                style={{
                    padding: '20px',
                }}
                defaultSelectedKeys={[selected]}
                onSelect={({ key }) => {
                    handleMenuItemClick(key);
                }}
                items={getMenuItems()} // Use getMenuItems to get the appropriate menu items
            />
        </Sider>
    );
}

export default SiderBar;

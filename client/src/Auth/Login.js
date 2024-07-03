import { Form, Button, Input, message, Row, Col, Card } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import login from '../Images/login.svg'

const Login = () => {
    const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/login`, values);
            if (response.data.success) {
                localStorage.setItem('Userid',values.Userid);
                localStorage.setItem('Role',response.data.user.Role);
                localStorage.setItem('auth','true');
                message.success(response.data.message)
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error)
            if (!error.response.data.success) {
                message.error(error.response.data.message)
            }
        }
    }

    const auth = localStorage.getItem('auth');
    const role = localStorage.getItem('Role');

    useEffect(() => {
        if (auth) {
            return navigate('/dashboard');
        }
    }, [auth,role, navigate]);
    return ( 
        <div>
            <Row>
                <Col span={10} style={{
                    backgroundColor: 'white',
                    minHeight: 687,
                    maxHeight:687
                }}>
                    <img src={login} alt='' style={{
                        width: '120%',
                        height: '100%',
                        textAlign: 'center',
                        marginLeft: '150px'
                    }} /> </Col>
                <Col span={8} offset={5} style={{textAlign:'center'}}>
                    <Card 
                    title="HPMVM - Login" 
                    style={{
                        margin: '40px',
                        marginTop: '200px',
                        maxWidth: 350,
                        boxShadow:'0.5px 0.5px 3px 3px #EEEBEB'
                    }}
                    styles={{
                        header: {
                            backgroundColor: '#5F6B79', color: 'white'
                        }
                    }}
                    bordered={true}
                    >
                        <Form
                            name='login'
                            layout='vertical'
                            onFinish={onFinish}
                            style={{
                                maxWidth:300,
                            }}
                        >
                            <Form.Item
                                name='Userid'
                                rules={[{ required: true, message: 'please enter your username' }]}>
                                <Input prefix={<UserOutlined />} placeholder='Enter your username' />
                            </Form.Item>
                            <Form.Item
                                name='Password'
                                rules={[{ required: true, message: 'please enter your password' }, { min: 6 }]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder='Enter your password' />
                            </Form.Item>
                            <Form.Item>
                                <Button type='primary' htmlType='submit'>
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                        
                    </Card>
                </Col>
            </Row>
        </div>
     );
}
 
export default Login;
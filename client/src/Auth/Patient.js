import { Form ,Row,Col,Input, Card,Button } from "antd";
import { useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import patient from '../Images/patient.svg'
import axios from "axios";
const Patient = () => {
    const navigate = useNavigate()
    const onFinish = async (values)=>{
        const response = await axios.post(`http://localhost:8000/api/patient`, values);
        console.log(response)
        if(response.data.success){
            navigate('/prescription-details',{state:{prescription: response.data.prescription}})
        }
        console.log('Success:', values);
    }
    return ( 
        <div>
            <Row>
                <Col span={10} style={{
                    backgroundColor: 'white',
                    minHeight: 687,
                    maxHeight:687
                }}>
                    <img src={patient} alt='' style={{
                        marginTop: '30px',
                        width: '120%',
                        height: '90%',
                        textAlign: 'center',
                        marginLeft: '150px'
                    }} /> </Col>
                <Col span={8} offset={5} style={{textAlign:'center'}}>
                    <Card 
                    title="Vending Machine - Login" 
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
                                name='PrescriptionId'
                                rules={[{ required: true, message: 'please enter your username' }]}>
                                <Input prefix={<SearchOutlinedIcon />} placeholder='Enter your username' />
                            </Form.Item>
                            <Form.Item>
                                <Button type='primary' htmlType='submit'>
                                    Find
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
     );
}
 
export default Patient;
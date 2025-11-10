import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Space } from "antd";
import { useNavigate } from "react-router";

const App = () => {
    const navigate = useNavigate();

    document.title = '费用报销填写单';

    return (
        <>
            <Row gutter={[12,12]}>
                <Col>
                    <Form>
                        
                    </Form>
                </Col>
            </Row>
            <Space>
                <Button
                    icon={<EditOutlined />}
                    onClick={() => {
                        navigate('/clf');
                    }}>差旅费报销单</Button>
                <Button
                    icon={<EditOutlined />}
                    onClick={() => {
                        navigate('/ccbz');
                    }}>出差补助申请</Button>
                <Button
                    icon={<EditOutlined />}
                    onClick={() => {
                        navigate('/fy');
                    }}>费用报销单</Button>
                <Button
                    icon={<EditOutlined />}
                    onClick={() => {
                        navigate('/pz');
                    }}
                >票证粘贴单</Button>
            </Space>
        </>
    );
};

export default App;

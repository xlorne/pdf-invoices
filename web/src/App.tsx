import { EditOutlined } from "@ant-design/icons";
import { Button, Divider, Space } from "antd";
import { useNavigate } from "react-router";

const App = () => {
    const navigate = useNavigate();

    document.title = '费用报销填写单';

    return (
        <div>
            <Divider>表单操作</Divider>
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
        </div>
    );
};

export default App;

import {Button, Space} from "antd";
import {useNavigate} from "react-router";

const App = () => {
    const navigate = useNavigate();

    return (
        <>
            <Space>
                <Button
                    onClick={() => {
                        navigate('/ccbz');
                    }}>出差补助申请</Button>
                <Button
                    onClick={() => {
                        navigate('/ccbz');
                    }}>差旅费报销单</Button>
                <Button
                    onClick={() => {
                        navigate('/ccbz');
                    }}>费用报销单</Button>
                <Button
                    onClick={() => {
                        navigate('/ccbz');
                    }}
                >票证粘贴单</Button>
            </Space>
        </>
    );
};

export default App;

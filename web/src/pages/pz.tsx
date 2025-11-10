import { useState } from "react";
import styles from './pz.modules.css';
import { Button, Form, Modal, Space } from "antd";
import { EditOutlined, HomeOutlined, PrinterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import PZForm from "./pz_form";

const PZPage = () => {

    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState<any>(null);
    const navigate = useNavigate();

    document.title = '票证粘贴单';

    return (
        <div>
            <Modal
                title="票证粘贴单"
                open={visible}
                onCancel={() => {
                    setVisible(false);
                }}
                onOk={() => {
                    const values = form.getFieldsValue();
                    console.log(values);

                    setData(values);
                    setVisible(false);
                }}
            >
                <PZForm form={form}/>
            </Modal>

            <Space>
                <Button
                    className={styles.print_hidden}
                    icon={<HomeOutlined />}
                    onClick={() => {
                        navigate("/");
                    }}>
                    首页
                </Button>

                <Button
                    className={styles.print_hidden}
                    icon={<EditOutlined />}
                    onClick={() => {
                        setVisible(true);
                    }}>
                    编辑
                </Button>

                <Button
                    className={styles.print_hidden}
                    icon={<PrinterOutlined />}
                    onClick={() => {
                        window.print();
                    }}>
                    打印
                </Button>
            </Space>

            <div className={styles.header} >
                <h1 className={styles.title}>票证粘贴单</h1>
                <div className={styles.leader_signature} contentEditable={true}>领导签字</div>
            </div>

            <div className={styles.line}></div>
            <div className={styles.content_area}></div>

            <div className={styles.footer}>
                <div className={styles.footer_item}>
                    <div className={styles.footer_label}>单据</div>
                </div>
                <div className={styles.footer_item}>
                    <div className={styles.footer_label}>
                        {data?.number && (
                            <span>{data?.number}张</span>
                        )}
                        {!data?.number && (
                            <span contentEditable={true}>张</span>
                        )}
                    </div>
                </div>
                <div className={styles.footer_item}>
                    <div className={styles.footer_label}>
                        {data?.money && (
                            <span>金额:{data?.money && Number.parseFloat(data?.money).toFixed(2)}元</span>
                        )}
                        {!data?.money && (
                            <span contentEditable={true}>金额</span>
                        )}
                    </div>
                </div>
                <div claclassNamess={styles.footer_item}>
                    <div className={styles.footer_label}>
                        {data?.name && (
                            <span>经手人:{data?.name}</span>
                        )}
                        {!data?.name && (
                            <span contentEditable={true}>经手人</span>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.line}></div>

        </div>
    )
}

export default PZPage;
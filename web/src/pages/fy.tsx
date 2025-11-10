import React, { useState } from "react";
import styles from './fy.modules.css';
import { Button, Form, Modal, Space } from "antd";
import { numberToChineseRMB } from "../utils/money";
import { EditOutlined, HomeOutlined, PrinterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import FYForm from "./fy_form";


interface BodyDetailItemProps {
    data: any;
    number: number;
}

const BodyDetailItem: React.FC<BodyDetailItemProps> = (props) => {
    const data = props.data;
    const number = props.number;

    return (
        <>
            <td contentEditable={true}>
                {data?.["project" + number] && (
                    <span>{data?.["project" + number]}</span>
                )}
            </td>
            <td contentEditable={true}>
                {data?.["type" + number] && (
                    <span>{data?.["type" + number]}</span>
                )}
            </td>
            <td contentEditable={true}>
                {data?.["money" + number] && (
                    <span>{data?.["money" + number]}</span>
                )}
            </td>
        </>
    )
}

const FYPage = () => {

    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState<any>(null);
    const navigate = useNavigate();

    document.title = '费用报销单';

    const summary = () => {
        let total = 0;
        for (let index = 0; index < 5; index++) {
            const value = data?.['money' + (index + 1)];
            if (value) {
                total += Number.parseFloat(value);
            }
        }
        return total.toFixed(2);
    }

    const total = () => {
        let total = 0;
        for (let index = 0; index < 5; index++) {
            const value = data?.['money' + (index + 1)];
            if (value) {
                total += Number.parseFloat(value);
            }
        }
        return numberToChineseRMB(total);
    }

    return (
        <div>
            <Modal
                title="费用报销单"
                width={"80%"}
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
                <FYForm form={form}/>
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

            <div className={styles.header}>费用报销单</div>

            <div className={styles.top_info}>
                <div>
                    <span>报销日期：</span>
                    <span contenteditable="true"><span> 年 </span> <span>月 </span> <span> 日</span></span>
                </div>
                <div>
                    <span>附件 </span><span contenteditable="true"> &nbsp; 张</span>
                </div>
            </div>

            <div className={styles.vertical_cell}>
                <br />壹<br />贰<br />叁<br />肆<br />伍<br />陆<br />柒<br />捌<br />玖<br />拾<br />佰<br />仟<br />万<br />元<br />角<br />分<br />整
            </div>

            <table className={styles.mtable}>
                <tr>
                    <th style={{
                        width: 200
                    }}>费用项目</th>
                    <th style={{
                        width: 200
                    }}>类别</th>
                    <th style={{
                        width: 200
                    }}>金额</th>
                    <th style={{
                        width: 200
                    }} rowspan={2} colspan={2}>报销人<br />（签章）</th>
                    <th style={{
                        width: 200
                    }} rowspan={2} contenteditable="true"></th>
                </tr>
                <tr>
                    <BodyDetailItem data={data} number={1} />
                </tr>
                <tr>
                    <BodyDetailItem data={data} number={2} />
                    <td colspan={2} rowspan={2}>部门经理<br />（签章）</td>
                    <td rowspan={2} contenteditable="true"></td>
                </tr>
                <tr>
                    <BodyDetailItem data={data} number={3} />
                </tr>
                <tr>
                    <BodyDetailItem data={data} number={4} />
                    <td colspan={2} rowspan={2}> 企业负责人<br />（签章）</td>
                    <td rowspan={2} contenteditable="true"></td>
                </tr>
                <tr>
                    <BodyDetailItem data={data} number={5} />
                </tr>
                <tr>
                    <th>报销金额合计</th>
                    <td contenteditable="true"></td>
                    <td contenteditable="true">{summary()}</td>
                    <td colspan={2}>¥</td>
                    <td contenteditable="true">{total()}</td>
                </tr>
                <tr>
                    <td colspan={7}>
                        <div className={styles.money_data}>
                            <div className={styles.money_title}>核实金额（大写）</div>
                            <div className={styles.money_content} contenteditable="true">
                                <span className={styles.digit}>佰</span>
                                <span className={styles.digit}>拾</span>
                                <span className={styles.digit}>万</span>
                                <span className={styles.digit}>仟</span>
                                <span className={styles.digit}>佰</span>
                                <span className={styles.digit}>拾</span>
                                <span className={styles.digit}>圆</span>
                                <span className={styles.digit}>角</span>
                                <span className={styles.digit}>分</span>
                                <span className={styles.currency_symbol}>¥</span>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th style={{
                        width: 200
                    }}>借款数</th>
                    <td style={{
                        width: 200
                    }} contenteditable="true"></td>
                    <th style={{
                        width: 200
                    }}>应退金额</th>
                    <td style={{
                        width: 200
                    }} contenteditable="true"></td>
                    <th style={{
                        width: 200
                    }}>应补金额</th>
                    <td style={{
                        width: 200
                    }} contenteditable="true"></td>
                </tr>
            </table>

            <div className={styles.footer_signature}>
                <span>财务审核</span>
                <span>出纳</span>
            </div>
        </div>
    )
}

export default FYPage;
import React, { useState } from "react";
import styles from './fy.modules.css';
import { Button, Col, Divider, Flex, Form, Input, message, Modal, Row, Select } from "antd";
import { numberToChineseRMB } from "../utils/money";
import dayjs from "dayjs";
import { PlusCircleOutlined } from "@ant-design/icons";



interface BodyFormItemProps {
    number: number;
}

const typeOptions = [
    {
        title: "项目1",
        value: "项目1"
    }
];

const BodyFormItem: React.FC<BodyFormItemProps> = (props) => {

    const number = props.number;

    return (
        <>
            <Divider>项目{number}</Divider>
            <Col span={8}>
                <Form.Item name={"project" + number} label="费用项目">
                    <Input />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item name={"type" + number} label="类别">
                    <Select options={typeOptions} />
                </Form.Item>
            </Col>

            <Col span={8}>
                <Form.Item name={"money" + number} label="金额">
                    <Input type="number" />
                </Form.Item>
            </Col>
        </>
    )
}


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



    const currentDate = dayjs().format('YYYY年MM月DD日');

    const [maxNumber, setMaxNumber] = React.useState(1);


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
                <Form form={form}>
                    <Row gutter={[12, 12]}>
                        <Col span={24}>
                            <Flex
                                justify="end"
                                align="center"
                            >
                                <Button
                                    disabled={maxNumber >= 5}
                                    icon={<PlusCircleOutlined />}
                                    onClick={() => {
                                        setMaxNumber(current => {
                                            if (current + 1 > 5) {
                                                message.error('不能超过5个项目.');
                                                return current;
                                            }
                                            return current + 1;
                                        });
                                    }}
                                >
                                    添加</Button>
                            </Flex>
                        </Col>

                        {
                            Array.from({ length: maxNumber }).map((_, number) => {
                                return (
                                    <BodyFormItem number={number + 1} />
                                )
                            })
                        }
                    </Row>

                </Form>
            </Modal>

            <div onClick={() => {
                setVisible(true);
            }} className={styles.header}>费用报销单</div>

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
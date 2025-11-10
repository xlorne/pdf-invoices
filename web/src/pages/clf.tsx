import React, { useState } from "react";
import styles from './clf.modules.css';
import { Button, Col, DatePicker, Divider, Flex, Form, Input, message, Modal, Row } from "antd";
import { numberToChineseRMB } from "../utils/money";
import dayjs from "dayjs";
import { PlusCircleOutlined } from "@ant-design/icons";


interface BodyFormItemProps {
    number: number;
}


const BodyFormItem: React.FC<BodyFormItemProps> = (props) => {

    const number = props.number;

    return (
        <>
            <Divider>出差{number}</Divider>

            <Col span={12}>
                <Form.Item name={"date" + number} label="出差时间">
                    <DatePicker.RangePicker showTime format={"YYYY-MM-DD HH:mm"} style={{ width: '100%' }} />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item name={"days" + number} label="天数">
                    <Input type="number" />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item name={"from" + number} label="出发地">
                    <Input />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item name={"to" + number} label="到达地">
                    <Input />
                </Form.Item>
            </Col>

            <Col span={5}>
                <Form.Item name={"ccf" + number} label="车船费">
                    <Input type="number" />
                </Form.Item>
            </Col>
            <Col span={5}>
                <Form.Item name={"lgf" + number} label="旅馆费">
                    <Input type="number" />
                </Form.Item>
            </Col>
            <Col span={5}>
                <Form.Item name={"ydf" + number} label="邮电费">
                    <Input type="number" />
                </Form.Item>
            </Col>
            <Col span={5}>
                <Form.Item name={"zqf" + number} label="住勤费">
                    <Input type="number" />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item name={"jtf" + number} label="市内交通费">
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
        <tr>
            <td contentEditable={true}>{data?.["date" + number] && data?.["date" + number][0].format('YYYY年MM月DD日')}</td>
            <td contentEditable={true}>
                {data?.["date" + number] && (
                    <span>{data?.["date" + number][0].format('HH时mm分')}</span>
                )}
                {!data?.["date" + number] && (
                    <span>时 分</span>
                )}
            </td>
            <td contentEditable={true}>
                {data?.["from" + number] && (
                    <span>{data?.["from" + number]}</span>
                )}
            </td>
            <td contentEditable={true}>{data?.["date" + number] && data?.["date" + number][1].format('YYYY年MM月DD日')}</td>
            <td contentEditable={true}>
                {data?.["date" + number] && (
                    <span>{data?.["date" + number][1].format('HH时mm分')}</span>
                )}
                {!data?.["date" + number] && (
                    <span>时 分</span>
                )}
            </td>
            <td contentEditable={true}>
                {data?.["to" + number] && (
                    <span>{data?.["to" + number]}</span>
                )}
            </td>
            <td contentEditable={true}>
                {data?.["days" + number] && (
                    <span>{data?.["days" + number]}</span>
                )}
            </td>
            <td contentEditable={true}>
                {data?.["ccf" + number] && (
                    <span>{data?.["ccf" + number]}</span>
                )}
            </td>
            <td contentEditable={true}>
                {data?.["lgf" + number] && (
                    <span>{data?.["lgf" + number]}</span>
                )}
            </td>
            <td contentEditable={true}>
                {data?.["ydf" + number] && (
                    <span>{data?.["ydf" + number]}</span>
                )}
            </td>
            <td contentEditable={true}>
                {data?.["zqf" + number] && (
                    <span>{data?.["zqf" + number]}</span>
                )}
            </td>
            <td contentEditable={true}>
                {data?.["jtf" + number] && (
                    <span>{data?.["jtf" + number]}</span>
                )}
            </td>
            <td colspan={2}></td>
        </tr>
    )
}

const CLFPage = () => {

    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState<any>(null);

    const currentDate = dayjs().format('YYYY年MM月DD日');

    const [maxNumber, setMaxNumber] = React.useState(1);

    document.title = '差旅费报销单';

    const moneyToWords = (money: number) => {
        return numberToChineseRMB(money);
    }

    const total = () => {
        const ccf = summary('ccf');
        const lgf = summary('lgf');
        const ydf = summary('ydf');
        const zqf = summary('zqf');
        const jtf = summary('jtf');
        const total = ccf + lgf + ydf + zqf + jtf;
        return total.toFixed(2);
    }

    const summary = (key: string) => {
        let total = 0;
        for (let index = 0; index < 3; index++) {
            const value = data?.[key + (index + 1)];
            if (value) {
                total += Number.parseFloat(value);
            }
        }
        return total;
    }

    return (
        <div>
            <Modal
                title="差旅费报销单"
                width={"85%"}
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
                        <Col span={12}>
                            <Form.Item name="name" label="姓名">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="department" label="部门">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="desc" label="出差事由">
                                <Input.TextArea />
                            </Form.Item>
                        </Col>


                        <Col span={24}>
                            <Flex
                                justify="end"
                                align="center"
                            >
                                <Button
                                    disabled={maxNumber >= 3}
                                    icon={<PlusCircleOutlined />}
                                    onClick={() => {
                                        setMaxNumber(current => {
                                            if (current + 1 > 3) {
                                                message.error('不能超过3个项目.');
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
            }} className={styles.header}>差旅费报销单</div>

            <div className={styles.date_section}>
                {currentDate && (
                    <span>{currentDate}</span>
                )}
                {!currentDate && (
                    <span contentEditable={true}>年 &nbsp;&nbsp;&nbsp;&nbsp; 月 &nbsp;&nbsp;&nbsp;&nbsp; 日</span>
                )}
            </div>

            <div className={styles.vertical_cell}>
                <br />壹<br />贰<br />叁<br />肆<br />伍<br />陆<br />柒<br />捌<br />玖<br />拾<br />佰<br />仟<br />万<br />元<br />角<br />分<br />整
            </div>

            <table className={styles.mtable}>
                <tr>
                    <td colspan={2} className={styles.section_header}>工作部门</td>
                    <td colspan={5} contentEditable={true}>{data?.department}</td>
                    <td rowspan={2} className={styles.section_header}>出差事由</td>
                    <td colspan={7} rowspan={2} contentEditable={true}>{data?.desc}</td>
                </tr>
                <tr>
                    <td colspan={2} className={styles.section_header}>姓 &nbsp;&nbsp;&nbsp;&nbsp; 名</td>
                    <td colspan={5} contentEditable={true}>{data?.name}</td>
                </tr>

                <tr>
                    <td colspan={3} className={styles.section_header}>出 &nbsp;&nbsp;&nbsp;&nbsp; 发</td>
                    <td colspan={3} className={styles.section_header}>到 &nbsp;&nbsp;&nbsp;&nbsp; 达</td>
                    <td rowspan={2} className={styles.section_header}>天数</td>
                    <td rowspan={2} className={styles.section_header}>车船费</td>
                    <td rowspan={2} className={styles.section_header}>旅馆费</td>
                    <td rowspan={2} className={styles.section_header}>邮电费</td>
                    <td rowspan={2} className={styles.section_header}>住勤费</td>
                    <td rowspan={2} className={styles.section_header}>市内<br />交通费</td>
                    <td colspan={2} rowspan={2}></td>
                </tr>

                <tr>
                    <td className={styles.sub_header} style={{
                        width: 100
                    }}>日期</td>
                    <td className={styles.sub_header} style={{
                        width: 100
                    }}>时间</td>
                    <td className={styles.sub_header} style={{
                        width: 100
                    }}>地点</td>
                    <td className={styles.sub_header} style={{
                        width: 100
                    }}>日期</td>
                    <td className={styles.sub_header} style={{
                        width: 100
                    }}>时间</td>
                    <td className={styles.sub_header} style={{
                        width: 100
                    }}>地点</td>
                </tr>

                {
                    Array.from({ length: 3 }).map((_, number) => {
                        return (
                            <BodyDetailItem data={data} number={number + 1} />
                        )
                    })
                }

                <tr>
                    <td colspan={6} className={styles.section_header}>合 &nbsp;&nbsp;&nbsp;&nbsp; 计</td>
                    <td>{summary('days')}</td>
                    <td>{summary('ccf').toFixed(2)}</td>
                    <td>{summary('lgf').toFixed(2)}</td>
                    <td>{summary('ydf').toFixed(2)}</td>
                    <td>{summary('zqf').toFixed(2)}</td>
                    <td>{summary('jtf').toFixed(2)}</td>
                    <td colspan={2}></td>
                </tr>

                <tr>
                    <td colspan={2} className={styles.section_header} style={{
                        height: 50
                    }}>预领金额</td>
                    <td className={styles.amount_column}>¥</td>
                    <td colspan={7} className={styles.section_header}>共计金额（大写）: {moneyToWords(total())}</td>
                    <td className={styles.amount_column}>¥ </td>
                    <td colspan={3} >{total()}</td>
                </tr>

                <tr>
                    <td colspan={2} className={styles.section_header}>应退金额</td>
                    <td className={styles.amount_column}>¥</td>
                    <td colSpan={10} rowSpan={2} style={{
                        border: 0
                    }}>
                        <div className={styles.foot_content}>
                            <div className={styles.signature_area}>
                                <div className={styles.signature_box}>
                                    <div>部门</div>
                                    <div className={styles.signature_label}>经理</div>
                                </div>
                                <div className={styles.signature_box}>
                                    <div>财务</div>
                                    <div className={styles.signature_label}>审核</div>
                                </div>
                                <div className={styles.signature_box}>
                                    <div>企业<br />负责人</div>
                                    <div className={styles.signature_label}></div>
                                </div>
                                <div className={styles.signature_box}>
                                    <div>报<br />销<br />人</div>
                                    <div className={styles.signature_label}></div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td colspan={2} className={styles.section_header}>补助金额</td>
                    <td className={styles.amount_column}>¥</td>
                </tr>
            </table>



            <div className={styles.left_content}>
                附单据 &nbsp;&nbsp;&nbsp;&nbsp; 张
            </div>

        </div>
    );
};

export default CLFPage;
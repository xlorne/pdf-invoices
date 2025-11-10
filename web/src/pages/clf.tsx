import React, { useState } from "react";
import styles from './clf.modules.css';
import { Checkbox, Col, DatePicker, Divider, Form, Input, Modal, Radio, Row } from "antd";
import { numberToChineseRMB } from "../utils/money";
import dayjs from "dayjs";

const CLFPage = () => {

    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState<any>(null);

    const currentDate = dayjs().format('YYYY年MM月DD日');


    const moneyToWords = (money: number) => {
        return numberToChineseRMB(money);
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


                        <Divider>出差一</Divider>

                        <Col span={12}>
                            <Form.Item name="date1" label="出差时间">
                                <DatePicker.RangePicker showTime format={"YYYY-MM-DD HH:mm"} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="days1" label="天数">
                                <Input type="number" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name="from1" label="出发地">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name="to1" label="到达地">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={5}>
                            <Form.Item name="ccf1" label="车船费">
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name="lgf1" label="旅馆费">
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name="ydf1" label="邮电费">
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name="zqf1" label="住勤费">
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item name="jtf1" label="市内交通费">
                                <Input type="number" />
                            </Form.Item>
                        </Col>

                        <Divider>出差二</Divider>

                        <Col span={12}>
                            <Form.Item name="date2" label="出差时间">
                                <DatePicker.RangePicker showTime format={"YYYY-MM-DD HH:mm"} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="days2" label="天数">
                                <Input type="number" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name="from2" label="出发地">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name="to2" label="到达地">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={5}>
                            <Form.Item name="ccf2" label="车船费">
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name="lgf2" label="旅馆费">
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name="ydf2" label="邮电费">
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name="zqf2" label="住勤费">
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item name="jtf2" label="市内交通费">
                                <Input type="number" />
                            </Form.Item>
                        </Col>

                        <Divider>出差三</Divider>

                        <Col span={12}>
                            <Form.Item name="date3" label="出差时间">
                                <DatePicker.RangePicker showTime format={"YYYY-MM-DD HH:mm"} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="days3" label="天数">
                                <Input type="number" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name="from3" label="出发地">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name="to3" label="到达地">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={5}>
                            <Form.Item name="ccf3" label="车船费">
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name="lgf3" label="旅馆费">
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name="ydf3" label="邮电费">
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name="zqf3" label="住勤费">
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item name="jtf3" label="市内交通费">
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            <div onClick={() => {
                setVisible(true);
            }} className={styles.header}>差旅费报销单</div>

            <div className={styles.date_section}>
                年 &nbsp;&nbsp;&nbsp;&nbsp; 月 &nbsp;&nbsp;&nbsp;&nbsp; 日
            </div>

            <div className={styles.vertical_cell}>
                <br />壹<br />贰<br />叁<br />肆<br />伍<br />陆<br />柒<br />捌<br />玖<br />拾<br />佰<br />仟<br />万<br />元<br />角<br />分<br />整
            </div>

            <table className={styles.mtable}>
                <tr>
                    <td colspan={2} className={styles.section_header}>工作部门</td>
                    <td colspan={5}></td>
                    <td rowspan={2} className={styles.section_header}>出差事由</td>
                    <td colspan={7} rowspan={2}></td>
                </tr>
                <tr>
                    <td colspan={2} className={styles.section_header}>姓 &nbsp;&nbsp;&nbsp;&nbsp; 名</td>
                    <td colspan={5}></td>
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
                    <td className={styles.sub_header}>日期</td>
                    <td className={styles.sub_header}>时间</td>
                    <td className={styles.sub_header}>地点</td>
                    <td className={styles.sub_header}>日期</td>
                    <td className={styles.sub_header}>时间</td>
                    <td className={styles.sub_header}>地点</td>
                </tr>

                <tr>
                    <td></td>
                    <td>时 分</td>
                    <td></td>
                    <td></td>
                    <td>时 分</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td colspan={2}></td>
                </tr>

                <tr>
                    <td></td>
                    <td>时 分</td>
                    <td></td>
                    <td></td>
                    <td>时 分</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td colspan={2}></td>
                </tr>

                <tr>
                    <td></td>
                    <td>时 分</td>
                    <td></td>
                    <td></td>
                    <td>时 分</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td colspan={2}></td>
                </tr>

                <tr>
                    <td colspan={6} className={styles.section_header}>合 &nbsp;&nbsp;&nbsp;&nbsp; 计</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td colspan={2}></td>
                </tr>

                <tr>
                    <td colspan={2} className={styles.section_header}>预领金额</td>
                    <td className={styles.amount_column}>¥</td>
                    <td colspan={7} className={styles.section_header}>共计金额（大写）</td>
                    <td className={styles.amount_column}>¥</td>
                    <td colspan={3} ></td>
                </tr>

                <tr>
                    <td colspan={2} className={styles.section_header}>应退金额</td>
                    <td className={styles.amount_column}>¥</td>
                </tr>

                <tr>
                    <td colspan={2} className={styles.section_header}>补助金额</td>
                    <td className={styles.amount_column}>¥</td>
                </tr>
            </table>

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

            <div className={styles.left_content}>
                附单据 &nbsp;&nbsp;&nbsp;&nbsp; 张
            </div>

        </div>
    );
};

export default CLFPage;
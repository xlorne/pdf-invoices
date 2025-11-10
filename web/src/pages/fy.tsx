import React, { useState } from "react";
import styles from './fy.modules.css';
import { Checkbox, Col, DatePicker, Divider, Form, Input, Modal, Radio, Row, Select } from "antd";
import { numberToChineseRMB } from "../utils/money";
import dayjs from "dayjs";

const FYPage = () => {

    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState<any>(null);

    const typeOptions = [
        {
            title:"项目1",
            value:"项目1"
        }
    ];

    const currentDate = dayjs().format('YYYY年MM月DD日');


    const moneyToWords = (money: number) => {
        return numberToChineseRMB(money);
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
                    <Row gutter={[12,12]}>
                        <Divider>项目1</Divider>
                        <Col span={8}>
                            <Form.Item name={"project1"} label="费用项目">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name={"type1"} label="类别">
                                <Select options={typeOptions}/>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item name={"money1"} label="金额">
                                <Input type="number"/>
                            </Form.Item>
                        </Col>

                        <Divider>项目2</Divider>
                        <Col span={8}>
                            <Form.Item name={"project2"} label="费用项目">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name={"type2"} label="类别">
                                <Select options={typeOptions}/>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item name={"money2"} label="金额">
                                <Input type="number"/>
                            </Form.Item>
                        </Col>

                        <Divider>项目3</Divider>
                        <Col span={8}>
                            <Form.Item name={"project3"} label="费用项目">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name={"type3"} label="类别">
                                <Select options={typeOptions}/>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item name={"money3"} label="金额">
                                <Input type="number"/>
                            </Form.Item>
                        </Col>

                        <Divider>项目4</Divider>
                        <Col span={8}>
                            <Form.Item name={"project4"} label="费用项目">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name={"type4"} label="类别">
                                <Select options={typeOptions}/>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item name={"money4"} label="金额">
                                <Input type="number"/>
                            </Form.Item>
                        </Col>

                        <Divider>项目5</Divider>
                        <Col span={8}>
                            <Form.Item name={"project5"} label="费用项目">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name={"type5"} label="类别">
                                <Select options={typeOptions}/>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item name={"money5"} label="金额">
                                <Input type="number"/>
                            </Form.Item>
                        </Col>
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
                    <td contenteditable="true">&nbsp;</td>
                    <td contenteditable="true"></td>
                    <td contenteditable="true"></td>
                </tr>
                <tr>
                    <td contenteditable="true"></td>
                    <td contenteditable="true"></td>
                    <td contenteditable="true"></td>
                    <td colspan={2} rowspan={2}>部门经理<br />（签章）</td>
                    <td rowspan={2} contenteditable="true"></td>
                </tr>
                <tr>
                    <td contenteditable="true"></td>
                    <td contenteditable="true"></td>
                    <td contenteditable="true"></td>
                </tr>
                <tr>
                    <td contenteditable="true"></td>
                    <td contenteditable="true"></td>
                    <td contenteditable="true"></td>
                    <td colspan={2} rowspan={2}> 企业负责人<br />（签章）</td>
                    <td rowspan={2} contenteditable="true"></td>
                </tr>
                <tr>
                    <td contenteditable="true"></td>
                    <td contenteditable="true"></td>
                    <td contenteditable="true"></td>
                </tr>
                <tr>
                    <th>报销金额合计</th>
                    <td contenteditable="true"></td>
                    <td contenteditable="true"></td>
                    <td colspan={2}>¥</td>
                    <td contenteditable="true"></td>
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
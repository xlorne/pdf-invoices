import React, { useState } from "react";
import styles from './fy.modules.css';
import { Checkbox, DatePicker, Form, Input, Modal, Radio } from "antd";
import { numberToChineseRMB } from "../utils/money";
import dayjs from "dayjs";

const FYPage = () => {

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
                    <Form.Item name="name" label="姓名">
                        <Input />
                    </Form.Item>
                    <Form.Item name="department" label="部门">
                        <Input />
                    </Form.Item>
                    <Form.Item name="project" label="申请项目">
                        <Radio.Group>
                            <Radio value="1">市内出差</Radio>
                            <Radio value="2">省内出差</Radio>
                            <Radio value="3">省外出差</Radio>
                            <Radio value="4">其他</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="address" label="出差地点">
                        <Input />
                    </Form.Item>
                    <Form.Item name="date" label="预计出差时间">
                        <DatePicker.RangePicker />
                    </Form.Item>
                    <Form.Item name="days" label="共几天">
                        <Input />
                    </Form.Item>
                    <Form.Item name="projectName" label="项目名称">
                        <Input />
                    </Form.Item>
                    <Form.Item name="currentPeople" label="出差人数">
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="currentDays" label="出差天数">
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="currentMoneyPerDay" label="每人每天多少钱">
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="money" label="出差补贴费用总计">
                        <Input type="number" />
                    </Form.Item>

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
import { useState } from "react";
import styles from './pz.modules.css';
import { DatePicker, Form, Input, Modal, Radio } from "antd";
import { numberToChineseRMB } from "../utils/money";
import dayjs from "dayjs";

const PZPage = () => {

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

            <div className={styles.header} >
                <h1 className={styles.title} onClick={() => {
                    setVisible(true);
                }}>票证粘贴单</h1>
                <div className={styles.leader_signature}>领导签字</div>
            </div>

            <div className={styles.line}></div>

            <div className={styles.content_area}>
            </div>

            <div className={styles.footer}>
                <div className={styles.footer_item}>
                    <div className={styles.footer_label}>单据</div>
                </div>
                <div className={styles.footer_item}>
                    <div className={styles.footer_label}>张</div>
                </div>
                <div className={styles.footer_item}>
                    <div className={styles.footer_label}>金额</div>
                </div>
                <div claclassNamess={styles.footer_item}>
                    <div className={styles.footer_label}>经手人</div>
                </div>
            </div>
            <div className={styles.line}></div>

        </div>
    )
}

export default PZPage;
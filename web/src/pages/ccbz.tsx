import React, { useState } from "react";
import styles from './ccbz.modules.css';
import { Checkbox, DatePicker, Form, Input, Modal, Radio } from "antd";
import { numberToChineseRMB } from "../utils/money";
import dayjs from "dayjs";

const CCBZPage = () => {

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
            }} className={styles.header}>出差补助申请表</div>

            <div className={styles.date_field} contentEditable={true}>
                申请日期: {currentDate && (<span>{currentDate}</span>)}
                <>
                {!currentDate && (<>
                    <span className="input-line"></span> 年 <span className="input-line"></span> 月 <span className="input-line"></span> 日
                </>)  }
                </>
            </div>

            <div className={styles.vertical_cell}>
                <br />壹<br />贰<br />叁<br />肆<br />伍<br />陆<br />柒<br />捌<br />玖<br />拾<br />佰<br />仟<br />万<br />元<br />角<br />分<br />整
            </div>

            <table className={styles.mtable}>
                <tr>
                    <th style={{
                        width: 200
                    }}>申请人
                    </th>
                    <td style={{
                        width: 500
                    }} contentEditable={true}>
                        {data?.name}
                    </td>
                    <th style={{
                        width: 200
                    }}>申请部门
                    </th>
                    <td style={{
                        width: 500
                    }} contentEditable={true}>
                        {data?.department}
                    </td>
                </tr>
                <tr>
                    <th>申请项目</th>
                    <td colSpan={4}>
                        <div className="checkbox-group">
                            <label className="checkbox-label"><input type="checkbox" checked={data?.project === '1'} /> 市内出差</label>
                            <label className="checkbox-label"><input type="checkbox" checked={data?.project === '2'} /> 省内出差</label>
                            <label className="checkbox-label"><input type="checkbox" checked={data?.project === '3'} /> 省外出差</label>
                            <label className="checkbox-label"><input type="checkbox" checked={data?.project === '4'} /> 其他:</label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>出差地点</th>
                    <td colSpan={4} contentEditable={true}>{data?.address}</td>
                </tr>
                <tr>
                    <th>预计出差时间</th>
                    <td colSpan={4} contentEditable={true}>
                        {data?.date && (
                            <span>{data?.date[0].format('YYYY年MM月DD日')} 至 {data?.date[1].format('YYYY年MM月DD日')}</span>
                        )}

                        {!data?.date && (
                            <>
                                <span className="input-line"></span> 年 <span className="input-line"></span> 月 <span
                                    className="input-line"></span> 日至
                                <span className="input-line"></span> 年 <span className="input-line"></span> 月 <span
                                    className="input-line"></span>
                                日，
                            </>
                        )}
                        共（<span className="input-line">{data?.days}</span>）天
                    </td>
                </tr>
                <tr>
                    <th>项目名称</th>
                    <td colSpan={4} contentEditable={true}>
                        {data?.projectName}
                    </td>
                </tr>
                <tr>
                    <td colSpan={5} contentEditable={true}>
                        出差补贴费用申请：<span className="input-line">{data?.currentPeople}</span> 人 <span
                            className="input-line">{data?.currentDays}</span> 天，每人每天 <span
                                className="input-line">{data?.currentMoneyPerDay}</span> 元，共（<span className="input-line">{data?.money}</span>）元。<br /><br />
                        大写：{moneyToWords(data?.money || 0)}<span className="input-line" style={
                            {
                                width: '90%'
                            }
                        }></span>
                    </td>
                </tr>
                <tr>
                    <td colSpan={3} contentEditable={true}>
                        部门经理意见及签字：
                        <div className="signature-line"></div>
                        <div className="date-line">年 <span className="input-line"></span> 月 <span
                            className="input-line"></span> 日
                        </div>
                    </td>
                    <td colSpan={2} rowSpan={2} contentEditable={true}>
                        企业负责人签字（盖章）：
                        <div className="signature-line"></div>
                        <div className="date-line">年 <span className="input-line"></span> 月 <span
                            className="input-line"></span> 日
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colSpan={3} contentEditable={true}>
                        财务人员签字（盖章）：
                        <div className="signature-line"></div>
                        <div className="date-line">年 <span className="input-line"></span> 月 <span
                            className="input-line"></span> 日
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default CCBZPage;
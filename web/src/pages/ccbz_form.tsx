import { Col, DatePicker, Form, Input, Radio, Row, type FormInstance } from "antd";
import type React from "react";

interface CCBZFormProps {
    form: FormInstance<any>;
}

const CCBZForm: React.FC<CCBZFormProps> = (props) => {

    const form = props.form;

    return (
        <>
            <Form form={form}>
                <Row gutter={[12, 12]}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="姓名"
                            tooltip="线下手写"
                        >
                            <Input disabled={true} placeholder="请输入姓名" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="department"
                            label="部门"
                            tooltip="不需要填写"
                        >
                            <Input disabled={true} placeholder="请输入部门" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="projectName"
                            label="项目名称"
                            tooltip="不需要填写"
                        >
                            <Input disabled={true} placeholder="请输入项目名称" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="project" label="申请项目">
                            <Radio.Group>
                                <Radio value="1">市内出差</Radio>
                                <Radio value="2">省内出差</Radio>
                                <Radio value="3">省外出差</Radio>
                                <Radio value="4">其他</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="date" label="出差时间">
                            <DatePicker.RangePicker />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="days" label="共几天">
                            <Input placeholder="出差报销的实际天数" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="address" label="出差地点">
                            <Input placeholder="请输入出差地点" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="currentPeople" label="出差人数">
                            <Input type="number" placeholder="请输入出差人数，通常为1" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="currentDays" label="出差天数">
                            <Input type="number" placeholder="请输入出差天数" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="currentMoneyPerDay" label="每人每天多少钱">
                            <Input type="number" placeholder="省外出差一天100，具体标准问财务" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="money" label="出差补贴费用总计">
                            <Input type="number" placeholder="请输入出差补贴费用总计" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default CCBZForm;
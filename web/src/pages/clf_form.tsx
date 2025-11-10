import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Divider, Flex, Form, Input, message, Row } from "antd";
import type { FormInstance } from "antd/lib";
import React from "react";


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


interface CLFFormProps {
    form: FormInstance<any>;
}

const CLFForm: React.FC<CLFFormProps> = (props) => {
    const form = props.form;
    const [maxNumber, setMaxNumber] = React.useState(1);

    return (
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
                    <Form.Item name="desc" layout="vertical" label="出差事由" >
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
    )
}

export default CLFForm;
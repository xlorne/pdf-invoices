import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Divider, Flex, Form, Input, message, Row, Select, type FormInstance } from "antd";
import React from "react";


interface FYFormProps {
    form: FormInstance<any>;
}


interface BodyFormItemProps {
    number: number;
}

const BodyFormItem: React.FC<BodyFormItemProps> = (props) => {

    const number = props.number;

    return (
        <>
            <Divider>项目{number}</Divider>
            <Col span={8}>
                <Form.Item
                    name={"project" + number}
                    label="费用项目"
                    tooltip="不需要填写"
                >
                    <Input disabled={true} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    name={"type" + number}
                    label="类别"
                >
                    <Select
                        placeholder="请选择费用类型"
                        options={[
                            {
                                label: '住宿费',
                                value: '住宿费'
                            },
                            {
                                label: '火车票费',
                                value: '火车票费'
                            },
                            {
                                label: '飞机票费',
                                value: '飞机票费'
                            },
                            {
                                label: '汽车票费',
                                value: '汽车票费'
                            },
                            {
                                label: '出差补贴',
                                value: '出差补贴'
                            },
                            {
                                label: '油票补贴',
                                value: '油票补贴'
                            },
                            {
                                label: '打车补贴',
                                value: '打车补贴'
                            },
                            {
                                label: '探亲补贴',
                                value: '探亲补贴'
                            },
                            {
                                label: '差旅费',
                                value: '差旅费'
                            },
                        ]}
                    />
                </Form.Item>
            </Col>

            <Col span={8}>
                <Form.Item name={"money" + number} label="金额">
                    <Input
                        type="number"
                        placeholder="请输入费用金额"
                    />
                </Form.Item>
            </Col>
        </>
    )
}


const FYForm: React.FC<FYFormProps> = (props) => {

    const form = props.form;
    const [maxNumber, setMaxNumber] = React.useState(1);

    return (
        <Form form={form}>
            <Row gutter={[12, 12]}>
                <Col span={24}>
                    <Form.Item name="created" label="填单时间" >
                        <DatePicker placeholder="填单时间" style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
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
    )
}

export default FYForm;
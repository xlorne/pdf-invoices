import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Flex, Form, Input, message, Row, type FormInstance } from "antd";
import React from "react";


interface FYFormProps {
    form: FormInstance;
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
                <Form.Item name={"project" + number} label="费用项目">
                    <Input />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item name={"type" + number} label="类别">
                    <Input/>
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


const FYForm: React.FC<FYFormProps> = (props) => {

    const form = props.form;
    const [maxNumber, setMaxNumber] = React.useState(1);

    return (
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
    )
}

export default FYForm;
import { Form, Input, type FormInstance } from "antd";
import type React from "react";


interface PZFormProps {
    form: FormInstance<any>;
}

const PZForm: React.FC<PZFormProps> = (props) => {

    const form = props.form;

    return (
        <>
            <Form form={form}>
                <Form.Item name="name" label="经办人">
                    <Input />
                </Form.Item>
                <Form.Item name="number" label="数量">
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="money" label="金额">
                    <Input type="number" />
                </Form.Item>
            </Form>
        </>
    )
}

export default PZForm;
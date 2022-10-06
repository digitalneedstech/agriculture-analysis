import React, { useState} from "react";
import {
    Form,
    Input,
    Button
} from "antd";
import { API_URL } from "../../routes/constants";

const AddMilkData = (props) => {
    const [formValues, setFormValues] = useState({});
    const [loading, setLoading] = useState(false);
    const {id}=props;
    const onFinish = (values) => {
        console.log("Success:", values);
        setLoading(true);
        saveMilkData(values)
    };

    async function saveMilkData(value) {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        };
        fetch(API_URL+'/production/animals/' + id, requestOptions).then((response) => response.json()).then((response) => {
            console.log(response);
            setLoading(false);
            props.onSubmitSuccess();
        }).catch((err) => {
            props.onSubmitFailure();
        });
    }

    const onFormValueChange = (inputValues) => {
        setFormValues((p) => {
            return {
                ...p,
                ...inputValues
            };
        });
    };
    console.log(formValues);
    return (
        <Form labelCol={
                {span: 8}
            }
            wrapperCol={
                {span: 14}
            }
            layout="horizontal"
            onValuesChange={onFormValueChange}
            onFinish={onFinish}
            labelWrap>
            <Form.Item label="Milk Produced" name="milk_produced">
                <Input/>
            </Form.Item>
            <Form.Item wrapperCol={
                {
                    offset: 8,
                    span: 16
                }
            }>
                <Button loading={loading}
                    type="primary"
                    htmlType="submit">
                    Submit
                </Button>
                <Button key="back"
                    onClick={
                        () => {
                            setLoading(false);
                            props.onCancel();
                        }
                }>
                    Cancel
                </Button>
            </Form.Item>

        </Form>
    );
};

export default AddMilkData;

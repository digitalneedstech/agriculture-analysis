import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from "antd";

const AddNewLabourInfo = () => {
  const [formValues, setFormValues] = useState({});
  const onFormValueChange = (inputValues) => {
    setFormValues((p) => {
      return { ...p, ...inputValues };
    });
  };
  console.log(formValues);
  return (
    <Form
      labelCol={{
        span: 8,
      }}
      wrapperCol={{   
        span: 14,
      }}
      layout="horizontal"
      onValuesChange={onFormValueChange}
      labelWrap
    >
      <Form.Item label="No. Of Labourers">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Hours Spent Today">
        <InputNumber />
        
      </Form.Item><Form.Item label="DatePicker">
        <DatePicker />
      </Form.Item>
    </Form>
  );
};

export default AddNewLabourInfo;

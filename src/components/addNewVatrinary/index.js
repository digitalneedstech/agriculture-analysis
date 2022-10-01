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

const AddNewVatrinary = () => {
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
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      onValuesChange={onFormValueChange}
      labelWrap
    >
      <Form.Item label="Category" name="select">
        <Select>
          <Select.Option value="animal_type">Animal Type</Select.Option>
          <Select.Option value="cb_cattle">CB Cattle</Select.Option>
          <Select.Option value="buffalo">Buffalo</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Date">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Amount Spent">
        <InputNumber />
      </Form.Item>
    </Form>
  );
};

export default AddNewVatrinary;

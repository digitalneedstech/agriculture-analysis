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

const AddNewSale = () => {
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
          <Select.Option value="MilkSale">Milk Sale</Select.Option>
          <Select.Option value="AnimalSale">Animal Sale</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Date">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Amount Earned">
        <InputNumber />
      </Form.Item>
    </Form>
  );
};

export default AddNewSale;

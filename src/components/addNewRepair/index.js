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

const AddNewRepair = () => {
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
          <Select.Option value="Tractor">Tractor</Select.Option>
          <Select.Option value="FertilizerMachine">Fertilizer Machine</Select.Option>
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

export default AddNewRepair;

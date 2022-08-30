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

const AddNewProject = () => {
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
      <Form.Item label="Input" name="input">
        <Input />
      </Form.Item>
      <Form.Item label="Select" name="select">
        <Select>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="TreeSelect">
        <TreeSelect
          treeData={[
            {
              title: "Light",
              value: "light",
              children: [
                {
                  title: "Bamboo",
                  value: "bamboo",
                },
              ],
            },
          ]}
        />
      </Form.Item>
      <Form.Item label="Cascader">
        <Cascader
          options={[
            {
              value: "zhejiang",
              label: "Zhejiang",
              children: [
                {
                  value: "hangzhou",
                  label: "Hangzhou",
                },
              ],
            },
          ]}
        />
      </Form.Item>
      <Form.Item label="DatePicker">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Input Number">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Switch" valuePropName="checked">
        <Switch />
      </Form.Item>
    </Form>
  );
};

export default AddNewProject;

import React, { useEffect, useState } from "react";
import {
  Form,
  Input,Button,
  Select,
  InputNumber,
  Switch,
} from "antd";

const AddNewUser = (props) => {
  const [formValues, setFormValues] = useState({});
  const [rolesList,setRolesList]=useState([]);
  const [selectedRole,setSelectedRole]=useState(-1);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    fetch('http://localhost:8080/api/data/roles')
    .then((response)=>response.json())
    .then((response)=>{
      console.log(response);
      setRolesList(response);
      setSelectedRole(response[0].id);
    });
  },[])
  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);
    saveUser(values)
  };
  async function saveUser(value){

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
  };
  fetch('http://localhost:8080/api/users', requestOptions)
  .then((response)=>response.json())
  .then((response)=>{
    console.log(response);
    setLoading(false);
    props.onSubmitSuccess();
  }).catch((err)=>{   
    props.onSubmitFailure();
  });
  }

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
      onFinish={onFinish}
      labelWrap
    >
      <Form.Item label="User Name" name="user_name">
        <Input />
      </Form.Item>
      <Form.Item label="User Password" name="user_password">
        <Input />
      </Form.Item>
      <Form.Item label="Display Name" name="display_name">
        <Input />
      </Form.Item>
      {rolesList.length>0 ?
      <Form.Item label="Roles" name="role_ids">
      <Select mode="multiple"
            value={selectedRole}
            >
            {rolesList.map((role) => <Select.Option key={role.id} value={role.id} >{role.name}</Select.Option>)}
            </Select>
        
      </Form.Item> :<></>}
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button loading={loading} type="primary" htmlType="submit">
          Submit
        </Button>
        <Button  key="back" onClick={()=>{
          setLoading(false);
          props.onCancel();
        }}>
            Cancel
          </Button>
      </Form.Item>
      
    </Form>
  );
};

export default AddNewUser;

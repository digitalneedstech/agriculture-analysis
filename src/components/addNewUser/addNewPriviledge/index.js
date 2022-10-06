import React, { useEffect, useState } from "react";
import {
  Form,
  Input,Button,
  Select,
  InputNumber,
  Switch,
} from "antd";
import ResultWidget from "../../error";
import { API_URL } from "../../../routes/constants";

const AddNewPriviledge = (props) => {
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [error,setError]=useState("");
  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);
    saveUser(values)
  };
  const update=()=>{
    setError("");
}
  async function saveUser(value){

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
  };
  fetch(API_URL+'/data/priviledges', requestOptions)
  .then((response)=>response.json())
  .then((response)=>{
    
    if(response.status && response.status!=200){
      setLoading(false);
      setError("Invalid request");
      console.log("failure");
  }else{
      
      console.log("success");
      console.log(response);
  setLoading(false);
  setError("");
  props.onSubmitSuccess();
  }
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
  if(error!=""){
    return (<ResultWidget update={update}></ResultWidget>)
};
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
      <Form.Item label="Screen Name" name="screen_name">
        <Input />
      </Form.Item>
      <Form.Item label="Functionality Name" name="functionaliy_name">
        <Input />
      </Form.Item>
      <Form.Item label="Action" name="action">
        <Input />
      </Form.Item>
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

export default AddNewPriviledge;

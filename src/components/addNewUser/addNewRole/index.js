import React, { useEffect, useState } from "react";
import {
  Form,
  Input,Button,
  Select,
  InputNumber,
  Switch,
} from "antd";
import ResultWidget from "../../error";

const AddNewRole = (props) => {
  const [formValues, setFormValues] = useState({});
  const [priviledgesList,setPriviledgesList]=useState([]);
  const [selectedPriviledge,setSelectedPriviledge]=useState(-1);
  const [error,setError]=useState("");
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    fetch('http://localhost:8080/api/data/priviledges')
    .then((response)=>response.json())
    .then((response)=>{
      console.log(response);
      setPriviledgesList(response);
      setSelectedPriviledge(response[0].id);
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
  fetch('http://localhost:8080/api/data/roles', requestOptions)
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
  const update=()=>{
    setError("");
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
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>
      {priviledgesList.length>0 ?
      <Form.Item label="Priviledges" name="priviledge_ids">
      <Select mode="multiple"
            value={selectedPriviledge}
            >
            {priviledgesList.map((priviledge) => <Select.Option key={priviledge.id} value={priviledge.id} >{priviledge.screen_name}</Select.Option>)}
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

export default AddNewRole;

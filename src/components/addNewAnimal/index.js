import React, { useEffect, useState } from "react";
import {
  Form,
  Input,Button,
  Select,
  InputNumber,
  Switch,
} from "antd";
import { API_URL } from "../../routes/constants";

const AddNewAnimal = (props) => {
  const [formValues, setFormValues] = useState({});
  const [animalList,setAnimalList]=useState([]);
  const [animalSubTypesList,setAnimalSubTypesList]=useState([]);
  const [animalSubCatList,setAnimalSubCatList]=useState([]);
  const [selectedAnimal,setSelectedAnimal]=useState("");
  const [selectedSubAnimal,setSelectedSubAnimal]=useState("");
  const [selectedSubCatAnimal,setSelectedSubCatAnimal]=useState("");
  const [loading, setLoading] = useState(false);
  const handleChangeSelectedAnimalType=(value)=>{
    setSelectedSubAnimal(value);
  }

  const handleChangeSelectedAnimalCat=(value)=>{
    setSelectedSubCatAnimal(value);
  }
  const handleChangeSelectedAnimal=(value)=>{
    setSelectedAnimal(value);
    fetch(API_URL+'/metadata/animal/'+value+'/subTypes')
    .then((response)=>response.json())
    .then((response)=>{
      console.log(response);
      setAnimalSubTypesList(response);
      setSelectedSubAnimal(response[0].id);
      fetch(API_URL+'/metadata/animal/'+value+'/subCategories')
        .then((response)=>response.json())
        .then((response)=>{
          console.log(response);
          setAnimalSubCatList(response);
          
          setSelectedSubCatAnimal(response[0].id);
        });
        
    });
  }
  useEffect(()=>{
    fetch(API_URL+'/metadata/animalTypes')
    .then((response)=>response.json())
    .then((response)=>{
      console.log(response);
      setAnimalList(response);
      setSelectedAnimal(response[0].id);
    });
  },[])
  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);
    saveAnimal(values)
  };

  async function saveAnimal(value){

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
  };
  fetch(API_URL+'/data/animal', requestOptions)
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
      <Form.Item label="Animal Name" name="animal_name">
        <Input />
      </Form.Item>
      {animalList.length>0 ?
      <Form.Item label="Animal Category" name="animal_category">
      <Select
            value={selectedAnimal}
            onChange={handleChangeSelectedAnimal}
            >
            {animalList.map((animal) => <Select.Option key={animal.id} value={animal.id} >{animal.type}</Select.Option>)}
            </Select>
        
      </Form.Item> :<></>}

      {animalSubCatList.length>0 ?
      <Form.Item label="Animal Sub Cat" name="animal_subcategory">
      <Select
            value={selectedAnimal}
            onChange={handleChangeSelectedAnimalCat}
            >
            {animalSubCatList.map((animal) => <Select.Option key={animal.id} value={animal.id} >{animal.name}</Select.Option>)}
            </Select>
        
      </Form.Item> :<></>}

      {animalSubTypesList.length>0 ?
      <Form.Item label="Animal Sub Type" name="animal_subtype">
      <Select
            value={selectedAnimal}
            onChange={handleChangeSelectedAnimalType}
            >
            {animalSubTypesList.map((animal) => <Select.Option key={animal.id} value={animal.id} >{animal.name}</Select.Option>)}
            </Select>
        
      </Form.Item> :<></>}
      <Form.Item label="Age" name="age">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Animal Milks?" name="is_animal_milks" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label="Animal Ill?" name="is_animal_ill" valuePropName="checked">
        <Switch />
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

export default AddNewAnimal;

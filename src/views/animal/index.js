import React, { useEffect, useState } from "react";
import { Modal, Button,Form,
  Input,Space,Table } from "antd";
import AddNewAnimal from "~/components/addNewAnimal";
import AddMilkData from "../../components/addMilkData";
import AnimalMilkData from "../../components/animalMilkData";
import { API_URL } from "../../routes/constants";

function Animal(props) {
  const [modalVisible, setModalVisble] = useState(false);
  const [animalId, setAnimalId] = useState("");
  const [prodModalVisible, setProdModalVisible] = useState(false);
  const [prodMilkDataModalVisible, setProdMilkDataModalVisible] = useState(false);
  const [animalData,setAnimalData]=useState([]);
  useEffect(()=>{
    reload();
  },[]);
  async function reload(){
    fetch(API_URL+'/data/animals')
    .then((response)=>response.json())
    .then((response)=>{
      console.log(response);
      var animalList=animalData;
      animalList=[...response];
      setAnimalData(animalList);
    });
  }
  async function deleteById(val){
    var idToBeDeleted=val;
    console.log("delete",idToBeDeleted);
        const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
  };
  fetch(API_URL+'/data/animals/'+idToBeDeleted,requestOptions)
    .then((response)=>response.json())
    .then((response)=>{
      console.log(response);
      reload();
    }).catch((error)=>{
      reload();
    });
}

  async function updateProductionData(val){
    setProdModalVisible(true);
    setAnimalId(val);
  }

  async function viewProductionData(val){
    setProdMilkDataModalVisible(true);
    setAnimalId(val);
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'animal_name',
      key: 'animal_name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Category',
      dataIndex: 'animal_category',
      key: 'animal_category',
    },
    {
      title: 'Sub Category',
      dataIndex: 'animal_subcategory',
      key: 'animal_subcategory',
    },
    {
      title: 'Sub type',
      dataIndex: 'animal_subtype',
      key: 'animal_subtype',
    },
    {
      title: 'Ill?',
      dataIndex: 'is_animal_ill',
      key: 'is_animal_ill',
      render: (text) => <a>{text? "Yes":"No"}</a>,
    },

    {
      title: 'Milk?',
      dataIndex: 'is_animal_milks',
      key: 'is_animal_milks',
      render: (text) => <a>{text? "Yes":"No"}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a href="javascript:void(0)" onClick={()=>viewProductionData(record.id)}>View Data</a>
          <a href="javascript:void(0)" onClick={()=>updateProductionData(record.id)}>Update </a>
          <a href="javascript:void(0)" onClick={()=>deleteById(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];
  const handleSubmit = () => {
    reload();
    makeModalsVisbleFalse();
  }

  const handleSubmitFailure = () => {
    setTimeout(() => makeModalsVisbleFalse(), 3000);
  };

  const handleCancel = () => makeModalsVisbleFalse();

  const makeModalsVisbleFalse=()=>{
    setModalVisble(false);
    setProdModalVisible(false);
  }

  return (
    <>
      <div className="white-background content">
        <Button
          type="primary"
          onClick={() => {
            setModalVisble(true);
          }}
        >
          Add New Animal
        </Button>
        <Table
        columns={columns} dataSource={animalData} />
      </div>
      <Modal
        style={{ top: 20 }}
        visible={prodModalVisible}
        title="Add Milk Data"
        footer={null}
        
      >
        <AddMilkData id={animalId} onSubmitSuccess={handleSubmit} onSubmitFailure={handleSubmitFailure} onCancel={handleCancel} />
      </Modal>
      <Modal
      onCancel={handleCancel}
        style={{ top: 20 }}
        visible={prodMilkDataModalVisible}
        title="Milk Data"
        footer={null}
        onOk={handleSubmit}
        destroyOnClose={true}
        onCancel={handleCancel}
      >
        <AnimalMilkData id={animalId}></AnimalMilkData>
      </Modal>
      <Modal
        style={{ top: 20 }}
        visible={modalVisible}
        title="New Animal"
        onOk={handleSubmit}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={null}
      >
        <AddNewAnimal onSubmitSuccess={handleSubmit} onSubmitFailure={handleSubmitFailure} onCancel={handleCancel} />
      </Modal>
    </>
  );
}

export default Animal;

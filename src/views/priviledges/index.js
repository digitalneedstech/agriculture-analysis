import React, { useEffect, useState } from "react";
import { Modal, Button,Form,
  Input,Space,Table } from "antd";
import AddNewPriviledge from "../../components/addNewUser/addNewPriviledge";
import { API_URL } from "../../routes/constants";

function Priviledges(props) {
  const [modalVisible, setModalVisble] = useState(false);
  const [animalData,setAnimalData]=useState([]);
  const [priviledgeModalVisible, setPriviledgeModalVisible] = useState(false);
  useEffect(()=>{
    reload();
  },[]);
  async function reload(){
    fetch(API_URL+'/data/priviledges')
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
  fetch(API_URL+'/data/users/'+idToBeDeleted,requestOptions)
    .then((response)=>response.json())
    .then((response)=>{
      console.log(response);
      reload();
    }).catch((error)=>{
      reload();
    });
}

  const columns = [
    {
      title: 'Screen Name',
      dataIndex: 'screen_name',
      key: 'screen_name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Functionality Name',
      dataIndex: 'functionality_name',
      key: 'functionality_name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text) => <a>{text}</a>,
    }
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
          Add New Role
        </Button>
        <Table
        columns={columns} dataSource={animalData} />
      </div>
      
      <Modal
        style={{ top: 20 }}
        visible={modalVisible}
        title="New Priviledge"
        onOk={handleSubmit}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={null}
      >
        <AddNewPriviledge onSubmitSuccess={handleSubmit} onSubmitFailure={handleSubmitFailure} onCancel={handleCancel} />
      </Modal>
    </>
  );
}

export default Priviledges;

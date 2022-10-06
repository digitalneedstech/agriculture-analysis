import React, { useEffect, useState } from "react";
import { Modal, Button,Form,
  Input,Space,Table } from "antd";
import UserPriviledges from "../../components/users/priviledges";
import AddNewUser from "../../components/addNewUser";
import { API_URL } from "../../routes/constants";

function Users(props) {
  const [modalVisible, setModalVisble] = useState(false);
  const [animalId, setAnimalId] = useState("");
  const [user,setUser]=useState({});
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [priviledgeModalVisible, setPriviledgeModalVisible] = useState(false);
  const [animalData,setAnimalData]=useState([]);
  useEffect(()=>{
    reload();
  },[]);
  async function reload(){
    fetch(API_URL+'/users')
    .then((response)=>response.json())
    .then((response)=>{
      console.log(response);
      var animalList=animalData;
      animalList=[...response.users];
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

  async function viewUserPriviledges(val){
    setPriviledgeModalVisible(true);
    setUser(val);
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'user_name',
      key: 'user_name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Display Name',
      dataIndex: 'display_name',
      key: 'display_name',
    },
    {
      title: 'Department',
      dataIndex: 'user_department',
      key: 'user_department',
    },
    {
        title: 'Roles',
        dataIndex: 'user_roles',
        key: 'user_roles',
      },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a href="javascript:void(0)" onClick={()=>viewUserPriviledges(record)}>View Priviledges </a>
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
    setRoleModalVisible(false);
    setPriviledgeModalVisible(false);
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
          Add New Users
        </Button>
        <Table
        columns={columns} dataSource={animalData} />
      </div>
      
      <Modal
      onCancel={handleCancel}
        style={{ top: 20 }}
        visible={priviledgeModalVisible}
        title="Priviledges"
        footer={null}
        onOk={handleSubmit}
        destroyOnClose={true}
        onCancel={handleCancel}
      >
        <UserPriviledges user={user}></UserPriviledges>
      </Modal>
      <Modal
        style={{ top: 20 }}
        visible={modalVisible}
        title="New User"
        onOk={handleSubmit}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={null}
      >
        <AddNewUser onSubmitSuccess={handleSubmit} onSubmitFailure={handleSubmitFailure} onCancel={handleCancel} />
      </Modal>
    </>
  );
}

export default Users;

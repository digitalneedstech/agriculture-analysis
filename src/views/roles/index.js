import React, { useEffect, useState } from "react";
import { Modal, Button,Form,
  Input,Space,Table } from "antd";
import AddNewRole from "../../components/addNewUser/addNewRole";
import RolePriviledgesList from "../../components/role/priviledges";
import { API_URL } from "../../routes/constants";

function Roles(props) {
  const [modalVisible, setModalVisble] = useState(false);
  const [animalData,setAnimalData]=useState([]);
  const [role,setRole]=useState({});
  const [priviledgeModalVisible, setPriviledgeModalVisible] = useState(false);
  useEffect(()=>{
    reload();
  },[]);
  async function reload(){
    fetch(API_URL+'/data/roles')
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Priviledges',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a href="javascript:void(0)" onClick={()=>viewRolePriviledges(record)}>View Priviledges </a>
        </Space>
      ),
    },
  ];

  async function viewRolePriviledges(val){
    setPriviledgeModalVisible(true);
    setRole(val);
  }
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
      onCancel={handleCancel}
        style={{ top: 20 }}
        visible={priviledgeModalVisible}
        title="Priviledges"
        footer={null}
        onOk={handleSubmit}
        destroyOnClose={true}
        onCancel={handleCancel}
      >
        <RolePriviledgesList role={role}></RolePriviledgesList>
      </Modal>
      <Modal
        style={{ top: 20 }}
        visible={modalVisible}
        title="New Role"
        onOk={handleSubmit}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={null}
      >
        <AddNewRole onSubmitSuccess={handleSubmit} onSubmitFailure={handleSubmitFailure} onCancel={handleCancel} />
      </Modal>
    </>
  );
}

export default Roles;

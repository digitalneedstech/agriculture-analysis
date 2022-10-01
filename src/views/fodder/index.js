import React, { useState,useEffect } from "react";
import { Modal, Button,Space,Table } from "antd";
import AddNewFodder from "../../components/addNewFodder";
import FodderList from "../../components/fodderList";
import AddFodderProd from "../../components/addFodderProd";
import FodderProdData from "../../components/fodderProdData";
function Fodder(props) {
  const [modalVisible, setModalVisble] = useState(false);
  const [animalData,setAnimalData]=useState([]);
  const [formData, setFormData] = useState("");
  const [prodMilkDataModalVisible, setProdMilkDataModalVisible] = useState(false);
  const [animalId, setAnimalId] = useState("");
  const [prodModalVisible, setProdModalVisible] = useState(false);
  useEffect(()=>{
    reload();
  },[]);
  async function reload(){
    fetch('http://localhost:8080/api/expense/fodders')
    .then((response)=>response.json())
    .then((response)=>{
      console.log(response);
      var animalList=animalData;
      animalList=[...response];
      setAnimalData(animalList);
    });
  }
  const columns = [
    {
      title: 'Category',
      dataIndex: 'fodder_cat',
      key: 'fodder_cat',
      fixed: 'left',
      width: 100,
    },
    {
      title: 'Sub Category',
      dataIndex: 'fodder_sub_cat',
      key: 'fodder_sub_cat',
      fixed: 'left',
      width: 100},
    {
      title: 'Season',
      dataIndex: 'season_type',
      key: 'season_type',
      fixed: 'left',
      width: 100,
    },
    {
      title: 'Seeds Q',
      dataIndex: 'seeds_quantity',
      key: 'seeds_quantity',
      width: 100,
    },
    {
      title: 'Seeds R',
      dataIndex: 'seeds_rate',
      key: 'seeds_rate',
      width: 100,
    },
    {
      title: 'Fertilizer Urea Q',
      dataIndex: 'fertilizer_urea_quantity',
      key: 'fertilizer_urea_quantity',
      width: 100,
    },
    {
      title: 'Fertilizer Urea R',
      dataIndex: 'fertilizer_urea_rate',
      key: 'fertilizer_urea_rate',
      width: 100,
    },
    {
      title: 'Seeds Q',
      dataIndex: 'fertlizer_dap_quantity',
      key: 'fertlizer_dap_quantity',
      width: 100,
    },
    {
      title: 'Seeds R',
      dataIndex: 'fertlizer_dap_rate',
      key: 'fertlizer_dap_rate',
      width: 100,
    },
    {
      title: 'Seeds Q',
      dataIndex: 'fertlizer_micro_quantity',
      key: 'fertlizer_micro_quantity',
      width: 100,
    },
    {
      title: 'Seeds R',
      dataIndex: 'fertlizer_micro_rate',
      key: 'fertlizer_micro_rate',
      width: 100,
    },
    {
      title: 'Seeds Q',
      dataIndex: 'fym_quantity',
      key: 'fym_quantity',
      width: 100,
    },
    {
      title: 'Seeds R',
      dataIndex: 'fym_rate',
      key: 'fym_rate',
      width: 100,
    },
    {
      title: 'Seeds Q',
      dataIndex: 'pesticides_quantity',
      key: 'pesticides_quantity',
      width: 100,
    },
    {
      title: 'Seeds R',
      dataIndex: 'pesticides_rate',
      key: 'pesticides_rate',
      width: 100,
    },
    {
      title: 'Seeds Q',
      dataIndex: 'diesel_quantity',
      key: 'diesel_quantity',
      width: 100,
    },
    {
      title: 'Seeds R',
      dataIndex: 'diesel_rate',
      key: 'diesel_rate',
      width: 100,
    },
    {
      title: 'Seeds Q',
      dataIndex: 'labour_rate',
      key: 'labour_rate',
      width: 100,
    },
    {
      title: 'Seeds R',
      dataIndex: 'labour_hours',
      key: 'labour_hours',
      width: 100,
    },
    {
      title: 'Seeds Q',
      dataIndex: 'labour_type',
      key: 'labour_type',
      width: 100,
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <a href="javascript:void(0)" onClick={()=>updateProductionData(record.id)}>Update Prod</a>
          <a href="javascript:void(0)" onClick={()=>viewProductionData(record.id)}>View Prod Data</a>
          
          <a href="javascript:void(0)" onClick={()=>updateExpenseData(record)}>Update </a>
          
        </Space>
      ),
    },
  ];
  async function updateProductionData(val){
    setProdModalVisible(true);
    setAnimalId(val);
  }
  async function viewProductionData(val){
    setProdMilkDataModalVisible(true);
    console.log("id",val);
    setAnimalId(val);
  }
  async function updateExpenseData(val){
    console.log("data",val);
    //setOpen(true);
    setFormData(val);
  }

  useEffect(()=>{
    if(formData!="")
      setModalVisble(true);
  },[formData]);
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
    setFormData("");
    
    //setProdModalVisible(false);
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
          Add New Fodder
        </Button>
        <Table
        scroll={{
          x: 1300,
        }}
        columns={columns} dataSource={animalData} />
      </div>

      <Modal
        style={{ top: 20 }}
        visible={prodModalVisible}
        title="Add Milk Data"
        footer={null}
        
      >
        <AddFodderProd id={animalId} onSubmitSuccess={handleSubmit} onSubmitFailure={handleSubmitFailure} onCancel={handleCancel} />
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
        <FodderProdData id={animalId}></FodderProdData>
      </Modal>
      <Modal
        style={{ top: 20 }}
        visible={modalVisible}
        title="New Fodder"
        onOk={handleSubmit}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={null}
      >
        <AddNewFodder formData={formData} onSubmitSuccess={handleSubmit} onSubmitFailure={handleSubmitFailure} onCancel={handleCancel} />
      </Modal>
    </>
  );
}

export default Fodder;

import React, {useEffect, useState} from "react";
import {
    Table
} from "antd";


const FodderProdData = (props) => {
    const {id}=props;
    const [animalData,setAnimalData]=useState([]);
    useEffect(()=>{
        reload();
      },[]);
      async function reload(){
        fetch('http://localhost:8080/api/production/fodders/'+id)
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
          title: 'Area',
          dataIndex: 'area',
          key: 'date',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity',
          render: (text) => <span>{text} Kg</span>,
        }
      ];
    return (
        <Table
        onclo
        columns={columns} dataSource={animalData} />
    );
};

export default FodderProdData;

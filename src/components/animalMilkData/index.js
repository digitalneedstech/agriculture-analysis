import React, {useEffect, useState} from "react";
import {
    Table
} from "antd";
import { API_URL } from "../../routes/constants";


const AnimalMilkData = (props) => {
    const {id}=props;
    const [animalData,setAnimalData]=useState([]);
    useEffect(()=>{
        reload();
      },[]);
      async function reload(){
        fetch(API_URL+'/production/animals/'+id)
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
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Milk Produced',
          dataIndex: 'milk_produced',
          key: 'milk_produced',
          render: (text) => <span>{text} Kg</span>,
        }
      ];
    return (
        <Table
        onclo
        columns={columns} dataSource={animalData} />
    );
};

export default AnimalMilkData;

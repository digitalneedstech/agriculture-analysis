import React, {useEffect, useState} from "react";
import {
    Table
} from "antd";


const UsersList = (props) => {
    const {id}=props;
    const [animalData,setAnimalData]=useState([]);
    useEffect(()=>{
        reload();
      },[]);
      async function reload(){
        fetch('http://localhost:8080/api/users/'+id)
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
          title: 'User Name',
          dataIndex: 'user_name',
          key: 'user_name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Display Name',
          dataIndex: 'display_name',
          key: 'display_name',
          render: (text) => <span>{text} Kg</span>,
        }
      ];
    return (
        <Table
        
        columns={columns} dataSource={animalData} />
    );
};

export default UsersList;

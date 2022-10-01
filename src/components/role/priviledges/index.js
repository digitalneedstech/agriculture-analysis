import React, {useEffect, useState} from "react";
import {
    Table
} from "antd";


const RolePriviledgesList = (props) => {
    
    const priviledges=props.role.privileges;
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
          render: (text) => <span>{text}</span>,
        }
      ];
    return (
        <Table
                columns={columns} dataSource={priviledges} />
    );
};

export default RolePriviledgesList;

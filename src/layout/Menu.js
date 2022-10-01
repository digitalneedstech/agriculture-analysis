import React from "react";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import useToken from "../hooks/useToken";

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function MenuSider(props) {
  const { token, setToken } = useToken();
  return (
    <Sider
      collapsible
      collapsed={props.collapsed}
      onCollapse={props.onCollapse}
    >
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Dashboard
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="Animal">
          <Menu.Item key="2"><Link to="/home/animal"></Link><span>Add Animal</span></Menu.Item>
          <Menu.Item key="3"><Link to="/home/animal"></Link><span>Add Animal Statistics</span></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Fodder">
          <Menu.Item key="4"><Link to="/home/fodder"></Link>Add Fodder Data</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<TeamOutlined />} title="Sales Channel">
          <Menu.Item key="5"><Link to="/home/milkSale"></Link>Milk Sales</Menu.Item>
          <Menu.Item key="6"><Link to="/home/animalSale"></Link>Animal Sales</Menu.Item>
          <Menu.Item key="7"><Link to="/home/semenSale"></Link>Semen Sales</Menu.Item>
          <Menu.Item key="8"><Link to="/home/buffaloCalveSale"></Link>Buffalo Male Calves</Menu.Item>
        </SubMenu>
        
        <Menu.Item key="10" icon={<PieChartOutlined />}>
          Labour Data
          <Link to="/home/labour"></Link>
        </Menu.Item>
        <Menu.Item key="11" icon={<PieChartOutlined />}>
        Vaterinary Expenses
        <Link to="/home/expenses/vatrinary"></Link>
        </Menu.Item>
         <Menu.Item key="12" icon={<PieChartOutlined />}>
        Repair Activity
        <Link to="/home/expenses/repair"></Link>
        </Menu.Item>
        <Menu.Item key="9" icon={<PieChartOutlined />}>
          <span>Settings</span>
          <Link to="/home/settings"></Link>
        </Menu.Item>
        <SubMenu key="sub4" icon={<TeamOutlined />} title="User & Roles">
          <Menu.Item key="13"><Link to="/home/users"></Link>Users</Menu.Item>
          <Menu.Item key="14"><Link to="/home/roles"></Link>Roles</Menu.Item>
          <Menu.Item key="15"><Link to="/home/priviledges"></Link>Priviledges</Menu.Item>
          
        </SubMenu>
      </Menu>
    </Sider>
  );
}

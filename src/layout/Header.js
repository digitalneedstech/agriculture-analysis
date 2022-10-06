import React from "react";
import {Button, Layout} from "antd";
import { Navigate } from "react-router";
import { useNavigate } from "react-router-dom";
const {Header} = Layout;

export default function HeaderComp(props) {
    const navigate = useNavigate();
    const logout=()=>{
        localStorage.removeItem("token");
        Navigate("/login");
    }
    return <Header className="white-background header">
        <h1 style={
            {
                padding: 10 + 'px'
            }
        }>Agriculture Project</h1>
        <Button onClick={()=>logout}>Logout </Button>
    </Header>;
}

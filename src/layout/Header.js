import React from "react";
import {Button, Layout} from "antd";

const {Header} = Layout;

export default function HeaderComp(props) {
    const logout=()=>{
        localStorage.removeItem("token");
    }
    return <Header className="white-background header">
        <h1 style={
            {
                padding: 10 + 'px'
            }
        }>Agriculture Project</h1>
        <Button onClick={()=>logout}></Button>
    </Header>;
}

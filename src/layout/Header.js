import React from "react";
import {Layout} from "antd";

const {Header} = Layout;

export default function HeaderComp(props) {
    return <Header className="white-background header">
        <h1 style={
            {
                padding: 10 + 'px'
            }
        }>Agriculture Project</h1>
    </Header>;
}
